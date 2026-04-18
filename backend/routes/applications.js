const router = require('express').Router();
const { pool } = require('../config/postgres');
const { auth, requireRole } = require('../middleware/auth');

// GET /api/applications — student sees their own, company sees theirs
router.get('/', auth, async (req, res) => {
  try {
    let result;
    if (req.user.role === 'student') {
      result = await pool.query(
        `SELECT a.*, i.title, i.work_type, i.location, c.company_name
         FROM applications a
         JOIN internships i ON a.internship_id = i.id
         JOIN companies c ON i.company_id = c.id
         WHERE a.student_id = $1 ORDER BY a.applied_at DESC`,
        [req.user.id]
      );
    } else if (req.user.role === 'company') {
      const company = await pool.query('SELECT id FROM companies WHERE user_id = $1', [req.user.id]);
      result = await pool.query(
        `SELECT a.*, i.title, u.first_name, u.last_name, u.email
         FROM applications a
         JOIN internships i ON a.internship_id = i.id
         JOIN users u ON a.student_id = u.id
         WHERE i.company_id = $1 ORDER BY a.applied_at DESC`,
        [company.rows[0]?.id]
      );
    } else {
      result = await pool.query(
        `SELECT a.*, i.title, u.first_name, u.last_name, c.company_name
         FROM applications a
         JOIN internships i ON a.internship_id = i.id
         JOIN users u ON a.student_id = u.id
         JOIN companies c ON i.company_id = c.id
         ORDER BY a.applied_at DESC`
      );
    }
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST /api/applications — student applies
router.post('/', auth, requireRole('student'), async (req, res) => {
  const { internshipId, coverLetter, cvUrl } = req.body;
  try {
    const result = await pool.query(
      `INSERT INTO applications (student_id, internship_id, cover_letter, cv_url)
       VALUES ($1, $2, $3, $4) RETURNING *`,
      [req.user.id, internshipId, coverLetter, cvUrl]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    if (err.code === '23505') return res.status(400).json({ error: 'Already applied' });
    res.status(500).json({ error: err.message });
  }
});

// PUT /api/applications/:id/status — company updates status
router.put('/:id/status', auth, requireRole('company', 'scad'), async (req, res) => {
  const { status } = req.body;
  try {
    const result = await pool.query(
      'UPDATE applications SET status = $1 WHERE id = $2 RETURNING *',
      [status, req.params.id]
    );
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
