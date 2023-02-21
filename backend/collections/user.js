const mongoose = require('mongoose')
const userschema = new mongoose.Schema({
    firstname : {type : String , required : true , trim : true},
    lastname : {type : String , required : true , trim : true},
    email : {type : String , required : true , trim :true},
    password : {type : String , required : true},
    password_confirmation : {type:String , required : true},
    phone : {type : String , required : true},
    role : {type : String, required : true ,
        enum :{values:['user', 'admin'],
        message:'Please select either admin or user'
    }},
    reset_token : {
        type : String,
        // required : true
    },
    expiredAt :{
        type : Date,
        default : Date.now()+1000*60*30 ,
    },

   
},{timestamps:true})
module.exports = mongoose.model('user', userschema)