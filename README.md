# Task Manager API

A lightweight RESTful API for managing daily tasks, built with NestJS, TypeScript, Prisma, and PostgreSQL.

![NestJS](https://img.shields.io/badge/NestJS-11-FF6B6B?logo=nestjs&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?logo=typescript&logoColor=white)
![Prisma](https://img.shields.io/badge/Prisma-7-2D3748?logo=prisma&logoColor=white)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-15+-336791?logo=postgresql&logoColor=white)

## Overview

This project provides a task management backend that allows users to:

- Create new tasks
- View all tasks
- Fetch a single task by ID
- Update task details and completion status
- Delete tasks
- Persist data with Prisma ORM and a PostgreSQL database

## Features

- REST API built with NestJS
- Data validation using DTOs and `class-validator`
- PostgreSQL database integration with Prisma
- CRUD operations for tasks
- Structured project architecture for scalable API development
- Test setup with Jest

## Tech Stack

- Node.js
- TypeScript
- NestJS
- Prisma ORM
- PostgreSQL
- Jest

## Project Structure

```bash
.
├── prisma/
│   ├── migrations/
│   ├── seeder/
│   └── schema.prisma
├── src/
│   ├── tasks/
│   │   ├── dto/
│   │   ├── tasks.controller.ts
│   │   ├── tasks.module.ts
│   │   ├── tasks.service.ts
│   │   └── tasks.service.spec.ts
│   ├── prisma/
│   │   ├── prisma.module.ts
│   │   ├── prisma.service.ts
│   │   └── prisma.service.spec.ts
│   ├── app.controller.ts
│   ├── app.module.ts
│   ├── app.service.ts
│   └── main.ts
├── .env.example
├── package.json
├── tsconfig.json
├── README.md
└── prisma.config.ts
```

## Prerequisites

Before running this project, make sure you have the following installed:

- Node.js (v18 or later recommended)
- npm
- PostgreSQL database

## Installation

1. Clone the repository

```bash
git clone https://github.com/your-username/task-manager-api.git
cd task-manager-api
```

2. Install dependencies

```bash
npm install
```

3. Configure environment variables

Create a `.env` file from `.env.example` and update the database connection string:

```bash
cp .env.example .env
```

Example:

```env
DATABASE_URL="postgresql://postgres:yourpassword@localhost:5432/task_manager_db?schema=public"
PORT=3000
```

4. Run Prisma migrations

```bash
npx prisma migrate dev
```

## Running the Application

Start the app in development mode:

```bash
npm run start:dev
```

Or run the compiled version:

```bash
npm run build
npm run start
```

The API will be available at:

```bash
http://localhost:3000
```

## API Endpoints

### Root

```http
GET /
```

Returns a simple health message:

```json
"Hello World!"
```

### Tasks

| Method | Endpoint | Description |
| --- | --- | --- |
| GET | `/tasks` | Get all tasks |
| POST | `/tasks` | Create a new task |
| GET | `/tasks/:id` | Get a task by ID |
| PATCH | `/tasks/:id` | Update a task |
| DELETE | `/tasks/:id` | Delete a task |

### Create a task

```bash
curl -X POST http://localhost:3000/tasks \
-H "Content-Type: application/json" \
-d '{
  "title": "Write README",
  "description": "Customize project documentation for the task manager API",
  "completed": false
}'
```

### Example response

```json
{
"id": 1,
"title": "Write README",
"description": "Customize project documentation for the task manager API",
"completed": false,
"createdAt": "2026-09-02T10:00:00.000Z",
"updatedAt": "2026-09-02T10:00:00.000Z"
}
```

## Task Model

The `Task` model includes the following fields:

```prisma
model Task {
id          Int      @id @default(autoincrement())
title       String
description String?
completed   Boolean  @default(false)
createdAt   DateTime @default(now())
updatedAt   DateTime @updatedAt
}
```

## Validation

The API validates incoming task data using NestJS validation pipes and DTOs. For example:

- `title` is required and must be a string
- `description` is optional
- `completed` can be updated via `PATCH`

## Testing

Run unit tests:

```bash
npm test
```

Run end-to-end tests:

```bash
npm run test:e2e
```

Generate test coverage:

```bash
npm run test:cov
```

## License

This project is currently unlicensed (`UNLICENSED` in `package.json`). If you want to publish it publicly, add an appropriate license such as MIT.

## Author

Built as a simple task management API project using NestJS and Prisma.
