var mongoose= require("mongoose");
const contactSchema= mongoose.Schema({
    anonymous:{
        type:Boolean,
        default:false
    },
    name:{
        type:String,
        // required:true
    },
    email:{
        type:String,
        // required:true
    },
    mobile:{
        type:Number,
        // required:true
    },
    company:{
        type:String,
        // required:true
    },
    designation:{
        type:String,
        // required:true
    },
    business_name:{
        type:String,
        // required:true
    },
    service_name:{
        type:String,
        // required:true
    },
    our_presence:{
        type:String,
        // required:true,
    },
    choose_within:{
        type:String,
        // required:true
    },
    message:{
        type:String,
        // required:true
    },
    authorize:{
        type:Boolean,
        // default:false
    }

},{timestamps:true})
module.exports=mongoose.model("contact us",contactSchema)