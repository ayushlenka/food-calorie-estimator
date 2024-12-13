import tensorflow as tf
import numpy as np
from backend.app.config import settings

def load_model():
    model = tf.keras.models.load_model(settings.MODEL_PATHS["mobilenet"])
    return model

def predict(model, img_array):
    preds = model.predict(np.expand_dims(img_array, axis=0))
    class_idx = np.argmax(preds[0])
    print("class_idx:", class_idx)
    print("Number of classes in FOOD_CLASSES:", len(settings.FOOD_CLASSES))
    return settings.FOOD_CLASSES[class_idx]
