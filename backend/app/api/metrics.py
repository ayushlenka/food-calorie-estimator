from fastapi import APIRouter

router = APIRouter()

@router.get("/metrics")
def get_model_metrics():
    # Static or placeholder metrics
    return {
        "mobilenet": {"accuracy": 0.85},
        "resnet": {"accuracy": 0.88},
        # "efficientnet": {"accuracy": 0.90} if available
    }
