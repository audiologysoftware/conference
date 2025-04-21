from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select
from sqlalchemy.exc import SQLAlchemyError
from sqlalchemy import delete
from app.models.user_model import User
from app.models.manuscript_model import Manuscript
from loguru import logger
from app.schemas.manuscript import AbstractUpload, ManuscriptUpload
from app.services.user_service import send_email_to_user
from app.schemas.email_schema import UserEmailDetails


# Service: Upload Abstract
async def upload_abstract(db: AsyncSession, data: AbstractUpload) -> bool:
    try:
        print("data", data)
        # Upload the abstract
        new_manuscript = Manuscript(
            title=data.title,
            author_names=data.author_names,
            presentation=data.presentation,
            email_id=data.email_id,
            abstract=data.abstract
        )
        db.add(new_manuscript)
        await db.commit()

        # send email to user
        user_email = UserEmailDetails(
            email = data.email_id,
            fullname = data.author_names,
            email_type = "upload-abstract"
        )       
        print("@service", user_email)
        await send_email_to_user(user_email)

        logger.info("Abstract uploaded successfully for email: {}", data.email_id)
        return True
    except SQLAlchemyError as e:
        logger.error("Database error while uploading abstract: {}", str(e))
        await db.rollback()
        raise
    except Exception as e:
        logger.error("Unexpected error while uploading abstract: {}", str(e))
        raise

async def get_title_list(db: AsyncSession, email_id: str) -> list[tuple]:
    try:
        result = await db.execute(select(Manuscript.id, Manuscript.title).where(Manuscript.email_id == email_id))
        titles = result.fetchall()  
        print(titles)      
        if titles:
            logger.info("Titles fetched successfully for email: {}", email_id)
            return titles
        else:
            logger.warning("No manuscripts found for email: {}", email_id)
            return []
    except SQLAlchemyError as e:
        logger.error("Database error while fetching titles: {}", str(e))
        raise
    except Exception as e:
        logger.error("Unexpected error while fetching titles: {}", str(e))
        raise


# Service: Read Author Names
async def get_author_names(db: AsyncSession, id: int) -> str:
    try:
        result = await db.execute(select(Manuscript.author_names, Manuscript.presentation).where(Manuscript.id == id))
        rows =result.fetchall()
        # Convert to the desired format
        author_names = [
            {"author_names": row[0], "presentation": row[1]} for row in rows
        ]
        print(author_names)
       
        if author_names:
            logger.info("Author names fetched successfully for id: {}", id)
            return author_names
        else:
            logger.warning("Author names not found for id: {}", id)
            return None
    except SQLAlchemyError as e:
        logger.error("Database error while fetching author names: {}", str(e))
        raise
    except Exception as e:
        logger.error("Unexpected error while fetching author names: {}", str(e))
        raise


# Service: Upload Manuscript
async def upload_manuscript(db: AsyncSession, data: ManuscriptUpload) -> bool:
    try:
        # Check if manuscript exists for the user
        result = await db.execute(select(Manuscript).where(Manuscript.id == data.id))
        manuscript = result.scalar()
        if not manuscript:
            logger.warning("No existing manuscript found for id: {}", data.id)
            return False

        # Update manuscript and plagiarism
        manuscript.manuscript = data.manuscript
        manuscript.plagiarism = data.plagiarism        
        await db.commit()
        logger.info("Manuscript uploaded successfully for id: {}", data.id)

        # send email to user
        user_email = UserEmailDetails(
            email = manuscript.email_id,
            fullname = manuscript.author_names,
            email_type = "upload-fullpaper"
        )       
        print("@service", user_email)
        await send_email_to_user(user_email)

        return True
    except SQLAlchemyError as e:
        logger.error("Database error while uploading manuscript: {}", str(e))
        await db.rollback()
        raise
    except Exception as e:
        logger.error("Unexpected error while uploading manuscript: {}", str(e))
        raise

async def delete_manuscript(db, manuscript_id):
    try:
        await db.execute(delete(Manuscript).where(Manuscript.id == manuscript_id))
        await db.commit()   
        return True 
    except Exception as e:
        logger.error("Unexpected error while deleting manuscript: {}", str(e))
        await db.rollback()
        raise
    

    
    
    


