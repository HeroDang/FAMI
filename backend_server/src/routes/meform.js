const express = require("express");
const router = express.Router();

const mEFormController = require("../app/controllers/MEFormController");

router.get("/getlist", mEFormController.getList);

module.exports = router;
