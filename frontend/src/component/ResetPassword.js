import React,{useState} from 'react'
// import {useParams} from 'react-router-dom'
import axios from 'axios'
import { useSearchParams } from 'react-router-dom';

function ResetPassword() {
  // const params = useParams()
  // const {userId} = params

  // console.log("userId",userId)
  // const headers = {
  //   'Content-Type': 'application/json',
  //   'authorization': localStorage.getItem('token')
  // }

  const [searchParams, setSearchParams] = useSearchParams();
  const token = searchParams.get("token")

    const [post , setpost] = useState({password:'',password_confirmation:''})
    const changevalue =(e)=>{
        setpost({...post,[e.target.name]:e.target.value})
        console.log(post)
    }
    const submit =(e)=>{
        e.preventDefault()
        axios.post(`http://localhost:8000/api/v1/resetpassword`, {password:post.password,password_confirmation :post.password_confirmation ,token}  ).then((res)=>{
          console.log(res.data)
          // console.log("id",userId)
          // console.log("headers",headers)
        
                
          
          

        }).catch((err)=>{
          console.log("err",err)
          alert(err.response.data.message) 
        })
    }

  return (
    <div>
    <div class="login-dark">
    <form onSubmit = {submit} >
        <h2 class="sr-only">User Signin</h2>
        
        <div class="illustration"></div>
       
        <div class="form-group"><input type="password" name="password" value ={post.password} required placeholder="Enter your password" onChange ={changevalue}/></div>
        <div class="form-group"><input type="password" name="password_confirmation" value ={post.password_confirmation} required placeholder="Enter confirm password" onChange ={changevalue}/></div>
        <div class="form-group"><button class="btn btn-primary btn-block" >Reset</button>

        
        </div></form>
</div>

        
    </div>
  )
}

export default ResetPassword