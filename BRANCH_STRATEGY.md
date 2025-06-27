# Branch Strategy & Team Collaboration Guide

## Branch Structure

### Main Branches
- **master**: Main development branch - contains latest stable code
- **Test**: Testing environment branch - for QA and testing
- **STG**: Staging environment branch - for pre-production validation
- **Prod**: Production environment branch - live production code

### Feature Branches
- **feature/***: New features and enhancements
- **bugfix/***: Bug fixes
- **hotfix/***: Critical production fixes
- **release/***: Release preparation

## Workflow

### 1. Feature Development
```bash
# Start from master
git checkout master
git pull origin master

# Create feature branch
git checkout -b feature/user-authentication

# Develop and commit
git add .
git commit -m "feat: add user authentication system"

# Push feature branch
git push origin feature/user-authentication
```

### 2. Pull Request Process
1. Create Pull Request from feature branch to `master`
2. Request code review from team members
3. Address review comments
4. Merge after approval

### 3. Environment Promotion
```bash
# Promote to Test
git checkout Test
git merge master
git push origin Test

# Promote to STG (after Test validation)
git checkout STG
git merge Test
git push origin STG

# Promote to Prod (after STG validation)
git checkout Prod
git merge STG
git push origin Prod
```

## Branch Protection Rules

### Master Branch
- ✅ Require pull request reviews before merging
- ✅ Require status checks to pass before merging
- ✅ Require branches to be up to date before merging
- ✅ Include administrators
- ✅ Restrict pushes that create files larger than 100 MB

### Environment Branches (Test, STG, Prod)
- ✅ Require pull request reviews before merging
- ✅ Require status checks to pass before merging
- ✅ Require branches to be up to date before merging
- ✅ Include administrators
- ✅ Restrict direct pushes

## Commit Message Convention

### Format
```
type(scope): description

[optional body]

[optional footer]
```

### Types
- **feat**: New feature
- **fix**: Bug fix
- **docs**: Documentation changes
- **style**: Code style changes (formatting, etc.)
- **refactor**: Code refactoring
- **test**: Adding or updating tests
- **chore**: Maintenance tasks

### Examples
```
feat(auth): add user login functionality
fix(search): resolve API timeout issue
docs(readme): update installation instructions
test(backend): add unit tests for search API
```

## Team Collaboration

### Code Review Guidelines
1. **Review Checklist**:
   - Code follows project standards
   - Tests are included and passing
   - Documentation is updated
   - No security vulnerabilities
   - Performance considerations

2. **Review Process**:
   - At least 2 approvals required for master
   - Address all comments before merging
   - Use "Request Changes" for significant issues

### Conflict Resolution
```bash
# When conflicts occur
git checkout master
git pull origin master
git checkout feature/your-branch
git merge master
# Resolve conflicts manually
git add .
git commit -m "merge: resolve conflicts with master"
```

## Environment Management

### Environment Variables
Each environment should have its own configuration:

#### Development (.env.development)
```env
NODE_ENV=development
PORT=3001
DATABASE_PATH=./rpi-dev.db
RAKUTEN_API_BASE_URL=https://app.rakuten.co.jp/services/api/IchibaItem/Search/20170706
```

#### Test (.env.test)
```env
NODE_ENV=test
PORT=3002
DATABASE_PATH=./rpi-test.db
RAKUTEN_API_BASE_URL=https://app.rakuten.co.jp/services/api/IchibaItem/Search/20170706
```

#### Staging (.env.staging)
```env
NODE_ENV=staging
PORT=3003
DATABASE_PATH=./rpi-staging.db
RAKUTEN_API_BASE_URL=https://app.rakuten.co.jp/services/api/IchibaItem/Search/20170706
```

#### Production (.env.production)
```env
NODE_ENV=production
PORT=3000
DATABASE_PATH=./rpi-prod.db
RAKUTEN_API_BASE_URL=https://app.rakuten.co.jp/services/api/IchibaItem/Search/20170706
```

## Deployment Strategy

### Automated Deployment
- **Test**: Automatic deployment on push to Test branch
- **STG**: Manual deployment after Test validation
- **Prod**: Manual deployment after STG validation

### Rollback Procedure
```bash
# If rollback is needed
git checkout Prod
git revert HEAD
git push origin Prod
```

## Monitoring & Alerts

### Health Checks
- API endpoint monitoring
- Database connectivity
- External API availability
- Response time monitoring

### Alert Channels
- Slack notifications for deployments
- Email alerts for critical failures
- GitHub notifications for security issues

## Security Guidelines

### Secrets Management
- Never commit secrets to repository
- Use environment variables for sensitive data
- Rotate API keys regularly
- Use GitHub Secrets for CI/CD

### Code Security
- Regular dependency updates
- Security scanning in CI/CD
- Code review for security issues
- Input validation and sanitization

## Performance Guidelines

### Code Quality
- Follow ESLint rules
- Maintain test coverage > 80%
- Regular code reviews
- Performance monitoring

### Database
- Optimize queries
- Use indexes appropriately
- Regular backups
- Monitor query performance

## Emergency Procedures

### Hotfix Process
```bash
# Create hotfix branch from Prod
git checkout Prod
git pull origin Prod
git checkout -b hotfix/critical-fix

# Fix the issue
git add .
git commit -m "hotfix: fix critical production issue"

# Merge to Prod immediately
git checkout Prod
git merge hotfix/critical-fix
git push origin Prod

# Merge to master and other branches
git checkout master
git merge hotfix/critical-fix
git push origin master
```

### Incident Response
1. Assess impact and severity
2. Notify team members
3. Create incident ticket
4. Implement fix
5. Deploy to production
6. Document incident and lessons learned 