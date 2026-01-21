from pydantic import BaseModel, Field
from typing import Literal
from datetime import datetime, date

class AttendanceCreate(BaseModel):
    employeeId: str
    status: Literal["Present", "Absent"]
    date: date

class AttendanceRecord(AttendanceCreate):
    id: str = Field(alias="_id")
    
    class Config:
        populate_by_name = True
