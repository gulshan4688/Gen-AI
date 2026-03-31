const express = require("express")
const app = express();
const cookieParser = require("cookie-parser");

// required all the routes here
const authRouter = require('./routes/auth.routes')

// if this line is not present than the body in the req can not be deconstruct in the controller like we do
app.use(express.json());
app.use(cookieParser());
 
// using all the routes here 
app.use("/api/auth", authRouter);

module.exports = app   