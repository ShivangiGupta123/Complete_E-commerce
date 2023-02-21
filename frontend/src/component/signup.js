import React, { useState } from 'react'
import { Link ,useNavigate } from 'react-router-dom'
import './signin.css'
import axios from 'axios'

const headers = {
    'Content-Type': 'application/json',
    'authorization': localStorage.getItem('token')
  }

function UserSignup() {
    const nav = useNavigate();

    const [post, setpost] = useState({ firstname: '',lastname :'', email: '', password: '', password_confirmation:'',phone :'',role: '' })
    const changevalue = (e) => {
        setpost({ ...post, [e.target.name]: e.target.value })
        // console.log(post)
    }
    const submit = (e) => {
        e.preventDefault();
        
    
        axios.post('http://localhost:8000/api/v1/signup',post, {
            headers: headers
          }).then((res)=>{
              console.log("headers =",headers)
            //   console.log("token 1=",res.data.token)
            //   console.log("message=",res.data.message)
       

             


            // console.log("res.data1",res.data);
            
    

            if(!res.data.details)
            {
                alert("register successfully")
                localStorage.setItem("token",res.data.token)
                nav("/usersignin");
            }
            else{
                alert(res.data.details[0].message)
            }
           
              
        }).catch((err)=>{
            console.log('err',err)
                alert(err.response.data.message)
       
             
        })
    }
    return (
        <div>

        <div class="login-dark">
        <form onSubmit = {submit} >
            <h2 class="sr-only">User Signup</h2>
            
            <div class="illustration"></div>
                    <div className="form-group">
                      
                        <div> <input type="text"  name="firstname" value={post.firstname} required placeholder="Enter your  firstname" onChange={changevalue} /> </div>
                    </div>
                    <div className="form-group">
                  
                    <div> <input type="text"  name="lastname" value={post.lastname} required placeholder="Enter your lastname" onChange={changevalue} /> </div>
                </div>
                    <div className="form-group">
                        <div> <input type="email"  name="email" value={post.email} required placeholder="Enter your Email" onChange={changevalue} /> </div>
                    </div>
                    <div className="form-group">
                     
                        <div> <input type="password"  name="password" value={post.password} required placeholder="Enter your Password" onChange={changevalue} /> </div>
                    </div>
                    <div className="form-group">
                    
                        <div> <input type="password"  name="password_confirmation" value={post.password_confirmation} required placeholder="Enter your ConfirmPassword" onChange={changevalue} /> </div>
                    </div>
                    <div className="form-group">
                      
                    <div> <input type="text" name="phone" value={post.phone} required placeholder="Enter your phone" onChange={changevalue} /> </div>
                </div>
                    <div className="form-group">
                      
                        <div> <input type="text"  name="role" value={post.role} required placeholder="Enter your Role" onChange={changevalue} /> </div>
                    </div>
                    <div class="form-group"><button class="btn btn-primary btn-block" >Signup</button><p className="form-group">Have an account?<Link to="/usersignin">Login</Link></p></div>
                   
                    
                </form>
            </div>


        </div>
    )
}

export default UserSignup
