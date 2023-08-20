var mongoose= require("mongoose")
const seo_home= mongoose.Schema({
    seo_url:{
        type:String,
    },
    seo_title:{
        type:String
    },
    googleInsights:{
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
module.exports=mongoose.model("seo_home", seo_home);