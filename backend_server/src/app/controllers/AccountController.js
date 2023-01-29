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

    createAccount(req, res, next){

        const {
         ID,
         username ,
         password,
         fullname,
         
        } = req.body;

        const account = new Account({
        ID: ID,
        username: username,
        password: password,
        fullname: fullname,
        job: "Manager"
        });
        account
            .save()
            .then(() => {res.status(201).json(account)})
            .catch(next);
    }

    updateAccount(req, res, next){

        const {
         ID,
         username ,
         password,
         fullname,
         
        } = req.body;

        const account = {
        ID: parseInt(ID), 
        username: username,
        password: password,
        fullname: fullname,
        job: "Manager"
        };
        Account.updateOne({_id: req.params.id},account)
            .then(() => {res.status(201).json(account)})
            .catch(next);
    }
    deleteAccount(req, res, next){
        Account.delete({_id: req.params.id})
            .then(() => {res.status(201).json({message:"DELETE"})})
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
