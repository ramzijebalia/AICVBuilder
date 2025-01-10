import { GoogleGenerativeAI } from "@google/generative-ai";


const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY || '';
console.log("nev" , apiKey);

const genAI = new GoogleGenerativeAI(apiKey);

const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

export default model;