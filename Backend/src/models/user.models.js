import mongoose, { mongo } from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    mobile: {
      type: String, //storing mobile number as String since there could be leading zeroes
      required: true,
      unique: true
    },
    orders: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Order",
      },
    ],
    cart: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product"
    }],
    wishlist: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
      },
    ],
    password: {
      type: String,
      required: [true, "Password is required"],
    },
    refreshToken: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

// Hashing the password

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

//Generating Access and Refresh Token method
userSchema.methods.generateAccessToken = function () {
  return jwt.sign(
    {
      _id: this._id,
    },
    process.env.ACCESS_TOKEN_SECRET,
    {
      expiresIn: process.env.ACCESS_TOKEN_EXPIRY,
    }
  );
};
userSchema.methods.generateRefreshToken = function () {
  return jwt.sign(
    {
      _id: this._id,
    },
    process.env.REFRESH_TOKEN_SECRET,
    {
      expiresIn: process.env.REFRESH_TOKEN_EXPIRY,
    }
  );
};

//Password Validation Method

userSchema.methods.isPasswordCorrect = async function (password) {
  return await bcrypt.compare(password, this.password);
};

userSchema.methods.addToCart = async function(productId){
  try{
    if(!productId){
      throw new Error("ProductId Required.");
    }
    
    const index = this.cart.findIndex((item)=>{
      return item["_id"].equals(productId);
    });
    if(index === -1){
      this.cart = this.cart.concat(productId);
      await this.save();
      return this.cart;
    }
    else{
      throw new Error("Item already present in cart.");
    }
  }
  catch(err){
    console.error(err);
  }
}

userSchema.methods.deleteFromCart = async function(productId){
  try{
    const productID = new mongoose.Types.ObjectId(productId);
    const index = this.cart.findIndex((item)=>{
      return item["_id"].equals(productID);
    })
    this.cart = this.cart.filter((item)=>{
      console.log(item["_id"] , productID)

      return item[index] !== productID
    });

    await this.save()
    return this.cart;
  }
  catch(err){
    console.error(err);
  }
}

export const User = mongoose.model("User", userSchema);
