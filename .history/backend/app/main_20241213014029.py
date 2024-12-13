from fastapi import FastAPI
from backend.app.api import classify, calories, metrics
from backend.app.config import settings

app = FastAPI(title=settings.PROJECT_NAME)

@app.get("/")
def root():
    return {"message": "Welcome to the Food Calorie Estimation API"}

app.include_router(classify.router, prefix="/api", tags=["classify"])
app.include_router(calories.router, prefix="/api", tags=["calories"])
app.include_router(metrics.router, prefix="/api", tags=["metrics"])
