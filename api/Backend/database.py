"""
MongoDB database connection and initialization.
Handles automatic collection creation and connection management.
"""
from motor.motor_asyncio import AsyncIOMotorClient
from pymongo.errors import ConnectionFailure
from config import settings
import logging

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)


class Database:
    client: AsyncIOMotorClient = None
    db = None


db_instance = Database()


async def connect_to_mongo():
    """Connect to MongoDB and initialize database."""
    try:
        uri = settings.MONGODB_URI
        
        logger.info("[DB] Connecting to MongoDB...")
        
        # Connect to MongoDB Atlas (pymongo 4.x handles SSL automatically)
        db_instance.client = AsyncIOMotorClient(uri)
        db_instance.db = db_instance.client[settings.DATABASE_NAME]
        
        # Verify connection
        await db_instance.client.admin.command('ping')
        logger.info(f"[OK] Connected to MongoDB: {settings.DATABASE_NAME}")
        
        # Create indexes for better performance
        await create_indexes()
        
    except ConnectionFailure as e:
        logger.error(f"[ERROR] Failed to connect to MongoDB: {e}")
        raise e
    except Exception as e:
        logger.error(f"[ERROR] MongoDB connection error: {e}")
        raise e


async def create_indexes():
    """Create database indexes for optimized queries."""
    try:
        # Users collection indexes
        await db_instance.db.users.create_index("username", unique=True)
        
        # Students collection indexes
        await db_instance.db.students.create_index("studentId", unique=True)
        await db_instance.db.students.create_index("name")
        await db_instance.db.students.create_index("grade")
        
        # Marks collection indexes
        await db_instance.db.marks.create_index("studentId")
        await db_instance.db.marks.create_index([("studentId", 1), ("term", 1), ("year", 1)])
        
        logger.info("[OK] Database indexes created successfully")
    except Exception as e:
        logger.warning(f"[WARN] Index creation warning: {e}")


async def close_mongo_connection():
    """Close MongoDB connection."""
    if db_instance.client:
        db_instance.client.close()
        logger.info("[CLOSED] MongoDB connection closed")


def get_database():
    """Get database instance."""
    return db_instance.db


def get_collection(collection_name: str):
    """Get a specific collection from the database."""
    return db_instance.db[collection_name]

