import mongoose from "mongoose";

const userSchema=new mongoose.Schema({
    username:{
        type:String,
        required:[true,"Please prive a username"],
        unique:true,
    },
    email:{
        type:String,
        required:[true,"Please prive a email"],
        unique:true,
    },
    password:{
        type:String,
        required:[true,"Please prive a password"],
        unique:true,
    },
    isVerified:{
        type:Boolean,
        default:false,
    },
    usAdmin:{
        type:Boolean,
        default:false,
    },
    forgotPasswordToken:String,
    forgotPasswordToeknExpiry:Date,
    verifyToken:String,
    cerifyTokenExpiry:Date,
})

const User=mongoose.model.users || mongoose.model("users",userSchema);
export default User;