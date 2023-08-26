const Hotel=require( "../models/Hotel")
const Room=require( "../models/Room")

exports.createHotel = async(req,res,next)=>{
    const newHotel = new Hotel(req.body)
    try {
        const savedHotel = await newHotel.save()
       res.status(200).json(savedHotel)
} catch (err) {
    next(err)
}
}
exports.updateHotel =async(req,res,next)=>{
    try {
        const updatedHotel = await Hotel.findByIdAndUpdate(
            req.params.id,
            { $set: req.body},
            {new: true}
            )
     
       res.status(200).json(updatedHotel)
    } catch (err) {
  next(err)
    }
}

exports.deleteHotel =async(req,res,next)=>{
    try {
        await Hotel.findByIdAndDelete(
            req.params.id)
     
       res.status(200).json("hotel deleted")
} catch (err) {
    next(err)
}
    
}


exports.singleHotel =async(req,res,next)=>{
    try {
        const GetHotel = await Hotel.findById(
            req.params.id )
     
       res.status(200).json(GetHotel)
} catch (err) {
    next(err)
}
}

exports.getAllHotels =async(req,res,next)=>{
  const {min,max,...others} = req.query;
  const limit = parseInt(req.query.limit)
 
  try {
    const getallhotels = await Hotel.find({...others,
      cheapestPrice:{$gt: min || 1,$lt:max || 9999 }},).limit(limit);
    res.status(200).json(getallhotels)
  } catch (error) {
    next(err)
  }
}
exports.countByCity =async(req,res,next)=>{
const cities = req.query.cities.split(",")
  try {
    const list = await Promise.all(cities.map(city=>{
        return Hotel.countDocuments({city:city})
    }))

    res.status(200).json(list)
  } catch (error) {
    next(err)
  }
}
exports.countByType =async(req,res,next)=>{
  try {
    
    const hotelCount = await Hotel.countDocuments({type:"hotel"})
    const apartmentCount =await  Hotel.countDocuments({type:"apartment"})
    const resortCount = await Hotel.countDocuments({type:"resort"})
    const villaCount =await  Hotel.countDocuments({type:"villa"})
    const cabinCount = await Hotel.countDocuments({type:"cabin"})

    res.status(200).json([
      {type:"hotel", count: hotelCount},
      {type:"apartment", count: apartmentCount},
      {type:"resort", count: resortCount},
      {type:"villa", count: villaCount},
      {type:"cabin", count: cabinCount},
      
    ])
  
  } catch (error) {
    next(err)
  }
}

exports.getHotelRooms = async(req,res,next)=>{
  try {
    const hotel = await Hotel.findById(req.params.id)
    const list = await Promise.all(hotel.rooms.map((room)=>{
return Room.findById(room)
    }))
    res.status(200).json(list)
  } catch (error) {
    
  }
}

