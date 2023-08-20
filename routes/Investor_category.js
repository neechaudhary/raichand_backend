const express= require('express')
const router= express.Router();
const inv_cat_schema= require("./../models/investor_category")

//post period
router.post("/", async(req,res)=>{
    try {
        const sav_inv_cat= new inv_cat_schema({
            inv_category:req.body.inv_category
        })
        try {
            await sav_inv_cat.save();
            res.status(200).json({message:"Investor category Created", data:sav_inv_cat})
        } catch (error) {
            res.status(400).json({message:"Investor category Creation failed",error:error.message})
        }
    } catch (error) {
        res.status(401).json({message:"Something went wrong, please try again later.",error:error.message})
    }
})

//get period
router.get("/", async(req,res)=>{
    try {
        const get_inv_cat= await inv_cat_schema.find();
        res.status(200).json({message:"Investor category list", data:get_inv_cat})
    } catch (error) {
        res.status(400).json({message:"Something went wrong, while fetching", error:error.message})
    }
})

//delete period
router.delete("/:id", async(req,res)=>{
    try {
        const delete_inv_cat= await inv_cat_schema.findByIdAndDelete(req.params.id)
        res.status(200).json({message:"Investor category deleted successfully"})
    } catch (error) {
        res.status(400).json({message:"Something went wrong while deleting period."})
    }
})
module.exports=router;

