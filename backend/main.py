from fastapi import FastAPI, HTTPException
from fastapi.responses import FileResponse
from fastapi.requests import Request
from contextlib import asynccontextmanager
from app.utils.logger import logger
from app.config.database import check_database, create_tables, close_connection
import os

@asynccontextmanager
async def lifespan(app: FastAPI):
    logger.info("Starting application...")   
    print(await check_database())
    if await check_database():
        await create_tables()
    yield
    await close_connection()
    logger.info("Shutting down application...")
   
app = FastAPI(lifespan=lifespan)

@app.get("/")
async def root(request:Request):
    logger.info("Root endpoint accessed.")
    port = request.url.port or 8000
    docs = request.url.hostname + ":" + str(port) + "/docs"    
    try:
        return {
            "Server": "conference backend",
            "Port" : port,
            "status": "OK",
            "message": "Welcome to the conference backend API!",
            "docs":docs
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
    favicon_path = "static/favicon.ico"  # Path to your favicon file
    if not os.path.exists(favicon_path):
        logger.warning("Favicon file not found.")
        raise HTTPException(status_code=404, detail="Favicon not found")
    return FileResponse(favicon_path)