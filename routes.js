const routes = require("next-routes");


module.exports = routes()
    .add("/login", "auth/signin")
    .add("/register", "auth/signup")
    .add("/auth/confirmation/:token", "auth/confirmation")
    .add("/campaign", 'campaign')
    .add("/campaign/create", "campaign/create")
    .add("/campaign/:address", "campaign/show")
    .add("/campaign/:address/faqs", "campaign/faq")
    .add("/campaign/:address/updates", "campaign/update")
    .add("/campaign/:address/comments", "campaign/comment")
    .add("/dashboard", 'dashboard/index')
    .add("/dashboard/create", "dashboard/createProfile")
    .add("/dashboard/campaigns", "dashboard/contributions")
    .add("/dashboard/:address/requests", "dashboard/requests/index")
    .add("/dashboard/:address/requests/create", "dashboard/requests/createRequest")
    .add("/explore", "explore")

    ;