const express = require("express");
const router = express.Router();

const ultrasoundResultController = require("../app/controllers/UltrasoundResultController");

router.get("/create", ultrasoundResultController.createUltrasoundResult);
router.get("/getUltrasoundResult/:specFormId", ultrasoundResultController.getUltrasoundResult);
router.put("/update/:id", ultrasoundResultController.updateUltrasoundResult);

module.exports = router;
