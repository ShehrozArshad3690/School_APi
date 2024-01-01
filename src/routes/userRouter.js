const express =require('express');
const uController = require('../controllers/userController');
const router = express.Router();

router.post('/signup',uController.signUp);
router.post('/signin',uController.signIn);



module.exports=router;