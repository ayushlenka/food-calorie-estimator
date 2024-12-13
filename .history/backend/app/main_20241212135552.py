from fastapi import FastAPI
from app.models.mobilenet import load_model as load_mobilenet
from app.models.efficientnet import load_model as load_efficientnet
from app.models.resnet import load_model as load_resnet


app = FastAPI()

@app.get("/")
def read_root():
    return {"message": "Hello, World!"}


models = {
    "mobilenet": load_mobilenet(),
    "efficientnet": load_efficientnet(),
    "resnet": load_resnet()
}
