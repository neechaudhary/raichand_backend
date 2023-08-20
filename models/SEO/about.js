var mongoose= require("mongoose")
const seo_about= mongoose.Schema({
    seo_title:{
        type:String
    },
    description:{
        type:String,
    },
    seo_keyword:{
        type:String
    }
},{timestamps:true})
module.exports=mongoose.model("seo_about", seo_about);