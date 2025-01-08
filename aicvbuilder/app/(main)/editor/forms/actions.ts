"user server"

import model from "@/lib/Gemini";
import genAI from "@/lib/Gemini";
import { GenerateSummaryInput, GenerateSummarySchema } from "@/lib/validation";

export async function GenerateSummary(input : GenerateSummaryInput) {

    const {jobTitle , workExperiences , educations , skills} = GenerateSummarySchema.parse(input);

    const systemMessage = `
        You are a job resume generator AI , Your task is to write a professional summary for a resume  given the users's provided data.
        Only return the summary and do not include any other information in the response. Keep it concise and professional. 
    `

    const userMessage = `
    Please generate a  professional summary from this data:
    Job Title : ${jobTitle || "N/A"}
    Work Experiences : 
        ${workExperiences?.map((exp) => `
            Position : ${exp.position || "N/A"} at ${exp.company || "N/A"} from ${exp.startDate || "N/A"} to ${exp.endDate || "Present"}
            Description : ${exp.description || "N/A"}
        `).join("\n")}
    Educations : 
        ${educations?.map((edu) => `
            Degree : ${edu.degree || "N/A"} at ${edu.school || "N/A"} from ${edu.startDate || "N/A"} to ${edu.endDate || "N/A"}
        `).join("\n")}
    Skills : ${skills}
    `

    console.log("system message ",systemMessage);
    console.log("user message ",userMessage);

    const chat = model.startChat({
        history: [
          {
            role: "user",
            parts: [{ text: userMessage }],
          },
          {
            role: "model",
            parts: [{ text: systemMessage }],
          },
        ],
    });

    const result = await chat.sendMessage(userMessage);
    const airesponse = result.response.text();
    console.log("result " , airesponse);
    console.log("chat ",chat);

    if(!result.response.text()){
        throw new Error("Failed to generate summary")
    }

    return airesponse;
}