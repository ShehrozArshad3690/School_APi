const express = require("express");
const schController = require("../controllers/schoolController");
const verify = require("../middlewares/auth");
const router = express.Router();

router.get("/schools", verify, schController.getSchool);
router.get("/school/:id", verify, schController.getSchoolById);
router.post("/school/add", verify, schController.addSchool);
router.put("/school/update/:id", verify, schController.updateSchool);
router.delete("/school/delete/:id", verify, schController.deleteSchool);

module.exports = router;
