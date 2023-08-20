const mongoose= require('mongoose');
const investor_relation= mongoose.Schema({
    inv_title:{
        type:String,
        required:true
    },
    inv_period:{
        type:String,
        required:true
    },
    inv_category:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:"Investor category"
    },
    inv_tags:{
        type:String,
    },
    inv_file_name :{
        type:String,
    },
    inv_file_link:{
        type:String,
    },
    inv_file_size:{
        type:String,
    },
    fileType:{
        type:String
    },
    inv_file_upload_date:{
        type:String,
    },
    slug:{
        type:String,
        required:true
    }
},{timestamps:true});
module.exports= mongoose.model('investor_relation', investor_relation);