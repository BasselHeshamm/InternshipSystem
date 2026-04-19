# GUC Internship Management System

A full-stack web platform managing the complete student internship lifecycle at the German University in Cairo (GUC). Built with role-based access for four user types across 20+ screens.

---

## Tech Stack

**Frontend:** React, React Router, Bootstrap, Axios  
**Backend:** Node.js, Express.js  
**Databases:** PostgreSQL (structured data), MongoDB (unstructured data)  
**Auth:** JWT (JSON Web Tokens), bcrypt  

---

## Architecture

The system uses a **hybrid relational/document schema**:

- **PostgreSQL** stores structured data — users, companies, internships, applications, workshops, appointments
- **MongoDB** stores unstructured data — reports, evaluations, notifications

The backend uses a **RESTful API** with full separation of concerns across routes, middleware, models, and config layers.

---

## Roles

| Role | Capabilities |
|------|-------------|
| **Student** | Browse & apply to internships, submit reports, track applications, register for workshops, book appointments |
| **PRO Student** | All student features + PRO badge after completing 3+ months |
| **Company** | Post internships, manage applications, evaluate interns |
| **SCAD Office** | Approve/reject companies, manage students, oversee reports & workshops, schedule video calls |
| **Faculty** | Review and grade student reports |

---

## Features

- JWT-based authentication with role-based routing
- Company registration approval workflow
- Internship posting, filtering, and application management
- Multi-stage application status tracking (Pending → Accepted → Finalized → Current Intern → Complete)
- Internship report submission, review, flagging, and appeal system
- Workshop management with live and recorded sessions
- Student assessment system with profile posting
- Video call appointment scheduling
- PDF scouting report export
- Real-time notifications

---

## Project Structure

```
InternshipSystem/
├── Frontend/          # React application
│   ├── src/
│   │   ├── Pages/         # Route-level components
│   │   ├── Components/    # Reusable UI components
│   │   ├── hooks/         # Custom React hooks (API integration)
│   │   ├── services/      # Axios API layer
│   │   └── context/       # Auth context
│   └── public/
│
└── Backend/           # Node.js REST API
    ├── config/        # DB connections + setup
    ├── middleware/    # JWT auth middleware
    ├── models/        # MongoDB schemas
    └── routes/        # Express route handlers
