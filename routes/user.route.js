const router = require('express').Router();
const {allUsers, userById} = require('../controller/user.controller');
const {isAdmin,isEmployee, isEmployeeAuthorized} = require('../middlewares/authorization');
const {verifyJWT} = require('../middlewares/jwt');

router.get('/',verifyJWT,isAdmin,allUsers);
router.get('/:userId',verifyJWT,isEmployee,isEmployeeAuthorized,userById);


module.exports = router;