import productModel from "../Models/Product.js";

export const addProduct=async(req,res)=>{
try{
let data=new productModel(req.body)
await data.save()
res.status(201).json({msg:"Product Added Successfully"})
}
catch(err){
    res.send(err)
}
}


export const getProduct=async(req,res)=>{
try{
let data=await productModel.find()
// res.send(data)
if(data.length>0){
    res.status(200).json(data)
    // console.log(data)
}
else{
    res.status(400).json({msg:"Product not found"})
    // console.log(data)
}
}
catch(err){
    res.send(err)
}
}

export const deleteProduct=async(req,res)=>{
   try{
   let result=await productModel.deleteOne({_id:req.params.id})
   res.status(200).json({message:"product deleted successfully"})
   }
   catch(err){
    res.send(err)
   }
}


export const updatePrefill=async(req,res)=>{
    try{
    let data=await productModel.findOne({_id:req.params.id})
    if(data){
        res.status(200).json(data)
    }
    else{
        res.send({msg:"no product found"})
    }
    }
    catch(err){
        res.send(err)
    }
}

export const update=async(req,res)=>{
    try{
        let data=await productModel.updateOne({_id:req.params.id},{$set:req.body})
        res.status(200).json({message:"product updated successfully"})
    }
    catch(err){
        res.send(err)
    }

}


// search api
export const search=async(req,res)=>{
try{
let data=await productModel.find({
    "$or":[
        {pName:{$regex:req.params.key}},
        {pCategory:{$regex:req.params.key}},
    ]
})
res.status(200).json(data)
}
catch(err){
    res.send(err)
}
}