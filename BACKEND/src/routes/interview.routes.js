const express = require("express");
const authmiddleware = require('../middleware/auth.middleware');
const upload = require("../middleware/file.middleware");
const interviewController = require('../controllers/interview.controller')
const interviewRouter = express.Router();

interviewRouter.post("/", authmiddleware.authUser, upload.single("resume"),
        interviewController.getInterviewReportController );

        
module.exports = interviewRouter;