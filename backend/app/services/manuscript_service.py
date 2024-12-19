from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select
from sqlalchemy.exc import SQLAlchemyError
from app.models.user_model import User
from app.models.manuscript_model import Manuscript
from loguru import logger
from app.schemas.manuscript import AbstractUpload, ManuscriptUpload


# Service: Upload Abstract
async def upload_abstract(db: AsyncSession, data: AbstractUpload) -> bool:
    try:
        # Upload the abstract
        new_manuscript = Manuscript(
            title=data.title,
            author_names=data.author_names,
            email_id=data.email_id,
            abstract=data.abstract
        )
        db.add(new_manuscript)
        await db.commit()
        logger.info("Abstract uploaded successfully for email: {}", data.email_id)
        return True
    except SQLAlchemyError as e:
        logger.error("Database error while uploading abstract: {}", str(e))
        await db.rollback()
        raise
    except Exception as e:
        logger.error("Unexpected error while uploading abstract: {}", str(e))
        raise


# Service: Read Author Names
async def get_author_names(db: AsyncSession, email_id: str) -> str:
    try:
        result = await db.execute(select(Manuscript).where(Manuscript.email_id == email_id))
        manuscript =result.scalar()
        if manuscript:
            logger.info("Author names fetched successfully for email: {}", email_id)
            return manuscript.author_names
        else:
            logger.warning("Manuscript not found for email: {}", email_id)
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
        result = await db.execute(select(Manuscript).where(Manuscript.email_id == data.email_id))
        manuscript = result.scalar()
        if not manuscript:
            logger.warning("No existing manuscript found for email: {}", data.email_id)
            return False

        # Update manuscript and plagiarism
        manuscript.manuscript = data.manuscript
        manuscript.plagarism = data.plagiarism        
        await db.commit()
        logger.info("Manuscript uploaded successfully for email: {}", data.email_id)
        return True
    except SQLAlchemyError as e:
        logger.error("Database error while uploading manuscript: {}", str(e))
        await db.rollback()
        raise
    except Exception as e:
        logger.error("Unexpected error while uploading manuscript: {}", str(e))
        raise
