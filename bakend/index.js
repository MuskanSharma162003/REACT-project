//open in integrated terminal
// npm i express mongoose mongodb body-parser
// npm i body-parser cors
//npm i dotenv

import express from "express"
import jwt from "jsonwebtoken"
import './dbConnect.js'
import { login, signup, verifyToken } from "./Controllers/authController.js"
import dotenv from "dotenv"
import bodyParser from "body-parser"
import cors from "cors"
import { addProduct, deleteProduct, getProduct, search, update, updatePrefill } from "./Controllers/productController.js"
dotenv.config()

let app = express()
app.use(bodyParser.json())
app.use(cors())
let port = process.env.PORT

app.use(express.json())

app.get("/", (req, res) => {
    res.send("hello")
})

// api

app.post("/login",login)
app.post("/signup", signup)

app.post("/addproduct",verifyToken,addProduct)
app.get("/getproduct",verifyToken,getProduct)
app.delete("/deleteproduct/:id",verifyToken,deleteProduct)
app.get("/updateprefill/:id",verifyToken,updatePrefill)
app.put("/updatedata/:id",verifyToken,update)
app.get("/search/:key",verifyToken,search)

app.listen(port, () => {
    console.log("server connected")
})