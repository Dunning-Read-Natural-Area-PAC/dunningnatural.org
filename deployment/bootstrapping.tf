resource "google_storage_bucket" "tfstate" {
  name          = "${data.google_client_config.current.project}-bucket-tfstate"
  force_destroy = false
  location      = data.google_client_config.current.region
  storage_class = "STANDARD"
  versioning {
    enabled = true
  }
}

resource "google_secret_manager_secret" "cloudflare_api_token" {
  secret_id = "cloudflare_api_token"

  version_aliases = {
    "current" = "1"
  }

  replication {
    auto {}
  }
}
