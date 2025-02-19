import mongoose from "mongoose";
let productSchema=mongoose.Schema({
    pName:{
        type:String,
        required:true
    },
    pPrice:{
        type:Number,
        required:true
    },
    pDesc:{
        type:String,
        required:true
    },
    pCategory:{
        type:String,
        required:true
    },
    userId:{
        type:String,
        required:true
    },
})
let productModel=mongoose.model("products",productSchema)
export default productModel