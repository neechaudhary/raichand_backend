require("dotenv").config();
var mongoose = require("mongoose");

const connectDB= async ()=>{
    try {
        // mongoose.connect("mongodb+srv://techRaichand:Rbc1b05kAsWMN1qs@cluster0.yalzkc2.mongodb.net/")
        mongoose.connect(process.env.DATABASE)
        console.log("MONGODB connected to database");
    } catch (error) {
        console.log("Connection FAILED");
        
    }
}
module.exports = connectDB