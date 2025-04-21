from fastapi import APIRouter, HTTPException, Depends
from sqlalchemy.ext.asyncio import AsyncSession
from app.config.database import get_db
from app.schemas.manuscript import AbstractUpload, AuthorRead, ManuscriptUpload, GetTitles
from app.services.manuscript_service import upload_abstract, get_author_names, upload_manuscript, get_title_list, delete_manuscript
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
    
@router.get("/get-titles", response_model=GetTitles)
async def get_titles(email_id: str, db: AsyncSession = Depends(get_db)):
    try:
        titles = await get_title_list(db, email_id)
        if not titles:
            raise HTTPException(status_code=404, detail="Titles not found")      
        print(titles)     
        return {"titles": titles}    
    except HTTPException as e:
        logger.error("HTTP error during fetching titles and Authors: {}", e.detail)
        raise e
    except Exception as e:
        logger.error("Unexpected error during fetching titles: {}", str(e))
        raise HTTPException(status_code=500, detail="Internal Server Error")

@router.get("/get-authors", response_model=AuthorRead)
async def get_authors(id: int, db: AsyncSession = Depends(get_db)):
    try:
        authors = await get_author_names(db, id)
        if not authors:
            raise HTTPException(status_code=404, detail="Authors not found")
        return authors[0]
    except HTTPException as e:
        logger.error("HTTP error during fetching authors: {}", e.detail)
        raise e
    except Exception as e:
        logger.error("Unexpected error during fetching authors: {}", str(e))
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
    
@router.delete("/delete-manuscript", response_model=str)
async def delete_manuscript_endpoint(id: int, db: AsyncSession = Depends(get_db)):
    try:
        success = await delete_manuscript(db, id)
        if not success:
            raise HTTPException(status_code=404, detail="Manuscript not found")
        return "Manuscript deletion successful"
    except HTTPException as e:
        logger.error("HTTP error during manuscript deletion: {}", e.detail)
        raise e
    except Exception as e:
        logger.error("Unexpected error during manuscript deletion: {}", str(e))
        raise HTTPException(status_code=500, detail="Internal Server Error")
