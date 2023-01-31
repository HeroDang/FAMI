const express = require("express");
const router = express.Router();

const specFormController = require("../app/controllers//SpecFormController");

// router.get("/create", specFormController.createSpecForm);
router.put("/update/:id", specFormController.updateFrom);
router.get("/getlist", specFormController.getList);
router.post("/delete/selected", specFormController.deleteSelectedForm);
router.delete("/delete/:id", specFormController.deleteForm);

module.exports = router;
