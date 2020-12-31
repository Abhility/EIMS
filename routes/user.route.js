const router = require('express').Router();
const {allUsers, userById,userRegistration} = require('../controller/user.controller');
const {isAdmin,isEmployee, isEmployeeAuthorized} = require('../middlewares/authorization');
const {verifyJWT} = require('../middlewares/jwt');

router.get('/',verifyJWT,isAdmin,allUsers);
router.post('/register',verifyJWT,isAdmin,userRegistration);
router.get('/:userId',verifyJWT,isEmployee,isEmployeeAuthorized,userById);


module.exports = router;