const userModel = require('../Models/userModel');
const reqBookModel = require('../Models/reqBookModel');
const jwt = require('jsonwebtoken');
const env = require('dotenv').config();

const secretKey = process.env.JWT_SECRET_KEY || 'I Love You 3000';


//All Users
const getAllUsers = async (req, res) => {
    try {
        const users = await userModel.find();
        return res.status(200).send({
            message: "Users retrieved successfully",
            users
        });
    } catch (error) {
        console.error("Error retrieving users:", error);
        return res.status(500).send({
            message: "Internal server error"
        });
    }
};

//Login controller
const loginController = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await userModel.findOne({ email });

        if (!user) {
            return res.status(404).send({
                message: "User not found"
            });
        }

        if (user.password !== password) {
            return res.status(401).send({
                message: "Invalid credentials"
            });
        }

        const token = jwt.sign({ id: user._id, role: user.role }, secretKey, { expiresIn: '1h' });
        return res.status(200).send({
            message: "Login successful",
            token
        });
    } catch (error) {
        console.error("Error during login:", error);
        return res.status(500).send({
            message: "Internal server error"
        });
    }
};

//Admin Login controller
const AdminLoginController = async (req, res) => {
    try {
        const { email, password } = req.body;
        const admin = await userModel.findOne({ email, role: 'admin' });

        if (!admin) {
            return res.status(404).send({
                message: "Admin not found"
            });
        }

        if (admin.password !== password) {
            return res.status(401).send({
                message: "Invalid credentials"
            });
        }

        const token = jwt.sign({ id: admin._id, role: admin.role }, secretKey, { expiresIn: '1h' });
        return res.status(200).send({
            message: "Admin login successful",
            token
        });
    } catch (error) {
        console.error("Error during admin login:", error);
        return res.status(500).send({
            message: "Internal server error"
        });
    }
};


// oppoint New admin
const appointAdmin = async (req, res) => {
    try {
        const { email } = req.body;
        const user = await userModel.findOne({ email });

        if (!user) {
            return res.status(404).send({
                message: "User not found"
            });
        }

        user.role = 'admin';
        await user.save();

        return res.status(200).send({
            message: "User appointed as admin successfully",
            user
        });
    } catch (error) {
        console.error("Error appointing admin:", error);
        return res.status(500).send({
            message: "Internal server error"
        });
    }
};


//Signup controller
const signupController = async (req, res) => {
    try {
        const existingUser = await userModel.findOne({ email: req.body.email });
        if (existingUser) {
            return res.status(200).send({
                message: "User already exists"
            });
        }

        const { name, email, password, RollNo, branch, year, mobile } = req.body;
        const newUser = new userModel({ name, email, password, RollNo, branch, year, mobile });
        await newUser.save();
        return res.status(201).send({
            message: "User created successfully",
            user: newUser
        });

    } catch (error) {
        console.error("Error during signup:", error);
        return res.status(500).send({
            message: "Internal server error"
        });
    }
};

//Search Profile by Roll No
const getUserProfile = async (req, res) => {
    try {
        const { RollNo } = req.params;
        const user = await userModel.findOne({ RollNo });
        if (!user) {
            return res.status(404).send({
                message: "User not found"
            });
        }

        return res.status(200).send({
            message: "User profile retrieved successfully",
            user
        });
    } catch (error) {
        console.error("Error retrieving user profile:", error);
        return res.status(500).send({
            message: "Internal server error"
        });
    }
};

// Request Book
const requestBook = async (req, res) => {
    try {
        const { bookName, rollNo, forWhichYear, forWhichBranch, reason, userId } = req.body;
        const newRequest = new reqBookModel({ userId, bookName, rollNo, forWhichYear, forWhichBranch, reason });
        await newRequest.save();
        return res.status(201).send({
            message: "Book request created successfully",
            request: newRequest
        });
    } catch (error) {
        console.error("Error creating book request:", error);
        return res.status(500).send({
            message: "Internal server error"
        });
    }
};


//Show all requested books
const showAllRequestedBooks = async (req, res) => {
    try {
        const requests = await reqBookModel.find().populate('userId', 'name email RollNo mobile');
        return res.status(200).send({
            message: "All book requests retrieved successfully",
            requests
        });
    } catch (error) {
        console.error("Error retrieving book requests:", error);
        return res.status(500).send({
            message: "Internal server error"
        });
    }
};

module.exports = {getAllUsers, signupController, getUserProfile, loginController, requestBook, showAllRequestedBooks, AdminLoginController, appointAdmin};