from fastapi import APIRouter, Depends
from app.config.database import get_db
from sqlalchemy.sql import text
from sqlalchemy.ext.asyncio import AsyncSession

router = APIRouter()

@router.get('/')
async def get_counter(db: AsyncSession = Depends(get_db)):
    # Increment the counter
    await db.execute(text('UPDATE counter SET count = count + 1'))
    await db.commit()

    # Read the counter
    result = await db.execute(text('SELECT count FROM counter'))
    counter = result.fetchone()

    if counter is None:
        return {"error": "Counter not found"}

    return {"counter": counter[0]}
    