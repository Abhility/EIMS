const router = require('express').Router();
const {allLeaves,leaveById,addLeave,updateLeave,allLeavesOfUser} = require('../controller/leave.controller');
const {isAdmin,isEmployee,isEmployeeAuthorized} = require('../middlewares/authorization');
const {verifyJWT} = require('../middlewares/jwt');

// get all leaves from DB
router.get('/leaves',verifyJWT,isAdmin,allLeaves);

//get leaves of particular users based on Id from DB
router.get('/users/:userId/leaves',verifyJWT,isEmployee,isEmployeeAuthorized,allLeavesOfUser);

//get details of particular leave from DB
router.get('/users/:userId/leaves/:leaveId',verifyJWT,isEmployee,isEmployeeAuthorized,leaveById);

// add leave to DB
router.post('/users/:userId/leaves',verifyJWT,isEmployee,isEmployeeAuthorized,addLeave);

// update status of leave in DB
router.put('/leaves/:leaveId',verifyJWT,isAdmin,updateLeave);


module.exports = router;