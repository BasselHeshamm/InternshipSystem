const router = require("express").Router();
const Notification = require("./Notification");
const { auth } = require("../middleware/auth");

// GET /api/notifications
router.get("/", auth, async (req, res) => {
  try {
    const notifications = await Notification.find({ userId: req.user.id }).sort(
      { createdAt: -1 },
    );
    res.json(notifications);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// PUT /api/notifications/:id/read
router.put("/:id/read", auth, async (req, res) => {
  try {
    await Notification.findByIdAndUpdate(req.params.id, { read: true });
    res.json({ message: "Marked as read" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST /api/notifications — internal use
router.post("/", auth, async (req, res) => {
  try {
    const notification = new Notification(req.body);
    await notification.save();
    res.status(201).json(notification);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
