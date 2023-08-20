
const express = require("express");
const router = express.Router();
const faq_Schema = require("./../models/faq");
const { val_faq } = require("./../validation/validation")

//post Faq
router.post('/', val_faq, async (req, res) => {

    //save data to database
    const save_faq = new faq_Schema({
        type: req.body.type,
        heading: req.body.heading,
        content: req.body.content
    })
    try {
        await save_faq.save();
        res.status(200).json({ message: "Your FAQ has been saved", data: save_faq });
    } catch (error) {
        res.status(500).json({ message: error.message, status: "Something went wrong while saving Faq." });
    }
})

//get all Faq
router.get("/all/admin", async (req, res) => {
    try {
       
        const vendorFaq = await faq_Schema.find()

        return res.status(200).json({ message: "Successfully fetched all faq", data:vendorFaq });

    } catch (error) {
        res.status(500).json({ message: error.message, status: "Something went wrong while fetch faq list" })
    }
})

//get all Faq
router.get("/all", async (req, res) => {
    try {
        const { perPage, pageNo } = req.query;

        let toSkip = (Number(pageNo) - 1) * Number(perPage);


        let customerFaq = [], personalFaq = [], vendorFaq = [];

        customerFaq = await faq_Schema.find({ type: "customers" })
            .skip(toSkip)
            .limit(perPage)

        personalFaq = await faq_Schema.find({ type: "personnel" })
            .skip(toSkip)
            .limit(perPage)

        vendorFaq = await faq_Schema.find({ type: "vendor" })
            .skip(toSkip)
            .limit(perPage)

        return res.status(200).json({ message: "Successfully fetched all faq", customerFaq,
        personalFaq,
        vendorFaq });

    } catch (error) {
        res.status(500).json({ message: error.message, status: "Something went wrong while fetch faq list" })
    }
})
//get single Faq
router.get("/:id", async (req, res) => {
    try {
        const newsletter = await faq_Schema.findById(req.params.id);
        res.status(200).json({ message: "faq byID", data: newsletter });
    } catch (error) {
        res.status(500).json({ message: error.message, status: "Something went wrong while fetch faq" })
    }
})

//update faq
router.put("/:id", async (req, res) => {
    try {
        const update_faq = await faq_Schema.findByIdAndUpdate({ _id: req.params.id }, {
            type: req.body.type,
            heading: req.body.heading,
            content: req.body.content,
        })
        res.status(200).json({ message: "Faq updated successfully", data: update_faq })
    } catch (error) {
        res.status(400).json({ message: "something went wrong while updating faq", error: error })

    }
})

//dekete Faq
router.delete('/:id', async (req, res) => {
    try {
        const delete_newsletter = await faq_Schema.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: "Faq deleted successfully", deleted_email: delete_newsletter });
    } catch (error) {
        res.status(500).json({ message: error.message, status: "Something went wrong while deleting Faq" })
    }
})


router.get("/search/:key", async(req,res)=>{
    const data= await faq_Schema.find({
        "$or":[{"heading":{$regex:req.params.key}}]
    })
    res.send(data)
})
module.exports = router;