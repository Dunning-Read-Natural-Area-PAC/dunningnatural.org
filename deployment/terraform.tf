terraform {
  required_providers {
    cloudflare = {
      source  = "cloudflare/cloudflare"
      version = "4.32.0"
    }
    google = {
      source  = "hashicorp/google"
      version = "5.26.0"
    }
  }

  backend "gcs" {
    bucket = "dunningnatural-3e6e829d-bucket-tfstate"
    prefix = "terraform/state"
  }
}
