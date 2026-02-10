---
trigger: always_on
---

# Naming Rules

## Files & Directories
Value Objects              : kebab-case.vo.ts
Entities                   : kebab-case.entity.ts
Repository Interfaces      : I + PascalCase.repo.ts
Repository Implementations : kebab-case.repo.impl.ts
Database Mapper            : kebab-case.db.mapper.ts
Use Cases                  : kebab-case.uc.ts
Admin Use Cases            : kebab-case.admin.uc.ts
Services                   : kebab-case.service.ts
DTOs                       : kebab-case.dto.ts
DTO Mapper                 : kebab-case.dto.mapper.ts
Controllers                : kebab-case.controller.ts
Admin Controllers          : kebab-case.admin.controller.ts
Routes                     : kebab-case.route.ts
Validators                 : kebab-case.validator.ts
Middlewares                : kebab-case.middleware.ts
Webhooks                   : kebab-case.webhook.ts

## Classes & Interfaces
Classes       : PascalCase
Interfaces    : I + PascalCase
Value Objects : PascalCase

## Variables & Properties
Variables  : camelCase
Properties : camelCase
Constants  : UPPER_SNAKE_CASE

## Database & Schema
Tables  : camelCase
Columns : snake_case
Indexes : snake_case_idx
Enums   : camelCaseEnum

## Methods & Functions
Methods & Functions    : camelCase
Use Case Execute       : Always execute()
Static Factory Methods : create(), fromPersistence() patterns
Static Generators      : generate() for IDs

### Configuration
- Config Files : kebab-case.config.ts
- Environment  : .env