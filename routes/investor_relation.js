const express = require("express");
const router = express.Router();
const investor_schemag = require("./../models/investor_relation");
const investor_cat_schema = require("./../models/investor_category");
const fs= require("fs")
const moment = require("moment/moment");
const {val_investor_relation} = require("./../validation/validation");
const { default: slugify } = require("slugify");


//post file upload
router.post("/", val_investor_relation, async (req, res) => {
    try {
        if (req.files == null || req.files.length == 0) {
            res.send({
                status: 404,
                message: "No files uploaded"
            })
        } else {
            const slug = slugify(req.body.inv_title, {
                replacement: "-",
                remove: /[*+~.()'"!:@]/g,
                lower: true
            })

            let uplaoded_file = req.files.inv_file_link;
            console.log(uplaoded_file)
            const invFileSize= uplaoded_file.size;

            const units = ['bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
   
            function niceBytes(x){
            
              let l = 0, n = parseInt(x, 10) || 0;
            
              while(n >= 1024 && ++l){
                  n = n/1024;
              }
              
              return(n.toFixed(n < 10 && l > 0 ? 1 : 0) + ' ' + units[l]);
            }

            const invfileSizeData= niceBytes(invFileSize)


            // get file upload date start 
            let fileUplaodDate= moment().format("MMM Do YY");  
            console.log(fileUplaodDate)
            // get file upload date end

            //to find out each file unique name we are adding date with the file name
            let filename = Date.now() + "-" + uplaoded_file.name;
            console.log(filename)
            console.log(uplaoded_file)

            let fileType = uplaoded_file.mimetype;


            //use mv() method to upload the file to uploads directory
            uplaoded_file.mv("./inv_uploads/" + filename)

            //save to database
            const save_file = new investor_schemag({
                inv_title: req.body.inv_title,
                inv_period: req.body.inv_period,
                inv_category: req.body.inv_category,
                inv_tags: req.body.inv_tags,
                inv_file_name: filename,
                inv_file_link: req.protocol + "://" + req.get("host") + "/" + filename,
                inv_file_size:invfileSizeData,
                fileType:fileType,
                inv_file_upload_date:fileUplaodDate,
                slug:slug
                
            })
            await save_file.save();
            res.send({
                status: 200,
                message: "Successfully uploaded " + filename
            })
        }

    } catch (error) {
        res.status(500).send(error.message);
    }
})

//get single file from upload
router.get("/:id", async (req, res) => {
    try {
        const uploaded_file = await investor_schemag.findById(req.params.id);
        res.send(uploaded_file)
    } catch (error) {
        res.status(400).json({ message: error.message, error: "something went wront while fetching file" })
    }
})
router.get("/data/investor", async(req,res)=>{
    try {
        const uploaded_file = await investor_schemag.find({}).populate([{path:"inv_category"}]);
        res.send(uploaded_file)
    } catch (error) {
        res.status(400).json({ message: error.message, error: "something went wront while fetching file" })
    }
    
})

//get single file from upload
router.get("/", async(req, res) => {
    try {
        let allCategories = await investor_cat_schema.find();
        const uploaded_file = await investor_schemag.find();

        allCategories = allCategories.map((item) => ({...item._doc, items: uploaded_file.filter((uf) => String(uf.inv_category) === String(item._id))}))

        res.send(allCategories)
    } catch (error) {
        res.status(400).json({ message: error.message, error: "something went wront while fetching file" })
    }
})

//update file
router.put("/:update_filename", (req,res)=>{
    const update_filename= req.params.update_filename;
    const file_to_update= req.files ? req.files.file:null;

    // Check if a file was provided in the request
    if(!file_to_update){
        return res.status(200).json({message:"No file provided to update"})
    }
    
     // Check if the file exists in the "uploads" folder
     fs.access(`./../uploads/${update_filename}`,(err)=>{
        if(err){
            return res.status(500).json({ message: 'Error updating file' });
        }
        return res.json({ message: 'File updated successfully' });
     })

})

//delete file
router.delete("/:id", async (req, res) => {
        try {
            const delete_file = await investor_schemag.findByIdAndDelete(req.params.id);
            res.status(200).json({ message: "File deleted succesfully", data: delete_file })
        } catch (error) {
            res.status.json({ message: "something went wrong while deleting Press release", error: error.message })
        }
    })


module.exports = router;