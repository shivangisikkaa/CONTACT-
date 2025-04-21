

const mongoose=require("mongoose");
const userSchema=mongoose.Schema({

    username:{
        type:String,
        required:[true,"please add the contact name"]
    },
    email:{
        type:String,
        required:[true,"please add the contact email"],
        unique:[true,"email address"]
    },
    
    password:{
        type:String,
        required:[true,"please add the password"],
        
    
},

},

{ timestamps: true } 
    
);
module.exports=mongoose.model("User",userSchema);

    
