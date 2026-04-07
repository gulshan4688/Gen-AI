require("dotenv").config();
const { GoogleGenAI } = require("@google/genai");
const z = require("zod");
const { zodToJsonSchema } = require("zod-to-json-schema");

console.log("API KEY:", process.env.GOOGLE_GEN_API_KEY);
const ai = new GoogleGenAI({
    apiKey: process.env.GOOGLE_GEN_API_KEY
});
const interviewReportSchema = z.object({
    matchScore: z.number().describe("A score between 10 to 100 indicating how well the candidates profile matches the job descriptoin"),
    technicalQuestions: z.array(
        z.object({
            question: z.string().describe("The technical question can be asked in the interview"),
            intention: z.string().describe("The intention of interviewer behind asking this question"),
            answer: z.string().describe("How to answer this question, what points to cover, what approach to take"),
        })
    ).describe("Technical questions that can be asked in the interview along with their intention and answers")
    ,
    behavioralQuestions: z.array(
        z.object({
            question: z.string().describe("The technical question can be asked in the interview"),
            intention: z.string().describe("The intention of interviewer behind asking this question"),
            answer: z.string().describe("How to answer this question, what points to cover, what approach to take"),
        })
    ).describe("Behavioral questions that can be asked in the interview along with their intention and answers")
    ,
    skillGaps: z.array(
        z.object({
            skill: z.string().describe("The skill which the candidate is lacking"),
            severity: z.enum(["low", "medium", "high"]).describe("The severity of this skill gap, i.e., how important it is to improve"),
        })
    ).describe("List of skill gaps in the candidate's profile along with their severity")
    ,

    preparationPlan: z.array(
        z.object({
            day: z.number().describe("The day number in the preparation plan, starting from day 1"),
            focus: z.string().describe("The main focus of this day in the preparation plan"),
            tasks: z.array(z.string()).describe("List of tasks to be done on this day"),
        })
    ).describe("A day-wise preparation plan for the candidate to follow in order to improve"),
    title : z.string().describe("The title of the job for which interview report is generated"),
});

async function generateInterviewReport({ resume, selfDescription, jobDescription }) {
    try {

        const prompt = `
Generate a COMPLETE interview report.

MANDATORY:
- Include ALL fields
- Do NOT skip any field
- matchScore between 60–95

Return ONLY JSON:

{
  "matchScore": number,
  "technicalQuestions": [{ "question": "", "intention": "", "answer": "" }],
  "behavioralQuestions": [{ "question": "", "intention": "", "answer": "" }],
  "skillGaps": [{ "skill": "", "severity": "low | medium | high" }],
  "preparationPlan": [{ "day": number, "focus": "", "tasks": [""] }]
}

Resume: ${resume}
Self Description: ${selfDescription}
Job Description: ${jobDescription}
`;
        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: prompt,
            config: {
                responseMimeType: "application/json",
                responseSchema: zodToJsonSchema(interviewReportSchema),

            }
        })

        // console.log("PARSED_DATA=", data);
        return JSON.parse(response.text);
        // const interviewReport = interviewReportSchema.parse(JSON.parse(response.text));
    
    } catch (err) {
        if (err.status === 429) {
            console.log("Quota exceeded. Try later.");
            return { error: "Rate limit exceeded. Try after some time." };
        }
        console.error(err);
        return { error: "Something went wrong" };
    }
}

module.exports = generateInterviewReport








// async function invokeGeminiAi(){
//     const response = await ai.models.generateContent({
//         model : "gemini-2.5-flash",
//         contents : "Hello Gemini, exlain what is Interview ?"
//     })
//     console.log(response.text);
// }

// module.exports = invokeGeminiAi;