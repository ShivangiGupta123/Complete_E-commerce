const mongoose = require('mongoose')
const cartschema = new mongoose.Schema({
     product : {type : mongoose.Schema.Types.ObjectId , ref : "Product" , required : true},
    
    user : {type : mongoose.Schema.Types.ObjectId , ref : "user" , required : true},
    
    quantity : {type : "Number" , default : 1},
    
},{timestamps:true})
module.exports = mongoose.model('carts', cartschema)