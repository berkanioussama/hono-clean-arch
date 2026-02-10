---
trigger: always_on
---

## Folder structure:

src/
├── modules/
│   └── user/
│   │   ├── api/
│   │   ├── application/
│   │   │    ├── usecase/
│   │   │    ├── dto/
│   │   │    └── service/
│   │   ├── domain/
│   │   └── infrastructure/
│   └── other module
├── shared/
│   ├── api/
│   │   ├── middlewares/
│   │   └── utils/
│   ├── application/
│   │   └── service/
│   ├── domain/
│   └── infrastructure/
│       └── database/
├── app.ts
├── index.ts
└── .env

## Modules:
- user
- quote

## Assumptions:
Assume I’ll have multiple modules later