import React, {useState ,useEffect} from 'react'
import axios from 'axios';

import { Link , useNavigate } from 'react-router-dom';
import { useSelector} from 'react-redux'
// import {useDispatch } from 'react-redux'
// import { logout } from '../services/actions/action';

import './Home.css'
function Home() {
    const [data , setData] = useState([])
    useEffect(()=>{
        axios.get('http://localhost:8000/api/v1/viewcategory').then((res)=>{
            setData(res.data)

        }).catch((error)=>{
            console.log("error",error)
        })
    },[])




    const nav = useNavigate();
    
    

    const count = useSelector((state)=>state)
    // const dispatch = useDispatch()
    

    console.log('count',count)
    return (
        // <div >
        // <div className="m-4">
        <header>
    <nav className="navbar navbar-expand-sm navbar1">
        <div className="container-fluid">
            <Link to ="/" className="navbar-brand">ONLINE SHOPPING</Link>
            <button type="button" className="navbar-toggler" data-bs-toggle="collapse" data-bs-target="#navbarCollapse">
                <span className="navbar-toggler-icon"></span>
            </button>
            <div id="navbarCollapse" className="collapse navbar-collapse">
                <ul className="nav navbar-nav">
                    
                    <li className="nav-item">
                        <Link to="/getproduct" className="nav-link">All Products</Link>
                    </li>
                    {data.map((item)=>(
                        <li className="nav-item">
                        <Link to="/viewcategory" className="nav-link">{item.categoryName}</Link>
                    </li>

                    ))}
                    
                    
                 
                    
                </ul>
                <ul className="nav navbar-nav ms-auto">
                <li className="nav-item">
                        
                <Link to = "/getcart" ><i className="fa badge fa-lg" value={count} style = {{fontSize : 27}}>&#xf07a;</i></Link>
            </li>
                    
                   
                </ul>
              
                {

                localStorage.getItem('token')?
                            
                <button  style = {{marginRight :10}} className="btn btn-info" onClick = {()=>{

                    localStorage.removeItem("token") 
                    nav('/usersignin')
                }}>Logout</button>
                
                
                :

                
                <button style = {{marginRight :10}} className="btn btn-dark" onClick ={()=>{
                    nav('/usersignin')

                }}>Login</button>

            }
         


           {/* {
                localStorage.getItem('token1')?
                            
                <button className="btn btn-dark" onClick = {()=>{
                    localStorage.removeItem("token1")
                    nav('/adminsignin')
                }}>AdminLogout</button>:
                
                <button className="btn btn-info" onClick ={()=>{
                    nav('/adminpanel')

                }}>Admin</button>

            } */}
               
            </div>
        </div>
    </nav>    
   
    </header>
 


// </div>

            
//   </div>      
    )

}

export default Home
