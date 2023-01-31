const SpecForm = require('../models/SpecForm');
const MEForm = require('../models/MEForm');
const Patient = require('../models/Patient');
const Person = require('../models/Person');
const { multipleMongooseToObject, mongooseToObject } = require('../../utils/mongoose');

class SpecFormController {

    //[GET] /specform/create
    createSpecForm(req,res,next){
        const specForm = new SpecForm({
            formId: 3,
            roomId: 2,
            personId: 4,
            patientId: 3,
            request: "request",
            overResult: "",
        });
        specForm
            .save()
            .then((data) => {
                res.status(201).json(data);
            })
            .catch(next);
    }

    //[GET] specform/getlist
    getList(req, res, next) {
        let mEFormQuery = MEForm.find({});
        let patientQuery = Patient.find({});
        let personQuery = Person.find({});
        let specFormQuery = SpecForm.find({});

        Promise.all([mEFormQuery, patientQuery, personQuery, specFormQuery])
            .then(([mEForms, patients, persons, specForms]) => {
                let data = specForms.map((specForm) => {
                    let newSpecForm = mongooseToObject(specForm);

                    mEForms.forEach((mEForm) => {
                        if(mEForm.formId === newSpecForm.formId) {
                            let {date, numOrder, reason} = mEForm;

                            newSpecForm = {
                                ...newSpecForm,
                                date : new Date(date),
                                numOrder,
                                reason,
                            }
                        }
                    })

                    patients.forEach((patient) => {
                        if (patient.patientId == newSpecForm.patientId) {

                            let {_id,name,address,phone,career,age} = patient;

                            newSpecForm = {
                                ...newSpecForm,
                                patientName: patient.name,
                                patientPhone: patient.phone,
                                _patient: {_id,name,address,phone,career,age},
                            };
                        }
                    });

                    persons.forEach((person) => {
                        if (person.job == "Specialist doctor" && person.personId == newSpecForm.personId) {
                            let {_id , personId ,name} = person;

                            newSpecForm = {
                                ...newSpecForm,
                                _person: {_id,personId, name},
                            };
                        }
                    });
                    console.log(typeof newSpecForm.date);
                    return newSpecForm;
                });
                res.json(data);
            })
            .catch(next);
    }

    //[POST] specform/create
    createFrom(req, res, next) {
        const { formId, roomId, request, overResult,numOrder, personId, patientId, reason,_patient, date} = req.body;
        const {address, career, age, phone, name} = _patient

        const specForn = new SpecForm({
            formId: formId,
            roomId: roomId,
            personId: personId,
            patientId: patientId,
            request: request,
            overResult: overResult,
        });

        const patient = new Patient({
            id: 1,
            address: address,
            career: career,
            age: age,
            phone: phone,
            name: name,
        })
        
        Promise.all([specForn.save(), patient.save()])
            .then(([newSpecForn, newPatient]) => {
                res.status(201).json([newSpecForn, newPatient]);
            })
            .catch(next);
    }

    //[PUT] specform/update/:id
    updateFrom(req, res, next) {
        const { formId, roomId, request, overResult,numOrder, personId, patientId, reason,_patient, date} = req.body;

        const specForm = {
            formId: parseInt(formId),
            roomId: parseInt(roomId),
            personId: parseInt(personId),
            patientId: parseInt(patientId),
            request,
            overResult,
        };

        const patient = {
            address: _patient.address,
            age: _patient.age,
            career: _patient.career,
            name: _patient.name,
            phone: _patient.phone,
        }

        const mEForm = {
            numOrder,
            date: new Date(date),
            reason,
        }

        

        Promise.all([MEForm.updateOne({ formId: formId}, mEForm), Patient.updateOne({_id : _patient._id},patient)], SpecForm.updateOne({ _id: req.params.id }, specForm))
            .then(([meformResult, patientResult, specFormResult]) => {
                res.status(201).json([meformResult, patientResult, specFormResult]);
            })
            .catch(next);
    }

    
    //[DELETE] specform/delete/:id
    deleteForm(req, res, next) {
        SpecForm.delete({ _id: req.params.id })
            .then(() => res.status(201).json({ message: "DELETED" }))
            .catch(next);
    }

    //[POST] specform/delete/selected
    deleteSelectedForm(req, res, next) {
        SpecForm.delete({ _id: { $in: req.body } })
            .then(() => res.status(201).json({ message: "DELETED" }))
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

module.exports = new SpecFormController();
