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
    }
}, {
    timestamps: true,
});

userSchema.pre('save' , async (next)=>{
    if(this.isModified("password")){
        this.password = bcrypt.hash(this.password , 12);
    }
    next()
});


const User = mongoose.model("User", userSchema);

module.exports = {User}