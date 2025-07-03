# Async Job Board API

A modern job board platform built with FastAPI and React, focusing on tech jobs in Kenya. The platform allows companies to post job listings and job seekers to find and apply for positions.

## Features

- **User Authentication**: Separate authentication flows for companies and job seekers
- **Job Listings**: Companies can post, edit, and manage job listings
- **Job Search**: Advanced search functionality with filters for location, job type, and tags
- **Company Profiles**: Detailed company profiles with job listings
- **Modern UI**: Responsive design built with React, Tailwind CSS, and TypeScript
- **API Documentation**: Auto-generated Swagger/OpenAPI documentation

## Tech Stack

### Backend
- FastAPI (Python 3.8+)
- SQLAlchemy (Async)
- PostgreSQL
- Alembic for migrations
- JWT authentication
- Pydantic for data validation

### Frontend
- React 18
- TypeScript
- Tailwind CSS
- Vite
- React Router v6
- Lucide Icons

## Getting Started

### Prerequisites
- Python 3.8 or higher
- Node.js 16 or higher
- PostgreSQL

### Backend Setup

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd async-job-board-api
   ```

2. Create and activate a virtual environment:
   ```bash
   python -m venv venv
   source venv/bin/activate  # On Windows: venv\\Scripts\\activate
   ```

3. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```

4. Set up environment variables:
   ```bash
   cp env.example .env
   # Edit .env with your database credentials and other settings
   ```

5. Run database migrations:
   ```bash
   alembic upgrade head
   ```

6. (Optional) Populate test data:
   ```bash
   python populate_test_data.py
   ```

7. Start the backend server:
   ```bash
   python run.py
   ```

The API will be available at http://localhost:8000

### Frontend Setup

1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create frontend environment file:
   ```bash
   cp .env.example .env
   # Edit .env if needed
   ```

4. Start the development server:
   ```bash
   npm run dev
   ```

The frontend will be available at http://localhost:5173

## API Documentation

Once the backend is running, you can access:
- Swagger UI: http://localhost:8000/docs
- ReDoc: http://localhost:8000/redoc

## Database Schema

The application uses the following main models:
- User: Job seekers
- Company: Employers
- Job: Job listings
- Tag: Skills and technologies
- Applications: Job applications (relationship between Users and Jobs)

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- FastAPI for the amazing Python web framework
- React team for the frontend library
- Tailwind CSS for the utility-first CSS framework
- All contributors and users of the platform 