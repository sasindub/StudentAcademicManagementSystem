"""
Authentication routes.
"""
from fastapi import APIRouter, HTTPException, status
from models.user import UserLogin, Token
from services.auth_service import AuthService

router = APIRouter(prefix="/auth", tags=["Authentication"])


@router.post("/login", response_model=Token)
async def login(login_data: UserLogin):
    """
    Authenticate user and return JWT token.
    
    - **username**: Admin username
    - **password**: Admin password
    
    Returns JWT token for authenticated requests.
    """
    auth_service = AuthService()
    
    token = await auth_service.authenticate_user(login_data)
    
    if not token:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid username or password",
            headers={"WWW-Authenticate": "Bearer"},
        )
    
    return token


@router.post("/verify")
async def verify_token_endpoint(token: str):
    """
    Verify if a token is valid.
    
    Returns token validity status.
    """
    from utils.jwt import verify_token
    
    try:
        payload = verify_token(token)
        return {"valid": True, "payload": payload}
    except HTTPException:
        return {"valid": False}


