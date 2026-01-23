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

- **Backend**: Bun v1.3 + Hono v4 + TypeScript v5
- **Database**: Neon (PostgreSQL), Drizzle ORM v0.45
- **Auth**: Clerk v6
- **Validation**: Zod v4
- **Hosting / Deployment**: Vercel

---

## Database Tables

- **users**: (id, providerId, firstName, lastName, email, image, role, createdAt, updatedAt)
- **quotes**: (id, userId, author, description, createdAt, updatedAt)