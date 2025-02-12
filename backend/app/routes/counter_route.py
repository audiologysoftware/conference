from fastapi import APIRouter, Depends 
from app.config.database import get_db
from sqlalchemy.sql import text
from sqlalchemy.ext.asyncio import AsyncSession
from app.schemas.service_response import ApiResponse

router = APIRouter()

@router.get('/', response_model=ApiResponse)
# async def get_counter(db: AsyncSession = Depends(get_db), credentials:HTTPAuthorizationCredentials=Depends(secret)):
async def get_counter(db: AsyncSession = Depends(get_db)):   
    # Increment the counter
    await db.execute(text('UPDATE counter SET count = count + 1'))
    await db.commit()

    # Read the counter
    result = await db.execute(text('SELECT count FROM counter'))
    counter = result.fetchone()

    if counter is None:
        response = ApiResponse(
            status_code=400,
            detail={"status": "failure", "data": None, "message": "Counter not found"}            
        )
        return response
    
    response = ApiResponse(
        status_code=200,
        detail={"status": "success", "data": counter[0], "message": "Counter found"}
    )
    return response
    
