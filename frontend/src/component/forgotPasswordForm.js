import axios from 'axios';
import React,{useState} from 'react'
import {  useNavigate} from 'react-router-dom'
function ForgotPassword() {
  // const headers = {
  //   'Content-Type': 'application/json',
  //   'authorization': localStorage.getItem('token')
  // }
    const nav = useNavigate();
    const [post , setpost] = useState({email:''})
    const changevalue =(e)=>{
        setpost({...post,[e.target.name]:e.target.value})
        console.log(post)
    }
    const submit =(e)=>{
        e.preventDefault()
        axios.post('http://localhost:8000/api/v1/forgotpassword' , post ).then((res)=>{
          console.log("res.data ",res.data)
          // console.log("token",res.data.token.token)
          // localStorage.setItem("token",res.data.token.token)
          

        }).catch((err)=>{
          console.log("err",err)
          alert(err.response.data.message) 
        })
        
    }
  return (
    <div>
    <div class="login-dark">
    <form onSubmit = {submit} >
        <h2 class="sr-only">Forgot Password</h2>
        
        <div class="illustration"></div>
        <div class="form-group"><input type="email"  name = "email" value ={post.email} required placeholder="Enter your email" onChange ={changevalue}/></div>
       
        <div class="form-group"><button class="btn btn-primary btn-block" >Submit</button>
 
        
        </div></form>
</div>

        
    </div>
  )
}

export default ForgotPassword