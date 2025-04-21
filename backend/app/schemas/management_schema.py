from pydantic import BaseModel, EmailStr
from typing import List, Optional, Dict


# Schema for listing users
class UserRead(BaseModel):
    id: int
    fullname: str
    email: EmailStr
    phone: Optional[str] = None
    bank_type: str
    transaction_id:str
    transaction_screenshot:Optional[bytes]
    extension:str
    content_type:str
    file_size:str

    class Config:
        from_attributes = True


# Schema for listing manuscripts
class ManuscriptRead(BaseModel):
    id: int
    title: str
    author_names: str
    email_id: EmailStr
    presentation: str  # Binary data
    abstract: Optional[bytes]  # Binary data
    plagiarism: Optional[bytes] # Binary data
    manuscript: Optional[bytes]  # Binary data
    reviewer: Optional[str] = None
    score: Optional[Dict] = None
    status: Optional[str] = None
    
    class Config:
        from_attributes = True


# Schema for queries
class QueryRead(BaseModel):
    id: int
    name: str
    email: EmailStr
    subject: str
    message: str

    class Config:
        from_attributes = True


# Schema for email mismatch in manuscripts and users
class EmailMismatchRead(BaseModel):
    email: EmailStr
    phone: Optional[str] = None


# Schema for submitted abstracts without full manuscripts
class AbstractOnlyRead(BaseModel):
    email_id: EmailStr
    phone: Optional[str] = None

class ScoreCard(BaseModel):
    score: Dict

class ManuscriptStatus(BaseModel):
    status: str