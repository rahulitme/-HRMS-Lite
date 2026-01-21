from fastapi import APIRouter, HTTPException, Query
from fastapi.responses import JSONResponse
from bson import ObjectId
from app.database import mongo
from app.schemas.employee import EmployeeCreate, Employee
from datetime import datetime

router = APIRouter(prefix="/employees", tags=["employees"])

@router.get("", response_model=list[Employee])
async def list_employees():
    """List all employees"""
    collection = mongo.db["employees"]
    employees = await collection.find().to_list(None)
    return [
        {**emp, "_id": str(emp["_id"])} 
        for emp in employees
    ]

@router.post("", response_model=Employee)
async def create_employee(payload: EmployeeCreate):
    """Create a new employee"""
    collection = mongo.db["employees"]
    
    # Check for duplicate employee ID
    existing = await collection.find_one({"employeeId": payload.employeeId})
    if existing:
        raise HTTPException(status_code=400, detail=f"Employee ID '{payload.employeeId}' already exists")
    
    # Check for duplicate email
    existing_email = await collection.find_one({"email": payload.email})
    if existing_email:
        raise HTTPException(status_code=400, detail=f"Email '{payload.email}' is already registered")
    
    doc = {
        **payload.model_dump(),
        "createdAt": datetime.utcnow()
    }
    
    result = await collection.insert_one(doc)
    doc["_id"] = str(result.inserted_id)
    return {**doc, "id": doc["_id"]}

@router.delete("/{employee_id}")
async def delete_employee(employee_id: str):
    """Delete an employee and their attendance records"""
    collection = mongo.db["employees"]
    attendance_collection = mongo.db["attendance"]
    
    try:
        emp_id = ObjectId(employee_id)
    except Exception:
        raise HTTPException(status_code=400, detail="Invalid employee ID format")
    
    # Delete employee
    result = await collection.delete_one({"_id": emp_id})
    if result.deleted_count == 0:
        raise HTTPException(status_code=404, detail="Employee not found")
    
    # Delete associated attendance records
    await attendance_collection.delete_many({"employeeId": employee_id})
    
    return {"message": "Employee deleted successfully"}
