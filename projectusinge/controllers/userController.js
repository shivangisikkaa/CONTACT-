
const asynchandler=require("express-async-handler");
const User=require("../models/userModel");
const jwt=require("jsonwebtoken");
const Contact=require("../models/contactModel");
const dotenv=require("dotenv").config();

const bcrypt=require("bcrypt");
const registerUser=asynchandler(async(req,res)=>{
    const{username,email,password}=req.body;
    if(!username||!email||!password){
        res.status(400);
        throw new Error("enter");
    }
    const userAvailable=await User.findOne({email});

    if(userAvailable){
        res.status(400);
        throw new Error("user there");

    }
    //hash
    const hashedPassword=await bcrypt.hash(password,10);
    const newuser=await User.create({
        username,
        email,
        password:hashedPassword,

    })
    console.log( `User created ${newuser} `) ;
        if (newuser) {
        res.status(201).json({_id:newuser.id,email:newuser.email});
        }

        else{

            res.status(400);
            throw new Error("user not valid credentials")

        }
        
        
        
        
        
      

    

   
    
    

   
    
    
});
const login=asynchandler(async(req,res)=>{
    const {email,password}=req.body;
    if(!email||!password){
        res.status(400);
        throw new Error("all values");
    }

    const user=await User.findOne({email})
    if(user && (await bcrypt.compare(password,user.password))){

        const accessToken=jwt.sign({
            user:{
                username:user.username,
                email:user.email,
                id:user.id,
            
            },
        },process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIn:"1m"
        }
        );
        
        res.status(200).json({accessToken});

    }
    else{
        res.status(401)
        throw new Error("err");

    } 


    
   
    
    
});



//private
const current=asynchandler(async(req,res)=>{
    res.json(req.user);
    
    
} );



module.exports={registerUser,login,current};
