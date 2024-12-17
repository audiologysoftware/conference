from fastapi import APIRouter, HTTPException, Depends
from sqlalchemy.ext.asyncio import AsyncSession
from app.config.database import get_db
from app.schemas.manuscript import AbstractUpload, AuthorRead, ManuscriptUpload
from app.services.manuscript_service import upload_abstract, get_author_names, upload_manuscript
from loguru import logger

router = APIRouter()


# Endpoint: Upload Abstract
@router.post("/upload-abstract", response_model=str)
async def upload_abstract_endpoint(data: AbstractUpload, db: AsyncSession = Depends(get_db)):
    try:
        success = await upload_abstract(db, data)
        if not success:
            raise HTTPException(status_code=404, detail="User not found")
        return "Abstract upload successful"
    except HTTPException as e:
        logger.error("HTTP error during abstract upload: {}", e.detail)
        raise e
    except Exception as e:
        logger.error("Unexpected error during abstract upload: {}", str(e))
        raise HTTPException(status_code=500, detail="Internal Server Error")


# Endpoint: Read Author Names
@router.get("/get-author-names", response_model=AuthorRead)
async def read_author_names(email_id: str, db: AsyncSession = Depends(get_db)):
    try:
        author_names = await get_author_names(db, email_id)
        if not author_names:
            raise HTTPException(status_code=404, detail="Manuscript not found")
        return {"email_id": email_id, "author_names": author_names}
    except HTTPException as e:
        logger.error("HTTP error during fetching author names: {}", e.detail)
        raise e
    except Exception as e:
        logger.error("Unexpected error during fetching author names: {}", str(e))
        raise HTTPException(status_code=500, detail="Internal Server Error")


# Endpoint: Upload Manuscript
@router.put("/upload-manuscript", response_model=str)
async def upload_manuscript_endpoint(data: ManuscriptUpload, db: AsyncSession = Depends(get_db)):
    try:
        success = await upload_manuscript(db, data)
        if not success:
            raise HTTPException(status_code=404, detail="Manuscript not found")
        return "Manuscript upload successful"
    except HTTPException as e:
        logger.error("HTTP error during manuscript upload: {}", e.detail)
        raise e
    except Exception as e:
        logger.error("Unexpected error during manuscript upload: {}", str(e))
        raise HTTPException(status_code=500, detail="Internal Server Error")
