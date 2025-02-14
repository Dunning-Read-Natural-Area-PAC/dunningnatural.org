resource "cloudflare_account" "dunningnatural" {
  settings = {
    enforce_twofactor = true
  }
  name = "DRNA PAC"
  type = "standard"
}

# resource "cloudflare_pages_project" "dunningnatural-pages" {
#   account_id        = cloudflare_account.dunningnatural.id
#   name              = "dunningnatural-pages"
#   production_branch = "main"

#   build_config = {
#     destination_dir = "public"
#   }

#   deployment_configs = {
#     preview = {
#       compatibility_date = "2024-08-06"
#       kv_namespaces = {
#         DRNA_IG_Feed = {
#           namespace_id = "f4ef506c13b6448daccedb5b62eb8996"
#         }
#       }
#     }
#     production = {
#       compatibility_date = "2024-08-06"
#       kv_namespaces = {
#         DRNA_IG_Feed = {
#           namespace_id = "f4ef506c13b6448daccedb5b62eb8996"
#         }
#       }
#     }
#   }
# }

resource "cloudflare_zone" "dunningnatural_zone" {
  account = {
    id = cloudflare_account.dunningnatural.id
  }
  type = "full"
  name = "dunningnatural.org"
}

resource "cloudflare_dns_record" "dunningnatural__dmarc" {
  name    = "_dmarc"
  proxied = false
  ttl     = 1
  type    = "TXT"
  content = "\"v=DMARC1; p=none;\""
  zone_id = cloudflare_zone.dunningnatural_zone.id
}

resource "cloudflare_dns_record" "dunningnatural_TXT" {
  name    = "dunningnatural.org"
  proxied = false
  ttl     = 1
  type    = "TXT"
  content = "\"v=spf1 -all\""
  zone_id = cloudflare_zone.dunningnatural_zone.id
}

resource "cloudflare_page_rule" "cache_ig" {
  priority = 1
  status   = "active"
  target   = "*dunningnatural.org/recent-instagram-posts"
  zone_id  = "b0e21706ef78bc21c2342e2a1be6cc22"
  actions = {
    cache_level            = "cache_everything"
    explicit_cache_control = "on"
  }
}

resource "cloudflare_workers_kv_namespace" "drna_ig_feed" {
  account_id = cloudflare_account.dunningnatural.id
  title      = "DRNA IG Feed"
}