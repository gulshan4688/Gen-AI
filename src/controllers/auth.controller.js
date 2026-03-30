const UserModel = require('../models/user.model');
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");



/**
 * @description accepts username , email and password 
 */
async function RegisterUserController(req, res) {
    const { username, email, password } = req.body;
    if (!username || !email || !password) {
        return res.status(400).json({ message: "please provide username, email and password" });
    }
    console.log("came here");

    const userExists = await UserModel.findOne({
        $or: [{ username }, { email }]
    })

    if (userExists) {
        return res.status(400).json({ message: "Account Already Exists with this email or username " })
    }

    const hash = await bcrypt.hash(password, 10);
    const user = await UserModel.create({
        username,
        email,
        password: hash
    })

    const token = await jwt.sign(
        { id: user._id, username: user.username },
        process.env.JWT_SECRET,
        { expiresIn: "1d" }
    )

    res.cookie("token", token);

    res.status(200).json({
        message: "user created successfully",
        user: {
            id: user._id,
            username: user.username,
            email: user.email
        }
    })


}

/**
 * @name LoginController
 * @description login a new user via email and password
 */
async function LoginUserController(req, res) {
    const { email, password } = req.body;

    const User = await UserModel.findOne({ email })

    if (!User) {
        return res.status(404).json({ message: "User does not Exists" })
    }

    const isPassword = await bcrypt.compare(password, User.password);

    if (!isPassword) {
        return res.status(400).json({ message: "Incorrect password or email" })
    }

    const token = jwt.sign(
        { user: User._id, password: User.password },
        process.env.JWT_SECRET,
        { expiresIn: "1d" }
    )

    res.cookie("token", token);

    res.status(200).json({
        message: "user logged in successfully",
        user: {
            id: User._id,
            username: User.username,
            email: User.email
        }
    })


}


module.exports = {
    RegisterUserController,
    LoginUserController
}