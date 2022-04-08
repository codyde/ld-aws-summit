resource "launchdarkly_feature_flag_environment" "brandOn" {
  flag_id           = launchdarkly_feature_flag.brandImage.id
  env_key           = "dev"
  on = true

//  rules {
//    clauses {
//      attribute = "company"
//      op        = "matches"
//      values    = ["LaunchDarkly"]
//      negate    = false
//    }
//  }
  fallthrough {
		variation = 0
	}
	off_variation = 1
}