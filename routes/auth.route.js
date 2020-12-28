const router = require('express').Router();
const {loginController} = require('../controller/auth.controller');

router.post('/login',loginController);


module.exports = router;