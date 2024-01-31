const express = require("express");
const { User } = require("../models/user.models");
const userRoute = express.Router();


userRoute
    .post("/signup", async (req, res) => {
        const { email, password, username, mobile } = req.body;
        try {
            const user_by_email = await User.findOne({ email: email });
            const user_by_username = await User.findOne({ username: username });
            if(user_by_email){
                res.json({message:"email already in use."})
            }
            else if(user_by_username){
                res.json({message:"username already in use."})
            }
            else{
                
            }
        }
        catch (err) {
            console.error(err)
        }

    })

module.exports = userRoute;