import os
from sqlalchemy import MetaData
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
from sqlalchemy.exc import OperationalError
from sqlalchemy.ext.asyncio import create_async_engine, AsyncSession
from sqlalchemy.sql import text
from dotenv import load_dotenv
from loguru import logger
import asyncio

os.makedirs("app/config", exist_ok=True)
load_dotenv()

POSTGRES_USER = os.getenv("POSTGRES_USER")
POSTGRES_PASSWORD = os.getenv("POSTGRES_PASSWORD")
POSTGRES_DB = os.getenv("POSTGRES_DB")
POSTGRES_HOST = os.getenv("POSTGRES_HOST")
POSTGRES_PORT = os.getenv("POSTGRES_PORT")

DATABASE_URL = f"postgresql+asyncpg://{POSTGRES_USER}:{POSTGRES_PASSWORD}@{POSTGRES_HOST}:{POSTGRES_PORT}/{POSTGRES_DB}"

# Use async engine for asyncio
engine = create_async_engine(DATABASE_URL, echo=True, future=True)
SessionLocal = sessionmaker(engine, class_=AsyncSession, expire_on_commit=False)
Base = declarative_base()

metadata = MetaData()

async def check_database() -> bool:
    try:
        # Try to connect to the database to check if it's running
        async with engine.connect() as conn:
            from app.models import manuscript_model
            from app.models import user_model
            # Use text() to create an executable SQL statement
            await conn.execute(text("SELECT 1"))
        logger.info("Database is running.")
        return True
    except OperationalError as e:
        # If there's an error in connecting, the database is not running
        logger.error(f"Database connection error: {e}")
        return False
    except Exception as e:
        # Catch any other unforeseen errors
        logger.error(f"Unexpected error while checking database: {e}")
        return False

async def get_db():
    async with SessionLocal() as db:
        yield db

async def create_tables():
    try:
        async with engine.begin() as conn:
            await conn.run_sync(Base.metadata.create_all)
        logger.info("Database tables created successfully.")
    except Exception as e:
        logger.error(f"Error while creating tables: {e}")
        raise

async def close_connection():
    try:
        await engine.dispose()
        logger.info("Database connection closed successfully.")
    except Exception as e:
        logger.error(f"Error while closing database connection: {e}")
        raise
