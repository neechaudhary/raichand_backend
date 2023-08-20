const express = require("express")
const router = express.Router()
const user_schema = require("./../models/users");
const { val_register } = require("./../validation/validation")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
require("dotenv").config()

//check user is admin or not
//create user
router.post("/", async (req, res) => {
    try {
        console.log("enter first try block")
        // console.log(req.cookies)
        // console.log(req.body )
        // console.log(req.headers)

        const token = req.cookies || req.headers.authorization;
        // console.log(token)
        if (token === undefined || token === null || token === "") {
            return res.status(401).json({ message: "Unauthorized" });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        //   const {name,email,password,allow_access_to,role}=req.body;
        //find user role with id
        const user_admin_data = await user_schema.findOne({ _id: decoded._id })
        console.log(user_admin_data.role)

        if (user_admin_data.role === "admin") {
            const user_details = new user_schema({
                admin_id: decoded._id,
                name: req.body.name,
                email: req.body.email,
                password: req.body.password,
                allow_access_to: req.body.allow_access_to,
                role: req.body.role,
            })
            try {
                await user_details.save();
                res.status(200).json({ message: "User created successfully" })
            } catch (error) {
                res.status(400).json({ message: error.message, status: "error" })
            }
        } else {
            res.status(400).json({ messsage: "only admin can create user" })
        }

    } catch (error) {
        res.status(400).json({ messsage: "something went wrong before creating the user", error: error.message })

    }
})

//get user
router.get("/", async (req, res) => {
    try {
    // console.log(req.cookies.auth_token)
    // console.log(req.headers.authorization)
    // console.log(req.body.token)
    // console.log(req.headers.token)

    const token =  req.headers.token || req.headers.authorization;
    // console.log(token)
    if (token === undefined || token === null || token === "") {
        return res.status(401).json({ message: "Unauthorized" });
    }
    // console.log(token)
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log(decoded)

    //find user role with id
    const user_data = await user_schema.findOne({ _id: decoded._id })
    console.log(user_data.role)
   res
   .cookie("auth_token",token, {httpOnly:true})
   .status(200).json({message:"logged in user data",data:user_data})
} catch (error) {
    return res.status(401).json({ error:error, message:"something went wrong" });
        
}

})
module.exports = router