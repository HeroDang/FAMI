const MEForm = require("../models/MEForm");
const {
    multipleMongooseToObject,
    mongooseToObject,
} = require("../../utils/mongoose");

class MEFormController {
    //[GET] meform/getlist
    getList(req, res, next) {
        MEForm.find({})
            .then((mEForms) => {
                res.json(mEForms);
            })
            .catch(next);
    }

    // // [GET] /home
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

module.exports = new MEFormController();
