const Joi = require('joi');

// Common validation schemas
const commonSchemas = {
  email: Joi.string().email().required(),
  password: Joi.string().min(6).max(128).required(),
  id: Joi.string().alphanum().length(24),
  name: Joi.string().min(2).max(100).trim(),
  phone: Joi.string().pattern(/^[\+]?[\d\-\(\)\s]+$/),
  url: Joi.string().uri()
};

// User validation schemas
const userSchemas = {
  register: Joi.object({
    username: Joi.string().alphanum().min(3).max(30).required(),
    email: commonSchemas.email,
    password: commonSchemas.password,
    full_name: commonSchemas.name.required(),
    phone: commonSchemas.phone,
    company: Joi.string().max(100),
    role: Joi.string().valid('admin', 'user', 'operator').default('user')
  }),

  login: Joi.object({
    email: commonSchemas.email,
    password: Joi.string().required()
  }),

  forgotPassword: Joi.object({
    email: commonSchemas.email
  }),

  resetPassword: Joi.object({
    token: Joi.string().required(),
    password: commonSchemas.password
  }),

  updateProfile: Joi.object({
    full_name: commonSchemas.name,
    phone: commonSchemas.phone,
    company: Joi.string().max(100)
  })
};

// Contact form validation schemas
const contactSchemas = {
  submit: Joi.object({
    name: commonSchemas.name.required(),
    email: commonSchemas.email,
    company: Joi.string().max(100),
    phone: commonSchemas.phone,
    subject: Joi.string().valid(
      'enterprise-sales',
      'technical-support', 
      'partnership',
      'investment',
      'media',
      'general'
    ),
    message: Joi.string().min(10).max(2000).required(),
    newsletter: Joi.boolean().default(false)
  })
};

// Drone validation schemas
const droneSchemas = {
  create: Joi.object({
    name: commonSchemas.name.required(),
    model: Joi.string().max(50).required(),
    manufacturer: Joi.string().max(50).required(),
    serial_number: Joi.string().max(100).required(),
    battery_level: Joi.number().min(0).max(100),
    status: Joi.string().valid('active', 'maintenance', 'inactive').default('active'),
    location: Joi.object({
      latitude: Joi.number().min(-90).max(90),
      longitude: Joi.number().min(-180).max(180),
      altitude: Joi.number().min(0)
    }),
    specifications: Joi.object({
      max_flight_time: Joi.number().min(0),
      max_speed: Joi.number().min(0),
      max_altitude: Joi.number().min(0),
      camera_resolution: Joi.string(),
      weight: Joi.number().min(0)
    })
  }),

  update: Joi.object({
    name: commonSchemas.name,
    battery_level: Joi.number().min(0).max(100),
    status: Joi.string().valid('active', 'maintenance', 'inactive'),
    location: Joi.object({
      latitude: Joi.number().min(-90).max(90),
      longitude: Joi.number().min(-180).max(180),
      altitude: Joi.number().min(0)
    })
  })
};

// Flight validation schemas
const flightSchemas = {
  create: Joi.object({
    drone_id: commonSchemas.id.required(),
    mission_name: commonSchemas.name.required(),
    description: Joi.string().max(500),
    start_location: Joi.object({
      latitude: Joi.number().min(-90).max(90).required(),
      longitude: Joi.number().min(-180).max(180).required(),
      altitude: Joi.number().min(0).default(0)
    }).required(),
    end_location: Joi.object({
      latitude: Joi.number().min(-90).max(90).required(),
      longitude: Joi.number().min(-180).max(180).required(),
      altitude: Joi.number().min(0).default(0)
    }).required(),
    waypoints: Joi.array().items(
      Joi.object({
        latitude: Joi.number().min(-90).max(90).required(),
        longitude: Joi.number().min(-180).max(180).required(),
        altitude: Joi.number().min(0).default(0),
        action: Joi.string().valid('hover', 'photo', 'video', 'land')
      })
    ),
    scheduled_time: Joi.date().iso().min('now'),
    estimated_duration: Joi.number().min(1).max(480), // max 8 hours
    flight_mode: Joi.string().valid('manual', 'autonomous', 'waypoint').default('autonomous')
  }),

  update: Joi.object({
    mission_name: commonSchemas.name,
    description: Joi.string().max(500),
    status: Joi.string().valid('planned', 'in-progress', 'completed', 'cancelled', 'failed'),
    actual_start_time: Joi.date().iso(),
    actual_end_time: Joi.date().iso(),
    flight_log: Joi.object({
      distance_covered: Joi.number().min(0),
      max_altitude: Joi.number().min(0),
      battery_consumed: Joi.number().min(0).max(100),
      photos_taken: Joi.number().min(0),
      videos_recorded: Joi.number().min(0)
    })
  })
};

// Analytics validation schemas
const analyticsSchemas = {
  track: Joi.object({
    event_type: Joi.string().valid(
      'page_view',
      'button_click', 
      'form_submit',
      'api_call',
      'user_action',
      'error',
      'performance'
    ).required(),
    event_name: Joi.string().max(100).required(),
    user_id: commonSchemas.id,
    session_id: Joi.string().max(100),
    properties: Joi.object().pattern(
      Joi.string(),
      Joi.alternatives().try(
        Joi.string(),
        Joi.number(),
        Joi.boolean(),
        Joi.date()
      )
    ),
    timestamp: Joi.date().iso().default(() => new Date())
  }),

  query: Joi.object({
    start_date: Joi.date().iso(),
    end_date: Joi.date().iso(),
    event_type: Joi.string(),
    user_id: commonSchemas.id,
    limit: Joi.number().min(1).max(1000).default(100),
    offset: Joi.number().min(0).default(0)
  })
};

// Investor validation schemas
const investorSchemas = {
  submit: Joi.object({
    name: commonSchemas.name.required(),
    email: commonSchemas.email,
    company: Joi.string().max(100),
    title: Joi.string().max(100),
    phone: commonSchemas.phone,
    investment_amount: Joi.number().min(1000),
    investment_type: Joi.string().valid(
      'seed',
      'series-a',
      'series-b',
      'strategic',
      'bridge'
    ),
    message: Joi.string().max(1000),
    accredited: Joi.boolean().required(),
    previous_investments: Joi.array().items(Joi.string()),
    areas_of_interest: Joi.array().items(
      Joi.string().valid('ai', 'drones', 'saas', 'enterprise', 'defense')
    )
  })
};

// Validation middleware factory
const validate = (schema, property = 'body') => {
  return (req, res, next) => {
    const { error } = schema.validate(req[property], {
      abortEarly: false,
      stripUnknown: true,
      convert: true
    });

    if (error) {
      const errors = error.details.map(detail => ({
        field: detail.path.join('.'),
        message: detail.message,
        type: detail.type
      }));

      return res.status(400).json({
        success: false,
        error: 'Validation failed',
        details: errors
      });
    }

    next();
  };
};

// Custom validation functions
const customValidations = {
  // Validate MongoDB ObjectId
  isValidObjectId: (value) => {
    return /^[0-9a-fA-F]{24}$/.test(value);
  },

  // Validate coordinates
  isValidCoordinate: (lat, lng) => {
    return lat >= -90 && lat <= 90 && lng >= -180 && lng <= 180;
  },

  // Validate file upload
  validateFileUpload: (file, allowedTypes = ['image/jpeg', 'image/png'], maxSize = 5 * 1024 * 1024) => {
    if (!file) return { valid: false, error: 'No file provided' };
    
    if (!allowedTypes.includes(file.mimetype)) {
      return { valid: false, error: 'Invalid file type' };
    }
    
    if (file.size > maxSize) {
      return { valid: false, error: 'File too large' };
    }
    
    return { valid: true };
  },

  // Validate API key format
  isValidApiKey: (key) => {
    return /^[a-zA-Z0-9_-]{32,128}$/.test(key);
  }
};

// Rate limiting validation
const rateLimitValidation = {
  // Check if IP is allowed
  isAllowedIP: (ip, whitelist = []) => {
    if (whitelist.length === 0) return true;
    return whitelist.includes(ip);
  },

  // Validate request frequency
  checkRequestLimit: (userId, endpoint, maxRequests = 100, windowMs = 15 * 60 * 1000) => {
    // Implementation would use Redis or in-memory store
    // This is a placeholder for the logic
    return true;
  }
};

module.exports = {
  // Schema exports
  userSchemas,
  contactSchemas,
  droneSchemas,
  flightSchemas,
  analyticsSchemas,
  investorSchemas,
  
  // Middleware exports
  validate,
  
  // Custom validation functions
  customValidations,
  rateLimitValidation,
  
  // Common schemas for reuse
  commonSchemas,
  
  // Predefined validators for common use cases
  validators: {
    // User validators
    validateUserRegistration: validate(userSchemas.register),
    validateUserLogin: validate(userSchemas.login),
    validateForgotPassword: validate(userSchemas.forgotPassword),
    validateResetPassword: validate(userSchemas.resetPassword),
    validateProfileUpdate: validate(userSchemas.updateProfile),
    
    // Contact validators
    validateContactSubmission: validate(contactSchemas.submit),
    
    // Drone validators
    validateDroneCreation: validate(droneSchemas.create),
    validateDroneUpdate: validate(droneSchemas.update),
    
    // Flight validators
    validateFlightCreation: validate(flightSchemas.create),
    validateFlightUpdate: validate(flightSchemas.update),
    
    // Analytics validators
    validateAnalyticsTracking: validate(analyticsSchemas.track),
    validateAnalyticsQuery: validate(analyticsSchemas.query),
    
    // Investor validators
    validateInvestorSubmission: validate(investorSchemas.submit),
    
    // Parameter validators
    validateIdParam: validate(Joi.object({ id: commonSchemas.id.required() }), 'params'),
    validateQueryParams: validate(Joi.object({
      page: Joi.number().min(1).default(1),
      limit: Joi.number().min(1).max(100).default(20),
      sort: Joi.string().valid('asc', 'desc').default('desc'),
      search: Joi.string().max(100)
    }), 'query')
  }
};