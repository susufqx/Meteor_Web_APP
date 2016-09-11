AccountsTemplates.configureRoute("signIn", {
  layoutType:     "blaze",       // Always blaze
  name:           "Login",       // Name of the route
  path:           "/login",      // URL of the route
  layoutTemplate: "userAccount", // base template

  template:       "atForm",      // "main" template
  contentRegion:  "main",        // main block's arg
});

AccountsTemplates.configureRoute("signUp", {
  layoutType:     "blaze",       // Always blaze
  name:           "Register",    // Name of the route
  path:           "/register",   // URL of the route
  layoutTemplate: "userAccount", // base template

  template:       "atForm",      // "main" template
  contentRegion:  "main",        // main block's arg
});
