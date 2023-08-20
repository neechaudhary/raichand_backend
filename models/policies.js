var mongooose= require("mongoose")
const policies_schema= mongooose.Schema({
    type:{
        type:String,
        enum:["Customers", "Personnels", "Suppliers"]
    },
    policy_name:{
        type:String,
        required:true,
        unique:true
    },
    slug:{
        type:String,
        required:true,
        unique:true
    },
    content:{
        type:String,
        required:true
    }
})
module.exports= mongooose.model("Policies", policies_schema)