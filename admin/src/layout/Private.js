import React from "react";

import { Outlet } from "react-router-dom";
import AdminPanel from "../adminViews/AdminPanel";
function Private(props) {
  // console.log("props")
  return (
    
    <>
      <AdminPanel/>
      
    <div className="col">
      <Outlet />
    </div>
       
    </>
  );
}

export default Private;
