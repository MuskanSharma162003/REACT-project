import userModel from "../Models/User.js";
import jwt from "jsonwebtoken"
//signup api
const signup = async (req, res) => {
    try {
        let { name, email, password } = req.body
        let user = await userModel.findOne({ email })
        if (user) {
            return res.status(400).json({ msg: "Email already exists" })
        }
        else {
            let data = new userModel(req.body)
            await data.save()
            //to not show password in the localstorage
            data = data.toObject()
            delete data.password
            jwt.sign({ data }, process.env.SECRET_KEY, { expiresIn: "2h" }, (err, token) => {
                if (err) {
                    res.send({ result: "something went wrong,Please try after sometimes" })
                }
                else {
                    res.status(201).json({ message: "User created sucessfully", data, token })
                }
            })
        }
    }
    catch (err) {
        res.send(err)
    }
}

// login api

const login = async (req, res) => {
    try {
        let { email, password } = req.body
        if (email && password) {
            let data = await userModel.findOne(req.body).select("-password") //remove password from localstorage
            if (data) {
                //token
                jwt.sign({ data }, process.env.SECRET_KEY, { expiresIn: "2h" }, (err, token) => {
                    if (err) {
                        res.send({ result: "something went wrong,Please try after sometimes" })
                    }
                    else {
                        res.send({ message: "Login successfully", data, token })
                    }
                })
            }
            else {
                res.send({ msg: "No user found" })
            }
        }
        else {
            res.send({ msg: "No user found" })
        }
    }
    catch (err) {
        res.send(err)
    }

}
export { signup, login }

//token
export const verifyToken = async (req, res,next) => {
    try {
        let token = req.headers["authorization"]
        console.log(token)
        if (typeof token != undefined) {
            jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
                if (err) {
                    res.send({ result: "Invalid token" })
                }
                else {
                    next();
                }
            })
        }
        else {
            res.send({ result: "No token found" })
        }
    }
    catch (err) {
        res.send(err)
    }

}