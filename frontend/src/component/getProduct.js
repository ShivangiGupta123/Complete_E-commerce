import React, { useState, useEffect } from 'react'
import {useDispatch } from 'react-redux'
import {useNavigate} from 'react-router-dom'
import { Rating } from './Rating'
import axios from 'axios'

import { incNumber } from '../services/actions/action';
import '../../node_modules/bootstrap/dist/css/bootstrap.min.css'

function Getproduct() {
    const nav = useNavigate()
    
    const dispatch = useDispatch()
    const [getdata, setGet] = useState([])
    const [loading ,setLoading] = useState(false)
    const headers = {
        'Content-Type': 'application/json',
        'authorization': localStorage.getItem('token')
      }
 
    useEffect((event) => {
// console.log('hh', headers)
        setLoading(true)
        setTimeout(GetData,2000)
        function GetData(){
        axios.get('http://localhost:8000/api/v1/getproduct',{headers :headers}).then((res) => {
          setLoading(false)
        console.log("res >> ", res)
            // event.preventDefault()
           
            console.log(res.data)
          
            setGet(res.data)
            setGet(res.data.products)


        }).catch((err) => {
            
            console.log('err',err)
            alert(err.response.data.message)
            nav('/usersignin')

        })
    }


    }, [])
    if(loading)
    {
        return(
            <div style={{position:'relative', top: 330, left: 690 }}>
            
            <p ><i class="fa fa-spinner fa-spin" style = {{fontSize : 50  }}></i></p>
            </div>
        )
    }

    const addToCartHandler =(product,user) => {


        let data = {};
        data.product= product;
        data.user = user
     
        console.log('data.product',data.product)
        // console.log('data.user',data.user)
       

        dispatch(incNumber(1))

        
      
        
     
        axios.post('http://localhost:8000/api/v1/postcart',data, {
            headers:headers
        
          
        }).then((res)=>{
            console.log(res.data)
            // res.send(res.data)
          
            
      }).catch((err)=>{
          console.log('err',err)
          
      })
    }

    return (
        <div style ={{margin : 50}}>
       



    {/* {console.log(getdata)}*/ }

            <div className="row gy-5">
           {/*getdata.slice(0,3).map((item)*/}
                {getdata.map((item) => (
                    
                    <div className="col-md-4">
                    {/*{console.log("item in get product page  >> ", item)}*/}
                        <div className="card card-block">
                        <h4 className="card-text" style ={{margin :10}}>{item.name}</h4> 
                            <img height={246} src={`http://localhost:8000/${item.profilePic.fileName}`} classNameName="card-img-top" alt="..." />
                            <div className="card-body">
                                 
                                
                                <p className="card-text"> ₹{item.price}</p>
                               
                                <Rating  className="card-text" value =  {item.ratings}  />
                                <p className="card-text">Category: {item.category}</p>
                                <form >
                              <button type="button" onClick = {()=>addToCartHandler(item._id)}className="btn btn-primary">Add to Cart</button>
                                </form>
                                
                                

                            </div>
                        </div>
                    </div>
                ))}
            </div>



            

        </div>
 )}

 export default Getproduct

//  <p className="card-text">Ratings: {item.ratings}</p>