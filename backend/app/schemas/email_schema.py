from pydantic import BaseModel, EmailStr
from typing import Optional

class Email_Format(BaseModel):
    email_to: EmailStr
    email_subject: str
    emaill_body: str


