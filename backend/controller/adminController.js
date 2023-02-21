const adminschema = require("../collections/admin")
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const validate1= require('../middleware/adminvalidation')
const SECRET_KEY = "hgqfyxcgv8934639287utbvc@!$@^rjgb8"
exports.adminSignup = async (req,res)=>{
    //Existing user check
    //hashed password
    //user creation
    //token generation
    
    const {name, email, password, role } = req.body
//    console.log("req.body  = ",req.body)
    
    try{
        const existingUser = await adminschema.findOne({email: email})
        console.log(existingUser)
        if(existingUser){
        return res.status(400).json({message : "Admin already exists"})
        
    }
    const hashedPassword = await bcrypt.hash(password,10)
   
    const valid = await validate1.validateAsync(req.body)
        // console.log('valid =',valid)
        if(valid)
        {
             const result = await adminschema.create({

                    name : name ,
                    email : email,
                    password : hashedPassword,
                    role : role

    })

    const token1 = jwt.sign({ email : result.email , id : result._id, role : result.role},SECRET_KEY )
    // console.log("token =",token)
    // console.log("result =",result)
    return res.status(201).json({admin : result  , token1 : token1})
       }
       else{
           return res.status(406).json({message : "admin or superadmin is allowed only"})
       }
    }
catch(err)
{
    console.log(err)
    res.send(err)
    // res.status(201).json({error : err})
}
}

exports.adminSignin = async(req , res)=>{
    const {email , password} =  req.body
    try{
        const exist = await adminschema.findOne({email: email})
        if(!exist){

          return res.status(400).json({message : "email not store in database"})
          

        }
        const comparePassword = await bcrypt.compare(password , exist.password)
        const token1 = await jwt.sign({email : exist.email , id : exist._id, role : exist.role}, SECRET_KEY)
        if(!comparePassword)
        {
            res.status(500).json({message : 'password not match in  our database'})
        }
        // console.log("token =",token)
        return res.status(201).json({
            // data : exist,
            token1 : token1,
            message : 'login successfully'
        })
    }
    catch(err)
    {
        console.log(err)
        res.send(err)

    }
}

