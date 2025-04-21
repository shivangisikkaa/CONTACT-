const  asynchandler=require("express-async-handler");
const jwt=require("jsonwebtoken");

const validateToken=asynchandler(async(req ,res ,next)=>{
        

    let token;
    
    let authHeader=req.headers.Authorization || req.headers.authorization

    if(authHeader&& authHeader.startsWith("Bearer")){
        token=authHeader.split(" ")[1];
        jwt.verify(token, process.env.ACCESS_TOKEN_SECRET,(err,decoded)=>{
            if(err){
                res.status(401);
                throw new Error("userr");
            }
            
            req.user=decoded.user;
            next();

        });

        
        if(!token){
            res.status(401);
            throw new Error("found");
        }

        
        


        
    }


});

    
    

       
            
          
            
         
    
    


module.exports = validateToken;


