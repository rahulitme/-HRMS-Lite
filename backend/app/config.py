from pydantic_settings import BaseSettings
from typing import Optional

class Settings(BaseSettings):
    mongodb_url: str
    database_name: str = "hrms_lite"
    
    class Config:
        env_file = ".env"

settings = Settings()
