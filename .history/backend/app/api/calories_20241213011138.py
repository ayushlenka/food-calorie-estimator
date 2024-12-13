from fastapi import APIRouter
from pydantic import BaseModel
from backend.app.calories_data import FOOD_CALORIES

router = APIRouter()

class CalorieEstimateRequest(BaseModel):
    food_name: str
    weight: float

class CalorieEstimateResponse(BaseModel):
    calories: float

@router.post("/estimate_calories", response_model=CalorieEstimateResponse)
def estimate_calories(request: CalorieEstimateRequest):
    calories_per_gram = FOOD_CALORIES.get(request.food_name, 0.0)
    total_calories = request.weight * calories_per_gram
    return CalorieEstimateResponse(calories=total_calories)
