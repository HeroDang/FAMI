const personRoute = require("./person");
const siteController = require("./site");
const meformRoute = require("./meform");
const accountRoute = require("./account");
const patientRoute = require("./patient");

function route(app) {
    app.use("/persons", personRoute);
    app.use("/meform", meformRoute);
    app.use("/accounts", accountRoute);
    app.use("/patient", patientRoute);
    app.use("/", siteController);
}

module.exports = route;
