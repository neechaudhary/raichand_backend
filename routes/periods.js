const express= require('express')
const router= express.Router();
const period_schema= require("./../models/periods")

//post period
router.post("/", async(req,res)=>{
    try {
        const save_period= new period_schema({
            period:req.body.period
        })
        try {
            await save_period.save();
            res.status(200).json({message:"Period Created", data:save_period})
        } catch (error) {
            res.status(400).json({message:"Period Creation failed",error:error.message})
        }
    } catch (error) {
        res.status(401).json({message:"Something went wrong, please try again later.",error:error.message})
    }
})

//get period
router.get("/", async(req,res)=>{
    try {
        const get_period= await period_schema.find();
        res.status(200).json({message:"Period list", data:get_period})
    } catch (error) {
        res.status(400).json({message:"Something went wrong, while fetching", error:error.message})
    }
})

//delete period
router.delete("/:id", async(req,res)=>{
    try {
        const delte_period= await period_schema.findByIdAndDelete(req.params.id)
        res.status(200).json({message:"Period deleted successfully"})
    } catch (error) {
        res.status(400).json({message:"Something went wrong while deleting period."})
    }
})
module.exports=router;

