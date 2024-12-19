from pydantic import BaseModel, EmailStr
from typing import List, Optional


# Schema for listing users
class UserRead(BaseModel):
    id: int
    fullname: str
    email: EmailStr
    phone: Optional[str] = None

    class Config:
        orm_mode = True


# Schema for listing manuscripts
class ManuscriptRead(BaseModel):
    id: int
    title: str
    author_names: str
    email_id: EmailStr
    abstract: Optional[bytes]  # Binary data
    plagarism: Optional[bytes] # Binary data
    manuscript: Optional[bytes]  # Binary data


    class Config:
        orm_mode = True


# Schema for queries
class QueryRead(BaseModel):
    id: int
    name: str
    email: EmailStr
    subject: str
    message: str

    class Config:
        orm_mode = True


# Schema for email mismatch in manuscripts and users
class EmailMismatchRead(BaseModel):
    email: EmailStr
    phone: Optional[str] = None


# Schema for submitted abstracts without full manuscripts
class AbstractOnlyRead(BaseModel):
    email_id: EmailStr
    phone: Optional[str] = None
