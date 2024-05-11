#!/usr/bin/env bash

set -o pipefail
set -o errexit
set -o nounset
set -o noglob

CLOUDFLARE_API_TOKEN=$(gcloud \
    --project=dunningnatural-3e6e829d \
    secrets versions access latest \
    --secret=cloudflare_api_token)

echo $CLOUDFLARE_API_TOKEN
