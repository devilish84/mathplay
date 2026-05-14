terraform {
  required_providers {
    azurerm = {
      source  = "hashicorp/azurerm"
      version = "~> 4.0"
    }
  }

  backend "azurerm" {
    resource_group_name  = "mathplay"
    storage_account_name = "mathplaytfstate"
    container_name       = "tfstate"
    key                  = "mathplay.tfstate"
  }
}

provider "azurerm" {
  features {}
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
