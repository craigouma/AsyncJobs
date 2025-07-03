from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.config import settings
from app.routers import auth_router, companies_router, users_router, jobs_router, tags_router

app = FastAPI(
    title=settings.app_name,
    version=settings.app_version,
    description="A production-ready backend for managing and filtering job listings",
    debug=settings.debug
)

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include routers
app.include_router(auth_router)
app.include_router(companies_router)
app.include_router(users_router)
app.include_router(jobs_router)
app.include_router(tags_router)

@app.get("/")
async def root():
    return {"message": "Welcome to Async Job Board API", "version": settings.app_version}

@app.get("/health")
async def health_check():
    return {"status": "healthy"} 