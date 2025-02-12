from app.config.database import Base
from sqlalchemy import Column, Integer, String, LargeBinary, JSON
from sqlalchemy.orm import relationship

class Manuscript(Base):
    __tablename__ = "manuscripts"

    id = Column(Integer, primary_key=True, index=True)
    email_id = Column(String(100))  # Correct ForeignKey
    title = Column(String(250))
    author_names = Column(String(250))
    presentation = Column(String(250))    
    abstract = Column(LargeBinary)  # Blob field for abstract 
    reviewer = Column(String)
    score = Column(JSON)
    status = Column(String, default="Not Reviewd")
    plagiarism = Column(LargeBinary)
    manuscript = Column(LargeBinary)  # Blob field for manuscript

       
    

