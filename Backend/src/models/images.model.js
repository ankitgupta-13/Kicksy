const mongoose = require("mongoose");

const imageSchema = new mongoose.Schema({
    name:String,
    image:{
        data:Buffer,
        contentType:{
            type:String,
            default:"image/png"
        }
    },
    product:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:"Product"
    }
});

const Image = new mongoose.model("Images" , imageSchema);
module.exports = Image;