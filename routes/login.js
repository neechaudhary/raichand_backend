const express = require("express");
const router = express.Router();
const user_schema= require('./../models/users')
require("dotenv").config();
const jwt= require("jsonwebtoken")
const {val_login} = require("./../validation/validation")
const bcrypt= require("bcryptjs")


//user login
router.post("/", val_login, async(req,res) =>{
    try {
        const {email, password}=req.body;

        const user= await user_schema.findOne({email});
        console.log(user.email)
        if(!user)
        return res.status(400).json({ message: "User and password is wrong.", status: "warning" })

        // const hashpass= user.password;

        if(password !== user.password)
        return res.status(400).json({ message: "User and password is wrong.", status: "warning" });


        //create and assign token
        const token= jwt.sign({
            _id:user._id
        },
        process.env.JWT_SECRET,{
            algorithm:"HS256",
            expiresIn:"1h"
        });


        //set cookie
        res.cookie("auth_token", token, {
            httpOnly:true,
            maxAge:1000 * 60 * 60 * 24 * 300,
            sameSite: "none",
            secure: true,
        })
        res.setHeader("x-auth-token", token);

        res
        .cookie("auth_token",token, {httpOnly:true})
        .status(200).json({message:"Login successfull", status:"success", token:token})
    } catch (error) {
        res.status(500).json({ message: error.message, status: "error" });
        
    }
})


router.get("/isloggedin", async(req,res)=>{
    try {
        //Check user have token or not
    // console.log(req.cookies)
    // console.log(req.body)
    // console.log(req.query)
    // console.log(req.headers.token)
        
    
    const token= req.cookies.auth_token || req.body.token || req.headers.authorization || req.headers.token;
    if(token == undefined || token == null || token == ""){
        return res.json(false)
    }
    // console.log(token); 
    const have_valid_token= jwt.verify(token, process.env.JWT_SECRET,{
        algorithms:"HS256"
    })
    // console.log(have_valid_token)
    if(!have_valid_token){
        return res.json(false)
    }
    // console.log(have_valid_token)

    const id_from_token= have_valid_token._id;
    console.log(id_from_token)

    // check same id if exist in databse 
    const user= await user_schema.findOne({_id:id_from_token}).lean()

    if(user == undefined || user === null || user === ""){
        return res.json(false)
    }
    else{
        res.json({data:user})
    }
} catch (error) {
      res.status(200).json({messge:"Something went wrong", error:error.message})  
}
})

module.exports=router;