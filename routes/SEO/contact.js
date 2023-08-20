const express= require("express")
const router= express.Router();
const seo_contact= require("../../models/SEO/contact")

//post home
router.post("/", async(req,res)=>{
    try {
        const seo_save_contact= new seo_contact({
            seo_title:req.body.seo_title,
            description:req.body.description,
            seo_keyword:req.body.seo_keyword
        })
        try {
            await seo_save_contact.save();
            res.status(200).json({message:"SEO data saved successfully"})
        } catch (error) {
            res.status(400).json({message:"Something went wrong while saving, try later", error:error.message})
        }
    } catch (error) {
        res.status(400).json({message:"Something went wrong", error:error.message})
        
    }
})

//get by id
router.get("/:id", async(req,res)=>{
    try {
        const get_contact= await seo_contact.findById(req.params.id);
        res.status(200).json({message:"Home detail fetched", data:get_contact})
        
    } catch (error) {
        res.status(400).json({message:"Something went wrong while fetching", error:error.message})
        
    }
})

//get by all
router.get("/", async(req,res)=>{
    try {
        const get_contact= await seo_contact.find();
        res.status(200).json({message:"Home details fetched", data:get_contact})
        
    } catch (error) {
        res.status(400).json({message:"Something went wrong while fetching", error:error.message})
        
    }
})

//update
router.put("/:id", async(req,res)=>{
    try {
        const update_contact= await seo_contact.findByIdAndUpdate({_id:req.params.id},{
            seo_title:req.body.seo_title,
            description:req.body.description,
            seo_keyword:req.body.seo_keyword
        })
        res.status(200).json({message:"Home SEO UPDATED successfully", data:update_contact})
    } catch (error) {
        res.status(400).json({message:"Something went wrong while updating", error:error.message}) 
    }
})

//delete
router.delete("/:id", async(req,res)=>{
    try {
        const delete_contact= await seo_contact.findByIdAndDelete(req.params.id)
        res.status(200).json({message:"Home SEO deleted successfully", data:delete_contact})
    } catch (error) {
        res.status(400).json({message:"Something went wrong while deleting", error:error.message}) 
    }
})

module.exports=router