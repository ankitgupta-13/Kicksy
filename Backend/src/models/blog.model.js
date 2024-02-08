import mongoose from "mongoose";

const blogSchema = new mongoose.Schema({
    productID:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Product"
    },
    imageurl:[
        {
            url:String,
            location:{
                type:String,
                default:"left",
                enum:['left' , 'right' , 'center']
            }
        }
    ],
    content:{
        type:String
    }
});

const Blog = new mongoose.model("blog" , blogSchema);
export {Blog};