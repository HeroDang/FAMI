const express = require("express");
const router = express.Router();

const AccountController = require("../app/controllers/AccountController");
const CreatePersonMiddleware = require("../app/middleware/CreatePersonMiddleware");
const UpdatePersonMiddleware = require("../app/middleware/UpdatePersonMiddleware");
const DeletePersonMiddleware = require("../app/middleware/DeletePersonMiddleware");
const DeletePersonsMiddleware = require("../app/middleware/DeletePersonsMiddleware");
const { route } = require("./prescription");

router.post("/login", AccountController.login);
router.get("/getlist", AccountController.getList);
router.get("/counter/account", AccountController.counterAccount);
router.post("/create", CreatePersonMiddleware, AccountController.createAccount);
router.put(
    "/update/:id",
    UpdatePersonMiddleware,
    AccountController.updateAccount,
);
router.delete(
    "/delete/:id",
    DeletePersonMiddleware,
    AccountController.deleteAccount,
);
router.post(
    "/delete/selected",
    DeletePersonsMiddleware,
    AccountController.deleteSelectedAccount,
);

module.exports = router;
