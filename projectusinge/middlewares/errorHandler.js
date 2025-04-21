const { constants } = require("../constants");
const errorHandler=(err,req,res,next)=>{

    const statusCode=res.statusCode? res.statusCode :500;
    
    
    switch(statusCode){
        
        case constants.VALIDATION_ERROR:
            res.json({title:"validation err",message:err.message,stackTrace:err.stack});
            break;
            
            case constants.NOT_THERE:
                res.json({title:"not there",message:err.message,stackTrace:err.stack});
              
                break;

                case constants.UNAUTHORIZED:
            res.json({title:"unauthorizedd",message:err.message,stackTrace:err.stack});


            break;
            case constants.FORBIDDEN:
            res.json({title:"forbidden",message:err.message,stackTrace:err.stack});


            break;
            case constants.SERVER_ERROR:
            res.json({title:"server ",message:err.message,stackTrace:err.stack});


            

            
            default:console.log("no error");
            break;

    
    }
};





    

    




module.exports=errorHandler;
