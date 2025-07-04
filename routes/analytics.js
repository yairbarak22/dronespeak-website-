const express = require('express');
const router = express.Router();

const cache = new Map();

router.post('/track', (req, res) => {
  try {
    const { action, data, timestamp = Date.now() } = req.body;
    
    if (!action) {
      return res.status(400).json({ error: 'Action is required' });
    }

    const trackingData = {
      action,
      data,
      timestamp,
      id: Date.now() + Math.random()
    };

    if (!cache.has('analytics')) {
      cache.set('analytics', []);
    }
    
    cache.get('analytics').push(trackingData);
    
    res.json({ 
      success: true, 
      message: 'Action tracked successfully',
      trackingId: trackingData.id
    });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

router.get('/dashboard', (req, res) => {
  try {
    const analytics = cache.get('analytics') || [];
    
    const stats = {
      totalActions: analytics.length,
      uniqueActions: new Set(analytics.map(item => item.action)).size,
      recentActions: analytics.slice(-10).reverse(),
      actionCounts: analytics.reduce((acc, item) => {
        acc[item.action] = (acc[item.action] || 0) + 1;
        return acc;
      }, {}),
      timeRange: {
        earliest: analytics.length > 0 ? Math.min(...analytics.map(item => item.timestamp)) : null,
        latest: analytics.length > 0 ? Math.max(...analytics.map(item => item.timestamp)) : null
      }
    };

    res.json({
      success: true,
      data: stats
    });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

router.get('/reports', (req, res) => {
  try {
    const analytics = cache.get('analytics') || [];
    const { startDate, endDate, action } = req.query;
    
    let filteredData = analytics;
    
    if (startDate) {
      const start = new Date(startDate).getTime();
      filteredData = filteredData.filter(item => item.timestamp >= start);
    }
    
    if (endDate) {
      const end = new Date(endDate).getTime();
      filteredData = filteredData.filter(item => item.timestamp <= end);
    }
    
    if (action) {
      filteredData = filteredData.filter(item => item.action === action);
    }
    
    const report = {
      totalRecords: filteredData.length,
      actions: filteredData.reduce((acc, item) => {
        acc[item.action] = (acc[item.action] || 0) + 1;
        return acc;
      }, {}),
      timeDistribution: filteredData.reduce((acc, item) => {
        const hour = new Date(item.timestamp).getHours();
        acc[hour] = (acc[hour] || 0) + 1;
        return acc;
      }, {}),
      data: filteredData.map(({ id, action, timestamp, data }) => ({
        id,
        action,
        timestamp,
        data
      }))
    };
    
    res.json({
      success: true,
      report
    });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;