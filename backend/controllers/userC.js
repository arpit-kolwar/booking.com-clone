const User = require('../models/User')


exports.updateUser =async(req,res,next)=>{
    try {
        const updatedUser = await User.findByIdAndUpdate(
            req.params.id,
            { $set: req.body},
            {new: true}
            )
     
       res.status(200).json(updatedUser)
    } catch (err) {
  next(err)
    }
}

exports.deleteUser =async(req,res,next)=>{
    try {
        await User.findByIdAndDelete(
            req.params.id)
     
       res.status(200).json("User deleted")
} catch (err) {
    next(err)
}
    
}


exports.singleUser =async(req,res,next)=>{
    try {
        const GetUser = await User.findById(
            req.params.id )
     
       res.status(200).json(GetUser)
} catch (err) {
    next(err)
}
}

exports.getAllUsers =async(req,res,next)=>{
  
  try {
    const getallUsers = await User.find();
    res.status(200).json(getallUsers)
  } catch (error) {
    next(err)
  }

}



