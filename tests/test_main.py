import pytest
from httpx import AsyncClient


@pytest.mark.asyncio
async def test_root_endpoint(client: AsyncClient):
    """Test the root endpoint."""
    response = await client.get("/")
    assert response.status_code == 200
    data = response.json()
    assert "message" in data
    assert "version" in data


@pytest.mark.asyncio
async def test_health_check(client: AsyncClient):
    """Test the health check endpoint."""
    response = await client.get("/health")
    assert response.status_code == 200
    data = response.json()
    assert data["status"] == "healthy"


@pytest.mark.asyncio
async def test_company_registration(client: AsyncClient):
    """Test company registration."""
    company_data = {
        "email": "test@company.com",
        "company_name": "Test Company",
        "description": "A test company",
        "password": "testpassword123"
    }
    
    response = await client.post("/companies/register", json=company_data)
    assert response.status_code == 201
    data = response.json()
    assert data["email"] == company_data["email"]
    assert data["company_name"] == company_data["company_name"]
    assert "id" in data


@pytest.mark.asyncio
async def test_user_registration(client: AsyncClient):
    """Test user registration."""
    user_data = {
        "email": "test@user.com",
        "full_name": "Test User",
        "password": "testpassword123"
    }
    
    response = await client.post("/users/register", json=user_data)
    assert response.status_code == 201
    data = response.json()
    assert data["email"] == user_data["email"]
    assert data["full_name"] == user_data["full_name"]
    assert "id" in data


@pytest.mark.asyncio
async def test_get_all_tags(client: AsyncClient):
    """Test getting all tags."""
    response = await client.get("/tags/")
    assert response.status_code == 200
    assert isinstance(response.json(), list) 