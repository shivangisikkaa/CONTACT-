
const express=require("express");

const router=express.Router();

const {registerUser,login,current} =require("../controllers/userController")

const validateToken=require("../middlewares/validateTokenHandler");

router.post("/register",registerUser);
router.post("/login",login);
router.get("/current", validateToken,current);

module.exports=router;
