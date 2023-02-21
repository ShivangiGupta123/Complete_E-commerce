import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { Provider } from "react-redux";
import { createStore } from "redux";
import ChangeNumber from './services/reducers/reducer';
import reportWebVitals from './reportWebVitals';
const store = createStore(ChangeNumber)





// import {createStore} from 'redux'
// import {Provider} from 'react-redux'
// import rootReducer from './services/reducers/index'
// const store = createStore(rootReducer)
// console.warn("store data" , store)


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
<Provider store ={store}>
<App />

</Provider>


    

);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
// import axios from 'axios';
// axios.defaults.baseURL = "http://localhost:8000/api/v1/"
// axios.interceptors.request.use((req)=>{
//   req.headers.Authorization = 'JWT_Authorization_Token'
//   return req
// })

// axios.interceptors.request.use((res)=>{
//   res.headers.Authorization = 'JWT_Authorization_Token'
//   return res
// })