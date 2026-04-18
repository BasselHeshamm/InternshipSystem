const router = require('express').Router();
const { pool } = require('../config/postgres');
const { auth, requireRole } = require('../middleware/auth');

// GET /api/workshops
router.get('/', auth, async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM workshops ORDER BY start_date ASC');
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST /api/workshops — scad creates
router.post('/', auth, requireRole('scad'), async (req, res) => {
  const { title, description, startDate, endDate, startTime, endTime, location, capacity, speakers, agenda } = req.body;
  try {
    const result = await pool.query(
      `INSERT INTO workshops (title, description, start_date, end_date, start_time, end_time, location, capacity, speakers, agenda, created_by)
       VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11) RETURNING *`,
      [title, description, startDate, endDate, startTime, endTime, location, capacity, speakers, agenda, req.user.id]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// PUT /api/workshops/:id
router.put('/:id', auth, requireRole('scad'), async (req, res) => {
  const { title, description, startDate, endDate, startTime, endTime, location, capacity, speakers, agenda } = req.body;
  try {
    const result = await pool.query(
      `UPDATE workshops SET title=$1, description=$2, start_date=$3, end_date=$4, start_time=$5,
       end_time=$6, location=$7, capacity=$8, speakers=$9, agenda=$10 WHERE id=$11 RETURNING *`,
      [title, description, startDate, endDate, startTime, endTime, location, capacity, speakers, agenda, req.params.id]
    );
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// DELETE /api/workshops/:id
router.delete('/:id', auth, requireRole('scad'), async (req, res) => {
  try {
    await pool.query('DELETE FROM workshops WHERE id = $1', [req.params.id]);
    res.json({ message: 'Deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST /api/workshops/:id/register — student registers
router.post('/:id/register', auth, requireRole('student'), async (req, res) => {
  try {
    await pool.query(
      'INSERT INTO workshop_registrations (workshop_id, student_id) VALUES ($1, $2)',
      [req.params.id, req.user.id]
    );
    res.status(201).json({ message: 'Registered' });
  } catch (err) {
    if (err.code === '23505') return res.status(400).json({ error: 'Already registered' });
    res.status(500).json({ error: err.message });
  }
});

// PUT /api/workshops/:id/complete — student marks complete
router.put('/:id/complete', auth, requireRole('student'), async (req, res) => {
  try {
    await pool.query(
      'UPDATE workshop_registrations SET completed = TRUE WHERE workshop_id=$1 AND student_id=$2',
      [req.params.id, req.user.id]
    );
    res.json({ message: 'Completed' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
