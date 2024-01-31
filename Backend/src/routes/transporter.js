const nodemailer = require("nodemailer");

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
        const new_otp_verification = new USER_VERIFICATION_MODEL({
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

const transporter = nodemailer.createTransport({
    service: "gmail",
    host: "smtp.ethereal.email",
    port: 587,
    secure: false,
    auth: {
        user: process.env.AUTH_EMAIL,
        pass: process.env.AUTH_PASS,
    },
});



module.exports =  sendOtpVerificationEmail;