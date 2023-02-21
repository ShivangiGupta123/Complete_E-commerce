const Product = require('../collections/product')
exports.uploadProduct = async (req,res)=>{
      try{
        // console.log("req.file",req.file)
        // console.log("req.body",req.body)
        // console.log("req.file.filename",req.file.filename)
        // console.log("req.file.originalname",req.file.originalname)
      
        let productData = new Product({
          userId : req.userId,
          categoryId :req.body.categoryId,
          name:req.body.name,
          price:req.body.price,
          ratings:req.body.ratings,
          // profilePic:(req.file) ? req.file.filename :null,
          profilePic:{
            
            fileName:req.file.originalname,
            filePath:req.file.path,
            fileType:req.file.mimetype
          }
          // role:req.body.role

          
        })
      
        productData.save().then(()=>res.status(201).json({success : true ,  message : "successfully product data is saved in database", product: productData , categoryId : req.categoryId})).catch((err)=>console.log(err))
        console.log("req.body.categoryId",req.body.categoryId)
        
      }
      catch(err)
      {
        console.log(err)
      }
    }

//get product api
exports.getProductsbyAdmin = (req,res) =>{
  Product.find()
.populate('categoryId', 'categoryName')
.then((product)=>{
  console.log(product)
  res.send(product)
})
.catch(error=>console.log(error));
 
}



// delete data api
exports.deleteProducts = async(req,res)=>{
  const id = req.params.id;
  try{
    const productdelete = await Product.findByIdAndRemove(id)
    res.status(202).json({message : "This product data is deleted successfullyin database",datadeleted :productdelete})
  }
  catch(err){
    console.log(err)
    res.status(500).json({message : "something went wrong"})
  }
}



// exports.getProductsbyAdmin = (req,res) =>{
//   Product.find((err,products)=>{
//     if(err)
//     {
//       console.log(err)
//     }
//     else{
//       res.status(200).json( products)
//     }
    
   
// })
//     // console.log(req.userId)
// }


// exports.getProductsbyAdmin = (req,res) =>{
//   Product.find().populate('categoryId','categoryName').then((result)=>{
//     res.status(200).json({
//       result :result
      

//     })
//   }).catch((err)=>{
//     console.log(err)

//     res.status(500).json({
//         error : err
//     })
//   })
 
// }

// exports.getProductsbyAdmin = (req,res) =>{
//   Product.find()
// .populate('categoryId', 'categoryName')
// .then((product)=>{
//   console.log(product)
//   res.send(product)
// })
// .catch(error=>console.log(error));
 
// }
