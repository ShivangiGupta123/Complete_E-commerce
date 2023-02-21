import React ,{useState , useEffect} from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom';
import './adminSignin.css';


function AddCategory() {
   const nav = useNavigate()
    const [data , setData] = useState([])
    const [post , setPost] = useState({categoryName : ''})
    const changevalue = (e)=>{
      setPost({...post , [e.target.name]:e.target.value})
    }
    const submit = (e)=>{
      e.preventDefault()
      axios.post('http://localhost:8000/api/v1/addcategory',post).then((res)=>{
        console.log("res.data",res.data)
        if(res.data){
          alert("Category added successfully")
          nav("/viewcategory")
      
          
         

          
          
        }

      }).catch((err)=>{
        console.log("err",err)
      })
    }

       



  return (
    <div >
  


        <div class="login-dark" style = {{backgroundColor : "white"}}>
        <form  style = {{backgroundColor:"slategrey" , marginLeft : -79}} onSubmit = {submit} >
            <h2 class="sr-only"></h2>
            <div class="illustration"></div>
            <div class="form-group"><input   name = "categoryName" value ={post.categoryName} required placeholder="Enter Category Name" onChange ={changevalue}/></div>
           
            <div class="form-group"><button class="btn btn-primary btn-block" >Add Category</button></div></form>
            
       </div>
     
  

    
    
    
    
    
    
    </div>
  )
}

export default AddCategory