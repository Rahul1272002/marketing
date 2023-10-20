import express from "express"
import mongoose from "mongoose"
import dotenv from "dotenv"
import UserRouter from "./routes/user.route.js"
import authRouter from "./routes/auth.route.js"

dotenv.config()

import cors from "cors";
import cookieParser from "cookie-parser"

mongoose.connect(process.env.MONGO_URL).then(()=>{
    console.log("Connect db")
}).catch((err)=>{
    console.log(err)
})
const app=express();
app.use(express.json())
app.use(cookieParser());
app.listen(8001,()=>{
    console.log("on server")
})


app.use(cors())

app.use('/api/user',UserRouter)
app.use('/api/auth',authRouter)

app.use((err,req,res,next)=>{
    const statusCode=err.statusCode || 500
    const message=err.message || "Internal server Error"
    return res.status(statusCode).json({
        sucess:false,
        statusCode,
        message
    })
})