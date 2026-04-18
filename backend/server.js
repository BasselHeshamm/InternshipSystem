const path = require("path");
require("dotenv").config({ path: path.join(__dirname, ".env") });
const express = require("express");
const cors = require("cors");
const connectMongo = require("./config/mongo");
const { connectPG } = require("./config/postgres");

const app = express();

// ── MIDDLEWARE ──
app.use(cors({ origin: "http://localhost:3000", credentials: true }));
app.use(express.json());

// ── DATABASE CONNECTIONS ──
connectMongo();
connectPG();

// ── ROUTES ──
app.use("/api/auth", require("./routes/auth"));
app.use("/api/users", require("./routes/users"));
app.use("/api/internships", require("./routes/internships"));
app.use("/api/applications", require("./routes/applications"));
app.use("/api/reports", require("./routes/reports"));
app.use("/api/workshops", require("./routes/workshops"));
app.use("/api/companies", require("./routes/companies"));
app.use("/api/evaluations", require("./routes/evaluations"));
app.use("/api/notifications", require("./routes/notifications"));

// ── HEALTH CHECK ──
app.get("/api/health", (req, res) => {
  res.json({ status: "ok", message: "GUC Internship API is running" });
});

// ── ERROR HANDLER ──
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: err.message || "Internal Server Error" });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
