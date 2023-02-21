const express = require('express')
const app = express()
const routes = require('./route/route')
const bodyparser = require('body-parser')
const cors = require('cors')
const path = require('path');

//middleware
app.use(cors())
app.use(bodyparser.urlencoded ({extended:false}))
app.use(express.json())



app.use(express.static(path.join(__dirname, 'uploads')));
//console.log("path.join(__dirname, 'uploads') >> ", path.join(__dirname, 'uploads'))
//authenication initialization

app.use((req,res,next)=>{
    console.log("HTTP Method -" + req.method + " , URL -"+req.url)
    next()
})

//import  routes

app.use('/api/v1',routes)
module.exports = app


// const fileupload = require('express-fileupload')
// app.use(fileupload({
//     tempFilePath:true
// }))
// const morgan = require('morgan')


// app.use(morgan('dev'))