from fastapi import APIRouter,Response
from datetime import timedelta
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from app.utils.auth import create_token, verify_token
from fastapi import Depends
from app.schemas.service_response import ApiResponse
from app.schemas.login_schema import LoginCredentials
from app.controllers.login_controller import login_process

router = APIRouter()
security = HTTPBearer()


@router.post("/login", response_model=ApiResponse)
def verify_credentials(user_data: LoginCredentials):         
    return login_process(user_data)
    


@router.get("/test-protected-route")
def test_protected_route(credentials:HTTPAuthorizationCredentials=Depends(security)):
    token = credentials.credentials
    payload = verify_token(token)
    print("test-payload", payload)
    if not payload:
        response = ApiResponse(
            status_code=401,
            detail={
                "status":"failure",
                "data":None,
                "message":"Invalid token"
            }
        )
        return response    
    response = ApiResponse(
        status_code=200,
        detail={
            "status":"success",
            "data":None,
            "message":"This is a protected route"
        }
    )
    return {"message": "This is a protected route:", "token":payload}   
    