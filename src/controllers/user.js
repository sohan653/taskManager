const jwt=require("jsonwebtoken")
const User=require("../models/user");
const bcrypt=require("bcrypt")
const { createServices, isMatch } = require("../services/common/common");
exports.createUser = async (req,res)=>{
    try{
            const reqBody=req.body;
            const {email}=reqBody;
            const emailName={
                email:email
            }
            // macthing email address
            const matchUser= await isMatch(User,emailName)
            if(matchUser.length>0){
                res.json({
                    error: "User already exists"
                })
            }

            // create new user
           else{
            const user= await createServices(reqBody,User)
            const payload={
                _id:user._id,
                name:user.name,
                role:user.role,
            }
      const token= jwt.sign(payload,"sohan653",{
        expiresIn:"6days"
       })
        res.json({
            data:user,
            token
        })
           }
    }
    catch (error){
        res.json("something wrong hoise babu")
    }
}


exports.login=async (req,res)=>{
   try {
    const {email,password} = req.body
    const emailName={
        email:email
    }
    if(!email || !password){
        return res.status(403).json({
            error:"please insert your credential"
        })
    }
  const matchUser= await isMatch(User,emailName);
  
const user=matchUser[0]
  const payload={
    _id:user._id,
    name:user.name,
    role:user.role
  }
    if(user){
        
        const matchPassword= bcrypt.compareSync(password,user.password);
        
        if(matchPassword){
            const token= jwt.sign(payload,"sohanur653",{expiresIn:"6days"})
            res.json({token})
        }else{
            res.json({
                message:"password did not match"
            })
        }
    }else{
        console.log("user did not find")
    }
    
   } catch (error) {
    
   }
}

exports.changePassword= async (req,res)=>{
    const {newPassword,confirmNewPassword} = req.body
    const id=req.id;
   
    try {
        if(newPassword !== confirmNewPassword){
            res.json({
                error:"password not matched"
            })
        }else{
            const salt= bcrypt.genSaltSync(8)
            const hashPassword=bcrypt.hashSync(newPassword,salt)
        await User.updateOne({_id:id},{password:hashPassword});
        res.json({
            message:"successfully upadted"
        })
        }
    } catch (error) {
        res.json({
            error
        })
    }
}

exports.selectProfile=async (req,res)=>{
    const userId=req.id
   try {
    const user= await User.findOne({_id:userId});
    res.json(user)
   } catch (error) {
    
   }
}


exports.updateUser= async (req,res)=>{
    const userId=req.id;
    const reqBody=req.body;
  
    try {
        const updateUser=await User.findOneAndUpdate({_id:userId},reqBody,{
            new:true
        })
       res.json(updateUser) 
    } catch (error) {
        
    }
}