const express = require("express");
const sectionController = require("../controllers/sectionController");
const verify = require("../middlewares/auth");
const router = express.Router();

router.get("/sections", verify, sectionController.getSection);
router.get("/section/:id", verify, sectionController.getSectionById);
router.post("/section/add", verify, sectionController.addSection);
router.put("/section/update/:id", verify, sectionController.updateSection);
router.delete("/section/delete/:id", verify, sectionController.deleteSection);

module.exports = router;
