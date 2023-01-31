const Drug = require("../models/Drug");
const { multipleMongooseToObject } = require("../../utils/mongoose");
const Counter = require("../models/Counter");
class DrugController {
    // [GET] /home
    getList(req, res, next) {
        Drug.find({})
            .then((drugs) => {
                res.json(drugs);
            })
            .catch(next);
    }

    createDrug(req, res, next){

        const {

            drugname,
            unit,
            unitprice,
            quantity,
            amount,
            status,
            total,
        
        } = req.body;

        const Drug = new Drug({
            drugname:  drugname ,
            unit: unit,
            unitprice: unitprice,
            quantity: quantity,
            amount: amount,
            status: status,
            total: total,
        });
        drug
            .save()
            .then(() => {res.status(201).json(drug)})
            .catch(next);
    }

    updateDrug(req, res, next){
        const {
            drugname,
            unit,
            unitprice,
            quantity,
            amount,
            status,
            total,
        } = req.body;
        const Drug = {
            drugname:  drugname ,
            unit: unit,
            unitprice: unitprice,
            quantity: quantity,
            amount: amount,
            status: status,
            total: total,
        };
        Drug.updateOne({_id: req.params.id},drug)
            .then(() => {res.status(201).json(drug)})
            .catch(next);
    }
    deleteDrug(req, res, next){
        Drug.delete({_id: req.params.id})
            .then(() => {res.status(201).json({message:"DELETE"})})
            .catch(next);
    }

    deleteSelectedDrug(req, res, next) {
        Drug.delete({ _id: { $in: req.body } })
            .then(() => res.status(201).json({ message: "DELETED" }))
            .catch(next);
    }

    counterDrug(req,res,next){
        Counter.findOne({ id: "drugID" })
        .then((data) => res.json(data))
        .catch(next);
    }
}
module.exports = new DrugController();
