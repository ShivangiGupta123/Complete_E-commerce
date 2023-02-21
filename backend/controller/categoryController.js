const category = require('../collections/category')
exports.addCategory = async(req,res)=>{
    try{
         let data = new category(req.body)
          let newdata = await data.save()
          res.status(200).json({
          success : true ,
          message : "successfully added the product",
          data : {newdata}
         })
      
    }
    catch(err){
        console.log(err)
        res.send(err)
    }


}

exports.viewCategory = (req,res)=>{
    category.find((err , viewcategory)=>{
        if(err)
        {
            console.log("err", err)
        }
        else {
            res.status(200).send(
               viewcategory
            )
        }

    })
}
// exports.deleteCategory = async(req,res)=>{
//     const id = req.params.id;
//     try{
//       const productdelete = await category.findByIdAndRemove(id)
//       res.status(202).json({message : "This category is deleted successfullyin database",datadeleted :productdelete})
//     }
//     catch(err){
//       console.log(err)
//       res.status(500).json({message : "something went wrong"})
//     }
//   }
  






exports.deleteCategory = async(req,res)=>{
    await category.findByIdAndRemove(req.params.id).then((res)=>{
        res.send("category item is deleted successfully")

    }).catch((err)=>{
        console.log(err)
        res.status(500).json({
            error : err
        })

    })
}

