const routes = require("next-routes");


module.exports = routes()
    .add("/login", "signIn")
    .add("/campaign", 'campaign')
    .add("/dashboard", 'dashboard');