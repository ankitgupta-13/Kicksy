import express from 'express';
import mongoose from 'mongoose';
import Product from '../models/product.models.js';
const adminRoute = express.Router();

adminRoute
    .post("/product-add" , async(req,res)=>{
        // const {} = req.body;
        try{
            const obj = {}
            const keys = Object.keys(req.body);
            keys.forEach((key)=>{
                obj[key] = req.body[key];
            })
            const product = new Product(obj);
            await product.save();
            res.status(200).json({data:product});
        }
        catch(err){
            console.error(err);
        }
    })

    .post("/product-edit" , async(req,res)=>{
        const {product_id} = req.body;
        const product = await Product.findOne({_id:product_id});
        try{
            if(!product){
                throw new Error("Invalid Product Id");
            }
            const keys = Object.keys(req.body);
            keys.forEach((key)=>{
                if(key!=='product_id'){
                    product[key] = req.body[key];
                }
            })
            await product.save();
            res.status(200).json({
                data:product
            })
        }
        catch(err){
            console.error(err)
        }
    })

    .post("/product-delete" , async(req,res)=>{
        const {product_id} = req.body;
        try{    
            const product = await Product.deleteOne({_id:product_id});
            res.status(200).json({data:product});
        }
        catch(err){
            console.error(err)
        }
    })

    

export default adminRoute;