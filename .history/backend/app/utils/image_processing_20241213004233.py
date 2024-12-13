from PIL import Image
import numpy as np

def preprocess_image(file, target_size=(224,224)):
    img = Image.open(file).convert("RGB")
    img = img.resize(target_size)
    img_array = np.array(img) / 255.0
    return img_array
