const express = require("express");
const authmiddleware = require('../middleware/auth.middleware');
const upload = require("../middleware/file.middleware");
const interviewController = require('../controllers/interview.controller')
const interviewRouter = express.Router();

interviewRouter.post("/", authmiddleware.authUser, upload.single("resume"),
        interviewController.getInterviewReportController );

interviewRouter.get("/report/:interviewId", authmiddleware.authUser,
        interviewController.getInterviewReportByIdController );

interviewRouter.get("/", authmiddleware.authUser, interviewController.getAllInterviewReportsController);
module.exports = interviewRouter;