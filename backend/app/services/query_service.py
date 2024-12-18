from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select
from app.models.query_model import Query
from app.schemas.query_schema import QueryCreate
from loguru import logger
from sqlalchemy.exc import SQLAlchemyError


# Service: Add a query
async def add_query(db: AsyncSession, data: QueryCreate) -> bool:
    try:
        # Create a new Query instance
        new_query = Query(
            name=data.name,
            email=data.email,
            subject=data.subject,
            message=data.message
        )
        db.add(new_query)
        await db.commit()
        logger.info("Query added successfully for email: {}", data.email)
        return True
    except SQLAlchemyError as e:
        logger.error("Database error while adding query: {}", str(e))
        await db.rollback()
        raise
    except Exception as e:
        logger.error("Unexpected error while adding query: {}", str(e))
        raise


# Service: List all queries
async def list_queries(db: AsyncSession) -> list:
    try:
        result = await db.execute(select(Query))
        queries = result.scalars().all()
        logger.info("Fetched {} queries successfully", len(queries))
        return queries
    except SQLAlchemyError as e:
        logger.error("Database error while fetching queries: {}", str(e))
        raise
    except Exception as e:
        logger.error("Unexpected error while fetching queries: {}", str(e))
        raise
