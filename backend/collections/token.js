const mongoose = require('mongoose')
const tokenschema = new mongoose.Schema({
    userId : {
        type : mongoose.Schema.Types.ObjectId ,
        required : true,
        ref : "user"
    },
    token : {
        type : String,
        required : true
    },
    expiredAt :{
        type : Date,
        default : Date.now()+1000*60*30 ,
    },
    // resetPasswordExpire: Date
})
// Token.methods.hasExpired= function(){
//     var now = Date.now();
//     return (now - Date.parse(createDate)) > 604800000; // Date is converted to milliseconds to calculate 7 days it > one day = 24 hours * 60 minutes * 60 seconds *1000 milliseconds * 7 days = 604800000
// };
module.exports = mongoose.model('token' , tokenschema)