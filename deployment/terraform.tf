terraform {
  required_providers {
    cloudflare = {
      source  = "cloudflare/cloudflare"
      version = "~> 5"
    }
    google = {
      source  = "hashicorp/google"
      version = "~> 7"
    }
  }

  backend "gcs" {
    bucket = "dunningnatural-3e6e829d-bucket-tfstate"
    prefix = "terraform/state"
  }
}
