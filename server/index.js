// Required dependencies
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Input validation middleware
const validateInput = (req, res, next) => {
  const { data } = req.body;
  
  if (!data || !Array.isArray(data)) {
    return res.status(400).json({
      is_success: false,
      error: "Invalid input: 'data' must be an array"
    });
  }
  
  if (data.some(item => typeof item !== 'string')) {
    return res.status(400).json({
      is_success: false,
      error: "Invalid input: all items must be strings"
    });
  }

  next();
};


app.get('/', (req, res) => {
  res.send('Server is running successfully!');
});



// POST endpoint
app.post('/bfhl', validateInput, (req, res) => {
  try {
    const { data } = req.body;
    
    // User details - Replace with your information
    const user_id = "harsh_tanwar_14122003";  // Format: full_name_ddmmyyyy
    const email = "22BCS10007@cuchd.in";
    const roll_number = "22BCS10007";
    
    // Process the array
    const numbers = data.filter(item => /^\d+$/.test(item));
    const alphabets = data.filter(item => /^[A-Za-z]$/.test(item));
    const highest_alphabet = alphabets.length > 0 ? 
      [alphabets.reduce((a, b) => a.toLowerCase() > b.toLowerCase() ? a : b)] : 
      [];

    // Response
    res.json({
      is_success: true,
      user_id,
      email,
      roll_number,
      numbers,
      alphabets,
      highest_alphabet
    });
    
  } catch (error) {
    res.status(500).json({
      is_success: false,
      error: "Internal server error"
    });
  }
});

// GET endpoint
app.get('/bfhl', (req, res) => {
  res.json({ operation_code: 1 });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    is_success: false,
    error: "Something went wrong!"
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});