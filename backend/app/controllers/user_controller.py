from fastapi import HTTPException   
from app.schemas.service_response import ApiResponse, StandardResponse
from app.schemas.user_schema import UserCreate
from app.services.user_service import create_user, send_email_to_user, get_user_by_email
from app.config.database import get_db
from sqlalchemy.ext.asyncio import AsyncSession
from fastapi import Depends
from loguru import logger


async def user_registration_process(user: UserCreate, db: AsyncSession):
    logger.info("Received registration request for user: {}", user.email)
    try:
        logger.info(f"Registering user: {user.email}")
        response = await create_user(user, db)

        if response.status:            
            await send_email_to_user(user)
            response = ApiResponse(
                status_code=200,
                detail={
                    "status":"success",
                    "data":None,
                    "message": response.message
                }
            )
        else:
            response = ApiResponse(
                status_code=400,
                detail={
                    "status":"failure",
                    "data":None,
                    "message": response.message
                }
            )        
        
        return response                    
    except HTTPException as e:
        logger.error("HTTP error during user registration: {}", e.detail)
        return ApiResponse(
            status_code=e.status_code,
            detail={
                "status":"failure",
                "data":None,
                "message": e.detail
            }            
        )
    except Exception as e:
        logger.error("Unexpected error during user registration: {}", str(e))
        raise HTTPException(status_code=500, detail=StandardResponse(status="failure", data=None, message="Sorry, Server is not responing"))
    

async def fetch_user_details(email_id:str, db: AsyncSession = Depends(get_db))->ApiResponse:
    try:
        logger.info("Fetching user data for email: {}", email_id)
        user = await get_user_by_email(db, email_id)

        if user is None:
            response = ApiResponse(
                status_code=404,
                detail={
                    "status":"failure",
                    "data":None,
                    "message": "User not found"
                }
            )
        else:
            response = ApiResponse(
                status_code=200,
                detail={
                    "status":"success",
                    "data":user,
                    "message": "User found"
                }
            )        
        return response                
    except Exception as e:
        logger.error("Unexpected error while fetching user data: {}", str(e))
        raise HTTPException(status_code=500, detail=StandardResponse(status="failure", data=None, message="Sorry, Server is not responing"))

