from fastapi import APIRouter, File, UploadFile, Query, HTTPException
from backend.app.utils.image_processing import preprocess_image
from backend.app.utils.model_utils import load_all_models
from backend.app.models import mobilenet, resnet

router = APIRouter()

models_dict = load_all_models()

@router.post("/classify")
async def classify_image(
    image: UploadFile = File(...),
    model_name: str = Query("mobilenet", enum=["mobilenet", "resnet", "efficientnet"])
):
    if model_name not in models_dict:
        raise HTTPException(status_code=404, detail="Model not found")

    img_array = preprocess_image(image.file)

    if model_name == "mobilenet":
        pred = mobilenet.predict(models_dict[model_name], img_array)
    elif model_name == "resnet":
        pred = resnet.predict(models_dict[model_name], img_array)
    # else:
    #     # efficientnet if implemented
    #     from backend.app.models import efficientnet
    #     pred = efficientnet.predict(models_dict[model_name], img_array)

    return {"predicted_food": pred}
