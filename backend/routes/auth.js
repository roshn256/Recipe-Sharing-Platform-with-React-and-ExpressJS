const express = require('express');
const User = require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt'); // 🛠 Fix: Import bcrypt
const router = express.Router();

router.post('/register', async (req, res) => {
  const { username, password } = req.body;
  try {
    const salt = await bcrypt.genSalt(10); // 🛠 Fix: Encrypt password
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = new User({ username, password: hashedPassword });
    await user.save();

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.json({ token });
  } catch (err) {
    res.status(400).json({ msg: err.message });
  }
});

router.post('/login', async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await User.findOne({ username });
    if (!user) return res.status(400).json({ msg: 'User not found' });

    const isMatch = await bcrypt.compare(password, user.password); // 🛠 Fix: Compare encrypted passwords
    if (!isMatch) return res.status(400).json({ msg: 'Invalid credentials' });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.json({ token });
  } catch (err) {
    res.status(400).json({ msg: err.message });
  }
});

module.exports = router;
