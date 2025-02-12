from app.schemas.service_response import ApiResponse
from app.schemas.login_schema import LoginCredentials
from datetime import timedelta


def login_process(user_data:LoginCredentials)->ApiResponse:    
    if(user_data.username == "vishruta" and user_data.password == "vishruta2"):      
        login_response = ApiResponse(
            status_code=200,
            detail={
                "status":"success",
                "data":None,
                "message":"Login successful"
            }   
        )
        return login_response  
    else:
        login_response = ApiResponse(
            status_code=401,
            detail={
                "status":"failure",
                "data":None,
                "message":"Invalid credentials"
            }
        )
        return login_response  
    
    