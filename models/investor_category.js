const mongoose= require("mongoose")
const inv_cat_schema= mongoose.Schema({
    inv_category:{
        type:String,
        required:true
    }
},{timestamps:true})

module.exports=mongoose.model("Investor category",inv_cat_schema)