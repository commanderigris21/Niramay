from fastapi import FastAPI
from pydantic import BaseModel
from typing import Dict, Any
import requests
import os

app = FastAPI()

# Gemini API Key from Render environment variable
GEMINI_API_KEY = os.getenv("GEMINI_API_KEY")
GEMINI_URL = f"https://generativelanguage.googleapis.com/v1beta1/models/gemini-pro:generateContent?key={GEMINI_API_KEY}"

# Model for receiving dynamic form inputs
class DiagnosticInput(BaseModel):
    data: Dict[str, Any]

@app.post("/analyze")
async def analyze_pregnancy(info: DiagnosticInput):
    # Convert input into readable format
    formatted_data = "\n".join([f"{key.replace('_', ' ').title()}: {value}" for key, value in info.data.items()])

    # Structured, pregnancy-specific prompt
    prompt = (
        "The following is a medical case summary of a pregnant woman based on recent health inputs. "
        "Please carefully analyze the data and provide:\n"
        "• a concise medical insight,\n"
        "• any potential risks or complications to watch for,\n"
        "• and a clear, personalized medical recommendation for her well-being.\n\n"
        "Patient Information:\n"
        f"{formatted_data}\n\n"
        "Use a professional and empathetic tone. Keep it concise and medically relevant."
    )

    # Call Gemini API
    payload = {"contents": [{"parts": [{"text": prompt}]}]}
    response = requests.post(GEMINI_URL, json=payload)

    if response.status_code == 200:
        try:
            gemini_response = response.json()['candidates'][0]['content']['parts'][0]['text']
        except (KeyError, IndexError):
            gemini_response = "Error parsing Gemini response."
    else:
        gemini_response = f"Gemini API Error: {response.text}"

    return {
        "status": "success" if response.status_code == 200 else "error",
        "prompt_sent": prompt,
        "gemini_response": gemini_response
    }
