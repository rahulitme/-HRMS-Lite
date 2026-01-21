from motor.motor_asyncio import AsyncIOMotorClient, AsyncIOMotorDatabase
from app.config import settings

class MongoDBConnection:
    client: AsyncIOMotorClient
    db: AsyncIOMotorDatabase
    
    async def connect(self):
        self.client = AsyncIOMotorClient(settings.mongodb_url)
        self.db = self.client[settings.database_name]
        print("Connected to MongoDB")
    
    async def close(self):
        if self.client:
            self.client.close()
            print("Closed MongoDB connection")

mongo = MongoDBConnection()
