const express= require("express")
const router= express.Router();
const seo_about= require("../../models/SEO/about")

//post home
router.post("/", async(req,res)=>{
    try {
        const save_about= new seo_about({
            seo_title:req.body.seo_title,
            description:req.body.description,
            seo_keyword:req.body.seo_keyword
        })
        try {
            await save_about.save();
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
        const get_home= await seo_about.findById(req.params.id);
        res.status(200).json({message:"About detail fetched", data:get_home})
        
    } catch (error) {
        res.status(400).json({message:"Something went wrong while fetching", error:error.message})
        
    }
})

//get by all
router.get("/", async(req,res)=>{
    try {
        const get_about= await seo_about.find();
        res.status(200).json({message:"About details fetched", data:get_about})
        
    } catch (error) {
        res.status(400).json({message:"Something went wrong while fetching", error:error.message})
        
    }
})

//update
router.put("/:id", async(req,res)=>{
    try {
        const update_about= await seo_about.findByIdAndUpdate({_id:req.params.id},{
            seo_title:req.body.seo_title,
            description:req.body.description,
            seo_keyword:req.body.seo_keyword
        })
        res.status(200).json({message:"About SEO UPDATED successfully", data:update_about})
    } catch (error) {
        res.status(400).json({message:"Something went wrong while updating", error:error.message}) 
    }
})

//delete
router.delete("/:id", async(req,res)=>{
    try {
        const delete_about= await seo_about.findByIdAndDelete(req.params.id)
        res.status(200).json({message:"Home SEO deleted successfully", data:delete_about})
    } catch (error) {
        res.status(400).json({message:"Something went wrong while deleting", error:error.message}) 
    }
})

module.exports=router