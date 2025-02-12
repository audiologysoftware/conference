from fastapi import APIRouter
from app.schemas.service_response import ApiResponse

router = APIRouter()

@router.get('/', response_model=ApiResponse)
def base_route():
    try:
        return ApiResponse(
            status_code=200,
            detail={
                "status":"success",
                "data":None,
                "message":"Welcome to the Conference API"
            }
        )
    except:
        return ApiResponse(
            status_code=500,
            detail={
                "status":"failure",
                "data":None,
                "message":"Internal Server Error"
            }
        )