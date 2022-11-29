const express=require("express")
const {createUser, login, changePassword, selectProfile, updateUser} = require("../controllers/user");
const { requireSignIn } = require("../middlewar/authVerify");
const router=express.Router()

router.post("/register",createUser);
router.post("/login",login);
router.post("/changePassword",requireSignIn, changePassword);
router.get('/selectprofile', requireSignIn ,selectProfile)
router.post('/updateUser', requireSignIn,updateUser)

module.exports = router