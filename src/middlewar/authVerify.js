const jwt=require('jsonwebtoken');


exports.requireSignIn=(req,res,next)=>{

    const{authorization}=req.headers;
   
    
  const decoded = jwt.verify(authorization, 'sohanur653');
   if(decoded){
    
  req.user=decoded.name;
  req.role=decoded.role;
  req.id=decoded._id

  
next()
   }else{
    res.json({
      error:"authorization failed"
    })
   }
}


