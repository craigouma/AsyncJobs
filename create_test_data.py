#!/usr/bin/env python3
"""
Script to create test data and run the application
"""
import asyncio
import sys
import os

from sqlalchemy.ext.asyncio import AsyncSession
from app.db.database import async_session_maker, engine
from app.models import Base
from app.services import CompanyService, UserService, JobService
from app.schemas import CompanyCreate, UserCreate, JobCreate
from app.models.job import JobType, JobLevel


async def create_tables():
    """Create all database tables."""
    async with engine.begin() as conn:
        await conn.run_sync(Base.metadata.create_all)
    print("✅ Database tables created successfully!")


async def create_test_data():
    """Create test companies, users, and jobs."""
    
    async with async_session_maker() as db:
        print("🚀 Creating test data...")
        
        # Create test companies
        companies_data = [
            {
                "email": "tech@google.com",
                "company_name": "Google",
                "description": "Technology company focused on search, advertising, and cloud computing",
                "website": "https://google.com",
                "location": "Mountain View, CA",
                "password": "password123"
            },
            {
                "email": "jobs@microsoft.com", 
                "company_name": "Microsoft",
                "description": "Software and cloud services company",
                "website": "https://microsoft.com",
                "location": "Redmond, WA",
                "password": "password123"
            },
            {
                "email": "careers@stripe.com",
                "company_name": "Stripe",
                "description": "Financial infrastructure for the internet",
                "website": "https://stripe.com",
                "location": "San Francisco, CA",
                "password": "password123"
            }
        ]
        
        print("📢 Creating companies...")
        companies = []
        for company_data in companies_data:
            try:
                company = await CompanyService.create_company(
                    db, CompanyCreate(**company_data)
                )
                companies.append(company)
                print(f"✅ Created company: {company.company_name}")
            except Exception as e:
                print(f"❌ Error creating company {company_data['company_name']}: {e}")
        
        # Create test users
        users_data = [
            {
                "email": "john.doe@example.com",
                "full_name": "John Doe",
                "password": "password123"
            },
            {
                "email": "jane.smith@example.com",
                "full_name": "Jane Smith", 
                "password": "password123"
            },
            {
                "email": "alex.johnson@example.com",
                "full_name": "Alex Johnson",
                "password": "password123"
            }
        ]
        
        print("👥 Creating users...")
        for user_data in users_data:
            try:
                user = await UserService.create_user(db, UserCreate(**user_data))
                print(f"✅ Created user: {user.full_name}")
            except Exception as e:
                print(f"❌ Error creating user {user_data['full_name']}: {e}")
        
        # Create test jobs
        jobs_data = [
            {
                "title": "Senior Python Developer",
                "description": "We're looking for a senior Python developer to join our backend team. You'll work on scalable web applications and APIs using FastAPI, Django, and PostgreSQL.",
                "location": "San Francisco, CA",
                "job_type": JobType.HYBRID,
                "job_level": JobLevel.SENIOR,
                "salary_min": 140000,
                "salary_max": 180000,
                "tag_names": ["python", "fastapi", "postgresql", "backend", "senior"]
            },
            {
                "title": "Frontend React Developer",
                "description": "Join our frontend team to build amazing user interfaces with React, TypeScript, and modern CSS frameworks.",
                "location": "Remote",
                "job_type": JobType.REMOTE,
                "job_level": JobLevel.MID,
                "salary_min": 90000,
                "salary_max": 130000,
                "tag_names": ["react", "typescript", "frontend", "remote", "css"]
            },
            {
                "title": "DevOps Engineer",
                "description": "Help us scale our infrastructure using Kubernetes, Docker, AWS, and CI/CD pipelines.",
                "location": "Seattle, WA",
                "job_type": JobType.ONSITE,
                "job_level": JobLevel.MID,
                "salary_min": 120000,
                "salary_max": 160000,
                "tag_names": ["devops", "kubernetes", "docker", "aws", "ci-cd"]
            },
            {
                "title": "Machine Learning Engineer",
                "description": "Work on cutting-edge ML models and deployment pipelines. Experience with TensorFlow, PyTorch, and MLOps required.",
                "location": "New York, NY",
                "job_type": JobType.HYBRID,
                "job_level": JobLevel.SENIOR,
                "salary_min": 150000,
                "salary_max": 200000,
                "tag_names": ["machine-learning", "python", "tensorflow", "pytorch", "mlops"]
            },
            {
                "title": "Full Stack Developer",
                "description": "Build end-to-end features using React, Node.js, and PostgreSQL. Great opportunity for growth!",
                "location": "Austin, TX",
                "job_type": JobType.REMOTE,
                "job_level": JobLevel.ENTRY,
                "salary_min": 70000,
                "salary_max": 95000,
                "tag_names": ["fullstack", "react", "nodejs", "postgresql", "entry-level"]
            },
            {
                "title": "Data Scientist",
                "description": "Analyze large datasets and build predictive models to drive business decisions.",
                "location": "Remote",
                "job_type": JobType.REMOTE,
                "job_level": JobLevel.MID,
                "salary_min": 110000,
                "salary_max": 140000,
                "tag_names": ["data-science", "python", "pandas", "machine-learning", "statistics"]
            }
        ]
        
        print("💼 Creating jobs...")
        if companies:
            for i, job_data in enumerate(jobs_data):
                try:
                    # Distribute jobs among companies
                    company = companies[i % len(companies)]
                    job = await JobService.create_job(
                        db, JobCreate(**job_data), company.id
                    )
                    print(f"✅ Created job: {job.title} at {company.company_name}")
                except Exception as e:
                    print(f"❌ Error creating job {job_data['title']}: {e}")
        
        print("🎉 Test data creation completed!")
        print("\n📊 Summary:")
        print(f"✅ Companies: {len(companies_data)}")
        print(f"✅ Users: {len(users_data)}")
        print(f"✅ Jobs: {len(jobs_data)}")
        
        print("\n🔐 Test Login Credentials:")
        print("Companies:")
        for company in companies_data:
            print(f"  📧 {company['email']} | 🔑 {company['password']}")
        print("\nUsers:")
        for user in users_data:
            print(f"  📧 {user['email']} | 🔑 {user['password']}")


async def main():
    """Main function to setup database and create test data."""
    try:
        print("🔧 Setting up database...")
        await create_tables()
        
        print("\n📝 Creating test data...")
        await create_test_data()
        
        print("\n🚀 Database setup complete!")
        print("\n💡 You can now run the server with: python run.py")
        print("📖 Visit http://localhost:8000/docs for API documentation")
        
    except Exception as e:
        print(f"❌ Setup failed: {e}")
        return False
    
    return True


if __name__ == "__main__":
    success = asyncio.run(main())
    if success:
        print("\n✨ Setup completed successfully!")
    else:
        print("\n💥 Setup failed!")
        sys.exit(1) 