const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const validator = require('validator');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3001;

// Security middleware
app.use(helmet());
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:5173',
  credentials: true
}));

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  message: 'Too many requests from this IP, please try again later.'
});
app.use(limiter);

// Body parsing middleware
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

// Newsletter subscription endpoint
app.post('/api/newsletter/subscribe', async (req, res) => {
  try {
    const { email, name } = req.body;

    // Validate email
    if (!email || !validator.isEmail(email)) {
      return res.status(400).json({
        success: false,
        message: 'Please provide a valid email address'
      });
    }

    // Validate name (optional but if provided should be valid)
    if (name && (!validator.isLength(name, { min: 1, max: 100 }) || !validator.isAlpha(name.replace(/\s/g, '')))) {
      return res.status(400).json({
        success: false,
        message: 'Please provide a valid name'
      });
    }

    // Here you would typically save to database or send to email service
    // For now, we'll just simulate success
    console.log(`Newsletter subscription: ${email}${name ? ` (${name})` : ''}`);

    res.status(200).json({
      success: true,
      message: 'Successfully subscribed to newsletter!',
      data: {
        email: email,
        name: name || null,
        subscribedAt: new Date().toISOString()
      }
    });

  } catch (error) {
    console.error('Newsletter subscription error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error. Please try again later.'
    });
  }
});

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'Coinspace Newsletter API is running',
    timestamp: new Date().toISOString()
  });
});

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({
    success: false,
    message: 'Endpoint not found'
  });
});

// Error handling middleware
app.use((error, req, res, next) => {
  console.error('Unhandled error:', error);
  res.status(500).json({
    success: false,
    message: 'Internal server error'
  });
});

app.listen(PORT, () => {
  console.log(`🚀 Coinspace Newsletter API running on port ${PORT}`);
  console.log(`📧 Newsletter endpoint: http://localhost:${PORT}/api/newsletter/subscribe`);
  console.log(`❤️  Health check: http://localhost:${PORT}/api/health`);
});

module.exports = app;