const express = require("express");
const next = require("next");
const routes = require("./routes");
const path = require("path");
const publicPath = path.join(__dirname, "public");
// Setting the next app to work with express


console.log(process.env.NODE_ENV === 'production');
console.log(process.env.NODE_ENV);
const nextApp = next({ dev: process.env.NODE_ENV !== 'production' });
const handler = routes.getRequestHandler(nextApp);

// Creating an Express app
const app = express();
nextApp.prepare().then(() => {
    app.use(express.static(publicPath));
    app.use(handler).listen(3000);
})