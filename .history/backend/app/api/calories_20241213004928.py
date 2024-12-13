from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from backend.app.database.db import get_db
from backend.app.database.calorie_model import CalorieItem
from pydantic import BaseModel

router = APIRouter()

class CalorieEstimateRequest(BaseModel):
    food_name: str
    weight: float

class CalorieEstimateResponse(BaseModel):
    calories: float

@router.get("/foods")
def get_food_items(db: Session = Depends(get_db)):
    items = db.query(CalorieItem).all()
    return [{"name": i.name, "calories_per_gram": i.calories_per_gram} for i in items]

@router.post("/estimate_calories", response_model=CalorieEstimateResponse)
def estimate_calories(request: CalorieEstimateRequest, db: Session = Depends(get_db)):
    item = db.query(CalorieItem).filter(CalorieItem.name == request.food_name).first()
    if not item:
        raise HTTPException(status_code=404, detail="Food not found")
    total_calories = request.weight * item.calories_per_gram
    return CalorieEstimateResponse(calories=total_calories)
