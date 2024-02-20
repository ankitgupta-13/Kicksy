import mongoose from "mongoose";

const blogSchema = new mongoose.Schema({
    blogTitle: {
        type: String
    },
    imageurl: {
        type: String,
        required:true
    },
    content: {
        type: String,
        required:true
    }
}, {
    timestamps: true
});

const Blog = new mongoose.model("blog", blogSchema);
export { Blog };