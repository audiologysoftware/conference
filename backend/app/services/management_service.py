from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select
from sqlalchemy.orm import joinedload
from sqlalchemy.sql import and_, not_
from app.models.query_model import Query
from app.models.user_model import User
from app.models.manuscript_model import Manuscript
from app.schemas.management_schema import ManuscriptRead, UserRead, ScoreCard
from app.schemas.email_schema import Email_Format
from app.services.email_service import send_email
from loguru import logger
from sqlalchemy import select
import os
import json


# 1. List all registered users
async def list_all_users(db: AsyncSession):
    try:
        result = await db.execute(select(User))
        users = result.scalars().all()    
        
        users_list = [
            UserRead(
                id=user.id,
                fullname=user.fullname,
                email=user.email,
                phone=user.phone,
                bank_type=user.bank_type,
                transaction_id=user.transaction_id,
                transaction_screenshot=user.transaction_screenshot,
                extension=user.extension,
                content_type=user.content_type,
                file_size=str(user.file_size),
            )
            for user in users
        ]

        return users_list
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
                Manuscript.reviewer,
                Manuscript.score,
                Manuscript.status,
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
                reviewer=row.reviewer,
                score=row.score,
                status=row.status,
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

async def get_abstract_by_id(db: AsyncSession, manuscript_id: int):
    try:
        result = await db.execute(
            select(Manuscript.abstract)
            .where(Manuscript.id == manuscript_id)
        )
        abstract = result.scalars().first()
        return abstract
    except Exception as e:
        logger.error("Error while fetching abstract by ID: {}", str(e))
        raise

async def save_score(db: AsyncSession, manuscript_id: int, score: str):
    try:
        print(f"{manuscript_id} amd {score}")
        result = await db.execute(
            select(Manuscript)
            .where(Manuscript.id == manuscript_id)
        )
        manuscript = result.scalars().first()
        if manuscript:
            manuscript.score = score
            manuscript.status = "Reviewed"
            await db.commit()

            parent_dir = os.path.dirname(os.path.dirname(__file__))          
            # Construct the path to the file in the resource folder
            email_content_file_path = os.path.join(parent_dir, 'resources', 'email_content.json')          
            with open(email_content_file_path, 'r', encoding='utf-8') as f:
                email_body_list = json.load(f)

                email_body = email_body_list["thankyou_reviewer"]

                # send email to the reviewer
                email_data = Email_Format(
                    email_to=manuscript.reviewer,
                    email_subject=email_body["subject"],
                    emaill_body= email_body["body"] 
                )
                await send_email(email_data)

                return True
        else:
            logger.warning("Manuscript with ID {} not found.", manuscript_id)
            return False
    except Exception as e:
        logger.error("Error while saving score: {}", str(e))
        raise

async def get_score(db: AsyncSession, manuscript_id: int):
    try:
        result = await db.execute(
            select(Manuscript.score).where(Manuscript.id==manuscript_id)
        )
        scorelist = result.scalars().first()
        response = ScoreCard(score=scorelist).model_dump()
        return response
    except Exception as e:
        logger.error("Error while fetching score by ID: {}", str(e))
        raise

async def updateStatus(db: AsyncSession, manuscript_id: int, status:str):
    try:
        result = await db.execute(
            select(Manuscript)
            .where(Manuscript.id == manuscript_id)
        )
        manuscript = result.scalars().first()
        if manuscript:
            manuscript.status = status
            await db.commit()
            parent_dir = os.path.dirname(os.path.dirname(__file__))          
            # Construct the path to the file in the resource folder
            email_content_file_path = os.path.join(parent_dir, 'resources', 'email_content.json')          
            with open(email_content_file_path, 'r', encoding='utf-8') as f:
                email_body_list = json.load(f)

            if status == "Accepted":
                email_body = email_body_list["accept_abstrct"]            
            else:
                email_body = email_body_list["reject_abstrct"]            
                
            email_data = Email_Format(
                email_to=manuscript.email_id,
                email_subject=email_body["subject"],
                emaill_body= email_body["body"].format(name=manuscript.author_names,title=manuscript.title) 
            )
            await send_email(email_data)

            return True
        else:
            logger.warning("Manuscript with ID {} not found.", manuscript_id)
            return False
    except Exception as e:
        logger.error("Error while updating status: {}", str(e))
        raise