"use server"

import { GoogleGenerativeAI } from "@google/generative-ai"


export type Message = {
    role: "user" | "model"
    content: string
}

export async function chatWithGemini(history: Message[], newMessage: string) {
    try {
        const apiKey = process.env.GEMINI_API_KEY;

        if (!apiKey) {
            throw new Error("GEMINI_API_KEY is not set in environment variables.");
        }

        // Re-initialize to ensure it picks up the env var if it changed
        const genAI = new GoogleGenerativeAI(apiKey)
        const model = genAI.getGenerativeModel({
            model: "gemini-1.5-flash-001",
            systemInstruction: "You are a friendly and expert marketing assistant for NOON Digital, a full-service digital transformation agency. Our services include: iOS & Android App Development, ERP Systems, Hospital Management Systems, School Management Systems, Business Solutions, Warehouse Management, E-commerce, Graphic Design, and Digital Marketing. Your goal is to explain our services and convert visitors into leads by encouraging them to contact us on WhatsApp at +25263644494. Keep responses concise (under 3 sentences), professional, and persuasive. Use a helpful tone.",
        })

        const chat = model.startChat({
            history: history
                .filter((msg, index) => {
                    // Gemini history must start with 'user'.
                    // If the first message is 'model' (our welcome msg), skip it.
                    if (index === 0 && msg.role === 'model') return false;
                    return true;
                })
                .map((msg) => ({
                    role: msg.role,
                    parts: [{ text: msg.content }],
                })),
        })

        const result = await chat.sendMessage(newMessage)
        const response = await result.response
        return { success: true, message: response.text() }
    } catch (error: any) {
        console.error("Gemini API Error Detail:", error)
        return { success: false, message: `Error: ${error?.message || "Unknown error"}` }
    }
}
