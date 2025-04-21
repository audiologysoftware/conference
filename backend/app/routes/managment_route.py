from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession
from app.config.database import get_db
from app.services.management_service import (
    list_all_users,
    fetch_transaction_screenshot,
    list_all_manuscripts,
    list_email_mismatch,
    list_all_queries,
    list_abstracts_without_manuscripts,
    get_abstract_by_id,
    save_score,
    get_score,   
    updateStatus
)
from app.schemas.management_schema import (
    UserRead,
    ManuscriptRead,
    EmailMismatchRead,
    QueryRead,
    AbstractOnlyRead,
    ManuscriptStatus
)

from app.schemas.service_response import ApiResponse
from app.schemas.email_schema import ReviewEmailDetails
from app.services.user_service import send_email_to_review, update_reviewer_email_send_status
from loguru import logger

router = APIRouter()


# 1. List all registered users
@router.get("/users", response_model=list[UserRead])
async def get_all_users(db: AsyncSession = Depends(get_db)):
    try:
        users = await list_all_users(db)
        return users
    except Exception as e:
        logger.error("Error while fetching users: {}", str(e))
        raise HTTPException(status_code=500, detail="Internal Server Error")
    
@router.get('/transaction-screenshot', response_model=ApiResponse)
async def get_transaction_screenshot(user_id:int, db:AsyncSession=Depends(get_db)):
    try:
        transaction_screenshot = await fetch_transaction_screenshot(db, user_id)
        if transaction_screenshot is None:
            raise HTTPException(status_code=404, detail="Transaction screenshot not found")
        response = ApiResponse(
            status_code=200,
            detail={
                "status":"success",
                "data":transaction_screenshot,
                "message": "transaction fetch successfully"
            }
        )
        return response
        
    except Exception as e:
        logger.error("Error while fetching transaction screenshot: {}", str(e))
        raise HTTPException(status_code=500, detail="Internal Server Error")


# 2. List all manuscripts
@router.get("/manuscripts", response_model=list[ManuscriptRead])
async def get_all_manuscripts(db: AsyncSession = Depends(get_db)):
    try:
        manuscripts = await list_all_manuscripts(db)
        return manuscripts
    except Exception as e:
        logger.error("Error while fetching manuscripts: {}", str(e))
        raise HTTPException(status_code=500, detail="Internal Server Error")
    
@router.get('/manuscript/{id}', response_model=ApiResponse)
async def get_manuscript(id:int, db:AsyncSession=Depends(get_db)):
    try:
        manuscript = await get_abstract_by_id(db, id)
        if manuscript is None:
            raise HTTPException(status_code=404, detail="Manuscript not found")
        response = ApiResponse(
            status_code=200,
            detail={
                "status":"success",
                "data":manuscript,
                "message": "manuscript fetch successfully"
            }
        )
        return response

    except Exception as e:
        logger.error("Error while fetching manuscript: {}", str(e))
        raise HTTPException(status_code=500, detail="Internal Server Error")


# 3. List emails in manuscripts but not in users
@router.get("/email-mismatch", response_model=list[EmailMismatchRead])
async def get_email_mismatches(db: AsyncSession = Depends(get_db)):
    try:
        mismatches = await list_email_mismatch(db)
        return mismatches
    except Exception as e:
        logger.error("Error while fetching email mismatches: {}", str(e))
        raise HTTPException(status_code=500, detail="Internal Server Error")


# 4. List all queries
@router.get("/queries", response_model=list[QueryRead])
async def get_all_queries(db: AsyncSession = Depends(get_db)):
    try:
        queries = await list_all_queries(db)
        return queries
    except Exception as e:
        logger.error("Error while fetching queries: {}", str(e))
        raise HTTPException(status_code=500, detail="Internal Server Error")


# 5. List users who submitted abstracts but no manuscripts
@router.get("/abstracts-without-manuscripts", response_model=list[AbstractOnlyRead])
async def get_abstracts_without_manuscripts(db: AsyncSession = Depends(get_db)):
    try:
        abstracts_only = await list_abstracts_without_manuscripts(db)
        return abstracts_only
    except Exception as e:
        logger.error("Error while fetching abstract-only users: {}", str(e))
        raise HTTPException(status_code=500, detail="Internal Server Error")


@router.post("/send-email-reviewer", response_model=ApiResponse)
async def send_email_reviewer(email_details:ReviewEmailDetails, db:AsyncSession=Depends(get_db)):
    try:
        response = await send_email_to_review(email_details)
        if(response.status):
            await update_reviewer_email_send_status(db, email_details.manuscript_id, email_details.email)                        
            status = "Success"
            message = "Email sent successfully"
        else:
            status = "Failure"  
            message = "Email not sent"

        response = ApiResponse(
            status_code=200,
            detail={
                "status":status,
                "data":None,
                "message": message
            }
        )
        return response
    except Exception as e:
        logger.error("Error while sending email to reviewer: {}", str(e))
        raise HTTPException(status_code=500, detail="Internal Server Error")
    

@router.get('/get-abstract/{id}', response_model=ApiResponse)              
async def get_abstract(id:int, db:AsyncSession=Depends(get_db)):
    try:
        manuscript = await get_abstract_by_id(db, id)
        if manuscript is None:
            raise HTTPException(status_code=404, detail={"message":"Abstract not found"})
        response = ApiResponse(
            status_code=200,
            detail={
                "status":"Success",
                "data":manuscript,
                "message": "Manuscript fetched successfully"
            }
        )
        return response
    except Exception as e:
        logger.error("Error while fetching manuscript: {}", str(e))
        raise HTTPException(status_code=500, detail="Internal Server Error")
    
@router.post('/save-score', response_model=ApiResponse)
async def save_abstract_score(score_data:dict, db:AsyncSession=Depends(get_db)):
    try:
        result = await save_score(db, int(score_data['manuscript_id']), score_data['score'])
        if result :
            response = ApiResponse(
                        status_code=200,
                        detail={
                            "status":"Success",
                            "data":"",
                            "message": "Score saved successfully"
                        }
                    )
        else:
            response = ApiResponse(
                        status_code=200,
                        detail={
                            "status":"Failure",
                            "data":"",
                            "message": "Error in saving the score, please try again"
                        }
                    )
       
        return response
    except Exception as e:
        logger.error("Error while fetching manuscript: {}", str(e))
        raise HTTPException(status_code=500, detail="Internal Server Error")

@router.get('/get-score/{id}', response_model=ApiResponse)
async def fetch_score(id:int, db:AsyncSession=Depends(get_db)):
    try:
        score = await get_score(db, id)
        if score is None:
            raise HTTPException(status_code=404, detail={"message":"Score not found"})  
        else:
            response = ApiResponse(
                        status_code=200,
                        detail={
                            "status":"Success",
                            "data":score,
                            "message": "Score fetched successfully"
                        }
                    )    
            return response
    except Exception as e:
        logger.error("Error while fetching manuscript: {}", str(e))
        raise HTTPException(status_code=500, detail="Internal Server Error")

@router.put('/update-status/{id}', response_model=ApiResponse)
async def update_manuscript_status(id:int, status:ManuscriptStatus, db:AsyncSession=Depends(get_db)):
    try:
        await updateStatus(db, id, status.status)
        response = ApiResponse(
                        status_code=200,
                        detail={
                            "status":"Success",
                            "data":"",
                            "message": "Status updated successfully"
                        }
                    )
        return response
    except Exception as e:
        logger.error("Error while fetching manuscript: {}", str(e))
        raise HTTPException(status_code=500, detail="Internal Server Error")