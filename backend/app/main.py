from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.database import mongo
from app.routes import employees, attendance

app = FastAPI(title="HRMS Lite API", version="0.1.0")

# CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include routes
app.include_router(employees.router)
app.include_router(attendance.router)

@app.on_event("startup")
async def startup():
    await mongo.connect()

@app.on_event("shutdown")
async def shutdown():
    await mongo.close()

@app.get("/health")
async def health():
    """Health check endpoint"""
    return {"status": "ok"}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
