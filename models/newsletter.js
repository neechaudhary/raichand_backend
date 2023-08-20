var mongoose= require('mongoose');
const newsletter_schema= mongoose.Schema({
    email:{
        type:String,
        required:true
    }
}, {timestamps:true});
module.exports= mongoose.model('newsletter', newsletter_schema)