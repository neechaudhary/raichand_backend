var mongoose= require("mongoose")
const seo_contact= mongoose.Schema({
    seo_title:{
        type:String
    },
    slug:{
        type:String
    },
    description:{
        type:String,
    },
    seo_keyword:{
        type:String
    }
},{timestamps:true})
module.exports=mongoose.model("seo_contact", seo_contact);