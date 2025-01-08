import { GoogleGenerativeAI } from "@google/generative-ai";

console.log("nev" , process.env.GEMINI_API_KEY);
const genAI = new GoogleGenerativeAI("AIzaSyAkxCObnTb-dLsQ4Yk4dX10ewCf0LFvWO8");

const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

export default model;