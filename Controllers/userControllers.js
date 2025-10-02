const userModel = require('../Models/userModel');


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

module.exports = {getAllUsers, signupController, getUserProfile};