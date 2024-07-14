import logging

import functions_framework
import google_crc32c
import requests
from cloudevents.http.event import CloudEvent
from google.cloud import secretmanager
from pythonjsonlogger import jsonlogger

root_logger = logging.getLogger()
logHandler = logging.StreamHandler()
formatter = jsonlogger.JsonFormatter('%(message)%(levelname)%(name)%(asctime)')
logHandler.setFormatter(formatter)
root_logger.addHandler(logHandler)
root_logger.level = logging.INFO
LOGGER = logging.getLogger(__name__)


@functions_framework.cloud_event
def pubsub_handler(cloud_event: CloudEvent):

    message = cloud_event.data["message"]

    event_type = message["attributes"]["eventType"]
    version_id = message["attributes"]["versionId"]
    secret_id = message["attributes"]["secretId"]

    LOGGER.info("Handling new event", extra={"event_type": event_type})

    match event_type:
        case "SECRET_ROTATE":
            rotate(secret_id, version_id)
        case "SECRET_VERSION_ADD":
            update_worker(version_id)
        case _:
            LOGGER.info("Done handling, nothing to do", extra={"event_type": event_type})
            return


def rotate(secret_id, current_version_id):

    client = secretmanager.SecretManagerServiceClient()

    LOGGER.info("Requesting secret", extra={"version_id": current_version_id})

    access_secret_version_response = client.access_secret_version(
        name=current_version_id
    )

    current_token = access_secret_version_response.payload.data.decode("utf-8")

    payload = {"grant_type": "ig_refresh_token", "access_token": current_token}

    r = requests.get("https://graph.instagram.com/refresh_access_token", params=payload)
    new_token = r.json()["access_token"]

    payload_bytes = new_token.encode("UTF-8")
    crc32c = google_crc32c.Checksum()
    crc32c.update(payload_bytes)

    response = client.add_secret_version(
        request={
            "parent": secret_id,
            "payload": {
                "data": payload_bytes,
                "data_crc32c": int(crc32c.hexdigest(), 16),
            },
        }
    )

    LOGGER.info("Added new secret version", extra={"version": response.name})


cf_secret_version = "projects/7571523860/secrets/instagram_secret_rotator_cloudflare_token/versions/latest"


def update_worker(version_id):
    client = secretmanager.SecretManagerServiceClient()

    LOGGER.info("Requesting secret", extra={"version_id": version_id})

    current_ig_token = client.access_secret_version(
        name=version_id
    ).payload.data.decode("utf-8")

    LOGGER.info("Requesting secret", extra={"version_id": cf_secret_version})

    cloudflare_token = client.access_secret_version(
        name=cf_secret_version
    ).payload.data.decode("utf-8")

    LOGGER.info("Calling api.cloudflare.com")

    r = requests.patch(
        "https://api.cloudflare.com/client/v4/accounts/441225c17ffd0facfc5a66f2ee0f45ac/pages/projects/dunningnatural-pages",
        headers={"Authorization": f"Bearer {cloudflare_token}"},
        json={
            "deployment_configs": {
                "production": {
                    "env_vars": {
                        "INSTAGRAM_TOKEN": {
                            "type": "secret_text",
                            "value": current_ig_token,
                        }
                    }
                }
            }
        },
    )

    LOGGER.info("Done, CloudFlare response:", extra={"status_code": r.status_code, "text": r.text})
