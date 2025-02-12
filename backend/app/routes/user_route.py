from fastapi import APIRouter, Depends
from sqlalchemy.ext.asyncio import AsyncSession
from app.config.database import get_db
from app.controllers.user_controller import user_registration_process, fetch_user_details
from app.schemas.service_response import ApiResponse
from app.schemas.user_schema import UserCreate
from loguru import logger

router = APIRouter()

# Endpoint to register a user
@router.post("/register", response_model=ApiResponse)
async def register_user(user: UserCreate, db: AsyncSession = Depends(get_db)):
    return await user_registration_process(user, db)
   

# Endpoint to read user data
@router.get("/user", response_model=ApiResponse)
async def get_user_details(email_id: str):
    return await fetch_user_details(email_id)

    
# @router.get("/test-email")
# async def test_email():
#     try:
#         logger.info("route:sending testing email")

#         email_content = os.path.join(os.path.dirname(os.path.dirname(__file__)), 'resources', 'email_content.json')

#         with open(email_content, 'r') as f:
#             email_data = json.load(f)

#         user = {
#             "fullname":"Prashanth",
#             "email":"prashanthyesyes@gmail.com",            
#         }

#         email = Email_Format(
#             email_to=user["email"],
#             email_subject=email_data["user-registration"]["subject"],
#             emaill_body= email_data["user-registration"]["body"].format(fullname=user["fullname"])
#         )
        
#         response = await send_test_email(email)
#         if response:
#             logger.info("Email sent successfully")
#             response = HTTPResponseFormat(
#                 status="success",
#                 message="Email sent successfully",
#                 data=None
#             )
#             print(response)
#             return response
#     except Exception as e:
#         logger.error("Error while sending email: {}", str(e))
#         error_response=HTTPResponseFormat(
#             status="failure",
#             message="Error while sending email",
#             data=None
#         )
#         raise HTTPException(status_code=500, detail=error_response)
        