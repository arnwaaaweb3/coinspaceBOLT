# Coinspace Newsletter API

A robust newsletter subscription API for the Coinspace educational platform, built with Express.js and focused on security and performance.

## Features

- 📧 Newsletter subscription endpoint
- 🔒 Security middleware (Helmet, CORS, Rate limiting)
- ✅ Input validation and sanitization
- 🚀 Production-ready error handling
- 📊 Health check endpoint

## Quick Start

1. **Install dependencies:**
   ```bash
   cd backend-example
   npm install
   ```

2. **Set up environment variables:**
   ```bash
   cp .env.example .env
   # Edit .env with your configuration
   ```

3. **Start development server:**
   ```bash
   npm run dev
   ```

4. **Start production server:**
   ```bash
   npm start
   ```

## API Endpoints

### Newsletter Subscription
- **POST** `/api/newsletter/subscribe`
- **Body:** `{ "email": "user@example.com", "name": "John Doe" }`
- **Response:** Success/error message with subscription details

### Health Check
- **GET** `/api/health`
- **Response:** API status and timestamp

## Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `PORT` | Server port | `3001` |
| `NODE_ENV` | Environment | `development` |
| `FRONTEND_URL` | Frontend URL for CORS | `http://localhost:5173` |

## Security Features

- **Helmet**: Sets various HTTP headers for security
- **CORS**: Configurable cross-origin resource sharing
- **Rate Limiting**: Prevents abuse (100 requests per 15 minutes per IP)
- **Input Validation**: Email and name validation using validator.js

## Testing

```bash
npm test
```

## Production Deployment

1. Set `NODE_ENV=production` in your environment
2. Configure your production database and email service
3. Update CORS settings for your production frontend URL
4. Use a process manager like PM2 for production deployment

## License

MIT License - see LICENSE file for details