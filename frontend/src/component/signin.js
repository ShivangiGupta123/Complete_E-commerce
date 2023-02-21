import React,{useState} from 'react'
import './signin.css'
import { Link , useNavigate} from 'react-router-dom'

import axios from 'axios'
const headers = {
    'Content-Type': 'application/json',
    'authorization': localStorage.getItem('token')
  }

  
function UserSignin() {
    const nav = useNavigate();

    const [post , setpost] = useState({email:'',password:''})
     const changevalue =(e)=>{
         setpost({...post,[e.target.name]:e.target.value})
         console.log(post)
     }
     const submit =(e)=>{
         e.preventDefault()
        

        axios.post('http://localhost:8000/api/v1/signin',post, {
            headers: headers
          }).then((res)=>{
              if(res.data.message)
              {
                alert("login successfully")
                console.log("token",res.data.token)
                
                localStorage.setItem("token",res.data.token)
            
                console.log("headers1 =",headers)  
                nav("/getproduct");
              }
              
           
            console.log(res.data)}).catch((error)=>{
                console.log(error.response.data.message)

            //  console.log(error.message)

                console.log('error',error)
                
                alert(error.response.data.message) 

            
        })
     }
    return (
        <div>
        <div class="login-dark">
        <form onSubmit = {submit} >
            <h2 class="sr-only">User Signin</h2>
            
            <div class="illustration"></div>
            <div class="form-group"><input type="email"  name = "email" value ={post.email} required placeholder="Enter your email" onChange ={changevalue}/></div>
            <div class="form-group"><input type="password" name="password" value ={post.password} required placeholder="Enter your password" onChange ={changevalue}/></div>
            <div class="form-group"><button class="btn btn-primary btn-block" >Signin</button><p className="form-group">don't have an account <Link to="/usersignup">Signup</Link></p>
            <Link to = "/forgotpassword">forgot password</Link>
            
            </div></form>
    </div>

            
        </div>
    )
}

export default UserSignin


