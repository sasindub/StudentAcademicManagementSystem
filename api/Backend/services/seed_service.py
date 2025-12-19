"""
Seed service for initializing database with sample data.
"""
import random
from datetime import datetime
from typing import List
from database import get_collection
from utils.password import hash_password
from config import settings
import logging

logger = logging.getLogger(__name__)


class SeedService:
    """Service class for seeding initial data."""
    
    # Sample Sri Lankan names for students
    STUDENT_NAMES = [
        "Kamal Perera",
        "Nimali Fernando",
        "Sahan Silva",
        "Dilini Jayawardena",
        "Ruwan Gunaratne"
    ]
    
    # Available grades
    GRADES = ["8", "9", "10", "11", "12"]
    
    # Subject list
    SUBJECTS = [
        "Mathematics",
        "Science",
        "English",
        "Sinhala",
        "History",
        "Geography",
        "ICT",
        "Art"
    ]
    
    # Terms
    TERMS = ["Term 1", "Term 2"]
    
    async def seed_admin_user(self) -> bool:
        """
        Create default admin user if not exists.
        
        Returns:
            True if admin was created, False if already exists
        """
        users_collection = get_collection("users")
        
        # Check if admin already exists
        existing_admin = await users_collection.find_one({"username": settings.ADMIN_USERNAME})
        
        if existing_admin:
            logger.info("[OK] Admin user already exists")
            return False
        
        # Create admin user with hashed password
        admin_doc = {
            "username": settings.ADMIN_USERNAME,
            "password": hash_password(settings.ADMIN_PASSWORD),
            "role": "ADMIN",
            "isActive": True,
            "createdAt": datetime.utcnow()
        }
        
        await users_collection.insert_one(admin_doc)
        logger.info(f"[OK] Admin user created: {settings.ADMIN_USERNAME}")
        return True
    
    async def seed_students(self) -> List[str]:
        """
        Create sample students.
        
        Returns:
            List of created student IDs
        """
        students_collection = get_collection("students")
        
        # Check if students already exist
        count = await students_collection.count_documents({})
        if count > 0:
            logger.info(f"[OK] Students already exist ({count} records)")
            # Return existing student IDs
            existing = await students_collection.find({}).to_list(length=100)
            return [s["studentId"] for s in existing]
        
        student_ids = []
        
        for i, name in enumerate(self.STUDENT_NAMES, start=1):
            student_id = f"STU-{i:03d}"
            
            # Generate random mobile numbers
            mobile_numbers = [
                f"07{random.randint(10000000, 99999999)}",
                f"07{random.randint(10000000, 99999999)}"
            ]
            
            student_doc = {
                "studentId": student_id,
                "name": name,
                "grade": random.choice(self.GRADES),
                "mobileNumbers": mobile_numbers,
                "isActive": True,
                "createdAt": datetime.utcnow(),
                "updatedAt": datetime.utcnow()
            }
            
            await students_collection.insert_one(student_doc)
            student_ids.append(student_id)
            logger.info(f"[OK] Created student: {student_id} - {name}")
        
        return student_ids
    
    async def seed_marks(self, student_ids: List[str]) -> int:
        """
        Create sample marks for students.
        
        Args:
            student_ids: List of student IDs to create marks for
            
        Returns:
            Number of marks records created
        """
        marks_collection = get_collection("marks")
        
        # Check if marks already exist
        count = await marks_collection.count_documents({})
        if count > 0:
            logger.info(f"[OK] Marks already exist ({count} records)")
            return count
        
        marks_count = 0
        current_year = datetime.now().year
        
        for student_id in student_ids:
            for term in self.TERMS:
                # Select 3-4 random subjects
                num_subjects = random.randint(3, 4)
                selected_subjects = random.sample(self.SUBJECTS, num_subjects)
                
                subjects = []
                for subject_name in selected_subjects:
                    subjects.append({
                        "subjectName": subject_name,
                        "mark": round(random.uniform(45, 100), 1),
                        "isActive": True
                    })
                
                marks_doc = {
                    "studentId": student_id,
                    "term": term,
                    "year": current_year,
                    "subjects": subjects,
                    "isActive": True,
                    "createdAt": datetime.utcnow(),
                    "updatedAt": datetime.utcnow()
                }
                
                await marks_collection.insert_one(marks_doc)
                marks_count += 1
        
        logger.info(f"[OK] Created {marks_count} marks records")
        return marks_count
    
    async def run_all_seeds(self) -> dict:
        """
        Run all seed operations.
        
        Returns:
            Summary of seed operations
        """
        logger.info("[SEED] Starting database seeding...")
        
        # Seed admin user
        admin_created = await self.seed_admin_user()
        
        # Seed students
        student_ids = await self.seed_students()
        
        # Seed marks
        marks_count = await self.seed_marks(student_ids)
        
        summary = {
            "admin_created": admin_created,
            "students_count": len(student_ids),
            "marks_count": marks_count
        }
        
        logger.info(f"[SEED] Seeding complete: {summary}")
        return summary

