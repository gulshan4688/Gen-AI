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

module.exports = { getInterviewReportController }