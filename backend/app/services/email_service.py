from fastapi import HTTPException
from app.schemas.email_schema import Email_Format
import os
import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
from app.utils.logger import logger

EMAIL_ID = os.environ.get('EMAIL_ID')
EMAIL_PASSWORD = os.environ.get('EMAIL_PASSWORD')
SMTP_SERVER='smtp.gmail.com'
SMTP_PORT=587

def send_email(email:Email_Format) -> bool:
    print(f"EMAIL_ID: {EMAIL_ID}, EMAIL_PASSWORD: {EMAIL_PASSWORD}")
    try:
        message = MIMEMultipart() 
        message["FROM"] = EMAIL_ID
        message["TO"] = email.email_to
        message["SUBJECT"] = email.email_subject
        message.attach(MIMEText(email.emaill_body, "plain"))
        print(f"Message:\n{message.as_string()}")

        with smtplib.SMTP(SMTP_SERVER, SMTP_PORT) as server:
            server.set_debuglevel(1)  # Add this line
            server.ehlo()
            server.starttls()
            server.ehlo()
            server.login(EMAIL_ID, EMAIL_PASSWORD)
            server.sendmail(EMAIL_ID, email.email_to, message.as_string())
            return True
        
    except Exception as e:
        print(e)        
        logger.error("Error while sending email: {}", str(e))
        
        
