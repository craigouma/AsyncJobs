#!/usr/bin/env python3
"""
Startup script for Async Job Board API
"""
import uvicorn
from app.config import settings

if __name__ == "__main__":
    uvicorn.run(
        "app.main:app",
        host="0.0.0.0",
        port=8000,
        reload=settings.debug,
        reload_dirs=["app"] if settings.debug else None,
    ) 