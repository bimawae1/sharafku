import google.generativeai as genai

genai.configure(api_key="AIzaSyC1UHTrPC4F3BhCe4tKQY25Lxh95RoLZuY")

models = genai.list_models()
for model in models:
    print(model.name)
