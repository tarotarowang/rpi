# Rakuten Product Search Application

A responsive web application for searching Rakuten products with affiliate links. Built with React frontend and Node.js backend.

## Features

- **Guide Page**: Step-by-step instructions for registering Rakuten Developer ID and getting App ID
- **Settings Page**: Save and manage Rakuten Developer ID and App ID in database
- **Search Page**: Search products by keyword and display 10 cheapest items with affiliate links
- **Responsive Design**: Modern UI built with Ant Design
- **Full Testing**: Unit tests, integration tests, and end-to-end tests

## Tech Stack

### Frontend
- React 18
- Ant Design
- React Router
- Axios

### Backend
- Node.js
- Express.js
- SQLite3
- Jest (testing)

### Testing
- Jest (unit tests)
- Supertest (integration tests)
- Cypress (E2E tests)

## Quick Start

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/tarotarowang/rpi.git
   cd rpi
   ```

2. **Install dependencies**
   ```bash
   # Install root dependencies
   npm install
   
   # Install backend dependencies
   cd backend && npm install
   
   # Install frontend dependencies
   cd ../frontend && npm install
   ```

3. **Start the application**
   ```bash
   # Start backend (from root directory)
   cd backend && npm start
   
   # Start frontend (in new terminal, from root directory)
   cd frontend && npm start
   ```

4. **Access the application**
   - Frontend: http://localhost:3001
   - Backend API: http://localhost:3001/api

## Branch Strategy

### Environment Branches
- **master**: Main development branch
- **Test**: Testing environment branch
- **STG**: Staging environment branch  
- **Prod**: Production environment branch

### Workflow
1. Create feature branches from `master`
2. Develop and test features
3. Create Pull Request to `master`
4. After review, merge to `master`
5. Deploy to environments via branch promotions:
   - `master` → `Test` (automated testing)
   - `Test` → `STG` (staging validation)
   - `STG` → `Prod` (production deployment)

### Team Collaboration
```bash
# Create feature branch
git checkout master
git pull origin master
git checkout -b feature/your-feature-name

# Develop and commit
git add .
git commit -m "feat: add new feature"

# Push and create PR
git push origin feature/your-feature-name
# Create Pull Request on GitHub
```

## Environment Variables

### Backend (.env)
```env
PORT=3001
NODE_ENV=development
DATABASE_PATH=./rpi.db
RAKUTEN_API_BASE_URL=https://app.rakuten.co.jp/services/api/IchibaItem/Search/20170706
```

### Frontend (.env)
```env
REACT_APP_API_URL=http://localhost:3001/api
```

## API Endpoints

### Settings
- `GET /api/settings` - Get saved settings
- `POST /api/settings` - Save settings

### Search
- `GET /api/search?keyword={keyword}` - Search products

## Testing

### Run All Tests
```bash
# Backend tests
cd backend && npm test

# Frontend tests  
cd frontend && npm test

# E2E tests
cd frontend && npm run cypress:open
```

### Test Coverage
```bash
# Backend coverage
cd backend && npm run test:coverage

# Frontend coverage
cd frontend && npm run test:coverage
```

## Deployment

### Development
```bash
# Backend
cd backend && npm start

# Frontend
cd frontend && npm start
```

### Production Build
```bash
# Frontend build
cd frontend && npm run build

# Backend (use PM2 or similar)
cd backend && npm start
```

## Project Structure

```
rpi/
├── backend/                 # Node.js backend
│   ├── index.js            # Express server
│   ├── index.test.js       # Backend tests
│   └── package.json
├── frontend/               # React frontend
│   ├── src/
│   │   ├── App.js          # Main app component
│   │   ├── GuidePage.js    # Guide page
│   │   ├── SettingsPage.js # Settings page
│   │   └── SearchPage.js   # Search page
│   ├── cypress/            # E2E tests
│   └── package.json
├── test-e2e.js            # E2E test script
└── README.md
```

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License.

## Support

For support and questions, please create an issue on GitHub. 