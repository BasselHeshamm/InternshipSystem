// routes/evaluations.js
const router = require('express').Router();
const Evaluation = require('../models/Evaluation');
const { auth, requireRole } = require('../middleware/auth');

router.get('/', auth, requireRole('company', 'scad'), async (req, res) => {
  try {
    const query = req.user.role === 'company' ? { companyId: req.user.id } : {};
    const evals = await Evaluation.find(query).sort({ completionDate: -1 });
    res.json(evals);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post('/', auth, requireRole('company'), async (req, res) => {
  try {
    const evaluation = new Evaluation({ ...req.body, companyId: req.user.id });
    await evaluation.save();
    res.status(201).json(evaluation);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.put('/:id', auth, requireRole('company'), async (req, res) => {
  try {
    const evaluation = await Evaluation.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(evaluation);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
