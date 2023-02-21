import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
// admin
import AdminPanel from "./adminViews/AdminPanel";
import Signin from "./adminViews/adminSignin";
import Signup from "./adminViews/adminSignup";
import Product from "./adminViews/AddProduct";
import AddCategory from "./adminViews/addCategory";
import ViewCategory from "./adminViews/ViewCategory";
import ViewProduct from "./adminViews/ViewProduct";
function App() {
  return (
    <div className="App">
      <div class="container-fluid">
        <div class="row flex-nowrap">
          <BrowserRouter>
            <AdminPanel></AdminPanel>
            <Routes>
              <Route path="/" element={<Signin/>} />
              <Route path="/adminsignup" element={<Signup />} />
              <Route path="/addproduct" element={<Product />} />

              <Route path="/addcategory" element={<AddCategory />} />
              <Route path="/viewcategory" element={<ViewCategory />} />
              <Route path="/viewproduct" element={<ViewProduct />} />
            </Routes>
          </BrowserRouter>
        </div>
      </div>
    </div>
  );
}

export default App;
