require("dotenv").config();
const app = require('./src/app');
const connectDB = require('./src/config/database');
// const generateInterviewReport = require("./src/services/ai.service");
// const {resume, selfDescription, jobDescription } = require('./src/services/temp')

connectDB();
// generateInterviewReport({resume, selfDescription, jobDescription});
console.log("nothing else********");
app.listen(3000, ()=>{
    console.log("App is running on 3000")
}) 