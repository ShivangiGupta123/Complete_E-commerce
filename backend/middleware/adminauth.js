const jwt =  require('jsonwebtoken')
const SECRET_KEY = "hgqfyxcgv8934639287utbvc@!$@^rjgb8"

const adminAuth = (req,res,next)=>{
    try{
        //  console.log('req.headers',req.headers)
        let token1 = req.headers.authorization
        // console.log('token',token)
        if(token1){
            // token = token.split(" ")[1]
            // console.log("token =",token)
            let user = jwt.verify(token1,SECRET_KEY)
            req.userId = user.id
            // req.Role= user.role
            // console.log("token = ",token)
        
            // console.log("user",user)
          


            // console.log("role= ",req.Role)
            // console.log("req.userId = ",req.userId)

           
            next()
           
            
          
        }
        else{
            res.status(401).json({message : "Unauthorized User"})
        }
       
    }
    catch(err)
    {
        console.log(err)
        res.status(401).json({message : "Unauthorized User"})
 
        
    }
}
module.exports = adminAuth