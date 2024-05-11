data "google_client_config" "current" {
}

data "google_project" "project" {
}

resource "google_secret_manager_secret" "cloudflare_api_token" {
  secret_id = "cloudflare_api_token"

  replication {
    auto {}
  }
}

#
# GCP project setup
#

locals {
  services = toset([
    "cloudbuild.googleapis.com",
    "cloudfunctions.googleapis.com",
    "cloudresourcemanager.googleapis.com",
    "eventarc.googleapis.com",
    "iam.googleapis.com",
    "logging.googleapis.com",
    "pubsub.googleapis.com",
    "run.googleapis.com",
    "sts.googleapis.com",
  ])
}

resource "google_project_service" "service" {
  for_each = local.services
  project  = data.google_client_config.current.project
  service  = each.value
}

#
# State storage
#

resource "google_storage_bucket" "tfstate" {
  name                        = "${data.google_client_config.current.project}-bucket-tfstate"
  force_destroy               = false
  location                    = data.google_client_config.current.region
  uniform_bucket_level_access = true
  storage_class               = "STANDARD"
  versioning {
    enabled = true
  }
}

#
# IAM for GitHub Actions
#

resource "google_project_iam_custom_role" "infra_deployer_role" {
  role_id = "infraDeployer"
  title   = "Pipeline infra deployer role"
  permissions = [
    "storage.buckets.getIamPolicy",
    "storage.buckets.create",
    "storage.buckets.enableObjectRetention",
    "storage.buckets.setIamPolicy",
    "storage.buckets.update",
    "iam.serviceAccounts.create",
    "iam.serviceAccounts.setIamPolicy",
    "iam.serviceAccounts.update",
    "pubsub.topics.create",
    "pubsub.topics.attachSubscription",
    "pubsub.topics.getIamPolicy",
    "pubsub.topics.setIamPolicy",
    "pubsub.topics.update",
    "secretmanager.secrets.create",
    "secretmanager.secrets.update",
  ]
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

  # 834173 = https://github.com/mdjnewman
  # 169319860 = https://github.com/Dunning-Read-Natural-Area-PAC
  # 788183416 = https://github.com/mdjnewman/dunningnatural.org
  attribute_condition = "assertion.repository_owner_id == '169319860' && assertion.repository_id == '788183416'"

  oidc {
    issuer_uri = "https://token.actions.githubusercontent.com"
  }
}

resource "google_secret_manager_secret_iam_member" "member" {
  project   = google_secret_manager_secret.cloudflare_api_token.project
  secret_id = google_secret_manager_secret.cloudflare_api_token.secret_id
  role      = "roles/secretmanager.secretAccessor"
  member    = "principalSet://iam.googleapis.com/${google_iam_workload_identity_pool.github_actions.name}/*"
}

resource "google_storage_bucket_iam_member" "github_actions_bucket_access" {
  bucket = google_storage_bucket.tfstate.name
  role   = "roles/storage.objectAdmin"
  member = "principalSet://iam.googleapis.com/${google_iam_workload_identity_pool.github_actions.name}/*"
}

resource "google_project_iam_member" "github_actions_project" {
  project = data.google_client_config.current.project
  role    = "roles/viewer"
  member  = "principalSet://iam.googleapis.com/${google_iam_workload_identity_pool.github_actions.name}/*"
}

resource "google_project_iam_member" "github_actions_infra_deployer_role" {
  project = data.google_client_config.current.project
  role    = google_project_iam_custom_role.infra_deployer_role.name
  member  = "principalSet://iam.googleapis.com/${google_iam_workload_identity_pool.github_actions.name}/*"
}

resource "google_project_iam_member" "github_actions_cloudfunctions_admin" {
  project = data.google_client_config.current.project
  role    = "roles/cloudfunctions.admin"
  member  = "principalSet://iam.googleapis.com/${google_iam_workload_identity_pool.github_actions.name}/*"
}

resource "google_project_iam_member" "github_actions_iam" {
  project = data.google_client_config.current.project
  role    = "roles/resourcemanager.projectIamAdmin"
  member  = "principalSet://iam.googleapis.com/${google_iam_workload_identity_pool.github_actions.name}/*"

  condition {
    title      = ""
    expression = "api.getAttribute('iam.googleapis.com/modifiedGrantsByRole', []).hasOnly(['roles/pubsub.publisher', 'roles/pubsub.subscriber', 'roles/viewer'])"
  }
}
