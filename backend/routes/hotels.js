const express = require('express');

const { createHotel, updateHotel, deleteHotel, singleHotel, getAllHotels, countByCity, countByType, getHotelRooms } = require('../controllers/hotelC');
const { verifyAdmin } = require('../utils/verifyToken');

 const router = express.Router();

 //create
 router.post('/',verifyAdmin ,createHotel);
 //update
 router.put('/:id',verifyAdmin ,updateHotel)

//delete
router.delete('/:id',verifyAdmin ,deleteHotel)
//get single
    router.get('/find/:id',singleHotel)       

//get all
router.get("/",getAllHotels)

router.get("/countByCity",countByCity)
router.get("/CountByType",countByType)
router.get("/room/:id",getHotelRooms )

 module.exports = router