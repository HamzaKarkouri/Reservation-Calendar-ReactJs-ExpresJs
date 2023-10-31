const express = require('express');
const router = express.Router();
const User = require('../Models/User');

router.post('/login', async (req, res) => {
  const { username, password } = req.body;
  try {
    
    const user = await User.findOne({ username, password });
    if (user) {
      
      res.json({ success: true, name: user.name });
    } else {
      
      res.status(401).json({ error: 'Invalid username or password' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;
