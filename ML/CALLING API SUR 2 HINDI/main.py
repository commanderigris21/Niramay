from fastapi import FastAPI
from pydantic import BaseModel
from typing import Dict, Any
import requests
import os

app = FastAPI()

# Gemini API Key from Render environment variable
GEMINI_API_KEY = os.getenv("GEMINI_API_KEY")
GEMINI_URL = f"https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key={GEMINI_API_KEY}"

# Model for receiving dynamic form inputs
class DiagnosticInput(BaseModel):
    data: Dict[str, Any]

@app.post("/analyze")
async def analyze_pregnancy(info: DiagnosticInput):
    # Convert input into readable format
    formatted_data = "\n".join([f"{key.replace('_', ' ').title()}: {value}" for key, value in info.data.items()])

    # Structured, pregnancy-specific prompt
    prompt = (
        "Summarize the following pregnancy-related medical data in under 100 words. Include:\n"
        "- 1 key insight,\n"
        "- 1 major risk (if any),\n"
        "- 1 practical recommendation.\n\n"
        "Patient Info:\n"
        f"{formatted_data}\n\n"
        "Use a clinical yet caring tone. Be concise.keep the answer Humanise.DO RESPONSE IN HINDI LANGUAGE"
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