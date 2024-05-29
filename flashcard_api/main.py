from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import json
import ollama

app = FastAPI()

# Configure CORS
origins = [
    "http://localhost:3000",
    "http://127.0.0.1:3000",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class TextInput(BaseModel):
    text: str

def create_flashcards(text):
    response = ollama.chat(model='llama3', options={'temperature': 0.3}, format="json", messages=[
        {
            'role': 'user',
            'content': f"""Generate flashcards for the content provided below.
All flashcards should be in an array with key 'flashcards'. Each individual JSON items (with keys 'front' and 'back').

Example Output in JSON:
{{
    "flashcards":[
    {{
        "front": "What is the main function of the heart?",
        "back": "The heart pumps blood through the body.",
    }},
    {{
        "front": "Describe the process of photosynthesis.",
        "back": "Photosynthesis is the process by which green plants use sunlight to synthesize foods with the help of chlorophyll.",
    }}
    ]
}}

###### Content Starts ######
{text}
###### Content Ends ######
"""
        }
    ])
    flashcards = response['message']['content']
    return json.loads(flashcards)

@app.post("/generate_flashcards/")
async def generate_flashcards(text_input: TextInput):
    try:
        return create_flashcards(text_input.text)

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)