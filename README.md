# Static site generator for dunningnatural.org

Running locally:

```sh
npm start
```

"Production" build in `/public`:

```sh
npm install
```

Infrastructure:

Get CloudFlare API key from GCP:

```sh
cd deployment/
export CLOUDFLARE_API_TOKEN=$(gcloud --project=dunningnatural-3e6e829d secrets versions access current --secret=cloudflare_api_token)
terraform plan
```
