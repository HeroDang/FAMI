const Person = require("../models/Person");

module.exports = function DeletePersonMiddleware(req, res, next) {
    const { ID } = req.body;

    Person.delete({ accountId: ID })
        .then(() => {
            next();
        })
        .catch(next);
};
