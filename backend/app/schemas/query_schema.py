from pydantic import BaseModel, EmailStr, Field
from typing import List


# Schema for adding a new query
class QueryCreate(BaseModel):
    name: str = Field(..., max_length=50)
    email: EmailStr
    subject: str
    message: str


# Schema for returning a query
class QueryRead(BaseModel):
    id: int
    name: str
    email: EmailStr
    subject: str
    message: str

    class Config:
        orm_mode = True


# Schema for listing all queries
class QueryList(BaseModel):
    queries: List[QueryRead]
