"user server"

import model from "@/lib/Gemini";
import genAI from "@/lib/Gemini";
import { GenerateSummaryInput, GenerateSummarySchema, GenerateWorkExperienceInput, generateWorkExperienceSchema, WorkExperience } from "@/lib/validation";

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

    if(!result.response.text()){
        throw new Error("Failed to generate AI response")
    }

    return airesponse;
}

export async function generateWorkExperience(input : GenerateWorkExperienceInput) {
    const  {description} = generateWorkExperienceSchema.parse(input);

    const systemMessage = `
    You are a job resume generator AI , your task is to generate a work experience entry based on the user's input.
    Your Response must adhere to the following Structure: you can omit fields if they can't be infered from the provided data
    but don't add any new ones

    Job Title : <job Title>
    Company : <company name>
    Start Date : <format : YYYY-MM-DD (only if provided)>
    End Date : <format : YYYY-MM-DD (only if provided)>
    description : <an optional description  in bullet format, might be infered from the job title>
    `

    const userMessage = `PLease provide a work experience entry based on the following description: ${description}`

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
        throw new Error("Failed to generate AI response")
    }

    return {
        //regex to extract the job title and company name from the response
        position : airesponse.match(/Job title : (.*)/)?.[1] || "",
        company : airesponse.match(/Company : (.*)/)?.[1] || "",
        description : (airesponse.match(/Description : ([\s\S]*)/)?.[1] || "").trim(),
        startDate : airesponse.match(/Start date : (\d{4}-\d{2}-\d{2})/)?.[1],
        endDate : airesponse.match(/End date : (\d{4}-\d{2}-\d{2})/)?.[1],
    } satisfies WorkExperience
}