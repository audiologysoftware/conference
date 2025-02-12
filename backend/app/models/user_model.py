from app.config.database import Base  # Use the Base imported from your database module
from sqlalchemy import Column, Integer, String, LargeBinary
from sqlalchemy.orm import relationship

class User(Base):  # Corrected class name to follow Python conventions
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    fullname = Column(String(100))
    email = Column(String(100), unique=True, index=True)
    phone = Column(String(100), unique=True, index=True)
    bank_type = Column(String(100))
    transaction_id = Column(String(100), unique=True, index=True)
    transaction_screenshot = Column(LargeBinary)  # Blob field for transaction screenshot
    extension = Column(String(50))  # To store file extension (e.g., '.jpg', '.pdf')
    content_type = Column(String(50))  # To store the file's MIME type (e.g., 'image/jpeg', 'application/pdf')
    file_size = Column(Integer)  # To store the file size in bytes
    email_type = Column(String(50), default="user-registration")  # To store the email type 
    
    