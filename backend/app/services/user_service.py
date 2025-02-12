from fastapi import BackgroundTasks
from sqlalchemy import or_
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select
from app.models.user_model import User
from app.models.manuscript_model import Manuscript
from app.schemas.user_schema import UserCreate
from app.services.email_service import send_email
from app.schemas.email_schema import Email_Format, ReviewEmailDetails
from app.schemas.service_response import ServiceResponse
from loguru import logger
import base64

import json
import os


# Service to create a new user
async def create_user(user: UserCreate, db: AsyncSession):
    try:        
        # Check if user already exists
        result = await db.execute(select(User).where(or_(User.email == user.email, User.transaction_id == user.transaction_id, User.phone == user.phone)))
        existing_user =result.scalar_one_or_none()        
        if existing_user:
            logger.warning(f"User with email already exists.{user.email}")
            return ServiceResponse(status=False, message="User already exist with this details. Phone number/email/Transction details cannot be same")
        
              
        # Create a new user
        new_user = User(
            fullname=user.fullname,
            email=user.email,
            phone=user.phone,
            bank_type=user.bank_type,
            transaction_id=user.transaction_id,
            transaction_screenshot = user.transaction_screenshot,
            extension = user.extension,
            content_type = user.content_type,
            file_size = user.file_size,        
            email_type = user.email_type
        )
        db.add(new_user)
        await db.commit()               
        response = ServiceResponse(status=True, message="User registered successfully.")
        return response
    except Exception as e:
        logger.error(f"Error while creating user: {str(e)}")        
        response = ServiceResponse(status=False, message="Error while creating user. Phone number/email/Transction details already exist")
        return response

async def send_email_to_user(user):
    try:
        print("@email", user)
        #Send Email
        logger.info("Sending email to: {}", user.email)
        # Get the parent directory of the current file's directory
        parent_dir = os.path.dirname(os.path.dirname(__file__))

        logger.info("1")

        # Construct the path to the file in the resource folder
        email_content_file_path = os.path.join(parent_dir, 'resources', 'email_content.json')
        # email_content = os.path.join(os.path.dirname(__file__).parent, 'resources', 'email_content.json')

        logger.info(f"{email_content_file_path}, {user.email_type}")

        with open(email_content_file_path, 'r', encoding='utf-8') as f:
            email_data = json.load(f)

        email_data = email_data[user.email_type]

        logger.info("3")

        email = Email_Format(
            email_to=user.email,
            email_subject=email_data["subject"],
            emaill_body= email_data["body"].format(fullname=user.fullname)
        )

        logger.info("4")

        print(email)

        try:
            logger.info("Sending email to: {}", user.email)
            # background_tasks = BackgroundTasks()    
            # background_tasks.add_task(send_email, email)
            await send_email(email)
        except Exception as e:
            logger.error(f"Error while sending email: {str(e)}")

        logger.info("5")

        logger.info(f"Email sent successfully: {user.email}")
        response = ServiceResponse(status=True, message="Email sent successfully.")
        return response    
    except Exception as e:
        logger.error(f"Error while sending email(user service): {e}")
        response = ServiceResponse(status=False, message="Error while sending email.")
        return response

# Service to get user data by email
async def get_user_by_email(db: AsyncSession, email: str):
    try:
        result = await db.execute(select(User).where(User.email == email))
        user = result.scalar()
        return user
    except Exception as e:
        return None
    

async def send_email_to_review(reviewer:ReviewEmailDetails):
    try:
        url = os.getenv("REVIEWER_EMAIL_URL")
        print("@email", reviewer.email)
        #Send Email
        logger.info("Sending email to: {}", reviewer.email)
        # Get the parent directory of the current file's directory
        parent_dir = os.path.dirname(os.path.dirname(__file__))

        # logger.info("1")

        # Construct the path to the file in the resource folder
        email_content_file_path = os.path.join(parent_dir, 'resources', 'email_content.json')
        # email_content = os.path.join(os.path.dirname(__file__).parent, 'resources', 'email_content.json')

        # logger.info(f"{email_content_file_path}, {reviewer.email_type}")

        with open(email_content_file_path, 'r', encoding='utf-8') as f:
            email_data = json.load(f)

        email_data = email_data[reviewer.email_type]

        # logger.info("3")

        email = Email_Format(
            email_to=reviewer.email,
            email_subject=email_data["subject"],
            emaill_body= email_data["body"].format(url=url,id=reviewer.manuscript_id)
        )

        # logger.info("4")

        print(email)

        try:
            logger.info("Sending email to: {}", reviewer.email)
            # background_tasks = BackgroundTasks()    
            # background_tasks.add_task(send_email, email)
            status = await send_email(email)
        except Exception as e:
            logger.error(f"Error while sending email: {str(e)}")

        logger.info("5")

        logger.info(f"Email sent successfully: {reviewer.email}")
        response = ServiceResponse(status=status, message="Email status")
        return response    
    except Exception as e:
        logger.error(f"Error while sending email(user service): {e}")
        response = ServiceResponse(status=status, message="Error while sending email.")
        return response
    
async def update_reviewer_email_send_status(db:AsyncSession, manuscript_id:int, reviewer_email:str):
    try:
        logger.info(f"Logging {manuscript_id} and {reviewer_email}")
        # Update the email_send_status to True
        result = await db.execute(
            select(Manuscript)           
            .where(Manuscript.id == manuscript_id)
        )
        manuscript = result.scalar()
        # updated the database with review email ic
        if manuscript:
            manuscript.reviewer = reviewer_email            
            await db.commit()
            logger.info(f"Updated review email status for manuscript {manuscript_id}")
            return True
        else:
            logger.info(f"No record found")
            return False
    except Exception as e:
        logger.error(f"Error while updating email_send_status: {e}")
        return False

async def send_test_email(email:Email_Format):
    try:
        print("Sending test email")
        return await send_email(email)        
    except Exception as e:
        logger.error(f"Error while sending email(user service): {e}")
        