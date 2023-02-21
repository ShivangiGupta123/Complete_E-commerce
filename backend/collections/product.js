const mongoose = require('mongoose')

const productschema = new mongoose.Schema({
    name: {
        type : String,
        // required : true
        required : [true, 'Please enter product name'],
        trim : true,
        maxLength : [100, 'Product name cannot exceed 100 characters']

    },
    price : {
        type : Number,
        required : [true, 'Please enter product price'],
        maxLength : [5, 'Product name cannot exceed 5 characters'],
        default : 0.0
    },
   
    ratings : {
        type : Number,
        default : 0
    },
    
    profilePic:{
        
        fileName:String,
        filePath:String,
        fileType:String,
        
        // data:Buffer,
        // contentType:String
    },
    

    // public_id : {
    //      type : String,
    //      required : true
    //  },
    // url : {
    //      type  : String,
    //      required : true
    //  }, 
             
    
   
        // createdAt : {
        //     type : Date,
        //     default : Date.now
        // },
        
        userId : {
            type : mongoose.Schema.Types.ObjectId,
            ref : "user",
       
        },

        // Role : {
        //     type :String,
        //     ref : "user",
        //     required : true
        // }
        categoryId : {
            type : mongoose.Schema.Types.ObjectId,
            ref : "category"

        }
        
     
        

    

},{timestamps:true})
module.exports = mongoose.model('Product',productschema)