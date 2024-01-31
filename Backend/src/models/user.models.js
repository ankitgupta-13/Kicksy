const mongoose = require('mongoose');
const bcrypt = require("bcrypt");
const { addressSchema } = require('./address.models');

const cart_item_schema = new mongoose.Schema({
    product:mongoose.Schema.Types.ObjectId,
    size:String,
    qty:{
        type:Number,
        default:0
    }
})

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
    },
    tokens:[    // tokens for maintaining sessions
        {
            token:{
                type:String,
                required:true
            }
        }
    ],
    address:[addressSchema],
    cart:[cart_item_schema] 
}, {
    timestamps: true,
});


userSchema.pre('save' , async function(next){
    if(this.isModified("password")){
        this.password = bcrypt.hash(this.password , 12);
    }
    next()
});


// -------------------> add to cart <----------------------- 
userSchema.methods.add_to_cart = async function(data){
    try{
        if(this.cart.length == 0){      // no item in cart 
            const obj = {
                product:data.product_id,
                qty:1,
                size:data.size
            }
            this.cart = this.cart.concat(obj);
            await this.save();
            return this.cart;
        }
        else{
            const index = this.cart.findIndex((item)=>{               // checking if item is already present in the cart or not .
                return item['product'].equals(data.product_id);
            })
            if(index === -1){                                        // new item added if index === -1
                const obj = {
                    product:data.product_id,
                    qty:1,
                    size:data.size
                }
                this.cart = this.cart.concat(obj);
                await this.save();
                return this.cart;  
            }
            else{
                this.cart[index].qty = this.cart[index].qty+1;      // qty increased when item already present.
                await this.save();
                return this.cart;
            }
        }
    }
    catch(err){
        console.error(err);
    }
}

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