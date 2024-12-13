from backend.app.models import mobilenet, resnet

def load_all_models():
    models_dict = {
        "mobilenet": mobilenet.load_model(),
        "resnet": resnet.load_model()
    }
    # Add efficientnet when applicable
    
    return models_dict
