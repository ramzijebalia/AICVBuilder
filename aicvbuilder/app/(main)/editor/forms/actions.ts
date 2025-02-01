"use server"

import model from "@/lib/Gemini";
import genAI from "@/lib/Gemini";
import { canUseAITools } from "@/lib/permissions";
import { getUserSubscriptionLevel } from "@/lib/subscriptions";
import { GenerateSummaryInput, GenerateSummarySchema, GenerateWorkExperienceInput, generateWorkExperienceSchema, WorkExperience } from "@/lib/validation";
import { auth } from "@clerk/nextjs/server";

export async function GenerateSummary(input : GenerateSummaryInput) {
    const {userId} = await auth()
    if(!userId) throw new Error ("Unauthorized")
    
    const subscriptionLevel = await getUserSubscriptionLevel(userId)
    if(!canUseAITools(subscriptionLevel)){
      throw new Error("Upgrade your subscription to use this feature")
    }

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
    const {userId} = await auth()
    if(!userId) throw new Error ("Unauthorized")
    
    const subscriptionLevel = await getUserSubscriptionLevel(userId)
    if(!canUseAITools(subscriptionLevel)){
      throw new Error("Upgrade your subscription to use this feature")
    }

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
        position: airesponse.match(/\*\*Job Title:\*\* (.*)/)?.[1] || "",
        company: airesponse.match(/\*\*Company:\*\* (.*)/)?.[1] || "",
        startDate: airesponse.match(/\*\*Start Date:\*\* (\d{4}-\d{2}-\d{2})/)?.[1],
        endDate: airesponse.match(/\*\*End Date:\*\* (\d{4}-\d{2}-\d{2})/)?.[1],
        description: (airesponse.match(/\*\*Description:\*\*\n([\s\S]*)/)?.[1] || "")
            .split('\n')
            .map(line => line.trim().replace(/^\* /, '- ')) // Change '*' to '- '
            .filter(line => line.length > 0)
            .join('\n'), // Join the array into a single string
    } satisfies WorkExperience
}
