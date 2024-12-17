from fastapi import FastAPI, HTTPException
from fastapi.responses import FileResponse
from fastapi.requests import Request
from contextlib import asynccontextmanager
import asyncio
from app.utils.logger import logger
from app.routes.user_route import router as user_router
from app.routes.manuscript_route import router as manuscript_router
from app.config.database import check_database, create_tables, close_connection
import os
from pathlib import Path

from fastapi.responses import PlainTextResponse, JSONResponse
from starlette.requests import Request



@asynccontextmanager
async def lifespan(app: FastAPI):
    logger.info("Starting application...")
    if await check_database():
        await create_tables()
    background_tasks = set()
    yield
    for task in background_tasks:
        task.cancel()
        try:
            await task
        except asyncio.CancelledError:
            pass
    await close_connection()
    logger.info("Shutting down application...")
    
   
app = FastAPI(lifespan=lifespan)

app.include_router(user_router, prefix="/api/v1/users", tags=["user"])
app.include_router(manuscript_router, prefix="/api/v1/manuscripts", tags=["manuscript"])

@app.get("/")
async def root():
    logger.info("Root endpoint accessed.")
    try:
        return {
            "Server": "conference backend",
            "status": "OK",
            "message": "Welcome to the conference backend API!",
            "docs": "/docs"  # Static path
        }
    except Exception as e:
        logger.error(f"Error at root endpoint: {e}")
        raise HTTPException(status_code=500, detail="Internal Server Error")


@app.get("/favicon.ico")
async def favicon():
    """
    Serve the favicon for the website.
    """
    logger.info("Favicon endpoint accessed.")
    static_dir = Path(__file__).parent / "static"
    favicon_path = static_dir / "favicon.ico"

    if not favicon_path.exists():
        logger.warning("Favicon file not found.")
        raise HTTPException(status_code=404, detail="Favicon not found")

    return FileResponse(favicon_path)

@app.exception_handler(Exception)
async def custom_exception_handler(request: Request, exc: Exception):
    logger.error(f"Unhandled error: {exc}")
    return JSONResponse(
        status_code=500,
        content={"detail": "Internal Server Error"},
    )