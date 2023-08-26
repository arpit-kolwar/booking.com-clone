const User = require("../models/User")
const bcrypt = require('bcrypt');
const createError = require("../utils/error");
const jwt = require('jsonwebtoken')
const dotenv = require('dotenv')
dotenv.config()

exports.register=async(req,res,next)=>{

    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(req.body.password, salt);
  
try {
    const newUser = new User({
        username: req.body.username,
        password:hash,
        email:req.body.email
    })
    await newUser.save();
    res.status(200).send("user has been created")
} catch (err) {
    next(err)
}
}

exports.login = async(req,res,next)=>{
    try {
        const user = await User.findOne({username:req.body.username})
        if(!user){
            return next(createError(404,"user not found"))
        }
     
        const isPasswordCorrect = await bcrypt.compareSync(req.body.password, user.password);

     if(!isPasswordCorrect){
        return next(createError(400,"wrong password"))
    }

    const token = jwt.sign({id: user._id,isAdmin: user.isAdmin },process.env.JWT)

    const{password,isAdmin,...rest} = user._doc

       res.cookie("access_token",token,{
        httpOnly:true,
       })
       .status(200)
       .json({rest});
    } catch (err) {
        next(err)
    }
}
