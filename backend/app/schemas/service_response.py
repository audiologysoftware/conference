from pydantic import BaseModel
from typing import Optional, Union, Tuple, List, Dict


class StandardResponse(BaseModel):
    status:str
    data:Optional[Union[str|int|list|dict|Tuple]]
    message:str

class ApiResponse(BaseModel):
    status_code:int
    detail:StandardResponse

class ServiceResponse(BaseModel):
    status:bool
    message:str