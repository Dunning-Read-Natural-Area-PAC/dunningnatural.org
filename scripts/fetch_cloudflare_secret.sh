#!/usr/bin/env bash

set -o pipefail
set -o errexit
set -o nounset
set -o noglob

CLOUDFLARE_API_TOKEN=$(gcloud \
    --project=dunningnatural-3e6e829d \
    secrets versions access current \
    --secret=cloudflare_api_token)

CLOUDFLARE_API_TOKEN=foo

echo $CLOUDFLARE_API_TOKEN
