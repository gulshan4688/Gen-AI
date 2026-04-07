const pdfParse = require("pdf-parse")
const generateInterviewReport = require('../services/ai.service')
const InterviewReportModel = require('../models/interviewReport.model')

async function getInterviewReportController(req, res) {
    const resumeContent = await (new pdfParse.PDFParse(Uint8Array.from(req.file.buffer))).getText();

    const { selfDescription, jobDescription } = req.body
    const interviewReportByAi = await generateInterviewReport({
        resume: resumeContent.text,
        selfDescription,
        jobDescription
    })
    //- - - - - -  - -- - - - - -  - -- - - - - -  - -- - - - - -  - -- - - - - -  - -
    function fixArray(arr) {
        if (!Array.isArray(arr)) return [];

        return arr.map(item => {
            if (typeof item === "string") {
                try {
                    return JSON.parse(item);
                } catch {
                    return null;
                }
            }
            return item;
        }).filter(Boolean);
    }

    interviewReportByAi.technicalQuestions = fixArray(interviewReportByAi.technicalQuestions);
    interviewReportByAi.behavioralQuestions = fixArray(interviewReportByAi.behavioralQuestions);
    interviewReportByAi.skillGaps = fixArray(interviewReportByAi.skillGaps);
    interviewReportByAi.preparationPlan = fixArray(interviewReportByAi.preparationPlan);
    //- - - - - -  - -- - - - - -  - -- - - - - -  - -- - - - - -  - -- - - - - -  - -

    const interviewReport = await InterviewReportModel.create({
        user: req.user.id,
        resume: resumeContent.text,
        selfDescription,
        jobDescription,
        ...interviewReportByAi
    })

    res.status(200).json({
        message: "Report Generated successfully",
        interviewReport
    })
}


async function getInterviewReportByIdController(req, res) {
    const { interviewId } = req.params

    const interviewReport = await InterviewReportModel.findOne({ _id: interviewId, user: req.user.id })

    if (!interviewReport) {
        return res.status(404).json({ message: "Interview Report was Not Found" });
    }

    res.status(200).json({
        message: "Interview report fetched successfully.",
        interviewReport
    })
}

async function getAllInterviewReportsController(req, res) {
    const allInterviewReports = await InterviewReportModel
        .find({ user: req.user.id })
        .sort({ createdAt: -1 })
        .select("-resume -selfDescription -jobDescription -__v, -technicalQuestions, -behavioralQuestions,-skillGaps, -preparationPlan")

    res.satus(200).json({
        message: "All Interview Reports fetched successfully",
        allInterviewReports
    })
}
module.exports = {
    getInterviewReportController,
    getInterviewReportByIdController,
    getAllInterviewReportsController
}