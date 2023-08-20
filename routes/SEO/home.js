const express= require("express")
const router= express.Router();
const seo_home_schema= require("../../models/SEO/HOME")

//post home
router.post("/", async(req,res)=>{
    try {
        const save_home= new seo_home_schema({
            seo_url:req.body.seo_url,
            seo_title:req.body.seo_title,
            googleInsights:req.body.googleInsights,
            description:req.body.description,
            slug:req.body.slug,
            seo_keyword:req.body.seo_keyword
        })
        try {
            await save_home.save();
            res.status(200).json({message:"SEO data saved successfully"})
        } catch (error) {
            res.status(400).json({message:"Something went wrong while saving, try later", error:error.message})
        }
    } catch (error) {
        res.status(400).json({message:"Something went wrong", error:error.message})
        
    }
})

//get by id
router.get("/:slug", async(req,res)=>{
    try {
        const get_home= await seo_home_schema.findOne({slug:req.params.slug});
        res.status(200).json({message:"Home detail fetched", data:get_home})
        
    } catch (error) {
        res.status(400).json({message:"Something went wrong while fetching", error:error.message})
        
    }
})

//get by id
router.get("/get/:id", async(req,res)=>{
    try {
        const get_contact= await seo_home_schema.findById({_id:req.params.id});
        res.status(200).json({message:"Home detail fetched", data:get_contact})
        
    } catch (error) {
        res.status(400).json({message:"Something went wrong while fetching", error:error.message})
        
    }
})


//get by all
router.get("/", async(req,res)=>{
    try {
        const get_home= await seo_home_schema.find();
        res.status(200).json({message:"Home details fetched", data:get_home})
        
    } catch (error) {
        res.status(400).json({message:"Something went wrong while fetching", error:error.message})
        
    }
})

//update
router.put("/:id", async(req,res)=>{
    try {
        const update_home= await seo_home_schema.findByIdAndUpdate({_id:req.params.id},{
            seo_url:req.body.seo_url,
            seo_title:req.body.seo_title,
            googleInsights:req.body.googleInsights,
            description:req.body.description,
            slug:req.body.slug,
            seo_keyword:req.body.seo_keyword
        })
        res.status(200).json({message:"Home SEO UPDATED successfully", data:update_home})
    } catch (error) {
        res.status(400).json({message:"Something went wrong while updating", error:error.message}) 
    }
})

//delete
router.delete("/:id", async(req,res)=>{
    try {
        const delete_home= await seo_home_schema.findByIdAndDelete(req.params.id)
        res.status(200).json({message:"Home SEO deleted successfully", data:delete_home})
    } catch (error) {
        res.status(400).json({message:"Something went wrong while deleting", error:error.message}) 
    }
})

module.exports=router