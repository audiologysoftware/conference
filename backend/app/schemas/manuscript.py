from pydantic import BaseModel, EmailStr, Field
from typing import Optional


# Schema for uploading an abstract
class AbstractUpload(BaseModel):
    email_id: EmailStr
    title: str = Field(..., max_length=100)
    author_names: str = Field(..., max_length=250)    
    presentation: str = Field(..., max_length=250)
    abstract: bytes  # Binary data


# Schema for uploading a manuscript
class ManuscriptUpload(BaseModel):
    email_id: EmailStr
    plagiarism: bytes # Binary data
    manuscript: bytes  # Binary data


# Schema for reading author names
class AuthorRead(BaseModel):
    email_id: EmailStr
    author_names: str
