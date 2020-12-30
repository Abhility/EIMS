const router = require('express').Router();
const {allUsers, userById} = require('../controller/user.controller');
const {isAdmin,isEmployee, isEmployeeAuthorized} = require('../middlewares/authorization');
const {verifyJWT} = require('../middlewares/jwt');

// get all users from DB
router.get('/',verifyJWT,isAdmin,allUsers);


// get specific user based on Id from DB
router.get('/:userId',verifyJWT,isEmployee,isEmployeeAuthorized,userById);


module.exports = router;