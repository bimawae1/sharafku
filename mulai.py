import os
import google.generativeai as genai
from telegram import Update
from telegram.ext import ApplicationBuilder, CommandHandler, MessageHandler, filters, CallbackContext

# Set API Keys
GEMINI_API_KEY = "AIzaSyC1UHTrPC4F3BhCe4tKQY25Lxh95RoLZuY"
TELEGRAM_BOT_TOKEN = "8150109320:AAFfJ2nixRgYoHrlgXMc1q58Y6ZJVrFO530"

# Konfigurasi Google Gemini
genai.configure(api_key=GEMINI_API_KEY)

async def start(update: Update, context: CallbackContext):
    await update.message.reply_text("Halo! Aku bot AI yang terhubung ke Google Gemini. Kirim pesan untuk mulai!")

async def handle_message(update: Update, context: CallbackContext):
    user_message = update.message.text
    model = genai.GenerativeModel("gemini-2.0flash")
    response = model.generate_content(user_message)
    
    # Balas dengan hasil dari Gemini
    await update.message.reply_text(response.text)

app = ApplicationBuilder().token(TELEGRAM_BOT_TOKEN).build()

app.add_handler(CommandHandler("start", start))
app.add_handler(MessageHandler(filters.TEXT & ~filters.COMMAND, handle_message))

if __name__ == "__main__":
    print("Bot berjalan...")
    app.run_polling()
