from fastapi import APIRouter, HTTPException, Depends
from sqlalchemy.ext.asyncio import AsyncSession
from app.config.database import get_db
from app.services.query_service import add_query, list_queries
from app.schemas.query_schema import QueryCreate, QueryList, QueryRead
from loguru import logger

router = APIRouter()


# Endpoint: Add a query
@router.post("/add-query", response_model=str)
async def add_query_endpoint(data: QueryCreate, db: AsyncSession = Depends(get_db)):
    try:
        success = await add_query(db, data)
        if not success:
            raise HTTPException(status_code=400, detail="Failed to add query")
        return "Query added successfully"
    except HTTPException as e:
        logger.error("HTTP error while adding query: {}", e.detail)
        raise e
    except Exception as e:
        logger.error("Unexpected error while adding query: {}", str(e))
        raise HTTPException(status_code=500, detail="Internal Server Error")


# Endpoint: List all queries
@router.get("/list-queries", response_model=QueryList)
async def list_queries_endpoint(db: AsyncSession = Depends(get_db)):
    try:
        queries = await list_queries(db)
        if not queries:
            logger.warning("No queries found")
        return {"queries": queries}
    except HTTPException as e:
        logger.error("HTTP error while listing queries: {}", e.detail)
        raise e
    except Exception as e:
        logger.error("Unexpected error while listing queries: {}", str(e))
        raise HTTPException(status_code=500, detail="Internal Server Error")
