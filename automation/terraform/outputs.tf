output "static_web_app_url" {
  description = "Public URL of the Static Web App"
  value       = "https://${azurerm_static_web_app.mathplay.default_host_name}"
}

output "static_web_app_api_key" {
  description = "Deployment API key (add as GitHub secret AZURE_STATIC_WEB_APPS_API_TOKEN)"
  value       = azurerm_static_web_app.mathplay.api_key
  sensitive   = true
}
