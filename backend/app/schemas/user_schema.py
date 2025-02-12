from pydantic import BaseModel, EmailStr, Field
from typing import Optional

# Input schema for user registration
class UserCreate(BaseModel):
    fullname: str = Field(..., max_length=100)
    email: EmailStr
    phone: str = Field(..., max_length=20)
    bank_type: str = Field(..., max_length=20)
    transaction_id: str = Field(..., max_length=20)
    transaction_screenshot: Optional[bytes] = None
    extension: Optional[str] = None
    content_type: Optional[str] = None  
    file_size: Optional[int] = None
    email_type: str = "user-registration"

# Output schema for reading user data
class UserRead(BaseModel):
    id: int
    fullname: str
    email: EmailStr
    phone: str
    bank_type: str
    transaction_id: str
    transaction_screenshot: Optional[bytes] = None

