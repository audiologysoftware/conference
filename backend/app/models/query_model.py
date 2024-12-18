from sqlalchemy import Column, Integer, String
from app.config.database import Base


class Query(Base):
    __tablename__ = "queries"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(50), nullable=False)
    email = Column(String(50), nullable=False, index=True)
    subject = Column(String(100), nullable=False)
    message = Column(String(500), nullable=False)
