
const dotenv=require("dotenv").config();
const express=require("express");
const connectDb=require("./config/dbconnection"); 
const errHandler=require("./middlewares/errorHandler");
connectDb();
const app=express();

const port = process.env.PORT|| 3000;

app.use(express.json());

app.use("/api/contacts",require("./routes/contactRoutes"))

app.use("/api/users",require("./routes/userRoutes"))

app.use(errHandler);

app.listen(port,()=>{
    
    console.log("connected",port);
})




