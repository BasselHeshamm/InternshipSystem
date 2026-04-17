import React, { useState, useEffect } from "react";
import { Form, Nav, Button, Modal } from "react-bootstrap";
import { FaFileDownload, FaFilePdf, FaFileExcel } from "react-icons/fa";

function ReportManagement() {
  const [reports, setReports] = useState([]);
  const [filter, setFilter] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedReport, setSelectedReport] = useState(null);
  const [comment, setComment] = useState("");
  const [majorFilter, setMajorFilter] = useState("all");
  const [clarification, setClarification] = useState("");
  const [activeTab, setActiveTab] = useState("reports");
  const [showReportModal, setShowReportModal] = useState(false);
  const [reportType, setReportType] = useState("pdf");
  const [reportPeriod, setReportPeriod] = useState("current");
  const [reportTitle, setReportTitle] = useState("");

  useEffect(() => {
    setReports([
      {
        id: 1,
        studentName: "Ahmed Mohamed",
        studentId: "12345",
        major: "Computer Science",
        company: "TechCorp",
        companySupervisor: "Dr. Sarah Johnson",
        internshipStartDate: "2024-01-15",
        internshipEndDate: "2024-06-15",
        reportType: "Weekly Report",
        submissionDate: "2024-03-20",
        status: "flagged",
        flagReason: "Incomplete hours logged",
        content: "This week I worked on...",
        evaluation: {
          technicalSkills: 4.5,
          communication: 4.0,
          teamwork: 4.2,
          overall: 4.3,
          comments: "Excellent performance.",
        },
      },
      {
        id: 2,
        studentName: "Sarah Ahmed",
        studentId: "12346",
        major: "Business Administration",
        company: "DesignStudio",
        companySupervisor: "Mr. Michael Brown",
        internshipStartDate: "2024-02-01",
        internshipEndDate: "2024-07-01",
        reportType: "Final Report",
        submissionDate: "2024-03-19",
        status: "approved",
        content: "During my internship...",
        evaluation: {
          technicalSkills: 4.8,
          communication: 4.5,
          teamwork: 4.7,
          overall: 4.6,
          comments: "Outstanding contribution.",
        },
      },
      {
        id: 3,
        studentName: "Mohamed Ali",
        studentId: "12347",
        major: "Engineering",
        company: "InnovateLabs",
        companySupervisor: "Dr. Emily Chen",
        internshipStartDate: "2024-01-01",
        internshipEndDate: "2024-05-31",
        reportType: "Weekly Report",
        submissionDate: "2024-03-18",
        status: "flagged",
        flagReason: "Missing supervisor signature",
        content: "This week I completed...",
        evaluation: {
          technicalSkills: 4.0,
          communication: 3.8,
          teamwork: 4.1,
          overall: 4.0,
          comments: "Good progress.",
        },
      },
    ]);
  }, []);

  const handleStatusChange = (reportId, newStatus) => {
    setReports(
      reports.map((r) => (r.id === reportId ? { ...r, status: newStatus } : r)),
    );
    if (selectedReport?.id === reportId)
      setSelectedReport((prev) => ({ ...prev, status: newStatus }));
  };

  const filteredReports = reports.filter((r) => {
    const matchesFilter = filter === "all" || r.status === filter;
    const matchesSearch =
      r.studentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      r.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
      r.studentId.includes(searchTerm);
    const matchesMajor = majorFilter === "all" || r.major === majorFilter;
    return matchesFilter && matchesSearch && matchesMajor;
  });

  const ReportsView = () => (
    <div>
      <div className="filter-bar">
        <input
          type="text"
          className="search-input"
          placeholder="Search by student, ID, or company..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="form-group"
        >
          <option value="all">All Reports</option>
          <option value="flagged">Flagged</option>
          <option value="approved">Approved</option>
          <option value="pending">Pending</option>
          <option value="rejected">Rejected</option>
          <option value="accepted">Accepted</option>
        </select>
        <select
          value={majorFilter}
          onChange={(e) => setMajorFilter(e.target.value)}
          className="form-group"
        >
          <option value="all">All Majors</option>
          <option value="Computer Science">Computer Science</option>
          <option value="Business Administration">
            Business Administration
          </option>
          <option value="Engineering">Engineering</option>
        </select>
      </div>

      <div className="section-card" style={{ padding: 0, marginBottom: 20 }}>
        <table className="data-table">
          <thead>
            <tr>
              <th>Student</th>
              <th>ID</th>
              <th>Major</th>
              <th>Company</th>
              <th>Type</th>
              <th>Submitted</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredReports.map((r) => (
              <tr key={r.id}>
                <td style={{ fontWeight: 600 }}>{r.studentName}</td>
                <td style={{ color: "var(--gray)" }}>{r.studentId}</td>
                <td style={{ color: "var(--gray)" }}>{r.major}</td>
                <td style={{ color: "var(--gray)" }}>{r.company}</td>
                <td style={{ color: "var(--gray)" }}>{r.reportType}</td>
                <td style={{ color: "var(--gray)" }}>{r.submissionDate}</td>
                <td>
                  <span className={`status-badge status-${r.status}`}>
                    {r.status}
                  </span>
                </td>
                <td>
                  <button
                    className="btn btn-outline-primary btn-sm"
                    onClick={() => setSelectedReport(r)}
                  >
                    View
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {selectedReport && (
        <div className="section-card">
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "flex-start",
              marginBottom: 20,
            }}
          >
            <h3
              style={{
                fontFamily: "Playfair Display, serif",
                fontSize: 18,
                fontWeight: 700,
              }}
            >
              Report Details
            </h3>
            <button
              className="btn btn-secondary btn-sm"
              onClick={() => setSelectedReport(null)}
            >
              Close
            </button>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr 1fr",
              gap: 16,
              marginBottom: 20,
            }}
          >
            {[
              ["Student", selectedReport.studentName],
              ["Student ID", selectedReport.studentId],
              ["Major", selectedReport.major],
              ["Company", selectedReport.company],
              ["Supervisor", selectedReport.companySupervisor],
              ["Report Type", selectedReport.reportType],
              ["Submitted", selectedReport.submissionDate],
              [
                "Period",
                `${selectedReport.internshipStartDate} → ${selectedReport.internshipEndDate}`,
              ],
            ].map(([label, value]) => (
              <div key={label}>
                <div
                  style={{
                    fontSize: 11,
                    color: "var(--gray)",
                    textTransform: "uppercase",
                    letterSpacing: 1,
                    marginBottom: 3,
                  }}
                >
                  {label}
                </div>
                <div style={{ fontWeight: 600, fontSize: 13 }}>{value}</div>
              </div>
            ))}
          </div>

          {selectedReport.flagReason && (
            <div
              style={{
                background: "rgba(255,204,0,0.1)",
                border: "1px solid rgba(255,204,0,0.3)",
                borderRadius: 8,
                padding: "10px 14px",
                marginBottom: 16,
                fontSize: 13,
              }}
            >
              <strong>Flag Reason:</strong> {selectedReport.flagReason}
            </div>
          )}

          <div style={{ marginBottom: 16 }}>
            <div
              style={{
                fontSize: 12,
                fontWeight: 600,
                color: "var(--gray)",
                textTransform: "uppercase",
                letterSpacing: 1,
                marginBottom: 6,
              }}
            >
              Report Content
            </div>
            <div
              style={{
                fontSize: 13,
                color: "var(--text-primary)",
                lineHeight: 1.6,
              }}
            >
              {selectedReport.content}
            </div>
          </div>

          <div style={{ marginBottom: 16 }}>
            <div
              style={{
                fontSize: 12,
                fontWeight: 600,
                color: "var(--gray)",
                textTransform: "uppercase",
                letterSpacing: 1,
                marginBottom: 10,
              }}
            >
              Update Status
            </div>
            <select
              value={selectedReport.status}
              onChange={(e) =>
                handleStatusChange(selectedReport.id, e.target.value)
              }
              className="form-group"
              style={{ maxWidth: 200 }}
            >
              <option value="flagged">Flagged</option>
              <option value="rejected">Rejected</option>
              <option value="accepted">Accepted</option>
              <option value="approved">Approved</option>
              <option value="pending">Pending</option>
            </select>
          </div>

          {(selectedReport.status === "flagged" ||
            selectedReport.status === "rejected") && (
            <div style={{ marginBottom: 16 }}>
              <div
                style={{
                  fontSize: 12,
                  fontWeight: 600,
                  color: "var(--gray)",
                  textTransform: "uppercase",
                  letterSpacing: 1,
                  marginBottom: 6,
                }}
              >
                Clarification / Appeal
              </div>
              <textarea
                value={clarification}
                onChange={(e) => setClarification(e.target.value)}
                className="form-group"
                placeholder="Submit a clarification..."
                style={{ width: "100%", minHeight: 80, resize: "vertical" }}
              />
              <button
                className="btn btn-primary btn-sm"
                onClick={() => alert("Submitted (dummy)")}
              >
                Submit
              </button>
            </div>
          )}

          {selectedReport.evaluation && (
            <div>
              <div
                style={{
                  fontSize: 12,
                  fontWeight: 600,
                  color: "var(--gray)",
                  textTransform: "uppercase",
                  letterSpacing: 1,
                  marginBottom: 10,
                }}
              >
                Evaluation Scores
              </div>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(4, 1fr)",
                  gap: 10,
                }}
              >
                {[
                  ["Technical", selectedReport.evaluation.technicalSkills],
                  ["Communication", selectedReport.evaluation.communication],
                  ["Teamwork", selectedReport.evaluation.teamwork],
                  ["Overall", selectedReport.evaluation.overall],
                ].map(([label, val]) => (
                  <div
                    key={label}
                    style={{
                      background: "var(--off-white)",
                      border: "1px solid var(--border)",
                      borderRadius: 8,
                      padding: "10px 14px",
                      textAlign: "center",
                    }}
                  >
                    <div
                      style={{
                        fontSize: 11,
                        color: "var(--gray)",
                        marginBottom: 4,
                      }}
                    >
                      {label}
                    </div>
                    <div
                      style={{
                        fontSize: 20,
                        fontWeight: 700,
                        color: "var(--red)",
                      }}
                    >
                      {val}
                    </div>
                    <div style={{ fontSize: 10, color: "var(--gray)" }}>
                      / 5.0
                    </div>
                  </div>
                ))}
              </div>
              <div
                style={{ marginTop: 10, fontSize: 13, color: "var(--gray)" }}
              >
                {selectedReport.evaluation.comments}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );

  const StatisticsView = () => {
    const statusStats = {
      accepted: reports.filter((r) => r.status === "accepted").length,
      rejected: reports.filter((r) => r.status === "rejected").length,
      flagged: reports.filter((r) => r.status === "flagged").length,
      total: reports.length,
    };
    const companyRatings = reports.reduce((acc, r) => {
      if (!acc[r.company]) acc[r.company] = { total: 0, count: 0 };
      if (r.evaluation?.overall) {
        acc[r.company].total += r.evaluation.overall;
        acc[r.company].count += 1;
      }
      return acc;
    }, {});
    const topCompanies = Object.entries(companyRatings)
      .map(([c, d]) => ({ company: c, avg: d.total / d.count }))
      .sort((a, b) => b.avg - a.avg);

    return (
      <div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: 20,
          }}
        >
          <h3
            style={{
              fontFamily: "Playfair Display, serif",
              fontSize: 20,
              fontWeight: 700,
            }}
          >
            Statistics Dashboard
          </h3>
          <button
            className="btn btn-primary"
            onClick={() => setShowReportModal(true)}
          >
            <FaFileDownload /> Generate Report
          </button>
        </div>

        <div className="stats-grid">
          {[
            ["Total Reports", statusStats.total],
            ["Accepted", statusStats.accepted],
            ["Rejected", statusStats.rejected],
            ["Flagged", statusStats.flagged],
          ].map(([label, val]) => (
            <div key={label} className="stat-card">
              <h3>{label}</h3>
              <div className="number">{val}</div>
            </div>
          ))}
        </div>

        <div className="section-card" style={{ padding: 0 }}>
          <div
            style={{
              padding: "16px 20px",
              borderBottom: "1px solid var(--border)",
              fontFamily: "Playfair Display, serif",
              fontSize: 16,
              fontWeight: 700,
            }}
          >
            Top Rated Companies
          </div>
          <table className="data-table">
            <thead>
              <tr>
                <th>Company</th>
                <th>Avg Rating</th>
              </tr>
            </thead>
            <tbody>
              {topCompanies.map(({ company, avg }) => (
                <tr key={company}>
                  <td style={{ fontWeight: 500 }}>{company}</td>
                  <td style={{ color: "var(--red)", fontWeight: 600 }}>
                    ⭐ {avg.toFixed(1)}/5.0
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <Modal
          show={showReportModal}
          onHide={() => setShowReportModal(false)}
          centered
        >
          <Modal.Header closeButton>
            <Modal.Title>Generate Statistics Report</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group className="mb-3">
                <Form.Label>Report Title</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter report title"
                  value={reportTitle}
                  onChange={(e) => setReportTitle(e.target.value)}
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Period</Form.Label>
                <Form.Select
                  value={reportPeriod}
                  onChange={(e) => setReportPeriod(e.target.value)}
                >
                  <option value="current">Current Cycle</option>
                  <option value="last">Last Cycle</option>
                  <option value="year">This Year</option>
                  <option value="all">All Time</option>
                </Form.Select>
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Format</Form.Label>
                <div className="d-flex gap-3">
                  <Form.Check
                    type="radio"
                    id="pdf"
                    label={
                      <>
                        <FaFilePdf /> PDF
                      </>
                    }
                    checked={reportType === "pdf"}
                    onChange={() => setReportType("pdf")}
                  />
                  <Form.Check
                    type="radio"
                    id="excel"
                    label={
                      <>
                        <FaFileExcel /> Excel
                      </>
                    }
                    checked={reportType === "excel"}
                    onChange={() => setReportType("excel")}
                  />
                </div>
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button
              variant="secondary"
              onClick={() => setShowReportModal(false)}
            >
              Cancel
            </Button>
            <Button
              variant="primary"
              onClick={() => {
                alert(`${reportType.toUpperCase()} report generated!`);
                setShowReportModal(false);
              }}
            >
              Generate
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  };

  return (
    <div>
      <div
        style={{
          display: "flex",
          gap: 8,
          marginBottom: 20,
          borderBottom: "1px solid var(--border)",
          paddingBottom: 12,
        }}
      >
        {["reports", "statistics"].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            style={{
              padding: "8px 20px",
              border: "none",
              borderRadius: 8,
              cursor: "pointer",
              fontFamily: "DM Sans, sans-serif",
              fontSize: 13,
              fontWeight: 600,
              background: activeTab === tab ? "var(--black)" : "transparent",
              color: activeTab === tab ? "var(--white)" : "var(--gray)",
              transition: "all 0.2s",
            }}
          >
            {tab.charAt(0).toUpperCase() + tab.slice(1)}
          </button>
        ))}
      </div>
      {activeTab === "reports" ? <ReportsView /> : <StatisticsView />}
    </div>
  );
}

export default ReportManagement;
