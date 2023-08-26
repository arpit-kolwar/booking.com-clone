const express = require('express');

const { createRoom, updateRoom, deleteRoom, singleRoom, getAllRooms,updateRoomAvailability } = require('../controllers/roomC');
const { verifyAdmin } = require('../utils/verifyToken');

 const router = express.Router();

 //create
 router.post('/:hotelid',verifyAdmin ,createRoom);
 //update
 router.put('/:id',verifyAdmin ,updateRoom)



//delete
router.delete('/:id/:hotelid',verifyAdmin ,deleteRoom)
//get single
    router.get('/:id',singleRoom)       

//get all
router.get("/",getAllRooms)

//change availability of rooms
router.put('/availability/:id',updateRoomAvailability)


 module.exports = router