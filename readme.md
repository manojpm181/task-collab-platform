🚀 Real-Time Task Collaboration Platform

A production-ready, real-time task collaboration platform inspired by Trello and Notion.

Built with a modern full-stack architecture, real-time synchronization, and scalable SaaS design principles.

🌐 Live Demo

Frontend: https://<your-vercel-url>

Backend API: https://<your-render-api-url>

📌 Overview

This application enables teams to collaborate on boards, lists, and tasks with instant real-time updates.

It is designed with:

Clean, scalable frontend architecture

Production-grade backend API design

Real-time multi-user synchronization

Cost-effective SaaS-ready engineering decisions

✨ Features
🔹 Core Features

JWT-based user authentication

Create boards with multiple lists

Create, update, delete, and move tasks

Drag & drop tasks across lists

Assign users to tasks

Real-time multi-user updates (WebSockets)

Activity history tracking

Pagination-ready APIs

🏆 Standout Engineering Features

Board-level permissions (Owner / Member)

Invite users to boards by email

Detailed activity logs (who did what & when)

Optimistic UI updates

Feature flags for controlled rollouts

Rate limiting to prevent API abuse

Centralized error handling

Health check endpoint

API versioning (/api/v1)

Environment-based behavior (dev vs prod)

🧠 Architecture Overview
Frontend (Next.js - Vercel)
        │
        │ HTTPS + WSS
        ▼
Backend API (Node.js - Render)
        │
        ▼
Prisma ORM
        │
        ▼
PostgreSQL (Managed DB)


The system follows a decoupled frontend–backend architecture with real-time communication using WebSockets.

🖥️ Frontend Architecture
⚙️ Tech Stack

Next.js (App Router)

React + TypeScript

Tailwind CSS

React Query

Zustand

Socket.IO Client

dnd-kit

📐 Key Design Decisions

Feature-based folder structure

React Query for server state & caching

Zustand for UI state

Optimistic UI updates for seamless UX

Clean separation of concerns

🛠️ Backend Architecture
⚙️ Tech Stack

Node.js

Express

TypeScript

Prisma ORM

PostgreSQL

Socket.IO

JWT Authentication

📁 Backend Structure
backend/
 ├─ src/
 │  ├─ app.ts
 │  ├─ index.ts
 │  ├─ routes/
 │  ├─ controllers/
 │  ├─ services/
 │  ├─ sockets/
 ├─ prisma/
 │  └─ schema.prisma

🏗 Design Principles

Thin controllers

Business logic in services

Centralized error handling

API versioning for long-term stability

🗄️ Database Design
Core Entities

User

Board

BoardMember (role-based access)

List

Task

ActivityLog

Relationships

Users ↔ Multiple Boards

Boards → Multiple Lists

Lists → Multiple Tasks

Tasks → Assigned Users

All mutations → Activity Logs

Indexes applied on frequently queried fields for performance optimization.

🔄 Real-Time Synchronization

Implemented using Socket.IO

Board-scoped socket rooms

Events emitted only to relevant users

Example Flow

User moves a task

REST API updates database

WebSocket event emitted

Connected clients update instantly

🔐 Security & Reliability

JWT authentication

Role-based access control

Rate limiting

Request validation

Environment-based configuration

Restricted CORS policy

🚦 Health & Monitoring
Endpoint
GET /health

Response
{ "status": "ok" }

⚙️ Environment Variables
Backend
DATABASE_URL=
JWT_SECRET=
FRONTEND_URL=
NODE_ENV=production

Frontend
NEXT_PUBLIC_API_URL=

🧪 Demo Credentials
Email: demo@demo.com
Password: demo123

▶️ Running Locally
Backend
cd backend
npm install
npm run dev

Frontend
cd frontend
npm install
npm run dev

📈 Scalability Considerations

Stateless backend services

Board-level WebSocket rooms

Pagination-ready APIs

Feature flags for rollout control

Redis-ready architecture

Background job extensibility

📝 Assumptions & Trade-offs

Email invites assume existing users

In-memory caching (Redis-ready)

Client-side search (server-side extensible)

Designed for clarity, cost efficiency, and interview practicality.

✅ Conclusion

This project demonstrates:

Real-world full-stack architecture

Production-aware engineering decisions

Clean, maintainable code

Correct real-time collaboration implementation

It is structured to evolve into a scalable SaaS platform.
