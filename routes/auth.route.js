const router = require('express').Router();
const {loginController} = require('../controller/auth.controller');

// login route
router.post('/login',loginController);


module.exports = router;