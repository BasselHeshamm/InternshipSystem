const router = require('express').Router();
const Report = require('../models/Report');
const { auth, requireRole } = require('../middleware/auth');

// GET /api/reports
router.get('/', auth, async (req, res) => {
  try {
    let query = {};
    if (req.user.role === 'student') query.studentId = req.user.id;
    const reports = await Report.find(query).sort({ createdAt: -1 });
    res.json(reports);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET /api/reports/:id
router.get('/:id', auth, async (req, res) => {
  try {
    const report = await Report.findById(req.params.id);
    if (!report) return res.status(404).json({ error: 'Not found' });
    res.json(report);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST /api/reports — student submits report
router.post('/', auth, requireRole('student'), async (req, res) => {
  try {
    const report = new Report({
      studentId:    req.user.id,
      studentName:  req.body.studentName,
      internshipId: req.body.internshipId,
      company:      req.body.company,
      title:        req.body.title,
      introduction: req.body.introduction,
      body:         req.body.body,
      attachmentUrl:req.body.attachmentUrl,
      status:       req.body.finalized ? 'submitted' : 'draft',
      finalized:    req.body.finalized || false,
    });
    await report.save();
    res.status(201).json(report);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// PUT /api/reports/:id — update report
router.put('/:id', auth, async (req, res) => {
  try {
    const report = await Report.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(report);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// PUT /api/reports/:id/status — scad/faculty updates status
router.put('/:id/status', auth, requireRole('scad', 'faculty'), async (req, res) => {
  const { status, supervisorComments } = req.body;
  try {
    const report = await Report.findByIdAndUpdate(
      req.params.id,
      { status, supervisorComments },
      { new: true }
    );
    res.json(report);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST /api/reports/:id/appeal — student appeals
router.post('/:id/appeal', auth, requireRole('student'), async (req, res) => {
  try {
    const report = await Report.findByIdAndUpdate(
      req.params.id,
      { appeal: { message: req.body.message, status: 'pending' } },
      { new: true }
    );
    res.json(report);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// DELETE /api/reports/:id
router.delete('/:id', auth, async (req, res) => {
  try {
    await Report.findByIdAndDelete(req.params.id);
    res.json({ message: 'Deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
