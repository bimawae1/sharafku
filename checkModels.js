import 'dotenv/config';
import { GoogleGenerativeAI } from '@google/generative-ai';

const apiKey = process.env.GEMINI_API_KEY;

if (!apiKey) {
    console.error("❌ API Key tidak ditemukan! Pastikan sudah diset di .env.");
    process.exit(1);
}

const genAI = new GoogleGenerativeAI(apiKey);
console.log("✅ API Key berhasil di-load.");
