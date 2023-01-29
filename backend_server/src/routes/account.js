const express = require("express");
const router = express.Router();

const AccountController = require("../app/controllers/AccountController");

router.get("/getlist", AccountController.getList);
router.post("/create",AccountController.createAccount);
router.put("/update/:id",AccountController.updateAccount);
router.delete("/delete/:id",AccountController.deleteAccount);


module.exports = router;
