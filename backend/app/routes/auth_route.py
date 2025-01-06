from fastapi import APIRouter,Response
from datetime import timedelta
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from app.utils.auth import create_token, verify_token
from fastapi import Depends

router = APIRouter()
security = HTTPBearer()


@router.post("/login")
def login(user_data: dict, response:Response):              
    token = create_token({"sub": user_data["username"]})

 # Set the cookie in the response
    response.set_cookie(
        key="access_token",
        value=token,
        httponly=True,       # Ensures the cookie is only accessible via HTTP(S)
        max_age=timedelta(days=1).total_seconds(),  # Optional: expires in 7 days
        samesite="strict",  # Optional: 'strict', 'lax', or 'none'
        secure=True         # Optional: set to True in production for HTTPS
    )

    return {"access_token": token, "token_type": "bearer"}  # This is just for demonstration


@router.get("/test-protected-route")
def test_protected_route(credentials:HTTPAuthorizationCredentials=Depends(security)):
    token = credentials.credentials
    payload = verify_token(token)
    print("test-payload", payload)
    if not payload:
        return {"message": "Invalid token"}
    return {"message": "This is a protected route:", "token":payload}   
    