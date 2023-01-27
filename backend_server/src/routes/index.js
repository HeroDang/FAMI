const personRoute = require("./person");
const siteController = require("./site");

function route(app) {
    app.use("/persons", personRoute);
    app.use("/", siteController);
}

module.exports = route;
