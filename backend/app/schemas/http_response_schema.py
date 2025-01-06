from pydantic import BaseModel

class HTTPResponseFormat(BaseModel):
    status:str
    data:dict
    message:str