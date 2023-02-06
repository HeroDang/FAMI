const express = require("express");
const router = express.Router();

const prescriptionController = require("../app/controllers//PrescriptionController");

router.get("/create", prescriptionController.createPrescription);
// router.get("/getlist", roomController.getList);

module.exports = router;
