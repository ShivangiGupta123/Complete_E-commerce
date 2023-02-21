const app = require('./app')

const Connectiondb = require('./database')
require('dotenv').config()


//Connecting to database
Connectiondb()

app.listen(process.env.PORT,()=>{
    console.log(`server started on the port : ${process.env.PORT} in ${process.env.NODE_ENV} mode.`)
})