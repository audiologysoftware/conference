from fastapi import APIRouter, Depends 
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from app.config.database import get_db
from sqlalchemy.sql import text
from sqlalchemy.ext.asyncio import AsyncSession
from app.utils.auth import verify_token

router = APIRouter()
secret = HTTPBearer()

@router.get('/')
async def get_counter(db: AsyncSession = Depends(get_db), credentials:HTTPAuthorizationCredentials=Depends(secret)):
                                                          
    token = credentials.credentials
    payload = verify_token(token)
    print("payload", payload)
    if(payload is None):
        return {"error": "Invalid token"}

    # Increment the counter
    await db.execute(text('UPDATE counter SET count = count + 1'))
    await db.commit()

    # Read the counter
    result = await db.execute(text('SELECT count FROM counter'))
    counter = result.fetchone()

    if counter is None:
        return {"error": "Counter not found"}

    return {"counter": counter[0]}
    