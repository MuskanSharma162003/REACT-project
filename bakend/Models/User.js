import mongoose from "mongoose";
let userSchema=mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
})
let userModel=mongoose.model("user",userSchema)
export default userModel