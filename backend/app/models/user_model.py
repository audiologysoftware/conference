from app.config.database import Base  # Use the Base imported from your database module
from sqlalchemy import Column, Integer, String, LargeBinary
from sqlalchemy.orm import relationship

class User(Base):  # Corrected class name to follow Python conventions
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    fullname = Column(String(30))
    email = Column(String(30), unique=True, index=True)
    phone = Column(String(20), unique=True, index=True)
    bank_type = Column(String(20))
    transaction_id = Column(String(20), unique=True, index=True)
    transaction_screenshot = Column(LargeBinary)  # Blob field for transaction screenshot

    