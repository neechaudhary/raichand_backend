const express= require("express");
const router= express.Router();
const contactSchema= require("./../models/contactus")
const {contact_val} = require("./../validation/validation")

router.post("/",contact_val, async(req,res)=>{
    try {
       const {anonymous, name,email, mobile, company, designation, business_name, service_name, our_presence, choose_within, message, authorize }=req.body;
    const save_contact= new contactSchema({
        anonymous,
        name,
        email,
        mobile,
        company,
        designation,
        business_name,
        service_name,
        our_presence,
        choose_within,
        message,
        authorize
    })
    try {
        await save_contact.save();
        res.status(200).send("Thank you for contacting us")
    } catch (error) {
        res.status(400).send(error, error.message, "Something went wrong while storing data")
    }   
    } catch (error) {
        res.status(400).send("Something went wrong, Please try again later.")
    }
  
})


router.get("/all", async(req,res)=>{
    try {
        const get_user=await contactSchema.find();
        res.status(200).json({message:"Contact user Details",data:get_user})
    } catch (error) {
        res.status(400).json({message:"Seems problem while fetching details",data:error.message})
    }
})

router.get("/:id", async(req,res)=>{
    try {
        const get_user=await contactSchema.findById(req.params.id);
        res.status(200).json({message:"Contact user Details",data:get_user})
    } catch (error) {
        res.status(400).json({message:"Seems problem while fetching details",data:error.message})
    }
})

router.patch("/:id", async(req,res)=>{
    try {
        const update_user = await contactSchema.findByIdAndUpdate({_id:req.params.id},{
            anonymous:req.body.anonymous,
            name:req.body.name,
            email:req.body.email,
            mobile:req.body.mobile,
            company:req.body.company,
            designation:req.body.designation,
            business_name:req.body.business_name,
            service_name:req.body.service_name,
            our_presence:req.body.our_presence,
            choose_within:req.body.choose_within,
            message:req.body.message,
            authorize:req.body.authorize
        })

        res.status(200).json({message:"Contact update successfully", data:update_user})
    } catch (error) {
        res.status(200).json({message:"Something went wrong while updating contacts", data:error})
        
    }
})


router.delete("/:id", async(req,res)=>{
    try {
        const delete_user= await contactSchema.findByIdAndDelete(req.params.id);
        res.status(200).json({message:"Contact deleted successfully", data:delete_user})
    } catch (error) {
        res.status(200).json({message:"Something went wrong while deleting contact", data:error})
    }
})
module.exports = router;