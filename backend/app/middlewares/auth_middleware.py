from fastapi import Request, HTTPException
from app.utils.auth import verify_token
from loguru import logger


async def auth_middleware(request:Request, call_next):
    logger.info(f"Request headers: {request.headers}")
    logger.info(f"Request path: {request.url.path}")

    if request.method == "OPTIONS" or request.url.path in ["/api/v1/auth/login", "/docs", "/favicon.ico", " /openapi.json"]:
        return await call_next(request)

    # Check Authorization header
    if "Authorization" not in request.headers and "authorization" not in request.headers:
        raise HTTPException(status_code=401, detail="Authorization_error: Missing Authorization in Header")

    try:
        schema, token = request.headers["Authorization"].split(" ")
        if schema != "Bearer":
            raise HTTPException(status_code=401, detail="Authorization_error: Invalid Authorization format")
        
        # token = request.cookies.get("access_token")
        # if token is None:
        #     raise HTTPException(status_code=401, detail="Authorization_error: Missing access_token in cookies")

        payload = verify_token(token)
        if payload is None:
            raise HTTPException(status_code=401, detail="Authorization_error: Invalid token")

        return await call_next(request)
    except ValueError:
        raise HTTPException(status_code=401, detail="Authorization_error: Invalid Authorization format")

    