const express = require("express");
const { User, User_Verification_Model } = require("../models/user.models");
const nodemailer = require("nodemailer");
const { transporter } = require("./transporter");
const authRoute = express.Router();
const bcrypt = require('bcrypt');

const sendOtpVerificationEmail = async (data, res) => {
    try {
        const otp = `${Math.floor(1000 + Math.random() * 9000)}`;
        const mailOptions = {
            from: {
                name: "JORDAAR",
                address: process.env.AUTH_EMAIL,
            },
            to: data.email,
            subject: "Verify your Email",
            html: `<p>Enter <b>${otp}</b> in the app to verify your email address and complete your signup</p><p>This otp expires in 1 hour.</p>`,
        };

        const hashedOtp = await bcrypt.hash(otp, 12);
        const new_otp_verification = new User_Verification_Model({
            userId: data.data._id,
            otp: hashedOtp,
            createdAt: Date.now(),
            expiresAt: Date.now() + 3600000,
        });

        const user_otp = await new_otp_verification.save();

        console.log(user_otp);

        transporter.sendMail(mailOptions);
        res.json({
            status: "pending",
            message: "Verification OTP sent.",
            data: {
                userId: data.data._id,
            },
        });
        console.log("email sent!!");
    } catch (err) {
        res.json({
            status: "failed",
            message: err.message,
        });
    }
};


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
                });
                const data = await user.save();
                sendOtpVerificationEmail({ email, data }, res);
            }
        }
        catch (err) {
            console.error(err)
        }

    })




    

    

module.exports = authRoute;