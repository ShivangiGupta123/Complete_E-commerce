const bcrypt = require('bcrypt')
const sendEmail = require("../utils/sendEmail")
//crypto is used for encryption 
const crypto = require("crypto")

const Joi = require("joi")
const user = require("../collections/user")

// send password reset link

exports.forgotPassword =  async(req,res)=>{
    try{
        const schema = Joi.object({email : Joi.string().email().required()})
        const {error} = schema.validate(req.body)
        if(error) return res.status(400).send(error.details[0].message)

        const User = await user.findOne({email : req.body.email})
        if(!User)
            return res.status(400).send("user with given email doesn't exist")
        let token=crypto.randomBytes(32).toString("hex");
           User.reset_token=token;
           User.expiredAt=Date.now() + 1000*60*2
           await User.save()
        
        const link = `${process.env.FRONTEND_BASE_URL}/resetpassword?token=${token}`
        await sendEmail(User.email , "Password reset" , link)
        res.send({message : "password reset link sent to your email account" , token : token})
   
    }

    catch(error){
        console.log(error)
    }
}



// Reset user password


exports.resetPassword = async(req,res)=>{
    const {password , password_confirmation } = req.body
    try{
        

 
        const schema = Joi.object({password : Joi.string().required(),password_confirmation  :Joi.string().required() ,token:Joi.string().required()})
        
        const {error,value} = schema.validate(req.body)
        console.log("value",value)
         
        if (error) return res.status(200).json({error:error.details[0].message})
        const userRes = await user.findOne({
            reset_token : value.token,
            expiredAt:{$gt:Date.now()}
        })

    if(!userRes) return res.status(200).json({error:"Invalid Link or expired "})
    if(password === password_confirmation){
        var hashedPassword = await bcrypt.hash(password,10)
        var hashedpassword_confirmation = await bcrypt.hash(password_confirmation,10)
        console.log("hashedPassword>> = ",hashedPassword)
        console.log("hashedpassword_confirmation>> = ",hashedpassword_confirmation)
        
        
        value.password = hashedPassword
        value.password_confirmation = hashedpassword_confirmation
        userRes.password=value.password;
        userRes.password_confirmation=value.password_confirmation;
    
        userRes.save();
        console.log("userRes",userRes)
    
        res.send("password reset successfully")

    }
    else{
        res.status(400).json({message : "password and confirm password is not matched"})
    }


    }
    catch(error){
        res.send("An error occured")
        console.log("error",error)
    }
}