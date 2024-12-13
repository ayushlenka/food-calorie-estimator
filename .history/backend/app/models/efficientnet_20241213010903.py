import tensorflow as tf
import numpy as np
from backend.app.config import settings

def load_model():
    model = tf.keras.models.load_model(settings.MODEL_PATHS["efficientnet"])
    return model

def predict(model, img_array):
    preds = model.predict(np.expand_dims(img_array, axis=0))
    class_idx = np.argmax(preds[0])
    return settings.FOOD_CLASSES[class_idx]
