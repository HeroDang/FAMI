const express = require("express");
const router = express.Router();

const AccountController = require("../app/controllers/AccountController");
const { route } = require("./prescription");

router.post("/login", AccountController.login);
router.get("/getlist", AccountController.getList);
router.get("/counter/account", AccountController.counterAccount);
router.post("/create",AccountController.createAccount);
router.put("/update/:id",AccountController.updateAccount);
router.delete("/delete/:id",AccountController.deleteAccount);
router.post("/delete/selected", AccountController.deleteSelectedAccount);
router.get("/count/ger", AccountController.getGeneral);
router.get("/count/mana", AccountController.getMana);
router.get("/count/pha", AccountController.getPhar);
router.get("/count/sta", AccountController.getStaff);
router.get("/count/special", AccountController.getSpecial);


module.exports = router;
