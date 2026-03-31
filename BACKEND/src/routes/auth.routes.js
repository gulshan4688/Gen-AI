const express = require("express");
const authController = require("../controllers/auth.controller");
const authmiddleware = require('../middleware/auth.middleware')

const authRouter = express.Router();

/**
 * @route Post  /api/auth/Register
 * @description Register a new user 
 * @access public
 */
authRouter.post("/Register", authController.RegisterUserController);
/**
 * @route /api/auth/login
 * @description login user via email and password
 * @access Public
 */
authRouter.post("/login", authController.LoginUserController);


/**
 * @route /api/auth/logout
 * @description logs out user and blacklists the token
 * @access public
 */
authRouter.get("/logout", authController.LogoutUserController);

/**
 * @route Get /api/auth/get-me
 * @description gets the user data from the data base who is trying to log-in
 * @access public
 */
authRouter.get("/get-me", authmiddleware.authUser , authController.GetmeUserController);


module.exports = authRouter;