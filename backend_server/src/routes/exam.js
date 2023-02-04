const express = require("express");
const router = express.Router();

const examController = require("../app/controllers/ExamController");

router.get("/create", examController.createRoom);
router.get("/getExam/:specFormId", examController.getExam);

module.exports = router;
