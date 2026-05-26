# 📘 LinkedIn-like Job Portal API

A production-ready REST API backend for a LinkedIn-like job portal platform built with **Node.js, Express.js, MongoDB, and Mongoose**.

## ✨ Features

- **User Management** - Registration, login, profile management
- **Job Listings** - Create, read, update, delete jobs with advanced filtering
- **Company Profiles** - Company information and job postings
- **Job Applications** - Apply for jobs, track applications
- **Contact Enquiries** - Public contact form for inquiries
- **JWT Authentication** - Secure token-based authentication
- **Role-based Authorization** - User, Recruiter, and Admin roles
- **Advanced Filtering** - Filter jobs by location, type, experience level
- **Pagination** - Efficient pagination for large datasets
- **Timestamps** - Automatic creation and update timestamps

## 🏗️ Project Structure

```
├── index.js                              # Main server file
├── .env.example                          # Environment variables template
├── package.json                          # Dependencies
│
├── src/
│   ├── models/                           # MongoDB Schemas
│   │   ├── User.js                       # User model with auth
│   │   ├── Company.js                    # Company model
│   │   ├── Job.js                        # Job listing model
│   │   ├── Application.js                # Job application model
│   │   └── Enquiry.js                    # Contact enquiry model
│   │
│   ├── controllers/                      # Business logic
│   │   ├── userController.js             # User operations
│   │   ├── companyController.js          # Company operations
│   │   ├── jobController.js              # Job operations
│   │   ├── applicationController.js      # Application operations
│   │   └── enquiryController.js          # Enquiry operations
│   │
│   ├── routes/                           # REST API routes
│   │   ├── userRoutes.js                 # User endpoints
│   │   ├── companyRoutes.js              # Company endpoints
│   │   ├── jobRoutes.js                  # Job endpoints
│   │   ├── applicationRoutes.js          # Application endpoints
│   │   └── enquiryRoutes.js              # Enquiry endpoints
│   │
│   └── middleware/                       # Custom middleware
│       └── auth.js                       # JWT authentication & authorization
```

## 🚀 Getting Started

### Prerequisites

- Node.js (v14+)
- MongoDB (local or Atlas)
- npm or yarn

### Installation

1. **Clone the repository**
```bash
git clone <repo-url>
cd job-portal-api
```

2. **Install dependencies**
```bash
npm install
```

3. **Create .env file**
```bash
cp .env.example .env
```

4. **Update .env with your configuration**
```env
MONGODB_URI=mongodb://127.0.0.1:27017/job-portal
PORT=5000
JWT_SECRET=your_super_secret_key_here
```

5. **Start the server**
```bash
npm start
```

Server will run on `http://localhost:5000`

## 📚 API Documentation

### Authentication

**Register**
```http
POST /api/users/register
Content-Type: application/json

{
  "firstName": "John",
  "lastName": "Doe",
  "email": "john@example.com",
  "password": "secure_password"
}
```

**Login**
```http
POST /api/users/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "secure_password"
}
```

Response (includes JWT token):
```json
{
  "success": true,
  "message": "Login successful",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "user_id",
    "firstName": "John",
    "lastName": "Doe",
    "email": "john@example.com",
    "role": "user"
  }
}
```

### User Endpoints

**Get Profile**
```http
GET /api/users/profile
Authorization: Bearer {token}
```

**Update Profile**
```http
PUT /api/users/profile
Authorization: Bearer {token}
Content-Type: application/json

{
  "firstName": "John",
  "lastName": "Doe",
  "headline": "Software Developer",
  "bio": "Passionate about building great products",
  "skills": ["JavaScript", "React", "Node.js"],
  "experience": 5,
  "contact": {
    "phone": "+91-9999999999",
    "location": {
      "city": "San Francisco",
      "state": "CA",
      "country": "USA"
    }
  }
}
```

**Save Job**
```http
POST /api/users/save-job/:jobId
Authorization: Bearer {token}
```

**Get Saved Jobs**
```http
GET /api/users/saved-jobs
Authorization: Bearer {token}
```

### Job Endpoints

**Get All Jobs (with filtering)**
```http
GET /api/jobs?city=San%20Francisco&state=CA&remote=true&jobType=Full-time&page=1&limit=10&search=react
```

Query Parameters:
- `city` - Filter by city
- `state` - Filter by state
- `remote` - true/false for remote jobs
- `jobType` - Full-time, Part-time, Internship, Contract
- `search` - Search in title and description
- `page` - Pagination page number
- `limit` - Results per page

**Get Job Details**
```http
GET /api/jobs/:jobId
```

**Create Job (Admin only)**
```http
POST /api/jobs
Authorization: Bearer {admin_token}
Content-Type: application/json

{
  "title": "Senior React Developer",
  "description": "Looking for an experienced React developer...",
  "company": "company_id",
  "location": {
    "city": "San Francisco",
    "state": "CA",
    "country": "USA",
    "remote": true
  },
  "salary": {
    "min": 80000,
    "max": 120000,
    "currency": "USD"
  },
  "jobType": "Full-time",
  "experienceLevel": "Senior-level",
  "skillsRequired": ["React", "JavaScript", "TypeScript", "Node.js"]
}
```

**Update Job (Admin only)**
```http
PUT /api/jobs/:jobId
Authorization: Bearer {admin_token}
Content-Type: application/json
```

**Delete Job (Admin only)**
```http
DELETE /api/jobs/:jobId
Authorization: Bearer {admin_token}
```

**Approve Job (Admin only)**
```http
PUT /api/jobs/:jobId/approve
Authorization: Bearer {admin_token}
```

### Application Endpoints

**Apply for Job**
```http
POST /api/jobs/:jobId/apply
Authorization: Bearer {user_token}
Content-Type: application/json

{
  "resume": "https://link-to-resume.pdf",
  "coverLetter": "I'm excited to apply for this position..."
}
```

**Get User Applications**
```http
GET /api/applications/user/applications
Authorization: Bearer {user_token}
```

**Get All Applications (Admin only)**
```http
GET /api/applications?status=pending&page=1&limit=10
Authorization: Bearer {admin_token}
```

**Update Application Status (Admin only)**
```http
PUT /api/applications/:applicationId/status
Authorization: Bearer {admin_token}
Content-Type: application/json

{
  "status": "accepted"
}
```

### Company Endpoints

**Get All Companies**
```http
GET /api/companies?page=1&limit=10
```

**Get Company Details**
```http
GET /api/companies/:companyId
```

**Create Company (Admin only)**
```http
POST /api/companies
Authorization: Bearer {admin_token}
Content-Type: application/json

{
  "companyName": "Tech Corp",
  "email": "hr@techcorp.com",
  "password": "secure_password",
  "description": "Leading tech company...",
  "website": "https://techcorp.com",
  "industry": "Technology",
  "location": {
    "city": "San Francisco",
    "state": "CA",
    "country": "USA"
  }
}
```

**Update Company (Admin only)**
```http
PUT /api/companies/:companyId
Authorization: Bearer {admin_token}
Content-Type: application/json
```

**Delete Company (Admin only)**
```http
DELETE /api/companies/:companyId
Authorization: Bearer {admin_token}
```

### Enquiry Endpoints

**Create Enquiry (Public)**
```http
POST /api/enquiry
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "subject": "Job Inquiry",
  "message": "I wanted to inquire about..."
}
```

**Get All Enquiries (Admin only)**
```http
GET /api/enquiry?status=new&page=1&limit=10
Authorization: Bearer {admin_token}
```

**Update Enquiry Status (Admin only)**
```http
PUT /api/enquiry/:enquiryId
Authorization: Bearer {admin_token}
Content-Type: application/json

{
  "status": "resolved"
}
```

**Delete Enquiry (Admin only)**
```http
DELETE /api/enquiry/:enquiryId
Authorization: Bearer {admin_token}
```

## 🔐 Authentication

The API uses **JWT (JSON Web Tokens)** for authentication.

### How to use:

1. **Register/Login** to get a token
2. **Include token in Authorization header:**
```
Authorization: Bearer {your_jwt_token}
```

3. **Token format:**
```
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0...",
```

## 🛡️ Error Handling

All errors return consistent JSON format:

```json
{
  "success": false,
  "message": "Error description",
  "error": "Additional error details"
}
```

### Common Status Codes:
- `200` - Success
- `201` - Created
- `400` - Bad Request
- `401` - Unauthorized (missing token)
- `403` - Forbidden (insufficient permissions)
- `404` - Not Found
- `409` - Conflict (duplicate email, already applied)
- `500` - Server Error

## 📦 Dependencies

```json
{
  "express": "^4.18.0",
  "mongoose": "^7.0.0",
  "bcryptjs": "^2.4.3",
  "jsonwebtoken": "^9.0.0",
  "cors": "^2.8.5",
  "dotenv": "^16.0.3"
}
```

## 🔧 Database Models

### User Schema
- firstName, lastName, email, password (hashed)
- profileImage, headline, bio
- skills, experience, education
- savedJobs, appliedJobs (array refs)
- role (user, recruiter, admin)
- emailVerified, timestamps

### Company Schema
- companyName, email, password
- logo, description, website, industry
- location (city, state, country)
- createdBy (admin ref)
- timestamps

### Job Schema
- title, description
- company (ref), location
- salary, jobType, experienceLevel
- skillsRequired, applicants (array refs)
- isActive, isApproved
- timestamps

### Application Schema
- jobId (ref), userId (ref)
- resume, coverLetter
- status (pending, accepted, rejected)
- unique index on (jobId + userId)
- timestamps

### Enquiry Schema
- name, email, subject, message
- status (new, resolved)
- timestamps

## 🚀 Deployment

### Using Heroku
```bash
heroku login
heroku create your-app-name
git push heroku main
heroku config:set JWT_SECRET=your_secret
heroku config:set MONGODB_URI=mongodb+srv://...
```

### Using AWS, Azure, or DigitalOcean
Refer to their respective documentation for Node.js deployment.

## 📝 Best Practices Implemented

✅ MVC Architecture
✅ JWT Authentication  
✅ Password Hashing (bcrypt)
✅ Environment Variables
✅ Error Handling
✅ Validation
✅ Pagination
✅ Filtering & Search
✅ Timestamps
✅ Proper HTTP Status Codes
✅ Consistent JSON Responses
✅ Middleware Pattern
✅ Unique Index Constraints
✅ Production-ready Code

## 🤝 Contributing

Feel free to submit issues and enhancement requests!

## 📄 License

MIT License - feel free to use this project for personal or commercial use.

## 📧 Contact

For questions or support, please contact: support@jobportal.com

---

**Happy coding! 🚀**
