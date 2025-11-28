---
trigger: always_on
---

Architecture

use Clean Architecture

folder structure

src/
  -modules/
    -user/
      -api/
        -user.controller.ts
        -user.validator.ts
        -user.routes.ts
      -application/
        -commands
        -queries
        -dto
        -mappers
      -domain/
        -user.entity.ts
        -user.repository.ts
      -infrastructure/
        -user-repository-drizzle.ts
  -shared/
    -api/
      -middlewares/
        -clerk-require-auth.ts
        -rate-limiter.ts
      -utils/
    -infrastructure/
      -database/
        -db.ts
        -schema.ts
app.ts
index.ts
drizzle.config.ts