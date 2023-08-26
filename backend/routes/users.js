const express = require('express');

const {updateUser,deleteUser,singleUser,getAllUsers} = require('../controllers/userC');
const { verifyToken, verifyUser, verifyAdmin } = require('../utils/verifyToken');

const router = express.Router();

//update
router.put('/:id', verifyUser, updateUser)

//delete
router.delete('/:id',verifyUser,deleteUser)
//get single
   router.get('/:id', verifyUser,singleUser)       

//get all
router.get("/",verifyAdmin,getAllUsers)



module.exports = router