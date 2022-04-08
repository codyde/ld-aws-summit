terraform {
  required_providers {
    launchdarkly = {
      source  = "launchdarkly/launchdarkly"
      version = "~> 2.0"
    }
  }
}

variable "LAUNCHDARKLY_ACCESS_TOKEN" {
  type = string
}

provider "launchdarkly" {
  access_token = var.LAUNCHDARKLY_ACCESS_TOKEN
}

resource "launchdarkly_project" "terraform" {
  key  = "ld-demo"
  name = "ld-demo"

  tags = [
    "terraform",
  ]

  environments {
        key   = "dev"
        name  = "Development"
        color = "7B42BC"
        tags  = ["terraform"]
  }
}

resource "launchdarkly_feature_flag" "reduceimage" {
  project_key = launchdarkly_project.terraform.key
  key         = "reduceimage"
  name        = "reduceimage"
  description = "This flag changes the size of the image on our page"

  variation_type = "boolean"
  variations {
    value       = "true"
    name        = "Small"
    description = "Reduce the size of the image"
  }
  variations {
    value       = "false"
    name        = "Normal"
    description = "Standard image size"
  }
  
  defaults {
    on_variation = 1
    off_variation = 0
  }

  tags = [
    "terraform"
  ]
}

resource "launchdarkly_feature_flag" "userLogin" {
  project_key = launchdarkly_project.terraform.key
  key         = "userLogin"
  name        = "userLogin"
  description = "This flag presents the userLogin input box"

  variation_type = "boolean"
  variations {
    value       = "true"
    name        = "Enabled"
    description = "Display the user login box"
  }
  variations {
    value       = "false"
    name        = "Disabled"
    description = "No user login box"
  }
  
  defaults {
    on_variation = 1
    off_variation = 0
  }

  tags = [
    "terraform",   
  ]
}

resource "launchdarkly_feature_flag" "brandImage" {
  project_key = launchdarkly_project.terraform.key
  key         = "brandImage"
  name        = "brandImage"
  description = "This controls the brand image thats deployed"

  variation_type = "boolean"
  variations {
    value       = "true"
    name        = "New Logo"
    description = "Present the new brand logo"
  }
  variations {
    value       = "false"
    name        = "Rocket Logo"
    description = "Present the previous logo"
  }
  
  defaults {
    on_variation = 1
    off_variation = 0
  }

  tags = [
    "terraform",   
  ]
}

resource "launchdarkly_feature_flag" "cards" {
  project_key = launchdarkly_project.terraform.key
  key         = "cards"
  name        = "cards"
  description = "Show the value proposition cards"

  variation_type = "boolean"
  variations {
    value       = "true"
    name        = "Cards Enabled"
    description = "Display the cards"
  }
  variations {
    value       = "false"
    name        = "Cards Hidden"
    description = "Hide the cards"
  }
  
  defaults {
    on_variation = 1
    off_variation = 0
  }

  tags = [
    "terraform",   
  ]
}

resource "launchdarkly_feature_flag" "userbuttons" {
  project_key = launchdarkly_project.terraform.key
  key         = "userbuttons"
  name        = "userbuttons"
  description = "Show the Get User and Clear Login buttons"

  variation_type = "boolean"
  variations {
    value       = "true"
    name        = "Buttons enabled"
    description = "Display the buttons"
  }
  variations {
    value       = "false"
    name        = "Butons hidden"
    description = "Hide the buttons"
  }
  
  defaults {
    on_variation = 1
    off_variation = 0
  }

  tags = [
    "terraform",   
  ]
}

resource "launchdarkly_feature_flag" "intro" {
  project_key = launchdarkly_project.terraform.key
  key         = "intro"
  name        = "intro"
  description = "Dramatic intro text"

  variation_type = "boolean"
  variations {
    value       = "true"
    name        = "Show the drama"
    description = "Display the intro text"
  }
  variations {
    value       = "false"
    name        = "Normal"
    description = "Show normal text"
  }
  
  defaults {
    on_variation = 1
    off_variation = 0
  }

  tags = [
    "terraform",   
  ]
}