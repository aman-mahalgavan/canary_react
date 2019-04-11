const routes = require("next-routes");


module.exports = routes()
    .add("/login", "auth/signin")
    .add("/register", "auth/signup")
    .add("/auth/confirmation/:token", "auth/confirmation")
    .add("/campaign", 'campaign')
    .add("/campaign/create", "campaign/create")
    .add("/campaign/:address", "campaign/show")
    .add("/dashboard", 'dashboard/index')
    .add("/dashboard/create", "dashboard/createProfile")
    .add("/explore", "explore")

    ;