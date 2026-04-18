// routes/companies.js
const router = require('express').Router();
const { pool } = require('../config/postgres');
const { auth, requireRole } = require('../middleware/auth');

router.get('/', auth, requireRole('scad'), async (req, res) => {
  try {
    const { status, industry, search } = req.query;
    let query = `SELECT c.*, u.first_name, u.last_name, u.email FROM companies c JOIN users u ON c.user_id = u.id WHERE 1=1`;
    const params = [];
    if (status)   { params.push(status);         query += ` AND c.status = $${params.length}`; }
    if (industry) { params.push(industry);        query += ` AND c.industry = $${params.length}`; }
    if (search)   { params.push(`%${search}%`);   query += ` AND c.company_name ILIKE $${params.length}`; }
    const result = await pool.query(query, params);
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.put('/:id/status', auth, requireRole('scad'), async (req, res) => {
  try {
    const result = await pool.query(
      'UPDATE companies SET status = $1 WHERE id = $2 RETURNING *',
      [req.body.status, req.params.id]
    );
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
