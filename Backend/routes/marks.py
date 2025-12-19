"""
Marks management routes.
"""
from fastapi import APIRouter, HTTPException, status, Depends, Query
from typing import List, Optional
from datetime import datetime
from bson import ObjectId
from database import get_collection
from models.marks import MarksCreate, MarksUpdate, MarksResponse, SubjectMark
from utils.jwt import get_current_user

router = APIRouter(prefix="/marks", tags=["Marks"])


def marks_doc_to_response(doc: dict) -> MarksResponse:
    """Convert MongoDB document to MarksResponse."""
    subjects = [
        SubjectMark(
            subjectName=s["subjectName"],
            mark=s["mark"],
            isActive=s.get("isActive", True)
        )
        for s in doc.get("subjects", [])
    ]
    
    return MarksResponse(
        id=str(doc["_id"]),
        studentId=doc["studentId"],
        term=doc["term"],
        year=doc["year"],
        subjects=subjects,
        isActive=doc.get("isActive", True),
        createdAt=doc.get("createdAt", datetime.utcnow()),
        updatedAt=doc.get("updatedAt", datetime.utcnow())
    )


@router.post("/", response_model=MarksResponse, status_code=status.HTTP_201_CREATED)
async def create_marks(
    marks_data: MarksCreate,
    current_user: dict = Depends(get_current_user)
):
    """
    Create marks entry for a student.
    
    - **studentId**: Student ID (e.g., STU-001)
    - **term**: Term name (e.g., Term 1, Term 2)
    - **year**: Academic year
    - **subjects**: List of subject marks
    """
    students_collection = get_collection("students")
    marks_collection = get_collection("marks")
    
    # Verify student exists
    student = await students_collection.find_one({"studentId": marks_data.studentId})
    if not student:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Student not found: {marks_data.studentId}"
        )
    
    # Check if marks already exist for this term/year
    existing = await marks_collection.find_one({
        "studentId": marks_data.studentId,
        "term": marks_data.term,
        "year": marks_data.year
    })
    
    if existing:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=f"Marks already exist for {marks_data.studentId} - {marks_data.term} {marks_data.year}"
        )
    
    marks_doc = {
        "studentId": marks_data.studentId,
        "term": marks_data.term,
        "year": marks_data.year,
        "subjects": [s.model_dump() for s in marks_data.subjects],
        "isActive": True,
        "createdAt": datetime.utcnow(),
        "updatedAt": datetime.utcnow()
    }
    
    result = await marks_collection.insert_one(marks_doc)
    marks_doc["_id"] = result.inserted_id
    
    return marks_doc_to_response(marks_doc)


@router.get("/", response_model=List[MarksResponse])
async def get_all_marks(
    current_user: dict = Depends(get_current_user),
    term: Optional[str] = Query(None, description="Filter by term"),
    year: Optional[int] = Query(None, description="Filter by year"),
    active_only: bool = Query(True, description="Show only active marks")
):
    """
    Get all marks with optional filtering.
    
    - **term**: Filter by term name
    - **year**: Filter by academic year
    - **active_only**: Show only active marks (default: true)
    """
    collection = get_collection("marks")
    
    query = {}
    
    if active_only:
        query["isActive"] = True
    
    if term:
        query["term"] = term
    
    if year:
        query["year"] = year
    
    cursor = collection.find(query).sort([("year", -1), ("term", 1)])
    marks = await cursor.to_list(length=1000)
    
    return [marks_doc_to_response(m) for m in marks]


@router.get("/student/{student_id}", response_model=List[MarksResponse])
async def get_student_marks(
    student_id: str,
    current_user: dict = Depends(get_current_user),
    term: Optional[str] = Query(None, description="Filter by term"),
    year: Optional[int] = Query(None, description="Filter by year")
):
    """
    Get all marks for a specific student.
    
    - **student_id**: Student ID (e.g., STU-001)
    - **term**: Optional term filter
    - **year**: Optional year filter
    """
    collection = get_collection("marks")
    
    query = {
        "studentId": student_id,
        "isActive": True
    }
    
    if term:
        query["term"] = term
    
    if year:
        query["year"] = year
    
    cursor = collection.find(query).sort([("year", -1), ("term", 1)])
    marks = await cursor.to_list(length=100)
    
    return [marks_doc_to_response(m) for m in marks]


@router.get("/{marks_id}", response_model=MarksResponse)
async def get_marks(
    marks_id: str,
    current_user: dict = Depends(get_current_user)
):
    """
    Get specific marks entry by ID.
    """
    collection = get_collection("marks")
    
    try:
        marks = await collection.find_one({"_id": ObjectId(marks_id)})
    except:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Invalid marks ID format"
        )
    
    if not marks:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Marks not found: {marks_id}"
        )
    
    return marks_doc_to_response(marks)


@router.put("/{marks_id}", response_model=MarksResponse)
async def update_marks(
    marks_id: str,
    update_data: MarksUpdate,
    current_user: dict = Depends(get_current_user)
):
    """
    Update marks entry.
    
    Can update term, year, subjects, or active status.
    """
    collection = get_collection("marks")
    
    update_doc = {"updatedAt": datetime.utcnow()}
    
    if update_data.term is not None:
        update_doc["term"] = update_data.term
    if update_data.year is not None:
        update_doc["year"] = update_data.year
    if update_data.subjects is not None:
        update_doc["subjects"] = [s.model_dump() for s in update_data.subjects]
    if update_data.isActive is not None:
        update_doc["isActive"] = update_data.isActive
    
    try:
        result = await collection.find_one_and_update(
            {"_id": ObjectId(marks_id)},
            {"$set": update_doc},
            return_document=True
        )
    except:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Invalid marks ID format"
        )
    
    if not result:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Marks not found: {marks_id}"
        )
    
    return marks_doc_to_response(result)


@router.delete("/{marks_id}", response_model=MarksResponse)
async def delete_marks(
    marks_id: str,
    current_user: dict = Depends(get_current_user)
):
    """
    Soft delete marks entry (sets isActive to false).
    """
    collection = get_collection("marks")
    
    update_doc = {
        "isActive": False,
        "updatedAt": datetime.utcnow()
    }
    
    try:
        result = await collection.find_one_and_update(
            {"_id": ObjectId(marks_id)},
            {"$set": update_doc},
            return_document=True
        )
    except:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Invalid marks ID format"
        )
    
    if not result:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Marks not found: {marks_id}"
        )
    
    return marks_doc_to_response(result)


@router.delete("/{marks_id}/subject/{subject_name}")
async def delete_subject_mark(
    marks_id: str,
    subject_name: str,
    current_user: dict = Depends(get_current_user)
):
    """
    Soft delete a specific subject from marks entry.
    
    Sets the subject's isActive to false.
    """
    collection = get_collection("marks")
    
    try:
        marks = await collection.find_one({"_id": ObjectId(marks_id)})
    except:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Invalid marks ID format"
        )
    
    if not marks:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Marks not found: {marks_id}"
        )
    
    # Find and update the subject
    subjects = marks.get("subjects", [])
    subject_found = False
    
    for subject in subjects:
        if subject["subjectName"].lower() == subject_name.lower():
            subject["isActive"] = False
            subject_found = True
            break
    
    if not subject_found:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Subject not found: {subject_name}"
        )
    
    result = await collection.find_one_and_update(
        {"_id": ObjectId(marks_id)},
        {
            "$set": {
                "subjects": subjects,
                "updatedAt": datetime.utcnow()
            }
        },
        return_document=True
    )
    
    return marks_doc_to_response(result)


@router.get("/stats/summary")
async def get_marks_summary(
    current_user: dict = Depends(get_current_user)
):
    """
    Get aggregated marks statistics.
    
    Returns summary including total students, average marks, etc.
    """
    students_collection = get_collection("students")
    marks_collection = get_collection("marks")
    
    # Get active students count
    total_students = await students_collection.count_documents({"isActive": True})
    
    # Get all active marks
    marks_cursor = marks_collection.find({"isActive": True})
    marks = await marks_cursor.to_list(length=10000)
    
    # Calculate statistics
    total_marks = 0
    subject_count = 0
    grade_stats = {}
    
    for mark in marks:
        for subject in mark.get("subjects", []):
            if subject.get("isActive", True):
                total_marks += subject["mark"]
                subject_count += 1
    
    average_mark = round(total_marks / subject_count, 2) if subject_count > 0 else 0
    
    # Get unique terms and years
    terms = await marks_collection.distinct("term")
    years = await marks_collection.distinct("year")
    
    return {
        "totalStudents": total_students,
        "totalMarksRecords": len(marks),
        "averageMark": average_mark,
        "totalSubjectEntries": subject_count,
        "availableTerms": terms,
        "availableYears": sorted(years, reverse=True) if years else []
    }


