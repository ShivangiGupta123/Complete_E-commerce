import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";

function ViewCategory() {
  let [data, setData] = useState([]);

  useEffect(() => {
    getData();
  }, []);


 function getData(){

  axios
  .get("http://localhost:8000/api/v1/viewcategory")
  .then((res) => {
    setData(res.data);

    console.log("res.data viewCategory", res.data);
  })
  .catch((err) => {
    console.log("err", err);
  });
 }

  
  const DeleteCategory= (id)=>{
    axios.delete(`http://localhost:8000/api/v1/deleteCategory/${id}`).then((res)=>{
      console.log(res.data)

    }).catch((err)=>{
      console.log("err",err)
    })

    getData();

  }

  return (
    <div className="col">
      <h1 style={{ textAlign: "center" }}>List of Categories</h1>

      <table className="table table-hover " >
        <thead>
          <tr>
            <th>id</th>
            <th>Categories</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {data.map((key) => (
            
              <tr>
                <td >{key._id}</td>
                <td>{key.categoryName}</td>
                <td>
                  <button  onClick = {()=>DeleteCategory(key._id)} className="btn btn-warning">Delete</button>
                </td>
              </tr>
            
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ViewCategory;

// {console.log("item.category",{item})}
//             {console.log("item",{item})}
//             {console.log("data",{data})}
//           <div >
//             <h1>{item}</h1>;

//             </div>
// <button style = {{marginLeft:318}} className='btn btn-success mt-4  w-50'>{key.categoryName}</button>
// style = {{marginTop :120 , marginLeft :180 , marginRight:180}}
// margin-left: 180px;
// margin-right:180px;
// margin-top:120px;

// <tr >
// <td colspan = "2">{key._id}</td>

//  <td>{key.categoryName}</td>

//  <td ><button  className='btn btn-warning'>Delete</button></td>

//  </tr>
