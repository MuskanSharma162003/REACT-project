import mongoose from "mongoose";
import dotenv from "dotenv"
dotenv.config()
const mongoUrl=process.env.MONGO_CON
mongoose.connect(mongoUrl).then(()=>{
    console.log("run")
})