const jwt =  require('jsonwebtoken')
const SECRET_KEY = "hgqfyxcgv8934639287utbvc@!$@^rjgb8"

const auth = (req,res,next)=>{
    try{
        let token = req.headers.authorization
        if(token){
            // token = token.split(" ")[1]
            // console.log("token =",token)
            let user = jwt.verify(token,SECRET_KEY)
            // req.user = user.id
            req.user = user.id
            console.log("user.id1",user.id)
            console.log("user",user)
            console.log("user.emailAuth",user.email)
            req.Role= user.role
            // console.log("token = ",token)
            // console.log("user",user)
            // console.log("role= ",req.Role)
            // console.log("req.userIdauth = ",req.userId)

            if(req.Role === 'user')
            {
                next()

            }
            else{
            res.status(401).json({message : "only for user views"})

            }
            
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
module.exports = auth