const router = require('express').Router();
const { pool } = require('../config/postgres');
const { auth, requireRole } = require('../middleware/auth');

// GET /api/users/me
router.get('/me', auth, async (req, res) => {
  try {
    const result = await pool.query(
      'SELECT id, first_name, last_name, email, role, is_pro, created_at FROM users WHERE id = $1',
      [req.user.id]
    );
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// PUT /api/users/me
router.put('/me', auth, async (req, res) => {
  const { firstName, lastName } = req.body;
  try {
    const result = await pool.query(
      'UPDATE users SET first_name=$1, last_name=$2 WHERE id=$3 RETURNING id, first_name, last_name, email, role',
      [firstName, lastName, req.user.id]
    );
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET /api/users — scad gets all students
router.get('/', auth, requireRole('scad', 'faculty'), async (req, res) => {
  try {
    const result = await pool.query(
      `SELECT id, first_name, last_name, email, role, is_pro, created_at
       FROM users WHERE role = 'student' ORDER BY created_at DESC`
    );
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
