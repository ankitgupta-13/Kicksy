const express = require('express');
const { User } = require('../models/user.models');
const userRoute = express.Router();

userRoute
    .post("/add-to-cart" , async(req,res)=>{
        const {user_id , product_id , size} = req.body;
        
        const user = await User.findOne({_id:user_id});
        try{
            if(!user){
                throw new Error("invalid user id");
            }
            const updated_cart = await user.add_to_cart({product_id , size});
            if(!updated_cart){
                throw new Error("Error adding to cart");
            }  
            res.status(200).json({data:updated_cart});
        }
        catch(err){
            res.status(400).json({message:err.message});
        }
    })

module.exports = userRoute;