#!/usr/bin/env python3
"""
Script to populate the database with test data
"""
import asyncio
import sys
import os

from sqlalchemy.ext.asyncio import AsyncSession
from app.db.database import async_session_maker
from app.services import CompanyService, UserService, JobService
from app.schemas import CompanyCreate, UserCreate, JobCreate
from app.models.job import JobType, JobLevel


async def create_test_data():
    """Create test companies, users, and jobs."""
    
    async with async_session_maker() as db:
        print("🚀 Creating test data...")
        
        # Create test companies
        companies_data = [
            {
                "email": "tech@google.com",
                "company_name": "Google",
                "description": "Technology company focused on search, advertising, and cloud computing. Our Nairobi office is a key hub for developing products that serve the African market.",
                "website": "https://google.com",
                "location": "Nairobi, Kenya",
                "password": "password123"
            },
            {
                "email": "jobs@microsoft.com", 
                "company_name": "Microsoft",
                "description": "Software and cloud services company with a strong presence in East Africa. Our ADC Kenya is focused on developing innovative solutions.",
                "website": "https://microsoft.com",
                "location": "Nairobi, Kenya",
                "password": "password123"
            },
            {
                "email": "careers@safaricom.co.ke",
                "company_name": "Safaricom",
                "description": "Leading mobile network operator and technology company in Kenya, pioneering mobile money and digital transformation.",
                "website": "https://safaricom.co.ke",
                "location": "Nairobi, Kenya",
                "password": "password123"
            },
            {
                "email": "jobs@andela.com",
                "company_name": "Andela",
                "description": "Global talent network that connects companies with vetted, remote engineers in emerging markets.",
                "website": "https://andela.com",
                "location": "Nairobi, Kenya",
                "password": "password123"
            },
            {
                "email": "careers@twiga.com",
                "company_name": "Twiga Foods",
                "description": "Technology-driven company revolutionizing the supply chain of fresh and processed food in Kenya.",
                "website": "https://twiga.com",
                "location": "Nairobi, Kenya",
                "password": "password123"
            },
            {
                "email": "jobs@sendy.co.ke",
                "company_name": "Sendy",
                "description": "Leading logistics platform that enables businesses and individuals to move goods across Africa.",
                "website": "https://sendy.co.ke",
                "location": "Mombasa, Kenya",
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
                "full_name": "John Kamau",
                "password": "password123"
            },
            {
                "email": "jane.smith@example.com",
                "full_name": "Jane Wanjiku", 
                "password": "password123"
            },
            {
                "email": "alex.johnson@example.com",
                "full_name": "Alex Omondi",
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
                "location": "Nairobi, Kenya",
                "job_type": JobType.HYBRID,
                "job_level": JobLevel.SENIOR,
                "salary_min": 200000,
                "salary_max": 350000,
                "tag_names": ["python", "fastapi", "postgresql", "backend", "senior"]
            },
            {
                "title": "Frontend React Developer",
                "description": "Join our frontend team to build amazing user interfaces with React, TypeScript, and modern CSS frameworks.",
                "location": "Remote",
                "job_type": JobType.REMOTE,
                "job_level": JobLevel.MID,
                "salary_min": 150000,
                "salary_max": 250000,
                "tag_names": ["react", "typescript", "frontend", "remote", "css"]
            },
            {
                "title": "DevOps Engineer",
                "description": "Help us scale our infrastructure using Kubernetes, Docker, AWS, and CI/CD pipelines.",
                "location": "Nairobi, Kenya",
                "job_type": JobType.ONSITE,
                "job_level": JobLevel.MID,
                "salary_min": 180000,
                "salary_max": 300000,
                "tag_names": ["devops", "kubernetes", "docker", "aws", "ci-cd"]
            },
            {
                "title": "Machine Learning Engineer",
                "description": "Work on cutting-edge ML models and deployment pipelines. Experience with TensorFlow, PyTorch, and MLOps required.",
                "location": "Nairobi, Kenya",
                "job_type": JobType.HYBRID,
                "job_level": JobLevel.SENIOR,
                "salary_min": 250000,
                "salary_max": 400000,
                "tag_names": ["machine-learning", "python", "tensorflow", "pytorch", "mlops"]
            },
            {
                "title": "Full Stack Developer",
                "description": "Build end-to-end features using React, Node.js, and PostgreSQL. Great opportunity for growth!",
                "location": "Mombasa, Kenya",
                "job_type": JobType.REMOTE,
                "job_level": JobLevel.ENTRY,
                "salary_min": 80000,
                "salary_max": 150000,
                "tag_names": ["fullstack", "react", "nodejs", "postgresql", "entry-level"]
            },
            {
                "title": "Data Scientist",
                "description": "Analyze large datasets and build predictive models to drive business decisions in the African market.",
                "location": "Remote",
                "job_type": JobType.REMOTE,
                "job_level": JobLevel.MID,
                "salary_min": 180000,
                "salary_max": 300000,
                "tag_names": ["data-science", "python", "pandas", "machine-learning", "statistics"]
            },
            {
                "title": "Mobile Developer",
                "description": "Develop innovative mobile solutions for the African market using Flutter and React Native.",
                "location": "Nairobi, Kenya",
                "job_type": JobType.HYBRID,
                "job_level": JobLevel.MID,
                "salary_min": 150000,
                "salary_max": 250000,
                "tag_names": ["mobile", "flutter", "react-native", "android", "ios"]
            },
            {
                "title": "Product Manager",
                "description": "Lead product development for our fintech solutions targeting the East African market.",
                "location": "Nairobi, Kenya",
                "job_type": JobType.ONSITE,
                "job_level": JobLevel.SENIOR,
                "salary_min": 300000,
                "salary_max": 500000,
                "tag_names": ["product-management", "fintech", "agile", "leadership"]
            },
            {
                "title": "UI/UX Designer",
                "description": "Design beautiful and intuitive user interfaces for our mobile and web applications.",
                "location": "Mombasa, Kenya",
                "job_type": JobType.HYBRID,
                "job_level": JobLevel.MID,
                "salary_min": 120000,
                "salary_max": 200000,
                "tag_names": ["ui-design", "ux-design", "figma", "adobe-xd"]
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


if __name__ == "__main__":
    asyncio.run(create_test_data()) 