import 'dotenv/config';
import { Telegraf } from 'telegraf';
import { GoogleGenerativeAI } from '@google/generative-ai';

const bot = new Telegraf(process.env.BOT_TOKEN);
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-pro" }); // Pastikan model ini benar

bot.start((ctx) => {
    ctx.reply("Halo! Kirim pesan untuk bertanya ke AI.");
});

bot.on('text', async (ctx) => {
    const userMessage = ctx.message.text;

    try {
        const result = await model.generateContent(userMessage);
        const response = await result.response;
        const text = response.text();

        ctx.reply(text); // Kirim jawaban ke Telegram
    } catch (error) {
        console.error("❌ Error:", error);
        ctx.reply("Maaf, ada kesalahan saat memproses permintaan.");
    }
});

bot.launch();
console.log("✅ Bot berjalan... Tekan Ctrl+C untuk berhenti.");
