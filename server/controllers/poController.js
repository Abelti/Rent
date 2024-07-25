const User = require('../models/userModel');
const Otp = require('../models/otpModel');
const sendMail = require('../utilities/sendMail');
const generateOtp = require('../utilities/generateOTP');
const mongoose = require('mongoose');

const register = async (req, res, next) => {
    try {
        const { first_name, last_name, phone, email, address, password, subscription, payment_method, payment_info, id_picture } = req.body;
        if (!first_name || !last_name || !phone || !email || !address || !password || !subscription || !payment_method || !payment_info || !id_picture) {
            return res.status(400).send("All fields are required.");
        }

        // Generate OTP
        const otpCode = generateOtp();
        const otpExpiry = Date.now() + 15 * 60 * 1000; // 15 minutes from now

        // Save OTP in database
        const otp = new Otp({ email, otp: otpCode, expiresAt: otpExpiry });
        await otp.save();

        console.log(`OTP Saved to the database`);
        // Send OTP via email
        await sendMail({
            email: email,
            subject: 'Verify Your Rent Account',
            template: 'activation_mail.ejs',
            data: { first_name, last_name, activationCode: otpCode }
        });
        console.log(`Email Sent to ${email}`);

        res.status(200).send('OTP sent to your email address.');
    } catch (error) {
        next(error);
    }
};

const verifyOtp = async (req, res, next) => {
    try {
        const { email, otp } = req.body;
        const otpRecord = await Otp.findOne({ email, otp });

        if (!otpRecord || otpRecord.expiresAt < Date.now()) {
            return res.status(400).send('Invalid or expired OTP.');
        }

        // OTP is valid, delete the OTP record
        await Otp.deleteOne({ email, otp });

        // Save user to database
        const user = new User(req.body);
        await user.save();

        res.status(200).send(`User ${user.first_name} ${user.last_name} registered successfully.`);
    } catch (error) {
        next(error);
    }
};

module.exports = { register, verifyOtp };
