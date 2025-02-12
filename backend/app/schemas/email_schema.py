from pydantic import BaseModel, EmailStr
from typing import Optional

class Email_Format(BaseModel):
    email_to: EmailStr
    email_subject: str
    emaill_body: str


class UserEmailDetails(BaseModel):
    email: EmailStr
    fullname: str
    email_type: str

class ReviewEmailDetails(BaseModel):
    manuscript_id: int
    email: EmailStr    
    email_type: str   
    
