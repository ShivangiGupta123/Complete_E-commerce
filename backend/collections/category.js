const mongoose = require('mongoose')
const categoryschema = new mongoose.Schema({
    categoryName : {
        type : String,
        required : true
    }

},{timestamps : true})
module.exports = mongoose.model('category',categoryschema)