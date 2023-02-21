import React from 'react'
import {BrowserRouter , Route, Routes} from 'react-router-dom'
// import {useParams} from 'react-router-dom'

//user

import UserSignin from './component/signin';
import UserSignup from './component/signup';
import ForgotPassword from './component/forgotPasswordForm';
import ResetPassword from './component/ResetPassword';
import Home from './component/Home';
import Slider from './component/slider'
// import Category from './component/category';
import Footer from './component/footer';



import Getcart from './component/getAddedCart';
import Getproduct from './component/getProduct';


function App() {
  // let {userId} = useParams()
  // console.log("userId",userId)
  return (
    <div className="App">
    
    <BrowserRouter>
   

  <Home></Home>    
    <Routes >
  
    <Route path = "/" element = {<Slider/>}/>
  
    <Route path = "/usersignin" element = {<UserSignin/>}/>
    <Route path = "/usersignup" element = {<UserSignup/>}/>
    <Route path = "/forgotpassword" element = {<ForgotPassword/>}/>
    <Route path = "/resetpassword" element = {<ResetPassword/>} />
 
    <Route path = "/getcart" element = {<Getcart/>}/>
    <Route path = "/getproduct" element = {<Getproduct/>}/>
    </Routes>

      
    
   
   
   <Footer></Footer>

    </BrowserRouter>
    
      
    </div>
  );
}

export default App;
