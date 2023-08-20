const mongoose= require('mongoose');
const press_release_schema= mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    period:{
        type:String,
        required:true
    },
    category:{
       type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:"category"
    },
    tags:{
        type:String,
    },
    file_name :{
        type:String,
    },
    file_link:{
        type:String,
    },
    file_size:{
        type:String,
        
    },
    fileType:{
        type:String
    },
    file_date:{
        type:String
    },
    slug:{
        type:String,
        required:true
    }
},{timestamps:true});
module.exports= mongoose.model('Press_release', press_release_schema);