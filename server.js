const express = require("express");
const next = require("next");
const routes = require("./routes");

// Setting the next app to work with express
const nextApp = next({ dev: process.env.NODE_ENV !== 'production' });
const handler = routes.getRequestHandler(nextApp);

// Creating an Express app
const app = express();
nextApp.prepare().then(() => {
    app.use(handler).listen(3000);
})