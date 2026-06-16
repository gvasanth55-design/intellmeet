const jwt=require("jsonwebtoken")

module.exports=(req,res,next)=>{
const token=req.headers.authorization
if(!token)return res.status(401).json({msg:"no token"})
try{
const d=jwt.verify(token.replace("Bearer ",""),process.env.JWT_SECRET)
req.user=d
next()
}catch(e){
res.status(401).json({msg:"invalid"})
}
}
