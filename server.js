const express = require('express');
const path = require('path');
const { calculateTax } = require('./taxCalculator');

const app = express();
const PORT = process.env.PORT || 8080;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// Liveness / Readiness health check for IBM Cloud Code Engine
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'UP', timestamp: new Date().toISOString() });
});

// Tax calculation API endpoint
app.post('/api/calculate', (req, res) => {
  try {
    const { income, deductions = 0 } = req.body;
    if (income === undefined || income === null || income === '') {
      return res.status(400).json({ error: 'Gross income is required' });
    }

    const result = calculateTax(income, deductions);
    res.status(200).json(result);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Start listening
if (process.env.NODE_ENV !== 'test') {
  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Tax Calculator server is running on port ${PORT}`);
  });
}

module.exports = app;
