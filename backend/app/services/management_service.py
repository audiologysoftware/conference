from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select
from sqlalchemy.orm import joinedload
from sqlalchemy.sql import and_, not_
from app.models.query_model import Query
from app.models.user_model import User
from app.models.manuscript_model import Manuscript
from app.schemas.management_schema import ManuscriptRead
from loguru import logger
from sqlalchemy import select


# 1. List all registered users
async def list_all_users(db: AsyncSession):
    try:
        result = await db.execute(select(User))
        users = result.scalars().all()
        logger.info("Fetched {} registered users.", len(users))
        return users
    except Exception as e:
        logger.error("Error while fetching users: {}", str(e))
        raise


# 2. List all manuscripts
async def list_all_manuscripts(db: AsyncSession):
    try:
        # Execute the query
        result = await db.execute(
            select(
                Manuscript.id,
                Manuscript.title,
                Manuscript.author_names,
                Manuscript.email_id,
                Manuscript.abstract,
                Manuscript.plagiarism,
                Manuscript.manuscript,
            )
        )
        manuscripts = result.all()

        # Transform the raw database results into Pydantic models
        manuscript_list = [
            ManuscriptRead(
                id=row.id,
                title=row.title,
                author_names=row.author_names,
                email_id=row.email_id,
                abstract=row.abstract,
                plagiarism=row.plagiarism,
                manuscript=row.manuscript,
            )
            for row in manuscripts
        ]

        logger.info("Fetched {} manuscripts.", len(manuscript_list))
        return manuscript_list

    except Exception as e:
        logger.error("Error while fetching manuscripts: {}", str(e))
        raise


# 3. List email IDs in manuscripts but not in users
async def list_email_mismatch(db: AsyncSession):
    try:
        query = select(Manuscript.email_id, User.phone).outerjoin(
            User, Manuscript.email_id == User.email
        ).where(User.email.is_(None))
        result = await db.execute(query)
        mismatches = result.all()
        logger.info("Found {} email mismatches.", len(mismatches))
        return [{"email": email, "phone": phone} for email, phone in mismatches]
    except Exception as e:
        logger.error("Error while fetching email mismatches: {}", str(e))
        raise


# 4. List all queries
async def list_all_queries(db: AsyncSession):
    try:
        result = await db.execute(select(Query))
        queries = result.scalars().all()
        logger.info("Fetched {} queries.", len(queries))
        return queries
    except Exception as e:
        logger.error("Error while fetching queries: {}", str(e))
        raise


# 5. List users who submitted abstracts but not full manuscripts
async def list_abstracts_without_manuscripts(db: AsyncSession):
    try:
        query = select(Manuscript.email_id, User.phone).outerjoin(
            User, Manuscript.email_id == User.email
        ).where(and_(Manuscript.abstract.isnot(None), Manuscript.manuscript.is_(None)))
        result = await db.execute(query)
        abstracts_only = result.all()
        logger.info("Found {} users with abstracts but no full manuscripts.", len(abstracts_only))
        return [{"email_id": email_id, "phone": phone} for email_id, phone in abstracts_only]
    except Exception as e:
        logger.error("Error while fetching abstract-only users: {}", str(e))
        raise
