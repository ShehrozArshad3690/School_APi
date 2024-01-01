const express = require("express");
const classController = require("../controllers/classController");
const verify = require("../middlewares/auth");
const router = express.Router();

router.get("/classes", verify, classController.getClass);
router.get("/class/:id", verify, classController.getClassById);
router.post("/class/add", verify, classController.addClass);
router.put("/class/update/:id", verify, classController.updateClass);
router.delete("/class/delete/:id", verify, classController.deleteClass);

module.exports = router;
