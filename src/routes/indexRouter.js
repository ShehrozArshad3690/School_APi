const express = require("express");
const schRouter = require("./schoolRouter");
const classRouter = require("./classRouter");
const sectionRouter = require("./sectionRouter");
const uRouter = require("./userRouter");
const router = express.Router();

router.get("/", (req, res) => {
  try {
    res.json({ message: "Plz SignUp or SignIn to get result of endpoints" });
  } catch (error) {
    return res.json({ message: "There is some error" });
  }
});
router.use(schRouter);
router.use(classRouter);
router.use(sectionRouter);
router.use(uRouter);

module.exports = router;
