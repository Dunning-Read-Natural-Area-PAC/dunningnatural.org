resource "cloudflare_zone" "dunningnatural_zone" {
  account_id = cloudflare_account.dunningnatural.id
  jump_start = null
  paused     = false
  plan       = "free"
  type       = "full"
  zone       = "dunningnatural.org"
}

resource "cloudflare_record" "dunningnatural__dmarc" {
  name            = "_dmarc"
  proxied         = false
  ttl             = 1
  type            = "TXT"
  value           = "v=DMARC1; p=none;"
  zone_id         = cloudflare_zone.dunningnatural_zone.id
}

resource "cloudflare_record" "dunningnatural_TXT" {
  name            = "dunningnatural.org"
  proxied         = false
  ttl             = 1
  type            = "TXT"
  value           = "v=spf1 -all"
  zone_id         = cloudflare_zone.dunningnatural_zone.id
}
