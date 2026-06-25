# IntellMeet Architecture

## System Overview

IntellMeet is an AI-powered enterprise meeting platform built on a modular monolith architecture.

## Tech Stack

- **Frontend:** React 19, TypeScript, Vite, TailwindCSS v4, shadcn/ui, TanStack Query, Zustand, Socket.IO Client
- **Backend:** Node.js, Express, TypeScript, MongoDB/Mongoose, Socket.IO, Redis, JWT
- **AI:** OpenAI, Whisper, RAG pipeline
- **Infrastructure:** Docker, Docker Compose, Kubernetes, GitHub Actions

## Directory Structure

```
backend/           # Express API + Socket.IO server
  src/
    server/        # Entry point & Express app
    config/        # Application configuration
    controllers/   # Route handlers
    routes/        # API route definitions
    middlewares/   # Auth, validation, error handling
    services/      # Business logic layer
    models/        # Mongoose data models
    validators/    # Input validation
    dto/           # Data transfer objects
    interfaces/    # TypeScript interfaces
    exceptions/    # Custom error classes
    logger/        # Winston logging
    socket/        # WebSocket event handlers
    common/        # Shared types, constants, helpers

frontend/          # React SPA
  src/
    app/           # App shell & entry
    api/           # HTTP client
    routes/        # Router configuration
    providers/     # React context providers
    hooks/         # Custom React hooks
    services/      # API service layer
    store/         # Zustand state management
    lib/           # Utility functions
    types/         # TypeScript type definitions
    constants/     # App constants
    config/        # App configuration
    styles/        # Global CSS & Tailwind
```

## Data Flow

1. Client → React App → API Client → Express Routes → Controllers → Services → Models → MongoDB
2. Client ↔ Socket.IO ↔ Server (real-time: chat, presence, meeting events)
3. Meeting Audio → WebRTC → (future) AI Transcription → Summarization → Action Items
