const personRoute = require("./person");
const siteController = require("./site");
const meformRoute = require("./meform");
const accountRoute = require("./account");

function route(app) {
    app.use("/persons", personRoute);
    app.use("/meform", meformRoute);
    app.use("/accounts", accountRoute);
    app.use("/", siteController);
}

module.exports = route;
