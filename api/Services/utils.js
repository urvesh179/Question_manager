var jwt=require('jsonwebtoken');
const secret=process.env.SECRET || "questionanswersecretkey";

exports.generateToken=async function(data)
{
    const token=await jwt.sign({_id:data._id.toString()},secret);
    return token;
}