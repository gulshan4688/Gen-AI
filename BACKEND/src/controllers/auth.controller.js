const UserModel = require('../models/user.model');
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const BlackListTokenModel = require('../models/blacklist.model');



/**
 * @description accepts username , email and password 
 */
async function RegisterUserController(req, res) {
    const { username, email, password } = req.body;
    if (!username || !email || !password) {
        return res.status(400).json({ message: "please provide username, email and password" });
    }

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

    const token = jwt.sign(
        { id: user._id, email: user.email, username: user.username },
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

    const user = await UserModel.findOne({ email })

    if (!user) {
        return res.status(404).json({ message: "User does not Exists" })
    }

    const isPassword = await bcrypt.compare(password, user.password);

    if (!isPassword) {
        return res.status(400).json({ message: "Incorrect password or email" })
    }

    const token = jwt.sign(
        { id: U=user._id, email: user.email, username : user.username },
        process.env.JWT_SECRET,
        { expiresIn: "1d" }
    )

    res.cookie("token", token);

    res.status(200).json({
        message: "user logged in successfully",
        user: {
            id: user._id,
            username: user.username,
            email: user.email
        }
    })


}

/**
 * @name logout 
 * @description logout user , remove the cookies and put the token in blacklist
 */

async function LogoutUserController(req, res){
    const token = req.cookies.token;

    if(token){
        await BlackListTokenModel.create({token})
    }

    res.clearCookie("token");

    res.status(200).json({ message : "user logged out successfully" })

}

/**
 * @name get-me
 * @description controller that gets user data from data base
 */

async function GetmeUserController(req, res){
    const user = await UserModel.findById(req.user.id);

    res.status(200).json({
        message : "User details fetched successfully",
        user: {
            id : user.id,
            username : user.username,
            email : user.email
        }
    })

}

module.exports = {
    RegisterUserController,
    LoginUserController,
    LogoutUserController,
    GetmeUserController
}