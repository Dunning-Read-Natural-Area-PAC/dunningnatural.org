terraform {
  required_providers {
    cloudflare = {
      source  = "cloudflare/cloudflare"
      version = "4.49.1"
    }
    google = {
      source  = "hashicorp/google"
      version = "6.10.0"
    }
  }

  backend "gcs" {
    bucket = "dunningnatural-3e6e829d-bucket-tfstate"
    prefix = "terraform/state"
  }
}
