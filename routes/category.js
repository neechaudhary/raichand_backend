const express= require('express')
const router= express.Router();
const category_schema= require("./../models/category")

//post period
router.post("/", async(req,res)=>{
    try {
        const save_category= new category_schema({
            category:req.body.category
        })
        try {
            await save_category.save();
            res.status(200).json({message:"category Created", data:save_category})
        } catch (error) {
            res.status(400).json({message:"category Creation failed",error:error.message})
        }
    } catch (error) {
        res.status(401).json({message:"Something went wrong, please try again later.",error:error.message})
    }
})

//get period
router.get("/", async(req,res)=>{
    try {
        const get_category= await category_schema.find();
        res.status(200).json({message:"category list", data:get_category})
    } catch (error) {
        res.status(400).json({message:"Something went wrong, while fetching", error:error.message})
    }
})

//delete period
router.delete("/:id", async(req,res)=>{
    try {
        const delete_period= await category_schema.findByIdAndDelete(req.params.id)
        res.status(200).json({message:"Category deleted successfully"})
    } catch (error) {
        res.status(400).json({message:"Something went wrong while deleting period."})
    }
})
module.exports=router;

