import React, { useState, useEffect } from "react";

function DashboardStats() {
  const [stats, setStats] = useState({
    pendingReports: 0,
    approvedReports: 0,
    registeredCompanies: 0,
    activeStudents: 0,
    pendingApplications: 0,
    upcomingWorkshops: 0,
  });
  const [topCompanies] = useState([
    { name: "TechCorp", count: 12 },
    { name: "Designify", count: 9 },
  ]);
  const [mostUsedCourses] = useState([
    { name: "Web Development", count: 15 },
    { name: "UI/UX Design", count: 10 },
  ]);
  const [flagged] = useState(7);
  const [rejected] = useState(5);
  const [accepted] = useState(45);

  useEffect(() => {
    setStats({
      pendingReports: 15,
      approvedReports: 45,
      registeredCompanies: 28,
      activeStudents: 156,
      pendingApplications: 23,
      upcomingWorkshops: 3,
    });
  }, []);

  const statItems = [
    { label: "Pending Reports", value: stats.pendingReports },
    { label: "Approved Reports", value: stats.approvedReports },
    { label: "Registered Companies", value: stats.registeredCompanies },
    { label: "Active Students", value: stats.activeStudents },
    { label: "Pending Applications", value: stats.pendingApplications },
    { label: "Upcoming Workshops", value: stats.upcomingWorkshops },
    { label: "Accepted Reports", value: accepted },
    { label: "Rejected Reports", value: rejected },
    { label: "Flagged Reports", value: flagged },
  ];

  return (
    <div>
      <div className="stats-grid">
        {statItems.map((s) => (
          <div key={s.label} className="stat-card">
            <h3>{s.label}</h3>
            <div className="number">{s.value}</div>
          </div>
        ))}
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: 16,
          marginBottom: 24,
        }}
      >
        <div className="stat-card">
          <h3>Top Companies by Internship Count</h3>
          <ul style={{ listStyle: "none", marginTop: 10 }}>
            {topCompanies.map((c) => (
              <li
                key={c.name}
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  padding: "6px 0",
                  borderBottom: "1px solid var(--border)",
                  fontSize: 13,
                }}
              >
                <span style={{ fontWeight: 500 }}>{c.name}</span>
                <span style={{ color: "var(--red)", fontWeight: 600 }}>
                  {c.count} internships
                </span>
              </li>
            ))}
          </ul>
        </div>
        <div className="stat-card">
          <h3>Most Used Courses</h3>
          <ul style={{ listStyle: "none", marginTop: 10 }}>
            {mostUsedCourses.map((c) => (
              <li
                key={c.name}
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  padding: "6px 0",
                  borderBottom: "1px solid var(--border)",
                  fontSize: 13,
                }}
              >
                <span style={{ fontWeight: 500 }}>{c.name}</span>
                <span style={{ color: "var(--red)", fontWeight: 600 }}>
                  {c.count} students
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <button
        className="btn btn-primary"
        onClick={() => alert("Report generated (dummy)")}
      >
        Generate Report
      </button>

      <div className="recent-activity" style={{ marginTop: 24 }}>
        <h2>Recent Activity</h2>
        <div className="section-card" style={{ padding: 0 }}>
          <table className="data-table">
            <thead>
              <tr>
                <th>Date</th>
                <th>Activity</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>2024-03-20</td>
                <td>New company registration: TechCorp</td>
                <td>
                  <span className="status-badge status-pending">Pending</span>
                </td>
              </tr>
              <tr>
                <td>2024-03-19</td>
                <td>Workshop scheduled: Resume Building</td>
                <td>
                  <span className="status-badge status-approved">Approved</span>
                </td>
              </tr>
              <tr>
                <td>2024-03-18</td>
                <td>Report submitted: Student ID 12345</td>
                <td>
                  <span className="status-badge status-pending">Pending</span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default DashboardStats;
