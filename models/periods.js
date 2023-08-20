const mongoose= require("mongoose")
const period_schema= mongoose.Schema({
    period:{
        type:String,
        required:true
    }
},{timestamps:true})

module.exports=mongoose.model("period",period_schema)