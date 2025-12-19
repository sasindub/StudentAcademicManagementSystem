"""
Authentication service for user management.
"""
from datetime import datetime
from typing import Optional
from bson import ObjectId
from database import get_collection
from utils.password import hash_password, verify_password
from utils.jwt import create_access_token
from models.user import UserModel, UserCreate, UserLogin, UserResponse, Token


class AuthService:
    """Service class for authentication operations."""
    
    def __init__(self):
        self.collection = get_collection("users")
    
    async def create_user(self, user_data: UserCreate) -> UserResponse:
        """
        Create a new user with hashed password.
        
        Args:
            user_data: User creation data
            
        Returns:
            Created user response
        """
        # Hash the password
        hashed_password = hash_password(user_data.password)
        
        user_doc = {
            "username": user_data.username,
            "password": hashed_password,
            "role": user_data.role.value,
            "isActive": True,
            "createdAt": datetime.utcnow()
        }
        
        result = await self.collection.insert_one(user_doc)
        
        return UserResponse(
            id=str(result.inserted_id),
            username=user_data.username,
            role=user_data.role,
            isActive=True,
            createdAt=user_doc["createdAt"]
        )
    
    async def authenticate_user(self, login_data: UserLogin) -> Optional[Token]:
        """
        Authenticate user and return JWT token.
        
        Args:
            login_data: Login credentials
            
        Returns:
            Token object if successful, None otherwise
        """
        user = await self.collection.find_one({
            "username": login_data.username,
            "isActive": True
        })
        
        if not user:
            return None
        
        if not verify_password(login_data.password, user["password"]):
            return None
        
        # Create JWT token
        access_token = create_access_token(
            data={
                "sub": user["username"],
                "role": user["role"],
                "user_id": str(user["_id"])
            }
        )
        
        user_response = UserResponse(
            id=str(user["_id"]),
            username=user["username"],
            role=user["role"],
            isActive=user["isActive"],
            createdAt=user["createdAt"]
        )
        
        return Token(
            access_token=access_token,
            token_type="bearer",
            user=user_response
        )
    
    async def get_user_by_username(self, username: str) -> Optional[dict]:
        """
        Get user by username.
        
        Args:
            username: Username to search for
            
        Returns:
            User document if found, None otherwise
        """
        return await self.collection.find_one({"username": username})
    
    async def user_exists(self, username: str) -> bool:
        """
        Check if a user exists.
        
        Args:
            username: Username to check
            
        Returns:
            True if user exists, False otherwise
        """
        user = await self.collection.find_one({"username": username})
        return user is not None

