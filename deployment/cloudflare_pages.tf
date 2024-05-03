
resource "cloudflare_pages_project" "dunningnatural" {
  account_id        = cloudflare_account.dunningnatural.id
  name              = "dunningnatural"
  production_branch = "main"
  build_config {
    build_caching   = false
    build_command   = "npm run build"
    destination_dir = "public"
  }
  deployment_configs {
    preview {
      always_use_latest_compatibility_date = false
      compatibility_date                   = "2024-04-23"
      fail_open                            = true
      usage_model                          = "standard"
    }
    production {
      always_use_latest_compatibility_date = false
      compatibility_date                   = "2024-04-23"
      fail_open                            = true
      usage_model                          = "standard"
    }
  }
  source {
    type = "github"
    config {
      deployments_enabled           = true
      owner                         = "mdjnewman"
      pr_comments_enabled           = true
      preview_branch_includes       = ["*"]
      preview_deployment_setting    = "all"
      production_branch             = "main"
      production_deployment_enabled = false
      repo_name                     = "dunningnatural.org"
    }
  }
}


resource "cloudflare_pages_project" "dunningnatural-pages" {
  account_id        = cloudflare_account.dunningnatural.id
  name              = "dunningnatural-pages"
  production_branch = "main"
}
