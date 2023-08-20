const express= require('express');
const router= express.Router();
const newsletterSchema= require("./../models/newsletter");

//post newsletter
router.post('/', async(req,res)=>{

    //save data to database
    const save_detail= new newsletterSchema({
        email: req.body.email
    })
    try {
        await save_detail.save();
        res.send("Thank you for subscribing our Newsletter.");
    } catch (error) {
        res.status(500).json({ message:error.message, status:"Something went wrong while sending newsletter." });
    }
})

//get all newsletter
router.get("/all", async(req,res)=>{
    try {
        const newsletter= await newsletterSchema.find();
        res.status(200).json({message:"Successfully fetched all emails", data:newsletter});
    } catch (error) {
        res.status(500).json({message:error.message, status:"Something went wrong while fetch email list"})
    }
})

//get single newsletter
router.get("/:id", async(req,res)=>{
    try {
        const newsletter= await newsletterSchema.findById(req.params.id);
        res.status(200).json({message:"Data fetched from ID", data:newsletter});
    } catch (error) {
        res.status(500).json({message:error.message, status:"Something went wrong while fetch email"})
    }
})

//dekete newsletter
router.delete('/:id', async(req,res)=>{
    try {
        const delete_newsletter = await newsletterSchema.findByIdAndDelete(req.params.id);
        res.status(200).json({ message:"Newsletter deleted successfully", deleted_email:delete_newsletter });
    } catch (error) {
        res.status(500).json({message:error.message, status:"Something went wrong while deleting"})
    }
})


module.exports = router;