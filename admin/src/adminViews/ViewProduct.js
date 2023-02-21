import axios from "axios";
import React, { useState, useEffect } from "react";


function ViewProduct() {
  const headers = {
    "Content-Type" : "multi-part / form-data",
    'authorization' : localStorage.getItem('token1')
  
  }
  const [getdata, setGetData] = useState([]);
  // const [deletedata , setDeleteData] = useState([])
  useEffect(() => {
    getProduct()
    
  },[])
  function getProduct(){
    axios.get("http://localhost:8000/api/v1/getproductsByadmin" , {headers : headers}).then((res) => {
      console.log(res.data);
      setGetData(res.data);
      
    });

  }
  getProduct()

   const deleteProduct = (id)=>{
    axios.delete(`http://localhost:8000/api/v1/${id}`).then((res)=>{
      console.log(res.data)

    }).catch((err)=>{
      console.log("err",err)
    })

   }
    
    return (
      <div>
    <h1 style = {{textAlign : "center"}}>Lists of Products</h1>
    <table className="table table-hover">
      <thead>
        <tr>
          <th>Product</th>
          <th>Product Name</th>
          <th>Price</th>
          <th>Category</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
      {getdata.map((item)=>(


        <tr>
        
        <td><img
        height={100}
        src={`http://localhost:8000/${item.profilePic.fileName}`}
        classNameName="card-img-top"
        alt="..."
      /></td>
     
      <td>{item.name}</td>
      <td>{item.price}</td>
      <td>{ (item.categoryId && typeof item.categoryId === 'object') && item.categoryId.categoryName }</td>
      <td><button onClick = {()=>deleteProduct(item._id)} className="btn btn-danger">Delete</button></td>
      </tr>

    




      ))}
      </tbody>
      
    </table>
  </div>
  );
}

export default ViewProduct;







// <div>
// <div className="row gy-5">
//   {getdata.map((item) => (
//     <div className="col-md-2">
//       {/*{console.log("item in get product page  >> ", item)}*/}
//       <div className="card card-block">
//         <h4 className="card-text" style={{ margin: 10 }}>
//           {item.name}
//         </h4>
//         <img
//           height={246}
//           src={`http://localhost:8000/${item.profilePic.fileName}`}
//           classNameName="card-img-top"
//           alt="..."
//         />
//         <div className="card-body">
//           <p className="card-text"> ₹{item.price}</p>
//           <p className="card-text">Ratings: {item.ratings}</p>
//           <p className="card-text">Category: {typeof item.categoryId === 'object' && item.categoryId.categoryName }</p>
//         </div>
//       </div>
//     </div>
//   ))}
// </div>
// </div>

// <td>{ (item.categoryId && typeof item.categoryId === 'object') && item.categoryId.categoryName }</td>