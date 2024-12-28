from sqlalchemy import Column, Integer
from app.config.database import Base


class Counter(Base):
    __tablename__ = "counter"
    id = Column(Integer, primary_key=True, index=True)
    count = Column(Integer, default=0)
