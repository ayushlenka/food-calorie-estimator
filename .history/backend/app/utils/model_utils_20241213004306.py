from backend.app.models import mobilenet, resnet, efficientnet
from backend.app.config import settings

def load_all_models():
    models_dict = {}
    # Load models that you have
    # If efficientnet file is not present or not needed, skip it
    models_dict["mobilenet"] = mobilenet.load_model()
    models_dict["resnet"] = resnet.load_model()
    # models_dict["efficientnet"] = efficientnet.load_model() # Uncomment if you have it
    return models_dict
