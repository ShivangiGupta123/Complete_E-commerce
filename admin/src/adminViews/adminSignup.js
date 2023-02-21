import React, { useState } from 'react'
import './adminSignup.css';
import { Link , useNavigate} from 'react-router-dom'
import axios from 'axios'


const headers = {
    'Content-Type': 'application/json',
    'authorization': localStorage.getItem('token1')
  }

function Signup() {
    const nav = useNavigate();
    const [post, setpost] = useState({ name: '', email: '', password: '', role: '' })
    const changevalue = (e) => {
        setpost({ ...post, [e.target.name]: e.target.value })
        // console.log(post)
    }
    const submit = (e) => {
        e.preventDefault();
        
        
        // axios.post('http://localhost:6000/api/v1/adminsignup', post)
        //     .then(response => response.data.admin)
        //     .catch(error => {
                
        //         console.log('There was an error!', error);
        //     });
        axios.post('http://localhost:8000/api/v1/adminsignup',post,{headers:headers}).then((res)=>{
            console.log(res);
            if(!res.data.details)
            {
                alert("register successfully")
                localStorage.setItem("token1",res.data.token1)
                nav('/adminsignin')

            }
            else{
                alert(res.data.details[0].message)
            }
            
                
            
           

            // if(res.data.message){
            //    alert("already registered on this mail")
            // }
            // else{
            //     alert("register successfully")
            //     localStorage.setItem("token",res.data.token)

            //     // nav("/adminsignin");
                
               
               
            // }

            // console.log(res.data.admin)
            // console.log("response of signup >> ", res);
          
        }).catch((err)=>{
            console.log('err',err)
            alert(err.response.data.message)
        })
    }
    return (
        <div>



            <div className="login-dark">

                
                <form onSubmit={submit}>
                    <div className="form-group">
                       
                        <div> <input type="text"  name="name" value={post.name} required placeholder="Enter your Name" onChange={changevalue} /> </div>
                    </div>
                    <div className="form-group">
                       
                        <div> <input type="email" name="email" value={post.email} required placeholder="Enter your Email" onChange={changevalue} /> </div>
                    </div>
                    <div className="form-group">
                       
                        <div> <input type="password" name="password" value={post.password} required placeholder="Enter your Password" onChange={changevalue} /> </div>
                    </div>
                    <div className="form-group">
                
                        <div> <input type="text" name="role" value={post.role} required placeholder="Enter your Role" onChange={changevalue} /> </div>
                    </div>
                    <div class="form-group"><button class="btn btn-primary btn-block" >Signup</button><p className="form-group">Have an account?<Link to="/adminsignin">Login</Link></p></div>

                </form>
            </div>


        </div>
    )
}

export default Signup
