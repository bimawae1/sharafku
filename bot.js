import 'dotenv/config';
import { Telegraf } from 'telegraf';
import { GoogleGenerativeAI } from '@google/generative-ai';
import sqlite3 from 'sqlite3';
import path from 'path';

const bot = new Telegraf(process.env.BOT_TOKEN);
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-pro" });

// Koneksi ke database SQLite
const db = new sqlite3.Database(path.join(process.cwd(), 'kamus_telegram.db'));

// Fungsi untuk mencari terjemahan dalam database
function cariKata(kata, callback) {
    db.get("SELECT arab FROM kamus WHERE indonesia = ?", [kata], (err, row) => {
        if (err) {
            callback('Terjadi kesalahan dalam pencarian.');
        } else if (row) {
            callback(`Terjemahan: ${row.arab}`);
        } else {
            callback(null); // Jika tidak ditemukan, lanjutkan ke AI
        }
    });
}

bot.start((ctx) => {
    ctx.reply("Halo! Kirim pesan untuk bertanya ke AI atau mencari kata dalam kamus.");
});

bot.on('text', async (ctx) => {
    const userMessage = ctx.message.text;

    cariKata(userMessage, async (translation) => {
        if (translation) {
            ctx.reply(translation);
        } else {
            try {
                const result = await model.generateContent(userMessage);
                const response = await result.response;
                const text = response.text();
                ctx.reply(text);
            } catch (error) {
                console.error("❌ Error:", error);
                ctx.reply("Maaf, ada kesalahan saat memproses permintaan.");
            }
        }
    });
});

bot.launch();
console.log("✅ Bot berjalan... Tekan Ctrl+C untuk berhenti.");
