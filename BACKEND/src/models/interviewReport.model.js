const mongoose = require("mongoose")
const { string } = require("zod")

/**
 * - job description 
 * -resume text
 * - self decription 
 * -matchScore : Number
 * Technical Questoins :[{
 *      questions : "",
 *      intention : "",
 *      answer  : "", 
 * }]
 * Bhehaioral questions: [
 *      questions : "",
 *      intention : "",
 *      answer  : "", 
 * ]
 * skill gaps: [{
 *      skill  : "",
 *      severity  : {
 *          type : "",
 *          enum : ["low", "medium", "high"]
 *  }
 * }]
 * Pre-paration plans:[{
 *      day : Number,
 *      focus : string 
 *      tasks : [string]
 * }]
 */

const technicalQuestionsSchema = new mongoose.Schema({
    question: {
        type: String,
        required: [true, "Technical questions are required"]
    },
    intention: {
        type: String,
        required: [true, "Intentoin is required"]
    },
    answer: {
        type: String,
        required: [true, "Answer is required"]
    }
}, {
    _id: false
})

const behaviouralQuestionsSchema = new mongoose.Schema({
    question: {
        type: String,
        required: [true, "Technical questions are required"]
    },
    intention: {
        type: String,
        required: [true, "Intentoin is required"]
    },
    answer: {
        type: String,
        required: [true, "Answer is required"]
    }
}, {
    _id: false
})

const skillGapSchema = new mongoose.Schema({
    skill: {
        type: String,
        required: [true, "Skill is required"]
    },
    severity: {
        type: String,
        enum: ["low", "medium", "high"],
        required: [true, "severity is required"]
    }
}, {
    _id: false
})

const preparationPlanSchema = new mongoose.Schema({
    day: {
        type: String,
        required: [true, "Day is required"]
    },
    focus: {
        type: String,
        required: [true, "Focus is required"]
    },
    tasks: [{
        type: String,
        required: [true, "skills are required"]
    }]
})


const InterviewReportSchema = new mongoose.Schema({
    jobDescription: {
        type: String,
        required: [true, "jobDescription is required"]
    },
    resume: {
        type: String
    },
    selfDescription: {
        type: String
    },
    matchScore: {
        type: Number,
        min: 0,
        max: 100
    },
    technicalQuestions: [technicalQuestionsSchema],
    behavioralQuestions: [behaviouralQuestionsSchema],
    skillGaps: [skillGapSchema],
    preparationPlan: [preparationPlanSchema],
    
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users"
    },
    title : {
        type : string,
        required : [true , "Job title is required"]
    }
},{
    timestamps : true
})


const InterviewReportModel = mongoose.model("InterviewReport", InterviewReportSchema);

module.exports = InterviewReportModel;