"""
Simple test handler for Vercel
"""
from fastapi import FastAPI
from mangum import Mangum

app = FastAPI()

@app.get("/")
def root():
    return {"message": "Simple test working!", "status": "ok"}

@app.get("/health")
def health():
    return {"status": "healthy", "test": "simple"}

# Vercel handler
handler = Mangum(app, lifespan="off")

