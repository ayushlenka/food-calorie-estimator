import os

class Settings:
    PROJECT_NAME = "Food Calorie Estimation API"
    DATABASE_URL = os.getenv("DATABASE_URL", "postgresql://username:password@localhost:5432/food_calories_db")
    MODEL_PATHS = {
        "mobilenet": "models/mobilenet_model_final.h5",
        "resnet": "models/resnet_model_final.h5",
        # "efficientnet": "models/efficientnet.h5" 
    }
    # List or mapping of classes. Ensure order matches the model’s training.
    FOOD_CLASSES = [
        "apple_pie", "baby_back_ribs", "baklava", 
        # ... include all 101 classes from Food-101 ...
        "waffles"
    ]

settings = Settings()
