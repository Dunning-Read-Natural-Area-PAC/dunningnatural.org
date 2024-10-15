resource "cloudflare_account" "dunningnatural" {
  enforce_twofactor = true
  name              = "DRNA PAC"
  type              = "standard"
}

resource "cloudflare_pages_project" "dunningnatural-pages" {
  account_id        = cloudflare_account.dunningnatural.id
  name              = "dunningnatural-pages"
  production_branch = "main"
  build_config {
    build_caching   = false
    destination_dir = "public"
  }
}

resource "cloudflare_zone" "dunningnatural_zone" {
  account_id = cloudflare_account.dunningnatural.id
  jump_start = null
  paused     = false
  plan       = "free"
  type       = "full"
  zone       = "dunningnatural.org"
}

resource "cloudflare_record" "dunningnatural__dmarc" {
  name    = "_dmarc"
  proxied = false
  ttl     = 1
  type    = "TXT"
  content = "v=DMARC1; p=none;"
  zone_id = cloudflare_zone.dunningnatural_zone.id
}

resource "cloudflare_record" "dunningnatural_TXT" {
  name    = "dunningnatural.org"
  proxied = false
  ttl     = 1
  type    = "TXT"
  content = "v=spf1 -all"
  zone_id = cloudflare_zone.dunningnatural_zone.id
}

resource "cloudflare_page_rule" "cache_ig" {
  priority = 1
  status   = "active"
  target   = "*dunningnatural.org/recent-instagram-posts"
  zone_id  = "b0e21706ef78bc21c2342e2a1be6cc22"
  actions {
    cache_level                 = "cache_everything"
    explicit_cache_control      = "on"
  }
}
