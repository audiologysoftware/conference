from fastapi import BackgroundTasks
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select
from app.models.user_model import User
from app.schemas.user import UserCreate
from app.services.email_service import send_email
from app.schemas.email_schema import Email_Format
from loguru import logger

# Service to create a new user
async def create_user(db: AsyncSession, user: UserCreate) -> bool:
    try:
        # Check if user already exists
        result = await db.execute(select(User).where(User.email == user.email))
        existing_user = result.scalar_one_or_none()
        if existing_user:
            logger.warning("User with email {} already exists.", user.email)
            return False

        # Create a new user
        new_user = User(
            fullname=user.fullname,
            email=user.email,
            phone=user.phone,
            bank_type=user.bank_type,
            transaction_id=user.transaction_id,
            transaction_screenshot = user.transaction_screenshot
        )
        db.add(new_user)
        await db.commit()

        email = Email_Format(
            email_to=user.email,
            email_subject="Registration Successful",
            emaill_body=f"Dear {user.fullname},\n\nThank you for registering to Vishrutha Conference. \n\nRegards,\n Vishrutha Team"
        )

        try:
            logger.info("Sending email to: {}", user.email)
            # background_tasks = BackgroundTasks()    
            # background_tasks.add_task(send_email, email)
            await send_email(email)
        except Exception as e:
            logger.error("Error while sending email: {}", str(e))

        logger.info("User created successfully: {}", user.email)
        return True
    except Exception as e:
        logger.error("Error while creating user: {}", str(e))
        await db.rollback()
        raise

# Service to get user data by email
async def get_user_by_email(db: AsyncSession, email: str):
    try:
        result = await db.execute(select(User).where(User.email == email))
        user = result.scalar()
        return user
    except Exception as e:
        logger.error("Error while fetching user by email: {}", str(e))
        raise

async def send_test_email(email:Email_Format):
    try:
        print("Sending test email")
        return await send_email(email)        
    except Exception as e:
        logger.error("Error while sending email: {}", str(e))
        