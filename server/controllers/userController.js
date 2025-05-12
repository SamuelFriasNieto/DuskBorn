import userModel from "../models/userModel.js";
import bycrypt from "bcrypt";
import validator from "validator";
import jwt from "jsonwebtoken";

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
        res.status(200).json({
            _id: user._id,
            name: user.name,
            email: user.email,
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

export { loginUser, registerUser, adminLogin, updateUser, getUser };
