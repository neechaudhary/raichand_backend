const express = require("express");
const router = express.Router();
const press_schema = require("./../models/press_release");
const Category = require("./../models/category");
const fs = require("fs");
const moment = require("moment/moment");
const { val_press_release } = require("./../validation/validation")
const slugify = require("slugify");
const { populate } = require("dotenv");

//post file upload
router.post("/upload", val_press_release, async (req, res) => {
    try {
        if (req.files == null || req.files.length == 0) {
            res.send({
                status: 404,
                message: "No files uploaded"
            })
        } else {

            const slug = slugify(req.body.title, {
                replacement: "-",
                remove: /[*+~.()'"!:@]/g,
                lower: true
            })
            let period_for_slug = req.body.period

            let uplaoded_file = req.files.file_link;
            console.log(uplaoded_file) 
            // return false;


            let fileSize1 = uplaoded_file.size;
            // let fileSize=Math.round(fileSize1/1024)
            const units = ['bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];

            function niceBytes(x) {

                let l = 0, n = parseInt(x, 10) || 0;

                while (n >= 1024 && ++l) {
                    n = n / 1024;
                }

                return (n.toFixed(n < 10 && l > 0 ? 1 : 0) + ' ' + units[l]);
            }
            const fileSizeData = niceBytes(fileSize1)
            // console.log(typeof niceBytes(fileSize1))
            let ISOfileDate = moment().format("MMM Do YY");
            //  console.log(ISOfileDate)




            //to find out each file unique name we are adding date with the file name
            let filename = Date.now() + "-" + uplaoded_file.name;
            // console.log(filename)
            // console.log(uplaoded_file) 
            
            let fileType = uplaoded_file.mimetype;


            //use mv() method to upload the file to uploads directory
            uplaoded_file.mv("./uploads/" + filename)

            //save to database
            const save_file = new press_schema({
                title: req.body.title,
                period: req.body.period,
                category: req.body.category,
                tags: req.body.tags,
                file_name: filename,
                file_link: req.protocol + "://" + req.get("host") + "/" + filename,
                file_size: fileSizeData,
                file_date: ISOfileDate,
                fileType: fileType,
                slug: slug,
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
router.get("/upload/:id", async (req, res) => {
    try {
        const uploaded_file = await press_schema.findById(req.params.id);
    

        res.send(uploaded_file)
    } catch (error) {
        res.status(400).json({ message: error.message, error: "something went wront while fetching file" })
    }
})

//get single file from upload
router.get("/getupload", async (req, res) => {
    try {
        const uploaded_file = await press_schema.find({}).populate([{path:"category"}]);
console.log(uploaded_file)
        res.send(uploaded_file)
    } catch (error) {
        res.status(400).json({ message: error.message, error: "something went wront while fetching file" })
    }
})

//get single file from upload
router.get("/upload", async (req, res) => {
    try {
        // const uploaded_file = await press_schema.find();
        let allCategories = await Category.find();
        const uploaded_file = await press_schema.find();

        allCategories = allCategories.map((item) => ({...item._doc, items: uploaded_file.filter((uf) => String(uf.category) === String(item._id))}))


        res.send(allCategories)
    } catch (error) {
        res.status(400).json({ message: error.message, error: "something went wront while fetching file" })
    }
})

//update file
router.put("/update/:update_filename", (req, res) => {
    const update_filename = req.params.update_filename;
    const file_to_update = req.files ? req.files.file : null;

    // Check if a file was provided in the request
    if (!file_to_update) {
        return res.status(200).json({ message: "No file provided to update" })
    }

    // Check if the file exists in the "uploads" folder
    fs.access(`./../uploads/${update_filename}`, (err) => {
        if (err) {
            return res.status(500).json({ message: 'Error updating file' });
        }
        return res.json({ message: 'File updated successfully' });
    })

})

//delete file
router.delete("/upload/:id", async (req, res) => {
    try {
        const delete_file = await press_schema.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: "File deleted succesfully", data: delete_file })
    } catch (error) {
        res.status.json({ message: "something went wrong while deleting Press release", error: error.message })
    }
})


module.exports = router;