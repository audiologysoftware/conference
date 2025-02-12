from fastapi import HTTPException
from app.schemas.email_schema import Email_Format
import os
import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
from app.schemas.http_response_schema import HTTPResponseFormat
from app.utils.logger import logger

EMAIL_ID = os.environ.get('EMAIL_ID')
EMAIL_PASSWORD = os.environ.get('EMAIL_PASSWORD')
SMTP_SERVER='smtp.gmail.com'
SMTP_PORT=587

async def send_email(email:Email_Format) -> bool:
    print(f"EMAIL_ID: {EMAIL_ID}, EMAIL_PASSWORD: {EMAIL_PASSWORD}")
    try:
        message = MIMEMultipart() 
        message["FROM"] = EMAIL_ID
        message["TO"] = email.email_to
        message["SUBJECT"] = email.email_subject
        message.attach(MIMEText(email.emaill_body, "html"))
        print(f"Message:\n{message.as_string()}")

        with smtplib.SMTP(SMTP_SERVER, SMTP_PORT) as server:
            server.set_debuglevel(1)  # Add this line
            server.ehlo()
            server.starttls()
            server.ehlo()
            server.login(EMAIL_ID, EMAIL_PASSWORD)
            server.sendmail(EMAIL_ID, email.email_to, message.as_string())
            return True
    except smtplib.SMTPAuthenticationError as e:
        logger.error(f"SMTP Authentication Error: {e}")
        detail = HTTPResponseFormat(
            status="failure",
            message="SMTP Authentication Error",
            data=None
        )
        raise HTTPException(status_code=500, detail=detail)
    except Exception as e:
        print(e)        
        logger.error(f"Error while sending email(send email function): {e}")
        
        
