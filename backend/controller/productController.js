const Product = require('../collections/product')
// const Mens = require('../collections/Men')
//get product data api
exports.getProducts = (req,res) =>{
  Product.find((err,products)=>{
    if(err)
    {
      console.log("error",err)

    }
    else{
      res.status(200).json({success : true,products : products})
    }
    
   
})
    // console.log(req.userId)
}


// exports.MensProducts = (req,res) =>{
//   Mens.find((err,mensproducts)=>{
//     if(err)
//     {
//       console.log("error",err)

//     }
//     else{
//       res.status(200).json({success : true,mensproducts : mensproducts})
//     }
    
   
// })
//     // console.log(req.userId)
// }






























































// //delete data api
// exports.deleteProducts = async(req,res)=>{
//   const id = req.params.id;
//   try{
//     const productdelete = await Product.findByIdAndRemove(id);
//     res.status(202).json({message : "This product data is deleted successfullyin database",datadeleted :productdelete})
//   }
//   catch(err){
//     console.log(err)
//     res.status(500).json({message : "something went wrong"})
//   }
// }
// update product data api

// exports.updateProducts = async(req,res) =>{
  //   multerdata()
  
  //   const id = req.params.id
  //   const updateproductdata = {
  //     userId : req.userId,
  //     name:req.body.name,
  //     price:req.body.price,
  //     ratings:req.body.ratings,
  //     image:{
        
  //       fileName:req.file.originalname,
  //       filePath:req.file.path,
  //       fileType:req.file.mimetype
  
        
  //     },
  //     category:req.body.category
  // }
  // try{
  //   await Product.findByIdAndUpdate(id, updateproductdata,  {new : true})
  //   res.status(200).json(updateproductdata)
  
  // }
  // catch(err){
  //   console.log(err)
  //   res.status(500).json({message : "something went wrong"})
  // }
  // }
// const cloudinary = require('cloudinary').v2
// cloudinary.config({ 
//     cloud_name: "dutvvvmpk",
//     api_key: "758786178967964",
//     api_secret: "1t6emj1Km9Kj6wC9OQvFiuG69Vc"
   
//   });

// exports.uploadProduct = async (req, res) => {

//     const file = req.files.image
  
//     try{
//   console.log(file);
//   cloudinary.uploader.upload(file.tempFilePath,function(err,result){
//     console.log('result =',result)
//    if(err)
//    {
//     console.log(err)
//    }
 
//         res.send({
//             sucess:true,
//             data: {
//             public_id: result.public_id,
//             // url: result.url
//             result
//         }
//         })
    
    
//   })
//   }
//   catch(err){
//     console.log("Error", err)
  
//   }
//   } 

// exports.uploadProduct = async (req, res) => {
//     const file = req.files.image
//     const result = await cloudinary.uploader.upload(file.tempFilePath, {
//        public_id:`{Date.now()}`,
//        resource_type: "auto" ,
//        folder : "images"
//     })
//     res.json(result)
// }