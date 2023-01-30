const MEForm = require("../models/MEForm");
const Patient = require("../models/Patient");
const Person = require("../models/Person");
const Counter = require("../models/Counter");
const {
    multipleMongooseToObject,
    mongooseToObject,
} = require("../../utils/mongoose");

class MEFormController {
    //[GET] meform/getlist
    getList(req, res, next) {
        let mEFormQuery = MEForm.find({});
        let patientQuery = Patient.find({});
        let personQuery = Person.find({});

        Promise.all([mEFormQuery, patientQuery, personQuery])
            .then(([mEForms, patients, persons]) => {
                let data = mEForms.map((mEForm) => {
                    let newMEForm = mongooseToObject(mEForm);
                    patients.forEach((patient) => {
                        if (patient.id == newMEForm.patientId) {

                            let {_id, id,name,address,phone,career,age} = patient;

                            newMEForm = {
                                ...newMEForm,
                                patientName: patient.name,
                                patientPhone: patient.phone,
                                date: new Date(newMEForm.date),
                                _patient: {_id, id,name,address,phone,career,age},
                            };
                        }
                    });

                    persons.forEach((person) => {
                        if (person.job == "Specialist doctor" && person.id == newMEForm.personId) {
                            let {_id , name} = person;

                            newMEForm = {
                                ...newMEForm,
                                _person: {_id, name},
                            };
                        }
                    });
                    console.log(typeof newMEForm.date);
                    return newMEForm;
                });
                res.json(data);
            })
            .catch(next);
    }

    //[POST] meform/create
    createFrom(req, res, next) {
        const { formId, numOrder, personId, patientId, reason } = req.body;

        const mEform = new MEForm({
            numOrder: numOrder,
            personId: personId,
            patientId: patientId,
            date: Date.now(),
            reason: reason,
            roomIds: [1, 2],
        });
        mEform
            .save()
            .then(() => {
                res.status(201).json(mEform);
            })
            .catch(next);
    }

    //[PUT] meform/update/:id
    updateFrom(req, res, next) {
        const { formId, numOrder, personId, patientId, reason } = req.body;

        const mEform = {
            numOrder: parseInt(numOrder),
            personId: parseInt(personId),
            patientId: parseInt(patientId),
            date: Date.now(),
            reason: reason,
            roomIds: [1, 2],
        };

        MEForm.updateOne({ _id: req.params.id }, mEform)
            .then(() => {
                console.log(mEform, req.params.id);
                res.status(201).json(mEform);
            })
            .catch(next);
    }

    //[GET] meform/api/:formId
    apiShow(req, res, next) {
        MEForm.findOne({ formId: req.params.formId })
            .then((person) => {
                res.json(person);
            })
            .catch(next);
    }

    //[DELETE] meform/delete/:id
    deleteForm(req, res, next) {
        MEForm.delete({ _id: req.params.id })
            .then(() => res.status(201).json({ message: "DELETED" }))
            .catch(next);
    }

    //[POST] meform/delete/selected
    deleteSelectedForm(req, res, next) {
        MEForm.delete({ _id: { $in: req.body } })
            .then(() => res.status(201).json({ message: "DELETED" }))
            .catch(next);
    }

    //[GET] meform/counter/form
    counterForm(req,res,next){
        Counter.findOne({ id: "formId" })
            .then((data) => res.json(data))
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
