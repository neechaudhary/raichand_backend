const express= require("express");
const router= express.Router();
const policies_schema= require("./../models/policies");
const faq = require("./../models/faq");
const { default: slugify } = require("slugify");
const {val_policies}= require("./../validation/validation")

//create policies
router.post("/",val_policies, async(req,res)=>{
    try {
        const slug= slugify(req.body.policy_name,{
            replacement:"-",
            remove:/[*+~.()'"!:@]/g,
            lower:true
        })
        const save_policies= new policies_schema({
            type:req.body.type,
            policy_name:req.body.policy_name,
            slug:slug,
            content:req.body.content
        })
        try {
            await save_policies.save()
            res.status(200).json({message:"Policy created successfully", data:save_policies})
        } catch (error) {
            res.status(400).json({message:"Something went wrong while creating policy.", error:error.message})
            
        }
    } catch (error) {
     res.status(401).json({message:"Unable to create policy at the moment, try later", error:error.message})   
    }
})

//get policies
router.get("/policies/all", async(req,res)=>{
    try {
     const customSupplier=await policies_schema.find()

        return res.status(200).json({message:"Policies fetched successfully", data:customSupplier })
    } catch (error) {
        res.status(401).json({message:"Something went wrong while fetching Polices",error:error.message})
        
    }
})



//get policies
router.get("/", async(req,res)=>{
    try {
        const {perPage,pageNo,personelPerPage,personelPageNo}=req.query

        let toskip=(Number(pageNo-1) * Number(perPage))
        let toskippersonnel=(Number(personelPageNo-1) * Number(personelPerPage))

        let customCustomer=[], customePersonnel=[], customSupplier=[];

        customCustomer=await policies_schema.find({type:"Customers"}).skip(toskip).limit(perPage)
        customePersonnel=await policies_schema.find({type:"Personnels"}).skip(toskippersonnel).limit(personelPerPage)
        customSupplier=await policies_schema.find({type:"Suppliers"}).skip(toskip).limit(perPage)

        return res.status(200).json({message:"Policies fetched successfully", customCustomer,customePersonnel, customSupplier })
    } catch (error) {
        res.status(401).json({message:"Something went wrong while fetching Polices",error:error.message})
        
    }
})

//get policies by id
router.get("/:slug", async(req,res)=>{
    try {
        const policy_details= await policies_schema.findOne({slug:req.params.slug});
        res.status(200).json({message:"Policy fetched successfully", data:policy_details})
    } catch (error) {
        res.status(401).json({message:"Something went wrong while fetching Policy",error:error.message})
        
    }
})

//update policy
router.put("/:id", async(req,res)=>{
    try {
        const policy_details= await policies_schema.findByIdAndUpdate({_id:req.params.id},{
            type:req.body.type,
            policy_name:req.body.policy_name,
            content:req.body.content
        });
        res.status(200).json({message:"Policy udpated successfully", data:policy_details})
    } catch (error) {
        res.status(401).json({message:"Something went wrong while updating Policy",error:error.message})
        
    }
})

//dekete Faq
router.delete('/:id', async(req,res)=>{
    try {
        const delete_newsletter = await policies_schema.findByIdAndDelete(req.params.id);
        res.status(200).json({ message:"Policy deleted successfully", deleted_email:delete_newsletter });
    } catch (error) {
        res.status(500).json({message:error.message, status:"Something went wrong while deleting Policy"})
    }
})

module.exports=router
