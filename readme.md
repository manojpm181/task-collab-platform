🚀 Real-Time Task Collaboration Platform

A production-ready, real-time task collaboration platform inspired by Trello/Notion.
Built with a modern full-stack architecture, real-time synchronization, and scalable design principles.

Live Demo
Frontend: https://<your-vercel-url>
Backend API: https://<your-render-api-url>

📌 Overview

This application enables teams to collaborate on boards, lists, and tasks with instant real-time updates.
It is designed with maintainability, scalability, and real-world SaaS practices in mind.

Key focus areas:

Clean frontend architecture

Correct backend API design

Real-time collaboration

Cost-effective, production-friendly features

✨ Features
Core Features

User authentication (JWT-based)

Create boards with multiple lists

Create, update, delete, and move tasks

Drag & drop tasks across lists

Assign users to tasks

Real-time multi-user updates (WebSockets)

Activity history tracking

Pagination-ready APIs

Standout Engineering Features

Board-level permissions (Owner / Member)

Invite users to boards by email

Detailed activity logs (who did what & when)

Optimistic UI updates for smooth UX

Feature flags for controlled rollouts

Rate limiting to prevent API abuse

Centralized error handling

Health check endpoint for monitoring

API versioning (/api/v1)

Environment-based behavior (dev vs prod)

🧠 Architecture Overview
Frontend (Next.js, Vercel)
   |
   | HTTPS + WebSocket (WSS)
   |
Backend API (Node.js, Express, Render)
   |
   | Prisma ORM
   |
PostgreSQL Database (Managed)


The system follows a decoupled frontend–backend architecture with real-time communication using WebSockets.

🖥️ Frontend Architecture
Tech Stack

Next.js (App Router)

React + TypeScript

Tailwind CSS

React Query (server state)

Zustand (UI state)

Socket.IO client

dnd-kit (drag & drop)

Key Design Decisions

Feature-based folder structure for scalability

React Query for caching & background sync

Zustand for lightweight UI state (modals, selections)

Optimistic UI updates to avoid flicker

🛠️ Backend Architecture
Tech Stack

Node.js + Express

TypeScript

Prisma ORM

PostgreSQL

Socket.IO

JWT Authentication

Backend Structure
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


Design principles:

Thin controllers

Business logic in services

Centralized error handling

API versioning for future-proofing

🗄️ Database Design
Core Entities

User

Board

BoardMember (role-based access)

List

Task

ActivityLog

Relationships

Users belong to multiple boards

Boards contain lists

Lists contain tasks

Tasks can be assigned to users

All mutations generate activity logs

Indexes are applied on frequently queried fields to ensure performance.

🔄 Real-Time Synchronization

WebSockets implemented using Socket.IO

Board-scoped socket rooms for scalability

Events emitted only to relevant users

Example Flow

User moves a task

REST API updates database

WebSocket event is emitted

Connected clients update UI instantly

🔐 Security & Reliability

JWT authentication for protected routes

Role-based access control (Owner / Member)

Rate limiting to prevent abuse

Request validation for API safety

Environment variables for secrets

CORS restricted to frontend domain

🚦 Health & Monitoring

A health check endpoint is provided for monitoring and deployments:

GET /health


Response:

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

Feature flags for controlled rollout

Easy extension to Redis / background jobs

📝 Assumptions & Trade-offs

Email invites assume existing users (no email service)

In-memory caching used for simplicity (Redis-ready)

Client-side search (server-side extensible)

These decisions prioritize clarity, cost-effectiveness, and interview constraints.

✅ Conclusion

This project demonstrates:

Real-world full-stack architecture

Production-aware engineering decisions

Clean, maintainable code

Real-time collaboration done correctly

It is designed to scale and evolve like a real SaaS application.

