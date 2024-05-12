# How the Instagram feed works

Unfortunately, the simplest way to get a feed of Instagram posts is to use the [Instagram Basic Display API](https://developers.facebook.com/docs/instagram-basic-display-api), which requires a backend in order to handle and renew tokens.

This is a bit of a pain for a static site. If you do a quick search online you'll find many people with the same issue.

This site uses:

- A Facebook application registered by @mdjnewman, named "DRNA Website Feed". The DRNA IG account is added as a test user.
- There's no actual application, so the "User Token Generator" was used to create a token for the DRNA IG account.
- This token was stored in Google Cloud Secrets Manager (see `google_secret_manager_secret.drna_instagram_long_lived_token`), and Secrets Manager was set up to rotate/refresh the token every 30 days.
- When a new secret version is created, the CloudFlare API is called and the environment variable there is updated
- `functions/recent-instagram-posts.js` is then run as a CloudFlare Pages Function, which exposes JSON for recent posts at https://dunningnatural.org/recent-instagram-posts

The infrastructure related to this is at `deployment/instagram_secret.tf`. The Google Cloud Function which refreshes the token and stores the new value in CloudFlare is at `drna_instagram_feed/token_refresh`.
