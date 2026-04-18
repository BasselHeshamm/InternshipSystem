const router = require('express').Router();
const { pool } = require('../config/postgres');
const { auth, requireRole } = require('../middleware/auth');

// GET /api/internships — all open internships
router.get('/', async (req, res) => {
  try {
    const { search, type, location } = req.query;
    let query = `
      SELECT i.*, c.company_name, c.industry
      FROM internships i
      JOIN companies c ON i.company_id = c.id
      WHERE i.status = 'open' AND c.status = 'approved'
    `;
    const params = [];
    if (search) { params.push(`%${search}%`); query += ` AND (i.title ILIKE $${params.length} OR c.company_name ILIKE $${params.length})`; }
    if (type)   { params.push(type);           query += ` AND i.work_type = $${params.length}`; }
    if (location){ params.push(`%${location}%`); query += ` AND i.location ILIKE $${params.length}`; }
    query += ' ORDER BY i.created_at DESC';
    const result = await pool.query(query, params);
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET /api/internships/:id
router.get('/:id', async (req, res) => {
  try {
    const result = await pool.query(
      `SELECT i.*, c.company_name, c.industry FROM internships i
       JOIN companies c ON i.company_id = c.id WHERE i.id = $1`,
      [req.params.id]
    );
    if (!result.rows[0]) return res.status(404).json({ error: 'Not found' });
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST /api/internships — company posts internship
router.post('/', auth, requireRole('company'), async (req, res) => {
  const { title, description, duration, isPaid, salary, skills, location, workType, deadline } = req.body;
  try {
    const company = await pool.query('SELECT id FROM companies WHERE user_id = $1', [req.user.id]);
    if (!company.rows[0]) return res.status(403).json({ error: 'Company not found' });

    const result = await pool.query(
      `INSERT INTO internships (company_id, title, description, duration, is_paid, salary, skills, location, work_type, deadline)
       VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10) RETURNING *`,
      [company.rows[0].id, title, description, duration, isPaid, salary, skills, location, workType, deadline]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// PUT /api/internships/:id
router.put('/:id', auth, requireRole('company'), async (req, res) => {
  const { title, description, duration, isPaid, salary, skills, location, workType, deadline, status } = req.body;
  try {
    const result = await pool.query(
      `UPDATE internships SET title=$1, description=$2, duration=$3, is_paid=$4, salary=$5,
       skills=$6, location=$7, work_type=$8, deadline=$9, status=$10 WHERE id=$11 RETURNING *`,
      [title, description, duration, isPaid, salary, skills, location, workType, deadline, status, req.params.id]
    );
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// DELETE /api/internships/:id
router.delete('/:id', auth, requireRole('company', 'scad'), async (req, res) => {
  try {
    await pool.query('DELETE FROM internships WHERE id = $1', [req.params.id]);
    res.json({ message: 'Deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
