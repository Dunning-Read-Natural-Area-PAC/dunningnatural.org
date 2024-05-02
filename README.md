# Static site generator for dunningnatural.org

## Additional documentation

- [Why a static site?](./docs/Why%20a%20static%20site.md)

## Local development

### Prerequisites

Install the tools listed in `./tool-versions`. If you're using `asdf`, run `asdf install` in this directory.

The below assume you're using a Unix shell. If you're using Windows, consider using [WSL](https://learn.microsoft.com/en-us/windows/wsl/).

### Running website for development

```sh
npm start
```

### Full build

To generate a "production" build in `./public/`:

```sh
npm run build
```

### Deploying/updating infrastructure

This requires that you've been added to the GCP project `dunningnatural-3e6e829d`.

```sh
cd deployment/

gcloud auth --project=dunningnatural-3e6e829d application-default login
terraform init

export CLOUDFLARE_API_TOKEN=$(gcloud --project=dunningnatural-3e6e829d secrets versions access current --secret=cloudflare_api_token)
terraform plan
```
