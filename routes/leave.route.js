const router = require('express').Router();
const {allLeaves,leaveById,addLeave,updateLeave,allLeavesOfUser} = require('../controller/leave.controller');
const {isAdmin,isEmployee,isEmployeeAuthorized} = require('../middlewares/authorization');
const {verifyJWT} = require('../middlewares/jwt');

router.get('/leaves',verifyJWT,isAdmin,allLeaves);
router.get('/users/:userId/leaves',verifyJWT,isEmployee,isEmployeeAuthorized,allLeavesOfUser);
router.get('/users/:userId/leaves/:leaveId',verifyJWT,isEmployee,isEmployeeAuthorized,leaveById);
router.post('/users/:userId/leaves',verifyJWT,isEmployee,isEmployeeAuthorized,addLeave);
router.put('/leaves/:leaveId',verifyJWT,isAdmin,updateLeave);


module.exports = router;