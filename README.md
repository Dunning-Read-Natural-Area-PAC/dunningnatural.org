# Static site & supporting infrastructure for https://dunningnatural.org

## Additional documentation

- [Why a static site?](./docs/Why%20a%20static%20site.md)
- [Contributing](./CONTRIBUTING.md)
- [Deployment](./docs/Deployment.md)
- [How the Instagram feed works](./docs/Instagram.md)

## Local development

### Prerequisites

Install the tools listed in [`./.tool-versions`](./.tool-versions). If you're using `asdf`, run `asdf install` in this directory.

The below assume you're using a Unix shell. If you're using Windows, consider using [WSL](https://learn.microsoft.com/en-us/windows/wsl/).

### Running website for development

```sh
npm clean-install
npm start
```

If you need to test the Instagram feed, you'll need to populate the [dev variables file](./.dev.vars) with the token:

```sh
echo "INSTAGRAM_TOKEN = \"$(gcloud --project=dunningnatural-3e6e829d secrets versions access latest --secret=drna_instagram_long_lived_token)\"" > .dev.vars
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

export CLOUDFLARE_API_TOKEN=$(gcloud \
    --project=dunningnatural-3e6e829d \
    secrets versions access latest \
    --secret=cloudflare_api_token)

terraform plan
```
