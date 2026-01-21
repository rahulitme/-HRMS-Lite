import os
from pydantic_settings import BaseSettings

class Settings(BaseSettings):
    mongodb_url: str = os.getenv("MONGODB_URL", "mongodb+srv://rahulmandal705071_db_user:fViRknWBUdzSx9w7@hrmslite.vrui0oi.mongodb.net/")
    database_name: str = os.getenv("DATABASE_NAME", "hrms_lite")
    environment: str = os.getenv("ENVIRONMENT", "development")
    
    class Config:
        env_file = ".env"

settings = Settings()
