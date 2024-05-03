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

resource "google_iam_workload_identity_pool" "github_actions" {
  workload_identity_pool_id = "github-actions"
}

resource "google_iam_workload_identity_pool_provider" "github_actions_provider" {
  workload_identity_pool_id          = google_iam_workload_identity_pool.github_actions.workload_identity_pool_id
  workload_identity_pool_provider_id = "github-actions-provider"

  attribute_mapping = {
    "google.subject"                = "assertion.sub"
    "attribute.actor"               = "assertion.actor"
    "attribute.repository_id"       = "assertion.repository_id"
    "attribute.repository_owner_id" = "assertion.repository_owner_id"
  }

  attribute_condition = "assertion.repository_owner_id == '834173' && assertion.repository_id == '788183416'"

  oidc {
    issuer_uri        = "https://token.actions.githubusercontent.com"
  }
}
