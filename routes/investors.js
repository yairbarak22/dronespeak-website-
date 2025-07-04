const express = require('express');
const Joi = require('joi');
const router = express.Router();

// Validation schemas
const interestSchema = Joi.object({
  name: Joi.string().min(2).max(100).required(),
  email: Joi.string().email().required(),
  investment_amount: Joi.number().positive().required()
});

// GET /api/investors/metrics - Returns presentation data
router.get('/metrics', (req, res) => {
  try {
    const metrics = {
      tam: {
        value: 'B',
        description: 'Total Addressable Market'
      },
      growth: {
        value: 42,
        unit: '%',
        description: 'Annual growth rate'
      },
      segments: {
        enterprise: {
          percentage: 45,
          market_size: '2.1B'
        },
        mid_market: {
          percentage: 35,
          market_size: '1.6B'
        },
        small_business: {
          percentage: 20,
          market_size: '900M'
        }
      },
      generated_at: new Date().toISOString()
    };

    res.json({
      success: true,
      data: metrics
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Internal server error',
      message: 'Failed to retrieve metrics data'
    });
  }
});

// POST /api/investors/interest - Register investor interest
router.post('/interest', (req, res) => {
  try {
    const { error, value } = interestSchema.validate(req.body);
    
    if (error) {
      return res.status(400).json({
        success: false,
        error: 'Validation error',
        details: error.details.map(detail => ({
          field: detail.path.join('.'),
          message: detail.message
        }))
      });
    }

    // In a real application, you would save to database
    const investorData = {
      id: Date.now().toString(),
      name: value.name,
      email: value.email,
      investment_amount: value.investment_amount,
      status: 'pending',
      created_at: new Date().toISOString()
    };

    res.status(201).json({
      success: true,
      message: 'Investor interest registered successfully',
      data: investorData
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Internal server error',
      message: 'Failed to register investor interest'
    });
  }
});

// GET /api/investors/analytics - Returns page visit analytics
router.get('/analytics', (req, res) => {
  try {
    const analytics = {
      page_visits: {
        total: 1247,
        unique: 892,
        returning: 355
      },
      traffic_sources: {
        direct: 45,
        referral: 25,
        social: 20,
        search: 10
      },
      time_on_page: {
        average_seconds: 180,
        bounce_rate: 32
      },
      geographic_distribution: {
        north_america: 60,
        europe: 25,
        asia: 10,
        other: 5
      },
      conversion_metrics: {
        interest_forms_submitted: 23,
        conversion_rate: 2.58
      },
      period: {
        start_date: '2024-01-01',
        end_date: new Date().toISOString().split('T')[0]
      }
    };

    res.json({
      success: true,
      data: analytics
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Internal server error',
      message: 'Failed to retrieve analytics data'
    });
  }
});

// Error handling middleware for this router
router.use((error, req, res, next) => {
  console.error('Investors route error:', error);
  
  if (error.type === 'entity.parse.failed') {
    return res.status(400).json({
      success: false,
      error: 'Invalid JSON',
      message: 'Request body contains invalid JSON'
    });
  }
  
  res.status(500).json({
    success: false,
    error: 'Internal server error',
    message: 'An unexpected error occurred'
  });
});

module.exports = router;