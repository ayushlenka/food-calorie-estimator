import os

class Settings:
    PROJECT_NAME = "Food Calorie Estimation API"
    # Paths to models - Adjust if needed
    MODEL_PATHS = {
        "mobilenet": "backend/app/models/mobilenet.h5",
        "resnet": "backend/app/models/resnet.h5",
        # Add if you have an efficientnet model:
        # "efficientnet": "backend/app/models/efficientnet.h5"
    }
    # Classes matching the model training order
    FOOD_CLASSES = [
        "apple_pie", "baby_back_ribs", "baklava",
        "beef_tartare", "waffles" 
        # ... include all classes your model supports
    ]

settings = Settings()
