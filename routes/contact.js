const express = require('express');
const Joi = require('joi');
const router = express.Router();

// In-memory storage for inquiries (replace with database in production)
const inquiries = [];

// Joi validation schemas
const contactSchema = Joi.object({
  name: Joi.string().min(2).max(100).required(),
  email: Joi.string().email().required(),
  message: Joi.string().min(10).max(1000).required()
});

const validateContact = (req, res, next) => {
  const { error } = contactSchema.validate(req.body);
  if (error) {
    return res.status(400).json({
      success: false,
      error: error.details[0].message
    });
  }
  next();
};

// POST /api/contact/submit - Submit contact form
router.post('/submit', validateContact, async (req, res) => {
  try {
    const { name, email, message } = req.body;
    
    // Create inquiry object
    const inquiry = {
      id: Date.now().toString(),
      name,
      email,
      message,
      timestamp: new Date().toISOString(),
      status: 'new'
    };
    
    // Store inquiry
    inquiries.push(inquiry);
    
    res.status(200).json({
      success: true,
      message: 'Contact form submitted successfully',
      inquiryId: inquiry.id
    });
    
  } catch (error) {
    console.error('Contact form submission error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to submit contact form. Please try again later.'
    });
  }
});

// GET /api/contact/inquiries - Get all inquiries (admin only)
router.get('/inquiries', (req, res) => {
  try {
    const { status, limit = 50, offset = 0 } = req.query;
    
    let filteredInquiries = inquiries;
    
    // Filter by status if provided
    if (status) {
      filteredInquiries = inquiries.filter(inquiry => inquiry.status === status);
    }
    
    // Sort by timestamp (newest first)
    filteredInquiries.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
    
    // Pagination
    const startIndex = parseInt(offset);
    const endIndex = startIndex + parseInt(limit);
    const paginatedInquiries = filteredInquiries.slice(startIndex, endIndex);
    
    res.status(200).json({
      success: true,
      inquiries: paginatedInquiries,
      total: filteredInquiries.length,
      hasMore: endIndex < filteredInquiries.length
    });
    
  } catch (error) {
    console.error('Get inquiries error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to retrieve inquiries'
    });
  }
});

// DELETE /api/contact/:id - Delete inquiry
router.delete('/:id', (req, res) => {
  try {
    const { id } = req.params;
    
    const inquiryIndex = inquiries.findIndex(inquiry => inquiry.id === id);
    
    if (inquiryIndex === -1) {
      return res.status(404).json({
        success: false,
        error: 'Inquiry not found'
      });
    }
    
    inquiries.splice(inquiryIndex, 1);
    
    res.status(200).json({
      success: true,
      message: 'Inquiry deleted successfully'
    });
    
  } catch (error) {
    console.error('Delete inquiry error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to delete inquiry'
    });
  }
});

// Error handling middleware
router.use((error, req, res, next) => {
  console.error('Contact router error:', error);
  res.status(500).json({
    success: false,
    error: 'Internal server error'
  });
});

module.exports = router;