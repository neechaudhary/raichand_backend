var mongoose= require('mongoose');
const faq_Schema= mongoose.Schema({
    type:{
        type:String,
        enum:["vendor","customers","personnel"]
    },
    heading:{
        type:String,
        required:true
    },
    content:{
        type:String,
        require:true
    }
}, {timestamps:true});
module.exports= mongoose.model('FAQ', faq_Schema)