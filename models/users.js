const mongoose= require("mongoose")
const user_schema= mongoose.Schema({
    admin_id:{
        type:String,
    },
    allow_access_to:[{
        type:String,
        enum:["press release", "faq", "policies"]
    }],
  
    name: {
        type: String,
        required: true
    },
    role:{
        type:String,
        required:true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
},{timestamps: true});
module.exports=mongoose.model("user",user_schema)