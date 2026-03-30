const express = require("express");
const authController = require("../controllers/auth.controller");

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

module.exports = authRouter;