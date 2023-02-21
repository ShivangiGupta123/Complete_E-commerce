import React, { useState, useEffect } from 'react'
import StripeCheckout from 'react-stripe-checkout'
import axios from 'axios'
const headers = {
    'Content-Type': 'application/json',
    'authorization': localStorage.getItem('token')
  }
function Getcart() {
    const [getdata, setGet] = useState([])
    // const [Email , stripeEmail] = useState('')
   
    var total = 0
   
    useEffect((event) => {

        console.log("headers", headers)
        axios.get('http://localhost:8000/api/v1/getaddedcart',{
            headers:headers
        
          
        }).then((res) => {
            console.log("res >> ", res)
            // event.preventDefault()
            console.log("test")
            console.log(res.data)
            setGet(res.data)
           
            
     


        }).catch((err) => {
            console.log(err)
        })


    }, [])
    const handleToken = (token)=>{
    //    const stripeEmail  ={}
       
        const data = {stripeToken : token.id , total  }
        console.log("token.idfrontend",data)

        axios.post('http://localhost:8000/api/v1/payment',data ).then((res)=>{

            console.log(res.data)
            console.log(res)
            if(res.data){
                alert("Payment Successful")
            }
            
        }).catch(err => console.log(err))
        console.log("token",token)
        console.log("token.id",token.id)
        // console.log("stripeEmail",stripeEmail)
        console.log("total",total)



    }
    const Remove = (cartId)=>{
        console.log("headers = cartdataheaders",headers)
        let data = {}
        data.cartId = cartId
        console.log("data.cartId",data.cartId)
        // console.log("data",data)
        // console.log("res.data ",res.data)
        axios.delete(`http://localhost:8000/api/v1/${cartId}`).then((res)=>{
            if(res.data)
            {
                alert("cart data is deleted please refresh the page")
            }
            console.log(res.data)
        }).catch((err)=>{
            console.log('err',err)
        })
    }
    return (
        <div>
     

        
         <h1 style = {{textAlign : 'center'}}>Shopping Cart Item </h1>
         {Object.keys(getdata).length && <div className="container">
         {Object.keys(getdata.cart).length && getdata.cart.map((item) => (

             <div className="row align-items-center my-5">
                 <div className="col-sm">
                 {('product' in item) && <img height={100} src={`http://localhost:8000/${item['product'].profilePic.fileName}`}/> } 
               </div>
               <div className="col-sm">
                 {('product' in item)  &&  item['product'].name  }
                 </div>
                 <div className="col-sm">
                 
                 {('product' in item)  &&  item['product'].category}
                 </div>
                 <div className = 'col-sm'>
                 {item['quantity']}
                 </div>
                 <div className = 'col-sm'>
               {/*{console.log(item.hasOwnProperty("product"))}*/}
                 
                 {('product' in item) && <p>₹{item['product'].price}</p>}
          
                 <p hidden>{total = total+item['product'].price}</p>
                
                 </div>
                
                 <div className = 'col-sm'>
                 <button type="button" onClick = {()=>Remove(item._id)} className="btn btn-danger">Remove</button>
                 </div>                
             </div>
         ))}
        

         <div className="input-group mb-3">
         <span className="input-group-text">Total Price</span>
         <span className="input-group-text">₹</span>
         <div>
       
         <h3>{total}</h3>

         </div>
         <div className = 'col-sm'>
         <StripeCheckout
         stripeKey='pk_test_51MAAWFSIL9UIeHdIZLihLsAr7aX4wiJphVGmFKgcyIkENIV5l5p6Cv2VYtNNJ8a5tLHIAdlGqUYiHyeGmg02qnVy00pcWkUYro'
         token = {handleToken}
        //  billingAddress
        //  shippingAddress
        // email = {stripeEmail(Email)}
        currency = "INR"
         amount = {total*100}
    

         description = {`your total is ${total}`}

         
         
         ></StripeCheckout>
       
         </div>
         
        
       </div>
     
     </div>}
        </div>
    )
}

export default Getcart
