terraform {
  required_providers {
    azurerm = {
      source  = "hashicorp/azurerm"
      version = "~> 4.0"
    }
  }
}

provider "azurerm" {
  features {}
  subscription_id = var.subscription_id
}

resource "azurerm_resource_group" "mathplay" {
  name     = "mathplay"
  location = var.location
}

resource "azurerm_static_web_app" "mathplay" {
  name                = "mathplay"
  resource_group_name = azurerm_resource_group.mathplay.name
  location            = azurerm_resource_group.mathplay.location
  sku_tier            = "Free"
  sku_size            = "Free"

  tags = {
    project = "mathplay"
  }
}

resource "azurerm_static_web_app_custom_domain" "mathplay" {
  static_web_app_id = azurerm_static_web_app.mathplay.id
  domain_name       = "mathplay.x84.fi"
  validation_type   = "dns-txt-token"
}
