resource "google_storage_bucket" "instagram_secret_rotator_src" {
  name                        = "${data.google_client_config.current.project}-bucket-instagram-secret-rotator-src"
  force_destroy               = false
  location                    = data.google_client_config.current.region
  uniform_bucket_level_access = true
  storage_class               = "STANDARD"
  versioning {
    enabled = true
  }
}

resource "google_secret_manager_secret" "drna_instagram_long_lived_token" {
  secret_id = "drna_instagram_long_lived_token"

  version_aliases = {
    # "current" = "1" # secret version 1 created manually
  }

  replication {
    auto {}
  }

  rotation {
    next_rotation_time = "2024-05-20T21:48:07Z"
    rotation_period    = "43200s" # 30d
  }

  topics {
    name = google_pubsub_topic.instagram_secret_rotator.name
  }
}

resource "google_service_account" "instagram_secret_rotator_service_account" {
  account_id   = "instagram-secret-rotator"
  display_name = "Instagram Secret Rotator Service Account"
}

resource "google_project_iam_member" "instagram_secret_rotator_service_account" {
  project = data.google_client_config.current.project
  role    = "roles/viewer"
  member  = "serviceAccount:${google_service_account.instagram_secret_rotator_service_account.email}"
}

resource "google_pubsub_topic" "instagram_secret_rotator" {
  name                       = "instagram-secret-rotator"
  message_retention_duration = "3600s"
}

resource "google_pubsub_topic_iam_member" "instagram_secret_rotator_service_account_topic_publisher" {
  project = google_pubsub_topic.instagram_secret_rotator.project
  topic   = google_pubsub_topic.instagram_secret_rotator.name
  role    = "roles/pubsub.publisher"
  member  = "serviceAccount:${google_service_account.instagram_secret_rotator_service_account.email}"
}

resource "google_pubsub_topic_iam_member" "instagram_secret_rotator_service_account_topic_subscriber" {
  project = google_pubsub_topic.instagram_secret_rotator.project
  topic   = google_pubsub_topic.instagram_secret_rotator.name
  role    = "roles/pubsub.subscriber"
  member  = "serviceAccount:${google_service_account.instagram_secret_rotator_service_account.email}"
}

resource "google_pubsub_topic_iam_member" "secret_manager_topic" {
  project = google_pubsub_topic.instagram_secret_rotator.project
  topic   = google_pubsub_topic.instagram_secret_rotator.name
  role    = "roles/pubsub.publisher"
  member  = "serviceAccount:service-${data.google_project.project.number}@gcp-sa-secretmanager.iam.gserviceaccount.com"
}
