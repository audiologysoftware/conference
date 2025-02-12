from fastapi import FastAPI, HTTPException
from fastapi.responses import FileResponse
from fastapi.requests import Request
from fastapi.middleware.cors import CORSMiddleware
from starlette.middleware.base import BaseHTTPMiddleware
from contextlib import asynccontextmanager
import asyncio
from app.utils.logger import logger
from app.routes.user_route import router as user_router
from app.routes.manuscript_route import router as manuscript_router
from app.routes.query_route import router as query_router
from app.routes.managment_route import router as management_router
from app.routes.counter_route import router as counter_router
from app.routes.login_route import router as auth_router
from app.routes.base_route import router as base_router
from app.config.database import check_database, create_tables, close_connection
import os
from pathlib import Path

from fastapi.responses import JSONResponse
from starlette.requests import Request
# from app.middlewares.auth_middleware import auth_middleware

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

app.add_middleware(
    CORSMiddleware,
    allow_origins = ["*", "https://conference.jssish.com"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"]
)

# async def auth_middleware(request: Request, call_next):
#     auth_middleware(request, call_next)
        
# app.add_middleware(BaseHTTPMiddleware, dispatch=auth_middleware)

app.include_router(auth_router, prefix="/api/v1/auth", tags=["authentication"])
app.include_router(user_router, prefix="/api/v1/users", tags=["user"])
app.include_router(manuscript_router, prefix="/api/v1/manuscripts", tags=["manuscript"])
app.include_router(query_router, prefix="/api/v1/query", tags=["query"])
app.include_router(management_router, prefix="/api/v1/management", tags=["management"])
app.include_router(counter_router, prefix="/api/v1/counter", tags=["counter"])
app.include_router(base_router, tags=["base"])


@app.get("/favicon.ico")
async def favicon(): 
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