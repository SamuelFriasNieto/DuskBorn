import userModel from "../models/userModel.js";
import bycrypt from "bcrypt";
import validator from "validator";
import jwt from "jsonwebtoken";
import nodeMailer from "nodemailer";
import orderModel from "../models/orderModel.js";
const createToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET);
}


const loginUser = async (req, res) => {


    try {
        
        const { email, password } = req.body;
        const user = await userModel.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: "The email does not exist" });
        }
        const isMatch = await bycrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: "Invalid password" });
        }

        if(isMatch) {
            const token = createToken(user._id);
            res.status(200).json({
                _id: user._id,
                name: user.name,
                email: user.email,
                token,
            });
        }

    } catch (error) {
        res.status(500).json({ message: error.message });
    }

}

const getUser = async (req, res) => {
    try {

        const user = await userModel.findById(req.body.userId);
        if (!user) {
            return res.status(400).json({ message: "User not found" });
        }
        const lastOrder = await orderModel.find({ userId: req.body.userId }).sort({ date: -1 }).limit(1);
        const address = lastOrder[0]?.address || "";
        res.status(200).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            address: address|| "",
        })
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const updateUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        const user = await userModel.findById(req.body.userId);
        if (!user) {
            return res.status(400).json({ message: "User not found" });
        }
        if (name) {
            user.name = name;
        }
        if (email) {
            user.email = email;
        }
        if (password) {
            const salt = await bycrypt.genSalt(10);
            const hashedPassword = await bycrypt.hash(password, salt);
            user.password = hashedPassword;
        }
        await user.save();
        res.status(200).json({ message: "User updated successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const registerUser = async (req, res) => {

    try {
        
        const { name, email, password } = req.body;
        const userExists = await userModel.findOne({ email });

        if (userExists) {
            return res.status(400).json({ message: "User already exists" });
        }

        if(!validator.isEmail(email)) {
            return res.status(400).json({ message: "Invalid email" });
        }
        if(password.length < 8) {
            return res.status(400).json({ message: "Please enter a stronger password" });
        }

        const salt = await bycrypt.genSalt(10);
        const hashedPassword = await bycrypt.hash(password, salt);

        const newUser = new userModel({
            name,
            email,
            password: hashedPassword,
        });

        const user = await newUser.save();

        const token = createToken(user._id);
        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            token,
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: error.message });
    }

}

const adminLogin = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await userModel.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: "The email does not exist" });
        }
        if(email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD) {
            const token = jwt.sign(email+password, process.env.JWT_SECRET);
            res.status(200).json({
                _id: user._id,
                name: user.name,
                email: user.email,
                token,
            });
        } else {
            return res.status(400).json({ message: "Invalid email or password" });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const forgotPassword = async (req, res) => {
    try {
        const { email } = req.body;
        const user = await userModel.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: "The email does not exist" });
        }
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
            expiresIn: "1h",
        });
        const link = `${process.env.CLIENT_URL}/reset-password?token=${token}`;
        const message = `Click on the link to reset your password: ${link}`;
        const subject = "Reset Password";
        const transporter = nodeMailer.createTransport({
            host: "smtp.gmail.com",
            port: 587,
            secure: false,
            auth: {
                user: process.env.SMTP_USER,
                pass: process.env.SMTP_PASSWORD,
            },
            tls: {
                rejectUnauthorized: false,
            },
        });
        

        const mail = await transporter.sendMail({
            from: "sae.nieto@gmail.com",
            to: email,
            subject: subject,
            text: message,
        });
        if (mail) {
            res.status(200).json({ message: "Email sent successfully" });
        } else {
            res.status(400).json({ message: "Email not sent" });
        }
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const resetPassword = async (req, res) => {
    try {
        const { password, token } = req.body;
 
        if (!token) {
            return res.status(400).json({ message: "Invalid token" });
        }
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await userModel.findById(decoded.id);
        if (!user) {
            return res.status(400).json({ message: "User not found" });
        }
        const salt = await bycrypt.genSalt(10);
        const hashedPassword = await bycrypt.hash(password, salt);
        user.password = hashedPassword;
        await user.save();
        res.status(200).json({ message: "Password reset successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export { loginUser, registerUser, adminLogin, updateUser, getUser, forgotPassword, resetPassword };
