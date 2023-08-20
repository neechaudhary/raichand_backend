const mongoose= require("mongoose")
const category_schema= mongoose.Schema({
    category:{
        type:String,
        required:true
    }
},{timestamps:true})

module.exports=mongoose.model("category",category_schema)