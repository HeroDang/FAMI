const express = require("express");
const router = express.Router();

const AccountController = require("../app/controllers/AccountController");

router.get("/getlist", AccountController.getList);


module.exports = router;
