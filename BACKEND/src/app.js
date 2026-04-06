const express = require("express")
const app = express();
const cookieParser = require("cookie-parser");
const cors = require("cors");


// required all the routes here
const authRouter = require('./routes/auth.routes')
const interviewRouter = require('./routes/interview.routes');

// if this line is not present than the body in the req can not be deconstruct in the controller like we do
app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin : "http://localhost:5173",
    credentials : true
}))
 
// using all the routes here 
app.use("/api/auth", authRouter);
app.use("/api/interview/", interviewRouter);


module.exports = app   