---
trigger: always_on
---

## Security Rules

### Authentication
- Clerk middleware handles session validation
- JWT tokens validated on every request
- Unauthorized responses return 401

### Authorization  
- Role-based access control in use cases
- Admin endpoints require admin role
- Resource ownership validation

### Input Validation
- Zod schemas for all API inputs
- Never trust client data
- Sanitize all user inputs

### Error Handling
- Never expose internal errors
- Generic error messages for security
- Error logs don't contain sensitive data

### API Security
- Rate limiting on all endpoints
- avoid common vulnerabilities

### Environment
- All secrets in environment variables
- No hardcoded credentials