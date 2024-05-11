import functions_framework
import google_crc32c
import requests
from cloudevents.http.event import CloudEvent
from google.cloud import secretmanager


@functions_framework.cloud_event
def pubsub_handler(cloud_event: CloudEvent):

    data = cloud_event.data
    event_type = data["attributes"]["eventType"]
    version_id = data["attributes"]["versionId"]
    secret_id = data["attributes"]["secretId"]

    if event_type != "SECRET_ROTATE":
        return

    client = secretmanager.SecretManagerServiceClient()

    access_secret_version_response = client.access_secret_version(name=version_id)

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

    print(f"Added secret version: {response.name}")
