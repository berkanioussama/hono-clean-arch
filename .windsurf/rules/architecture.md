---
trigger: always_on
---

## Architecture

We are building a backend API using Clean Architecture

- **Api layer**: contains controllers, validators, routes, middlewares, webhooks, depends on Application and Infrastructure layers, external frameworks and libraries.
- **Application layer**: contains use cases, dto, mappers, services and business rules. depends on Domain layer only, no external frameworks and libraries.
- **Domain layer**: contains entities, value objects, and repository interfaces, must not depend on any other layer, no external frameworks and libraries.
- **Infrastructure layer**: contains concrete implementations of repositories, mappers, depends on Domain layer only, external frameworks and libraries.

---

## Technology Stack

- **Runtime**: Bun v1.3
- **Framework**: Hono v4 + TypeScript v5
- **ORM**: Drizzle ORM v0.45
- **Database**: Neon (PostgreSQL)
- **Auth**: Clerk v3
- **Validation**: Zod v4
- **Other**: svix
- **Hosting / Deployment**: Vercel

---

## Database Tables

- **users**: (id, providerId, firstName, lastName, email, image, role, createdAt, updatedAt)
- **quotes**: (id, userId, author, description, createdAt, updatedAt)