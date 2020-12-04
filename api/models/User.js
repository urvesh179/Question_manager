const mongoose=require("mongoose");
const bcrypt=require('bcryptjs');

const UserSchema=mongoose.Schema({
   
    username:
    {
        type:String,
        required:true,
        unique:true
    },
    
    password:
    {
        type:String,
        required:true,
        minlength:6
    },
    is_deleted:
    {
        type:Boolean,
        required:true,
        default:false
    }
},
{
    timestamps: true,
  });

UserSchema.pre('save',async function(next)
{
    const user=this;
    if(user.isModified("password"))
    {
        user.password=await bcrypt.hash(user.password,8);
    }
    next();
})

const User = mongoose.model("User", UserSchema);

module.exports = User;