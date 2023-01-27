const personRoute = require("./person");
const siteController = require("./site");
const meformRoute = require("./meform");

function route(app) {
    app.use("/persons", personRoute);
    app.use("/meform", meformRoute);
    app.use("/", siteController);
}

module.exports = route;
