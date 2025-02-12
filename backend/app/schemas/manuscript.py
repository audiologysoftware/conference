from pydantic import BaseModel, EmailStr, Field
from typing import Optional


# Schema for uploading an abstract
class AbstractUpload(BaseModel):
    email_id: EmailStr
    title: str
    author_names: str 
    presentation: str 
    abstract: bytes  # Binary data


# Schema for uploading a manuscript
class ManuscriptUpload(BaseModel):
    id: int
    plagiarism: bytes # Binary data
    manuscript: bytes  # Binary data


# Schema for reading author names
class AuthorRead(BaseModel):    
    author_names: str
    presentation: str

class GetTitles(BaseModel):    
    titles: list[tuple]    
