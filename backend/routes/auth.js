const router = require('express').Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { pool } = require('../config/postgres');

// POST /api/auth/register
router.post('/register', async (req, res) => {
  const { firstName, lastName, email, password, role, companyName, industry, companySize, website } = req.body;
  try {
    const hashed = await bcrypt.hash(password, 10);
    const result = await pool.query(
      `INSERT INTO users (first_name, last_name, email, password, role)
       VALUES ($1, $2, $3, $4, $5) RETURNING id, first_name, last_name, email, role`,
      [firstName, lastName, email, hashed, role]
    );
    const user = result.rows[0];

    // If company, create company record
    if (role === 'company' && companyName) {
      await pool.query(
        `INSERT INTO companies (user_id, company_name, industry, company_size, website)
         VALUES ($1, $2, $3, $4, $5)`,
        [user.id, companyName, industry, companySize, website]
      );
    }

    const token = jwt.sign(
      { id: user.id, role: user.role, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES_IN }
    );

    res.status(201).json({ token, user });
  } catch (err) {
    if (err.code === '23505') return res.status(400).json({ error: 'Email already registered' });
    res.status(500).json({ error: err.message });
  }
});

// POST /api/auth/login
router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    const result = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
    const user = result.rows[0];
    if (!user) return res.status(400).json({ error: 'Invalid credentials' });

    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.status(400).json({ error: 'Invalid credentials' });

    const token = jwt.sign(
      { id: user.id, role: user.role, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES_IN }
    );

    res.json({ token, user: { id: user.id, firstName: user.first_name, lastName: user.last_name, email: user.email, role: user.role, isPro: user.is_pro } });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
