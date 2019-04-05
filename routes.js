const routes = require("next-routes");


module.exports = routes()
    .add("/login", "signin")
    .add("/campaign", 'campaign')
    .add("/dashboard", 'dashboard');