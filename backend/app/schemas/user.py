from pydantic import BaseModel, EmailStr, Field
from typing import Optional

# Input schema for user registration
class UserCreate(BaseModel):
    fullname: str = Field(..., max_length=30)
    email: EmailStr
    phone: str = Field(..., max_length=20)
    bank_type: str = Field(..., max_length=20)
    transaction_id: str = Field(..., max_length=20)

# Output schema for reading user data
class UserRead(BaseModel):
    id: int
    fullname: str
    email: EmailStr
    phone: str
    bank_type: str
    transaction_id: str
