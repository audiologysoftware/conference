from pydantic import BaseModel
from typing import Optional, Union

class HTTPResponseFormat(BaseModel):
    status:str
    data:Optional[Union[dict, list, str]] = None
    message:str