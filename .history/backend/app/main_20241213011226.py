from fastapi import FastAPI
from backend.app.config import settings
from backend.app.api import classify, calories, metrics

app = FastAPI(title=settings.PROJECT_NAME)

app.include_router(classify.router, prefix="/api", tags=["classify"])
app.include_router(calories.router, prefix="/api", tags=["calories"])
app.include_router(metrics.router, prefix="/api", tags=["metrics"])
