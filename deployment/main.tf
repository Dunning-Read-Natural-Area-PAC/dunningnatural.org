resource "cloudflare_account" "dunningnatural" {
  enforce_twofactor = true
  name              = "DRNA PAC"
  type              = "standard"
}
