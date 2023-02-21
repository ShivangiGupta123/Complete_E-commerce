import React,{useState} from 'react'
import './adminSignin.css';
import {Link , useNavigate} from 'react-router-dom'
import axios from 'axios'
const headers = {
    'Content-Type': 'application/json',
    'authorization': localStorage.getItem('token1')
  }

  
function Signin() {
    const nav = useNavigate();

    const [post , setpost] = useState({email:'',password:''})
     const changevalue =(e)=>{
         setpost({...post,[e.target.name]:e.target.value})
        //  console.log(post)
     }
     const submit =(e)=>{
         e.preventDefault()
        

        axios.post('http://localhost:8000/api/v1/adminsignin',post, {
            headers: headers
          }).then((res)=>{

            // if(res.data.success === false){
            //     alert('wrong password')
            // }
            // console.log(res.data);
            // return true
            if(res.data.message)
            {
                alert("login successfully")
              
                localStorage.setItem("token1",res.data.token1)
                nav("/addproduct");
                console.log("token1",res.data.token1)
               
                console.log("headers =",headers)  
            }
        
           
  
           
           
        
        }).catch((error)=>{
            // console.log(error.response.data)
            console.log(error.response.data.message)

            //  console.log(error.message)

                console.log('error',error)
                
                alert(error.response.data.message) 

                
               

                // alert("email is not exist in database") 
                // alert(" password not match in  our database")

                // console.log("err.message1",err.message1)
            //    if(err)
            //    {
            //     alert("email is not exist in database") 
               
            //    }
            //    else{
            //     alert(" password not match in  our database")

            //    }

            
        })
     }
    return (
        <div>
        <div class="login-dark">
        <form onSubmit = {submit} >
            <h2 class="sr-only">Admin Panel</h2>
            <div class="illustration"><i class="icon ion-ios-locked-outline"></i></div>
            <div class="form-group"><input type="email"  name = "email" value ={post.email} required placeholder="Enter your email" onChange ={changevalue}/></div>
            <div class="form-group"><input type="password" name="password" value ={post.password} required placeholder="Enter your password" onChange ={changevalue}/></div>
            <div class="form-group"><button class="btn btn-primary btn-block" >Log In</button></div></form>
            
    </div>

            
        </div>
    )
}

export default Signin
