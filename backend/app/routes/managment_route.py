from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession
from app.config.database import get_db
from app.services.management_service import (
    list_all_users,
    list_all_manuscripts,
    list_email_mismatch,
    list_all_queries,
    list_abstracts_without_manuscripts,
)
from app.schemas.management_schema import (
    UserRead,
    ManuscriptRead,
    EmailMismatchRead,
    QueryRead,
    AbstractOnlyRead,
)
from loguru import logger

router = APIRouter()


# 1. List all registered users
@router.get("/users", response_model=list[UserRead])
async def get_all_users(db: AsyncSession = Depends(get_db)):
    try:
        users = await list_all_users(db)
        return users
    except Exception as e:
        logger.error("Error while fetching users: {}", str(e))
        raise HTTPException(status_code=500, detail="Internal Server Error")


# 2. List all manuscripts
@router.get("/manuscripts", response_model=list[ManuscriptRead])
async def get_all_manuscripts(db: AsyncSession = Depends(get_db)):
    try:
        manuscripts = await list_all_manuscripts(db)
        return manuscripts
    except Exception as e:
        logger.error("Error while fetching manuscripts: {}", str(e))
        raise HTTPException(status_code=500, detail="Internal Server Error")


# 3. List emails in manuscripts but not in users
@router.get("/email-mismatch", response_model=list[EmailMismatchRead])
async def get_email_mismatches(db: AsyncSession = Depends(get_db)):
    try:
        mismatches = await list_email_mismatch(db)
        return mismatches
    except Exception as e:
        logger.error("Error while fetching email mismatches: {}", str(e))
        raise HTTPException(status_code=500, detail="Internal Server Error")


# 4. List all queries
@router.get("/queries", response_model=list[QueryRead])
async def get_all_queries(db: AsyncSession = Depends(get_db)):
    try:
        queries = await list_all_queries(db)
        return queries
    except Exception as e:
        logger.error("Error while fetching queries: {}", str(e))
        raise HTTPException(status_code=500, detail="Internal Server Error")


# 5. List users who submitted abstracts but no manuscripts
@router.get("/abstracts-without-manuscripts", response_model=list[AbstractOnlyRead])
async def get_abstracts_without_manuscripts(db: AsyncSession = Depends(get_db)):
    try:
        abstracts_only = await list_abstracts_without_manuscripts(db)
        return abstracts_only
    except Exception as e:
        logger.error("Error while fetching abstract-only users: {}", str(e))
        raise HTTPException(status_code=500, detail="Internal Server Error")
