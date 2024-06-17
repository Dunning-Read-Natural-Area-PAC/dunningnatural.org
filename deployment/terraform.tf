terraform {
  required_providers {
    cloudflare = {
      source  = "cloudflare/cloudflare"
      version = "4.33.0"
    }
    google = {
      source  = "hashicorp/google"
      version = "5.33.0"
    }
  }

  backend "gcs" {
    bucket = "dunningnatural-3e6e829d-bucket-tfstate"
    prefix = "terraform/state"
  }
}
