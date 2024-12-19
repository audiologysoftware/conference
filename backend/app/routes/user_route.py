from fastapi import APIRouter, HTTPException, Depends
from sqlalchemy.ext.asyncio import AsyncSession
from app.schemas.user import UserCreate, UserRead
from app.services.user_service import create_user, get_user_by_email
from app.config.database import get_db
from loguru import logger

router = APIRouter()

# Endpoint to register a user
@router.post("/register", response_model=str)
async def register_user(user: UserCreate, db: AsyncSession = Depends(get_db)):
    try:
        logger.info("Registering user: {}", user.email)
        result = await create_user(db, user)
        if result:
            logger.info("User registered successfully: {}", user.email)
            return "Registration successful"
        else:
            raise HTTPException(status_code=400, detail="Registration not successful")
    except HTTPException as e:
        logger.error("HTTP error during user registration: {}", e.detail)
        raise e
    except Exception as e:
        logger.error("Unexpected error during user registration: {}", str(e))
        raise HTTPException(status_code=500, detail="Internal Server Error")

# Endpoint to read user data
@router.get("/user", response_model=UserRead)
async def read_user(email: str, db: AsyncSession = Depends(get_db)):
    try:
        logger.info("Fetching user data for email: {}", email)
        user = await get_user_by_email(db, email)
        logger.info(user)
        if not user:
            logger.warning("User not found for email: {}", email)
            raise HTTPException(status_code=404, detail="User not found")
        logger.info("User data fetched successfully for email: {}", email)
        return user
    except HTTPException as e:
        logger.error("HTTP error while fetching user data: {}", e.detail)
        raise e
    except Exception as e:
        logger.error("Unexpected error while fetching user data: {}", str(e))
        raise HTTPException(status_code=500, detail="Internal Server Error")
