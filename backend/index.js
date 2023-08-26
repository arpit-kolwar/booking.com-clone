const express = require('express')
const app = express()
const dotenv = require('dotenv')
const mongoose = require('mongoose')
const authroute = require('./routes/auth.js')
const usersroute = require('./routes/users.js')
const hotelsroute = require('./routes/hotels.js')
const roomsroute = require('./routes/rooms.js')
const { register } = require('./controllers/authC.js')
const cookieParser = require('cookie-parser')
const cors = require('cors')
dotenv.config()

const connect =async()=>{
try {
    await mongoose.connect(process.env.MONGO_URI)
    console.log("connected to mongoDB!");
} catch (error) {
    console.log(error);
}
}

//middlewares
app.use(cors())
app.use(cookieParser())
app.use(express.json())
app.use("/api/auth",authroute);
app.use("/api/users",usersroute);
app.use("/api/hotels",hotelsroute);
app.use("/api/rooms",roomsroute);



//ERROR HANDLER
app.use((err,req,res,next)=>{
    const errorStatus = err.status || 500
    const errorMessage = err.message || "something went wrong"
return res.status(errorStatus).json({
   success: false,
   status : errorStatus,
   message:errorMessage,
   stack: err.stack
})
})


app.listen(5000,()=> {
    connect()
    console.log("Server is listening on port 5000")
})