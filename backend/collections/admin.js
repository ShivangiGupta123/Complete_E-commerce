const mongoose = require('mongoose')
const adminschema = new mongoose.Schema({
    name : {type : String, required : true , trim : true},
    email : {type : String , required : true , trim :true},
    password : {type : String , required : true},
    role : {type : String, required : true ,
        enum :{values:['superadmin', 'admin'],
        message:'Please select either admin or user'
    }},

   
},{timestamps:true})
module.exports = mongoose.model('admin', adminschema)