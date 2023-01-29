const Account = require("../models/Account");
const { multipleMongooseToObject } = require("../../utils/mongoose");

class AccountController {
    // [GET] /home
    getList(req, res, next) {
        Account.find({})
            .then((accounts) => {
                res.json(accounts);
            })
            .catch(next);
    }
    // index(req, res, next) {
    //     Person.find({})
    //         .then((persons) =>
    //             res.render('home', {
    //                 persons: multipleMongooseToObject(persons),
    //             }),
    //         )
    //         .catch(next);
    // }
    // // [GET] /api/home
    // apiIndex(req, res, next) {
    //     Person.find({})
    //         .then((persons) => res.json(persons))
    //         .catch(next);
    // }
    // // [GET] /search
    // search(req, res) {
    //     res.render('search');
    // }
}

module.exports = new AccountController();
