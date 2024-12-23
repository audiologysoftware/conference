from alembic import context
from sqlalchemy.ext.asyncio import create_async_engine
from sqlalchemy.ext.asyncio.engine import AsyncEngine
from logging.config import fileConfig
from dotenv import load_dotenv
import os

# Load environment variables
load_dotenv(dotenv_path='../.env')


load_dotenv(dotenv_path='../.env')  # Adjust path as needed
os.makedirs("app/config", exist_ok=True)
load_dotenv()

POSTGRES_USER = os.getenv("POSTGRES_USER")
POSTGRES_PASSWORD = os.getenv("POSTGRES_PASSWORD")
POSTGRES_DB = os.getenv("POSTGRES_DB")
POSTGRES_HOST = os.getenv("POSTGRES_HOST")
POSTGRES_PORT = os.getenv("POSTGRES_PORT")

# Alembic Config object
config = context.config

# Set the database URL dynamically
DATABASE_URL = f"postgresql+asyncpg://{POSTGRES_USER}:{POSTGRES_PASSWORD}@{POSTGRES_HOST}:{POSTGRES_PORT}/{POSTGRES_DB}"
if DATABASE_URL:
    config.set_main_option('sqlalchemy.url', DATABASE_URL)

# Import Base from models
from app.config.database import Base
from app.models import user_model, manuscript_model, query_model  # Import all models

# Set metadata for Alembic to detect changes
target_metadata = Base.metadata

# Other Alembic boilerplate
fileConfig(config.config_file_name)

# Run migrations in 'online' mode using async
def run_migrations_online():
    """Run migrations in 'online' mode with async engine."""
    connectable: AsyncEngine = create_async_engine(
        config.get_main_option("sqlalchemy.url"), future=True
    )

    async def do_run_migrations():
        async with connectable.connect() as connection:
            await connection.run_sync(
                context.configure,
                connection=connection,
                target_metadata=target_metadata,
            )
            async with connection.begin_transaction():
                context.run_migrations()

    import asyncio
    asyncio.run(do_run_migrations())

run_migrations_online()







