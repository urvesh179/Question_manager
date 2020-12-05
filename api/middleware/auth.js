const user=require('../models/User');
const jwt=require("jsonwebtoken");
const secret=process.env.SECRET || "zerohungersecretkey";

const auth=async(req,res,next)=>
{
    try{
        const token=req.header("authorization").replace("Bearer ","");
        const valid=await jwt.verify(token,secret);
        const u=await user.findById(valid._id)

        if(!u)
        {
            throw new Error("User Not Found");
        }
        req.validUser=u;
        req.token=token;
        next();
    } catch(e)
    {
        res.status(403).send("Not Authenticated");
    }
}

module.exports=auth;