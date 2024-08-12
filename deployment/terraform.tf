terraform {
  required_providers {
    cloudflare = {
      source  = "cloudflare/cloudflare"
      version = "4.39.0"
    }
    google = {
      source  = "hashicorp/google"
      version = "5.40.0 "
    }
  }

  backend "gcs" {
    bucket = "dunningnatural-3e6e829d-bucket-tfstate"
    prefix = "terraform/state"
  }
}
