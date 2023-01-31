const DrugBook = require("../models/DrugBook");
const { multipleMongooseToObject } = require("../../utils/mongoose");
const Counter = require("../models/Counter");
class BillController {
    // [GET] /home
    getList(req, res, next) {
        Bill.find({})
            .then((bills) => {
                res.json(bills);
            })
            .catch(next);
    }

    createDrugBook(req, res, next){

        const {

            drugname,
            unit,
            unitprice,
            quantity,
            amount,
            status,
            total,
        
        } = req.body;

        const DrugBook = new Bill({
            drugname:  drugname ,
            unit: unit,
            unitprice: unitprice,
            quantity: quantity,
            amount: amount,
            status: status,
            total: total,
        });
        bill
            .save()
            .then(() => {res.status(201).json(bill)})
            .catch(next);
    }

    updateDrugBook(req, res, next){
        const {
            drugname,
            unit,
            unitprice,
            quantity,
            amount,
            status,
            total,
        } = req.body;
        const DrugBook = {
            drugname:  drugname ,
            unit: unit,
            unitprice: unitprice,
            quantity: quantity,
            amount: amount,
            status: status,
            total: total,
        };
        DrugBook.updateOne({_id: req.params.id},bill)
            .then(() => {res.status(201).json(bill)})
            .catch(next);
    }
    deleteDrugBook(req, res, next){
        DrugBook.delete({_id: req.params.id})
            .then(() => {res.status(201).json({message:"DELETE"})})
            .catch(next);
    }

    deleteSelectedDrugBook(req, res, next) {
        DrugBook.delete({ _id: { $in: req.body } })
            .then(() => res.status(201).json({ message: "DELETED" }))
            .catch(next);
    }

    counterDrugBook(req,res,next){
        Counter.findOne({ id: "billID" })
        .then((data) => res.json(data))
        .catch(next);
    }
}
module.exports = new DrugBookController();
