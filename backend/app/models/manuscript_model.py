from app.config.database import Base
from sqlalchemy import Column, Integer, String, LargeBinary, ForeignKey
from sqlalchemy.orm import relationship

class Manuscript(Base):
    __tablename__ = "manuscripts"

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String(100))
    author_names = Column(String(250))
    email_id = Column(String(30))  # Correct ForeignKey
    abstract = Column(LargeBinary)  # Blob field for abstract
    plagarism = Column(LargeBinary)
    manuscript = Column(LargeBinary)  # Blob field for manuscript

       
    

