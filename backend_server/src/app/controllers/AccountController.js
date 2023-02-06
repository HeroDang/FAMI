const Account = require("../models/Account");
const { multipleMongooseToObject } = require("../../utils/mongoose");
const Counter = require("../models/Counter");
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

         username ,
         password,
         fullname,
         job,
        
        } = req.body;

        const account = new Account({
        username: username,
        password: password,
        fullname: fullname,
        job: job,
        });
        account
            .save()
            .then(() => {res.status(201).json(account)})
            .catch(next);
    }

    updateAccount(req, res, next){
        const {
         username ,
         password,
         fullname,
         job,
        } = req.body;
        const account = {
        username: username,
        password: password,
        fullname: fullname,
        job: job,
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

    deleteSelectedAccount(req, res, next) {
        Account.delete({ _id: { $in: req.body } })
            .then(() => res.status(201).json({ message: "DELETED" }))
            .catch(next);
    }

    counterAccount(req,res,next){
        Counter.findOne({ id: "ID" })
        .then((data) => res.json(data))
        .catch(next);
    }

    //[POST] /accounts/login
    login(req, res, next){
        let {username, password} = req.body;

        Account.findOne({username, password})
            .then((account) => {
                let {password, ...newAccount} = account;
                res.send({
                    token: 'test',  
                    account: newAccount,
                });
            })
            .catch(() => {res.send({error: "ERROR"})})
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
