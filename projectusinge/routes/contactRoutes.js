const express=require("express");
const router=express.Router();

const {getContact,
    createContact,
    getContactt,
    conContact,
    removeContact}=require("../controllers/contactControllers");
const validateToken = require("../middlewares/validateTokenHandler");




    router.use(validateToken);
router.route("/").get(getContact);
router.route("/:id").get(getContactt);
router.route("/").post(createContact);
router.route("/:id").put(conContact);
router.route("/:id").delete(removeContact);



module.exports=router;