from fastapi import APIRouter, HTTPException, Query
from bson import ObjectId
from app.database import mongo
from app.schemas.attendance import AttendanceCreate, AttendanceRecord
from datetime import datetime, date

router = APIRouter(prefix="/attendance", tags=["attendance"])

@router.get("", response_model=list[AttendanceRecord])
async def list_attendance(employee_id: str = Query(None, alias="employee_id")):
    """List attendance records, optionally filtered by employee"""
    collection = mongo.db["attendance"]
    
    query = {}
    if employee_id:
        query["employeeId"] = employee_id
    
    records = await collection.find(query).sort("date", -1).to_list(None)
    return [
        {
            **rec,
            "_id": str(rec["_id"]),
            "date": rec["date"].isoformat() if isinstance(rec["date"], datetime) else rec["date"]
        }
        for rec in records
    ]

@router.post("", response_model=AttendanceRecord)
async def mark_attendance(payload: AttendanceCreate):
    """Mark attendance for an employee"""
    collection = mongo.db["attendance"]
    employees_collection = mongo.db["employees"]
    
    # Verify employee exists
    try:
        emp_id = ObjectId(payload.employeeId)
    except Exception:
        raise HTTPException(status_code=400, detail="Invalid employee ID format")
    
    employee = await employees_collection.find_one({"_id": emp_id})
    if not employee:
        raise HTTPException(status_code=404, detail="Employee not found")
    
    # Check if attendance already recorded for this date
    date_obj = payload.date if isinstance(payload.date, datetime) else datetime.combine(payload.date, datetime.min.time())
    
    existing = await collection.find_one({
        "employeeId": payload.employeeId,
        "date": {"$gte": date_obj, "$lt": datetime.combine(payload.date, datetime.max.time())}
    })
    
    # Convert date to datetime for storage
    if isinstance(payload.date, date) and not isinstance(payload.date, datetime):
        date_obj = datetime.combine(payload.date, datetime.min.time())
    else:
        date_obj = payload.date
    
    doc = {
        "employeeId": payload.employeeId,
        "status": payload.status,
        "date": date_obj
    }
    
    if existing:
        # Update existing record
        result = await collection.replace_one({"_id": existing["_id"]}, doc)
        doc["_id"] = str(existing["_id"])
    else:
        # Insert new record
        result = await collection.insert_one(doc)
        doc["_id"] = str(result.inserted_id)
    
    return {
        **doc,
        "id": doc["_id"],
        "date": doc["date"].isoformat() if isinstance(doc["date"], datetime) else doc["date"]
    }
