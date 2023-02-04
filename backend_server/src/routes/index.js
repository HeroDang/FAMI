const personRoute = require("./person");
const siteController = require("./site");
const meformRoute = require("./meform");
const accountRoute = require("./account");
const patientRoute = require("./patient");
const roomRoute = require("./room");
const billRoute = require("./bill");
const drugRoute = require("./drug");
const specForm = require("./specform");
const examRoute = require('./exam');

function route(app) {
    app.use("/exam", examRoute);
    app.use("/specform",specForm);
    app.use("/persons", personRoute);
    app.use("/meform", meformRoute);
    app.use("/accounts", accountRoute);
    app.use("/patient", patientRoute);
    app.use("/room", roomRoute);
    app.use("/bills", billRoute);
    app.use("/drugs", drugRoute);
    app.use("/", siteController);
}

module.exports = route;
