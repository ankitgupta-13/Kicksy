import { Blog } from "../models/blog.model.js";
import { Product } from "../models/product.models.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import {
    deleteObject,
    getObjectUrl,
    uploadObject
} from "../utils/aws.functions.js";
import { uploadOnAws } from "../utils/aws.js";
import fs from "fs";

const fetchBlog = async (req, res) => {
    const { blogID } = req.body;
    try {
        const blog = await Blog.findOne({ _id: blogID });
        if (!blog) {
            throw new ApiError(404, "Blog not found");
        }

        const url = await getObjectUrl(blog.imageurl.url);

        res.json(new ApiResponse(200, { blog , url }, "Blog fetched successfully"));

    }
    catch (err) {
        throw new ApiError(400, "Error fetching the blog", err);
    }
}

const addBlog = async (req, res) => {
    const { location, content, blogTitle } = req.body;
    try {
        //   const blogImageUrl = await uploadOnAws(req.file.path);
        //   if (!blogImageUrl) {
        //     fs.unlinkSync(req.file.path);
        //     throw new ApiError(400, "unable to upload image.")
        //   }
        //   fs.unlinkSync(req.file.path);
        //   const product = await Product.findOne({ _id: productID });

        //   if (!product) throw new ApiError(404, "product not found.");

        //   if (!location) {
        //     console.warn("Location not specified , image will be aligned to left by default!");
        //     const blog = new Blog({
        //       productID,
        //       imageurl: {
        //         url: blogImageUrl
        //       },
        //       content
        //     })

        //     await blog.save();
        //     product.blogs.push(blog._id);
        //     await product.save();

        //   }
        //   else {
        //     const blog = new Blog({
        //       productID,
        //       imageurl: {
        //         url: blogImageUrl,
        //         location
        //       },
        //       content
        //     })

        //     await blog.save();
        //     product.blogs.push(blog._id);
        //     await product.save()


        //   }

        const { url, key } = await uploadObject(`blog-image-${Date.now()}`, 'Blogs', 'image/png');
        if (!url) {
            throw new ApiError(400, `Error uploading to Blogs folder`);
        }
        res.json(new ApiResponse(200, url, "upload link"));
        if (location) {
            const blog = new Blog({
                blogTitle,
                imageurl: {
                    url: key,
                    location
                },
                content
            })
            await blog.save();
        }
        else {
            // console.warn("Location not specified , image will be aligned to left by default!");
            const blog = new Blog({
                blogTitle,
                imageurl: {
                    url: key
                },
                content
            })
            await blog.save();

        }
    }
    catch (err) {
        throw new ApiError(400, "Error adding blog", err.message);
    }
}

const editBlog = async (req, res) => {
    const { blodID, imageID } = req.body;

}

const deleteBlog = async (req, res) => {
    const {blogID} = req.body;
    const blog = await Blog.findOne({_id:blogID});
    try{
        if(!blog){
            throw new ApiError(404 , "blog not found");
        }
        
        const img_deleted = await deleteObject(blog['imageurl']['url']);
        if(!img_deleted){
            console.log("image not found , deleting the blog!");
        }

        const deleted = await Blog.findByIdAndDelete({_id:blogID});
        res.json(new ApiResponse(200 , deleted , "blog deleted successfully"));
    }
    catch(err){
        throw new ApiError(400 , "Error deleting the blog" , err.message);
    }
}


export {
    addBlog,
    editBlog,
    deleteBlog,
    fetchBlog
}
