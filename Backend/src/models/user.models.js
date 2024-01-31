const mongoose = require('mongoose');
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    mobile: {
        type: String, //stroring mobile number as String since there could be leading zeroes
        required: true,
        unique: true,
    },
    password:{
        type:String,
        required:true
    },
    verified:{
        type:Boolean,
        default:false
    }
}, {
    timestamps: true,
});


userSchema.pre('save' , async function(next){
    if(this.isModified("password")){
        this.password = bcrypt.hash(this.password , 12);
    }
    next()
});


const User = mongoose.model("User", userSchema);

// ---------------------> User_Verification_Model <------------------------- 

const UserOtpVerificationSchema = new mongoose.Schema({
    userId: {
        type:mongoose.Schema.Types.ObjectId,
        ref:User
    },
    otp: String,
    createdAt: Date,
    expiresAt: Date,
});

const User_Verification_Model = mongoose.model('user_verification_model' , UserOtpVerificationSchema)

module.exports = {User , User_Verification_Model};