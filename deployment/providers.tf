
terraform {
  required_providers {
    cloudflare = {
      source  = "cloudflare/cloudflare"
      version = "4.30.0"
    }
    google = {
      source  = "hashicorp/google"
      version = "5.26.0"
    }
  }
}

provider "cloudflare" {
}

provider "google" {
  project = "dunningnatural-3e6e829d"
  region  = "us-central1"
}

data "google_client_config" "current" {
}