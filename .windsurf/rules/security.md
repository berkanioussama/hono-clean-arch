---
trigger: always_on
---

## Security Rules

### Authentication
- middleware handles session validation, and admin access control
- JWT tokens validated on every request

### Authorization  
- Implement role-based access control
- Admin endpoints require admin role
- Resource ownership validation

### API Security
- Rate limiting on all endpoints
- avoid common vulnerabilities
- Validate all inputs at API boundary

### Error Handling
- Never expose internal errors
- Generic error messages for security
- Error logs don't contain sensitive data

### Environment
- All secrets in environment variables
- No hardcoded credentials