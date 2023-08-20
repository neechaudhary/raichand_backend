const express= require("express")
const router= express.Router()
const user_schema= require("./../models/users");
const {val_register} = require("./../validation/validation")
const bcrypt= require("bcryptjs")

//create user
router.post("/", val_register, async(req,res)=>{
    const {name,email,password,allow_access_to,role}=req.body;

    // const hashed_password = await bcrypt.hash(password,10)

    const save_user= new user_schema({
        allow_access_to,
        name,
        email,
        role,
       password
    });
    try {
        await save_user.save();
        res.status(200).json({message:"User created successfully"})
    } catch (error) {
        res.status(400).json({ message: error.message, status: "error" })
    }
})

//get users
router.get("/", async(req,res)=>{
    try {
        const userdata= await user_schema.find();
        res.status(200).json({message:"user details", data:userdata})
    } catch (error) {
        res.status(500).json({message:"something went wrong", error:error.message})
    }
})

//get user by id
router.get("/:id", async(req,res)=>{
    try {
        const userdata= await user_schema.findById(req.params.id);
        res.status(200).json({message:"user details", data:userdata})
    } catch (error) {
        res.status(500).json({message:"something went wrong", error:error.message})
    }
})
module.exports= router;
