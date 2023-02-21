const cartschema = require('../collections/cart')
// const Product = require("../collections/product")
const stripe = require('stripe')('sk_test_51MAAWFSIL9UIeHdIRt2jkIyuwzsDO5RdNvvqjammp3WEoWixRAwUFBrsHiEPpIHwjqhwAglCSu2wTwAFttwwZtbH00f98UaF9H')
exports.postCart = async(req,res)=>{
    console.log("product_id",req.body.product)
     
        const cartdata = new cartschema({
            product : req.body.product,
            user : req.user,
            quantity : req.body.quantity
        })
        console.log("req.user._id",req.user)
        return cartdata.save()
    .then((result)=>{
            console.log(result)
            res.status(201).json({
                success : true,
                message : "cartdata is stored in the database",
                createdOrder :{
                    _id : result._id,
                    product : result.product,
                    user : result.user,
                    quantity : result.quantity
    
                },
               
            })
        
    }).catch((err)=>{
        console.log(err)
       
        return res.status(404).json({
            message :" product not found",
            error : err

        })
        
    } )

}
exports.getAddedCart = async(req,res)=>{
    // console.log("user.body>>>",req.body)
    // console.log("req.user.id",req.user.id)
    console.log("req.user>>",req.user);
    // console.log("req.user.id",req.user.id)
    (cartschema.find({user: req.user})).populate('product').populate('user','email').then((doc1)=>{
        // console.log("doc1 >> ", doc1 )
        // console.log("req.user>>>",req.user)
                res.status(200).json({
                    success : true,
                    // count : docs.length,
                    cart : doc1.map((doc)=>{
                        return {
                            _id : doc._id,
                            product  : doc.product,
                            user : doc.user,
                            quantity : doc.quantity,
                            
                 
        
        
                        }

     

                    })
        
                })
            }).catch((err)=>{
                res.status(500).json({error : err})
                console.log("err",err)
        
            })
    


}

// exports.getAddedCart = (req,res) =>{
//     cartschema.find()
//   .populate('product')
//   .then((product)=>{
//     console.log("products >>>>>>",product)
//     res.send(product)
//   })
//   .catch(error=>console.log(error));
   
//   }





exports.delSpecificCart = async(req,res)=>{
    console.log('req.params.cartId',req.params.cartId)
    // console.log('req.cartId',req.cartId)
    

     await cartschema.findByIdAndDelete(req.params.cartId).then(()=>{
        res.status(200).json({
            message : "cartdata is deleted",
         
            
        })
    }).catch(err=>{
        console.log(err)

        res.status(500).json({
            error : err
        })
       
    })
}
exports.payment = async(req,res)=>{
    const total = req.body.total
    //  const card = []
    // const token = req.body.token 
    console.log("req.body",req.body)
    let email;
    $stripeinfo = stripe.tokens.retrieve(req.body.stripeToken).then((ress)=>{
        email=ress.card.name
        console.log('stripeInfo', ress.card.name);
        stripe.customers.create({
            email : email,
            source : req.body.stripeToken
    
        }).then(customer=>{ 
            console.log("customer",customer)
            stripe.paymentIntents.create({
                
                amount : total*100,
                currency : "INR",
                customer : customer.id,
            
       
                confirm: true,
                payment_method_types:['card'],
                payment_method: customer.default_source,
                // payment_method : customer.email
                
    
            })
            .then(async (result) =>{
                console.log("result",result)
               
                    res.status(200).json({message : "successfully done the payment" , result: [result] })
    
               
    
            })
        })
    })
    // console.log("email")
    // stripe.customers.create({
    //     email : "sakshi@gmail.com",
    //     source : req.body.stripeToken

    // }).then(customer=>{ 
    //     console.log("customer",customer)
    //     stripe.paymentIntents.create({
            
    //         amount : total*100,
    //         currency : "INR",
    //         customer : customer.id,
        
   
    //         confirm: true,
    //         payment_method_types:['card'],
    //         payment_method: customer.default_source,
    //         // payment_method : customer.email
            

    //     })
    //     .then(async (result) =>{
    //         console.log("result",result)
           
    //             res.status(200).json({message : "successfully done the payment" , result: [result] })

           

    //     })
    // })
  


    .catch(err => console.log(err))
    // console.log("req.body.stripeEmail",req.body.stripeEmail)
    // console.log("req.body.stripeToken",req.body.stripeToken)
    // console.log("req.customer",req.customer)
    

}

    




























// cartschema.findById(req.user).select('product user quantity _id').populate('product').populate('user').then((docs)=>{
//     res.status(200).json({
//         count : docs.length,
//         cart : docs.map((doc)=>{
//             return {
//                 _id : doc._id,
//                 product  : doc.product,
//                 user : doc.user,
//                 quantity : doc.quantity,
                


//             }
//         })

//     })
// }).catch((err)=>{
//     res.status(500).json({error : err})
//     console.log("err",err)

// })



// }
// exports.getOrder = async(req,res)=>{
//     orderschema.find().select('product user quantity _id').populate('product').populate('user').then((docs)=>{
//         res.status(200).json({
//             count : docs.length,
//             order : docs.map((doc)=>{
//                 return {
//                     _id : doc._id,
//                     product  : doc.product,
//                     user : doc.user,
//                     quantity : doc.quantity,
//                     request : {
//                         type : "GET",
//                         url : "http://localhost:8000/api/v1/" + doc._id
//                     }


//                 }
//             })

//         })
//     }).catch((err)=>{
//         res.status(500).json({error : err})

//     })

// }
// exports.getorderById = async(req,res)=>{
//     orderschema.findById(req.params.order_id).populate('product').populate('user').then(order =>{
//         res.status(200).json({
//             order : order,
//             request :{
//                 type : "GET",
//                 url : "http://localhost:8000/api/v1/"
//             }

//         })
//     }).catch(err =>{
//         res.status(500).json({
//             error :err
//         })
//     })

// }
// exports.deleteorderById = async(req,res)=>{
//     orderschema.remove({_id : req.params.orderId}).then(order=>{
//         res.status(200).json({
//             message : "order is deleted",
//             request :{
//                 type : "POST",
//                 url : "http://localhost:8000/api/v1/"
//             },
//             body : {productId : "ID" ,quantity : "Number"}
            
//         })
//     }).catch(err=>{
//         console.log(err)
        
//         res.status(500).json({
//             error : err
//         })
       
//     })
// }
//  // request : {
//                 //     type : "GET",
//                 //     url : "http://localhost:8000/api/v1/" + result._id
//                 // }