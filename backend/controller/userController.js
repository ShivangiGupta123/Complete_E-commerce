const userschema = require("../collections/user")
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
// var nodemailer = require('nodemailer')
const validate= require('../middleware/uservalidation')
const SECRET_KEY = "hgqfyxcgv8934639287utbvc@!$@^rjgb8"
exports.Signup = async (req,res)=>{
    //Existing user check
    //hashed password
    //user creation
    //token generation
    
    const {firstname, lastname, email, password, password_confirmation, phone , role } = req.body
//    console.log("req.body  = ",req.body)
    
    try{
        const existingUser = await userschema.findOne({email: email})
        if(existingUser){
         return res.status(400).json({message : "User already exists"})
        //  return res.status(200).end('User already exists.')
         
    }
    const hashedPassword = await bcrypt.hash(password,10)
    const hashedCPassword = await bcrypt.hash(password_confirmation,10)
    const valid = await validate.validateAsync(req.body)
        // console.log('valid =',valid)
        if(valid)
        {
             const result = await userschema.create({

                    firstname : firstname,
                    lastname : lastname,
                    email : email,
                    password : hashedPassword,
                    password_confirmation : hashedCPassword,
                    phone : phone,
                    role : role

    })

    const token = jwt.sign({ email : result.email , id : result._id, role : result.role},SECRET_KEY )
     return res.status(201).json({user : result  ,token : token})
       }
    }
catch(err)
{
    console.log("test")
    res.send(err)
    console.log(err)
    // res.status(201).json({error : err})
}
}

exports.Signin = async(req , res)=>{
    const {email , password} =  req.body
    try{
        const exist = await userschema.findOne({email: email})
        if(!exist){

            res.status(400).json({message: "email not store in database"})

        }
        const comparePassword = await bcrypt.compare(password , exist.password)
        const token = await jwt.sign({email : exist.email , id : exist._id, role : exist.role}, SECRET_KEY)
        if(!comparePassword)
        {
            res.status(500).json({message: 'password not match in  our database'})
        }
        res.status(201).json({
            data : exist,
            token : token,
            message : 'login successfully'
        })
    }
    catch(err)
    {
        console.log(err)
        res.send(err)

    }
}

// exports.forgotPassword = async(req,res)=>{
    
//     try{
//         const {email} = req.body
//         const user = await userschema.findOne({email : email})
//         if (!user){
//             return res.status(400).send({message : 'Sorry Email does not exist'})
//         }
//         //creating SMTP server for connection
// var transporter = nodemailer.createTransport( 
//     {
//         service:'gmail', 
//         auth:{ 
//             user:'gshivangi106@gmail.com',
//             pass:'pjryxhuzvqydkafc'
//         } 
//     }
// )


// // fixed for mailoption which is always there
// var mailOptions = {
//     from:'gshivangi106@gmail.com',
//     to:'gshivangi106@gmail.com  ',
//     subject:'Please Reset your Password ',
//     html:'<a href = "path: nodemailer/backend/public/index.html"><button>View Password</button></a>'
    
     
// }
// //send mail through sendMail method
// transporter.sendMail(mailOptions,function(error,info){
//     if(error)
//     {
//         console.log(error)
//     }
//     else{
//         console.log("Email sent successfully "+ info.response)
//     }
// })
//     }
//     catch(error){
//         res.status(500).send({message : error})

//     }

// }
