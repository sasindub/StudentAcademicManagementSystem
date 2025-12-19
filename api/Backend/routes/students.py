"""
Student management routes.
"""
from fastapi import APIRouter, HTTPException, status, Depends, Query
from typing import List, Optional
from datetime import datetime
from bson import ObjectId
from database import get_collection
from models.student import StudentCreate, StudentUpdate, StudentResponse
from utils.jwt import get_current_user

router = APIRouter(prefix="/students", tags=["Students"])


def student_doc_to_response(doc: dict) -> StudentResponse:
    """Convert MongoDB document to StudentResponse."""
    return StudentResponse(
        id=str(doc["_id"]),
        studentId=doc["studentId"],
        name=doc["name"],
        grade=doc["grade"],
        mobileNumbers=doc.get("mobileNumbers", []),
        isActive=doc.get("isActive", True),
        createdAt=doc.get("createdAt", datetime.utcnow()),
        updatedAt=doc.get("updatedAt", datetime.utcnow())
    )


async def generate_student_id() -> str:
    """Generate the next student ID."""
    collection = get_collection("students")
    
    # Find the highest student ID
    last_student = await collection.find_one(
        {},
        sort=[("studentId", -1)]
    )
    
    if last_student:
        # Extract number from STU-XXX
        last_num = int(last_student["studentId"].split("-")[1])
        return f"STU-{last_num + 1:03d}"
    
    return "STU-001"


@router.post("/", response_model=StudentResponse, status_code=status.HTTP_201_CREATED)
async def create_student(
    student_data: StudentCreate,
    current_user: dict = Depends(get_current_user)
):
    """
    Create a new student.
    
    - **name**: Student's full name
    - **grade**: Student's grade/class
    - **mobileNumbers**: List of contact numbers
    """
    collection = get_collection("students")
    
    # Generate student ID
    student_id = await generate_student_id()
    
    student_doc = {
        "studentId": student_id,
        "name": student_data.name,
        "grade": student_data.grade,
        "mobileNumbers": student_data.mobileNumbers,
        "isActive": True,
        "createdAt": datetime.utcnow(),
        "updatedAt": datetime.utcnow()
    }
    
    result = await collection.insert_one(student_doc)
    student_doc["_id"] = result.inserted_id
    
    return student_doc_to_response(student_doc)


@router.get("/", response_model=List[StudentResponse])
async def get_students(
    current_user: dict = Depends(get_current_user),
    search: Optional[str] = Query(None, description="Search by studentId or name"),
    grade: Optional[str] = Query(None, description="Filter by grade"),
    active_only: bool = Query(True, description="Show only active students")
):
    """
    Get all students with optional filtering.
    
    - **search**: Search by student ID or name (partial match)
    - **grade**: Filter by specific grade
    - **active_only**: Show only active students (default: true)
    """
    collection = get_collection("students")
    
    # Build query
    query = {}
    
    if active_only:
        query["isActive"] = True
    
    if grade:
        query["grade"] = grade
    
    if search:
        query["$or"] = [
            {"studentId": {"$regex": search, "$options": "i"}},
            {"name": {"$regex": search, "$options": "i"}}
        ]
    
    cursor = collection.find(query).sort("studentId", 1)
    students = await cursor.to_list(length=1000)
    
    return [student_doc_to_response(s) for s in students]


@router.get("/{student_id}", response_model=StudentResponse)
async def get_student(
    student_id: str,
    current_user: dict = Depends(get_current_user)
):
    """
    Get a specific student by ID.
    
    - **student_id**: Student ID (e.g., STU-001) or MongoDB ObjectId
    """
    collection = get_collection("students")
    
    # Try to find by studentId first, then by ObjectId
    student = await collection.find_one({"studentId": student_id})
    
    if not student:
        try:
            student = await collection.find_one({"_id": ObjectId(student_id)})
        except:
            pass
    
    if not student:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Student not found: {student_id}"
        )
    
    return student_doc_to_response(student)


@router.put("/{student_id}", response_model=StudentResponse)
async def update_student(
    student_id: str,
    update_data: StudentUpdate,
    current_user: dict = Depends(get_current_user)
):
    """
    Update a student's information.
    
    - **student_id**: Student ID (e.g., STU-001) or MongoDB ObjectId
    """
    collection = get_collection("students")
    
    # Build update document
    update_doc = {"updatedAt": datetime.utcnow()}
    
    if update_data.name is not None:
        update_doc["name"] = update_data.name
    if update_data.grade is not None:
        update_doc["grade"] = update_data.grade
    if update_data.mobileNumbers is not None:
        update_doc["mobileNumbers"] = update_data.mobileNumbers
    if update_data.isActive is not None:
        update_doc["isActive"] = update_data.isActive
    
    # Try to find by studentId first, then by ObjectId
    result = await collection.find_one_and_update(
        {"studentId": student_id},
        {"$set": update_doc},
        return_document=True
    )
    
    if not result:
        try:
            result = await collection.find_one_and_update(
                {"_id": ObjectId(student_id)},
                {"$set": update_doc},
                return_document=True
            )
        except:
            pass
    
    if not result:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Student not found: {student_id}"
        )
    
    return student_doc_to_response(result)


@router.delete("/{student_id}", response_model=StudentResponse)
async def delete_student(
    student_id: str,
    current_user: dict = Depends(get_current_user)
):
    """
    Soft delete a student (sets isActive to false).
    
    - **student_id**: Student ID (e.g., STU-001) or MongoDB ObjectId
    """
    collection = get_collection("students")
    
    update_doc = {
        "isActive": False,
        "updatedAt": datetime.utcnow()
    }
    
    # Try to find by studentId first, then by ObjectId
    result = await collection.find_one_and_update(
        {"studentId": student_id},
        {"$set": update_doc},
        return_document=True
    )
    
    if not result:
        try:
            result = await collection.find_one_and_update(
                {"_id": ObjectId(student_id)},
                {"$set": update_doc},
                return_document=True
            )
        except:
            pass
    
    if not result:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Student not found: {student_id}"
        )
    
    return student_doc_to_response(result)


@router.get("/{student_id}/profile")
async def get_student_profile(
    student_id: str,
    current_user: dict = Depends(get_current_user)
):
    """
    Get student profile with marks summary.
    
    Returns student info with all marks and calculated averages.
    """
    students_collection = get_collection("students")
    marks_collection = get_collection("marks")
    
    # Get student
    student = await students_collection.find_one({"studentId": student_id})
    
    if not student:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Student not found: {student_id}"
        )
    
    # Get marks
    marks_cursor = marks_collection.find({
        "studentId": student_id,
        "isActive": True
    })
    marks_docs = await marks_cursor.to_list(length=100)
    
    # Convert marks to serializable format
    marks = []
    for mark in marks_docs:
        marks.append({
            "id": str(mark["_id"]),
            "studentId": mark["studentId"],
            "term": mark["term"],
            "year": mark["year"],
            "subjects": mark.get("subjects", []),
            "isActive": mark.get("isActive", True),
            "createdAt": mark.get("createdAt"),
            "updatedAt": mark.get("updatedAt")
        })
    
    # Calculate statistics
    total_marks = 0
    subject_count = 0
    
    for mark in marks_docs:
        for subject in mark.get("subjects", []):
            if subject.get("isActive", True):
                total_marks += subject["mark"]
                subject_count += 1
    
    average_mark = round(total_marks / subject_count, 2) if subject_count > 0 else 0
    
    return {
        "student": student_doc_to_response(student),
        "marks": marks,
        "statistics": {
            "totalSubjects": subject_count,
            "averageMark": average_mark,
            "totalTerms": len(marks)
        }
    }

