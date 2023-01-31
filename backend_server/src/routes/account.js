const express = require("express");
const router = express.Router();

const AccountController = require("../app/controllers/AccountController");

router.get("/getlist", AccountController.getList);
router.get("/counter/account", AccountController.counterAccount);
router.post("/create",AccountController.createAccount);
router.put("/update/:id",AccountController.updateAccount);
router.delete("/delete/:id",AccountController.deleteAccount);
router.post("/delete/selected", AccountController.deleteSelectedAccount);

module.exports = router;
