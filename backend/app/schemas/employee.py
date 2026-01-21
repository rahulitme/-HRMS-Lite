from pydantic import BaseModel, EmailStr, Field
from typing import Optional
from datetime import datetime

class EmployeeCreate(BaseModel):
    employeeId: str
    fullName: str
    email: EmailStr
    department: str

class Employee(EmployeeCreate):
    id: str = Field(alias="_id")
    createdAt: datetime = Field(default_factory=datetime.utcnow)
    
    class Config:
        populate_by_name = True
