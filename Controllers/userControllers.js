const userModel = require('../Models/userModel');

//Signup controller
const signupController = async (req, res) => {
    try {
        const existingUser = await userModel.findOne({ email: req.body.email });
        if (existingUser) {
            return res.status(200).send({
                message: "User already exists"
            });
        }
    } catch (error) {
        console.error("Error during signup:", error);
        return res.status(500).send({
            message: "Internal server error"
        });
    }
};


module.exports = { signupController};