# IntellMeet

AI-Powered Enterprise Meeting & Collaboration Platform

## Structure

```
intellmeet/
├── backend/          # Express + TypeScript API
│   ├── src/
│   │   ├── server/       # Entry point & Express app
│   │   ├── config/       # Configuration
│   │   ├── controllers/  # Route handlers
│   │   ├── routes/       # API routes
│   │   ├── middlewares/   # Auth, error handling
│   │   ├── models/       # Mongoose models
│   │   ├── validators/   # Input validation
│   │   ├── services/     # Business logic
│   │   ├── socket/       # WebSocket handlers
│   │   ├── dto/          # Data transfer objects
│   │   ├── interfaces/   # TypeScript interfaces
│   │   ├── exceptions/   # Custom errors
│   │   ├── logger/       # Logging
│   │   └── common/       # Shared types & helpers
│   └── package.json
├── frontend/         # React 19 + Vite SPA
│   ├── src/
│   │   ├── app/          # App shell
│   │   ├── api/          # HTTP client
│   │   ├── routes/       # Router
│   │   ├── providers/    # Context providers
│   │   ├── hooks/        # Custom hooks
│   │   ├── services/     # API services
│   │   ├── store/        # State (Zustand)
│   │   ├── lib/          # Utilities
│   │   ├── types/        # TypeScript types
│   │   ├── constants/    # Constants
│   │   ├── config/       # App config
│   │   └── styles/       # CSS
│   └── package.json
└── docs/             # Documentation
    └── architecture/
```

## Quick Start

```bash
cp .env.example .env
npm install
npm run dev
```
