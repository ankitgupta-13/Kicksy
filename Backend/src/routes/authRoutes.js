const express = require("express");
const { User } = require("../models/user.models");
const nodemailer = require("nodemailer");
const { sendOtpVerificationEmail } = require("./transporter");
const authRoute = express.Router();


authRoute
    .post("/signup", async (req, res) => {
        const { email, password, username, mobile } = req.body;
        try {
            const user_by_email = await User.findOne({ email: email });
            const user_by_username = await User.findOne({ username: username });
            if (user_by_email && user_by_email.verified == true) {
                res.json({ message: "email already in use." })
            }
            else if (user_by_username && user_by_username.verified == true) {
                res.json({ message: "username already in use." })
            }
            else if ((user_by_email && user_by_email.verified == false) ||
                (user_by_username && user_by_username.verified == false)) {
                const data = user_by_email || user_by_username;
                sendOtpVerificationEmail({ data, email }, res);
            }
            else {
                const user = new User({
                    email,
                    password,
                    username,
                    mobile
                })
                const data = await user.save();
                sendOtpVerificationEmail({ email, data }, res);
            }
        }
        catch (err) {
            console.error(err)
        }

    })

module.exports = authRoute;