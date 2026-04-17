import React, { useState } from "react";
import { Routes, Route, Link, useNavigate } from "react-router-dom";
import {
  FaFileAlt,
  FaUserGraduate,
  FaSignOutAlt,
  FaUserCircle,
  FaChartBar,
} from "react-icons/fa";
import ReportManagement from "../Components/SCAD/ReportManagement";
import NavigationButtons from "../Components/NavigationButtons";

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@600;700&family=DM+Sans:wght@300;400;500;600&display=swap');

  :root {
    --black: #1a1a1a;
    --black-mid: #2c2c2c;
    --red: #CC0000;
    --gold: #FFCC00;
    --white: #ffffff;
    --off-white: #f9f9f9;
    --gray: #6b7280;
    --border: #ebebeb;
    --sidebar-width: 240px;
  }

  .faculty-app { display: flex; min-height: 100vh; font-family: 'DM Sans', sans-serif; background: var(--off-white); }

  .faculty-sidebar {
    width: var(--sidebar-width);
    background: var(--black);
    position: fixed;
    top: 0; left: 0; bottom: 0;
    display: flex; flex-direction: column;
    z-index: 50; overflow-y: auto;
  }

  .faculty-sidebar::before {
    content: '';
    display: block; height: 5px;
    background: linear-gradient(90deg, var(--black-mid) 33.3%, var(--red) 33.3%, var(--red) 66.6%, var(--gold) 66.6%);
  }

  .faculty-logo {
    display: flex; align-items: center; justify-content: center;
    padding: 24px 20px 14px;
  }

  .faculty-logo img { width: 50px; height: 50px; object-fit: contain; filter: brightness(0) invert(1); opacity: 0.85; }

  .faculty-user { padding: 0 20px 18px; border-bottom: 1px solid rgba(255,255,255,0.07); }

  .faculty-user-name {
    font-family: 'Playfair Display', serif;
    font-size: 15px; font-weight: 600; color: var(--white); margin-bottom: 3px;
  }

  .faculty-user-role {
    font-size: 11px; color: var(--gold);
    font-weight: 500; letter-spacing: 1px; text-transform: uppercase;
  }

  .faculty-nav { flex: 1; padding: 12px 0; display: flex; flex-direction: column; gap: 2px; }

  .faculty-nav-label {
    font-size: 10px; font-weight: 600; letter-spacing: 2px;
    text-transform: uppercase; color: rgba(255,255,255,0.25);
    padding: 10px 20px 4px;
  }

  .faculty-nav-link {
    display: flex; align-items: center; gap: 10px;
    padding: 9px 20px; font-size: 13px; font-weight: 400;
    color: rgba(255,255,255,0.55); text-decoration: none;
    transition: all 0.2s; border-left: 3px solid transparent; cursor: pointer;
    background: transparent; border-top: none; border-right: none; border-bottom: none;
    width: 100%; text-align: left; font-family: 'DM Sans', sans-serif;
  }

  .faculty-nav-link:hover { color: var(--white); background: rgba(255,255,255,0.05); border-left-color: rgba(255,204,0,0.4); }
  .faculty-nav-link.active { color: var(--white); background: rgba(204,0,0,0.15); border-left-color: var(--red); font-weight: 500; }

  .faculty-main { margin-left: var(--sidebar-width); flex: 1; min-height: 100vh; }

  .faculty-topbar {
    background: var(--white); border-bottom: 1px solid var(--border);
    padding: 16px 28px; display: flex; align-items: center;
    justify-content: space-between; position: sticky; top: 0; z-index: 40;
  }

  .faculty-topbar-title {
    font-family: 'Playfair Display', serif;
    font-size: 20px; font-weight: 700; color: var(--black);
  }

  .faculty-content { padding: 24px 28px; }

  /* Inherit SCAD styles for sub-components */
  .faculty-content .data-table { width: 100%; border-collapse: collapse; font-size: 13px; }
  .faculty-content .data-table thead { background: var(--off-white); }
  .faculty-content .data-table th { padding: 10px 14px; text-align: left; font-size: 11px; font-weight: 600; letter-spacing: 0.5px; text-transform: uppercase; color: var(--gray); border-bottom: 1px solid var(--border); }
  .faculty-content .data-table td { padding: 12px 14px; border-bottom: 1px solid var(--border); color: var(--black); vertical-align: middle; }
  .faculty-content .data-table tbody tr:last-child td { border-bottom: none; }
  .faculty-content .data-table tbody tr:hover td { background: var(--off-white); }

  .faculty-content .filter-bar { display: flex; gap: 12px; margin-bottom: 16px; flex-wrap: wrap; }
  .faculty-content .search-input, .faculty-content .form-group { padding: 10px 14px; border: 1.5px solid #e5e7eb; border-radius: 8px; font-family: 'DM Sans', sans-serif; font-size: 13px; color: var(--black); background: var(--off-white); outline: none; transition: all 0.2s; }
  .faculty-content .search-input { min-width: 220px; }
  .faculty-content .form-group { min-width: 160px; }
  .faculty-content .search-input:focus, .faculty-content .form-group:focus { border-color: var(--red); background: var(--white); box-shadow: 0 0 0 3px rgba(204,0,0,0.06); }

  .faculty-content .status-badge { display: inline-block; padding: 3px 10px; border-radius: 6px; font-size: 11px; font-weight: 600; text-transform: capitalize; }
  .faculty-content .status-pending   { background: rgba(255,204,0,0.15); color: #854d0e; }
  .faculty-content .status-approved  { background: rgba(22,163,74,0.12); color: #15803d; }
  .faculty-content .status-rejected  { background: rgba(220,38,38,0.1);  color: #b91c1c; }
  .faculty-content .status-flagged   { background: rgba(234,179,8,0.15); color: #854d0e; }
  .faculty-content .status-accepted  { background: rgba(8,145,178,0.1);  color: #0e7490; }

  .faculty-content .btn, .faculty-content .btn-primary, .faculty-content .btn-secondary, .faculty-content .btn-danger, .faculty-content .btn-outline-primary {
    display: inline-flex; align-items: center; gap: 6px;
    padding: 8px 16px; border: none; border-radius: 8px;
    font-family: 'DM Sans', sans-serif; font-size: 13px; font-weight: 600;
    cursor: pointer; transition: all 0.2s; text-decoration: none;
    margin-right: 6px; margin-bottom: 4px;
  }
  .faculty-content .btn-primary { background: var(--black); color: var(--white); }
  .faculty-content .btn-primary:hover { background: var(--red); transform: translateY(-1px); }
  .faculty-content .btn-secondary { background: var(--gray); color: var(--white); }
  .faculty-content .btn-danger { background: #dc2626; color: var(--white); }
  .faculty-content .btn-outline-primary { background: transparent; border: 1.5px solid var(--black); color: var(--black); }
  .faculty-content .btn-outline-primary:hover { background: var(--black); color: var(--white); }
  .faculty-content .btn-sm { padding: 5px 10px; font-size: 12px; }

  .faculty-content .section-card { background: var(--white); border: 1px solid var(--border); border-radius: 12px; padding: 20px 24px; margin-bottom: 20px; }
  .faculty-content .stat-card { background: var(--white); border: 1px solid var(--border); border-radius: 12px; padding: 20px; margin-bottom: 16px; }
  .faculty-content .stat-card h3 { font-size: 12px !important; font-weight: 600 !important; text-transform: uppercase; letter-spacing: 0.5px; color: var(--gray) !important; margin-bottom: 8px !important; font-family: 'DM Sans', sans-serif !important; }
  .faculty-content .stat-card .number { font-family: 'Playfair Display', serif; font-size: 32px; font-weight: 700; color: var(--black); }
  .faculty-content .stats-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(200px, 1fr)); gap: 16px; margin-bottom: 24px; }

  .faculty-content .modal-content { border-radius: 16px !important; border: none !important; }
  .faculty-content .modal-title { font-family: 'Playfair Display', serif !important; font-size: 18px !important; color: var(--black) !important; }

  @media (max-width: 768px) {
    .faculty-sidebar { transform: translateX(-100%); }
    .faculty-main { margin-left: 0; }
    .faculty-content { padding: 16px; }
  }
`;

const NAV_ITEMS = [
  { key: "reports", label: "Report Management", icon: <FaFileAlt /> },
  { key: "students", label: "My Students", icon: <FaUserGraduate /> },
  { key: "statistics", label: "Statistics", icon: <FaChartBar /> },
];

function FacultyDashboard() {
  const [activeTab, setActiveTab] = useState("reports");
  const navigate = useNavigate();

  const tabLabel =
    NAV_ITEMS.find((t) => t.key === activeTab)?.label || "Dashboard";

  return (
    <>
      <style>{styles}</style>
      <div className="faculty-app">
        {/* SIDEBAR */}
        <aside className="faculty-sidebar">
          <div className="faculty-logo">
            <img src="/guc-logo.png" alt="GUC" />
          </div>
          <div className="faculty-user">
            <div className="faculty-user-name">Faculty Portal</div>
            <div className="faculty-user-role">Faculty Member</div>
          </div>
          <nav className="faculty-nav">
            <div className="faculty-nav-label">Navigation</div>
            {NAV_ITEMS.map((item) => (
              <button
                key={item.key}
                className={`faculty-nav-link ${activeTab === item.key ? "active" : ""}`}
                onClick={() => setActiveTab(item.key)}
              >
                {item.icon} {item.label}
              </button>
            ))}
            <div className="faculty-nav-label">Quick Links</div>
            <Link to="/" className="faculty-nav-link">
              🏠 Home
            </Link>
            <button className="faculty-nav-link" onClick={() => navigate("/")}>
              <FaSignOutAlt /> Logout
            </button>
          </nav>
        </aside>

        {/* MAIN */}
        <main className="faculty-main">
          <div className="faculty-topbar">
            <div className="faculty-topbar-title">{tabLabel}</div>
            <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
              <NavigationButtons />
              <div
                style={{
                  width: 36,
                  height: 36,
                  borderRadius: "50%",
                  background: "var(--black)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "var(--white)",
                  fontSize: 16,
                }}
              >
                <FaUserCircle />
              </div>
            </div>
          </div>

          <div className="faculty-content">
            {activeTab === "reports" && <ReportManagement />}

            {activeTab === "students" && (
              <div className="section-card">
                <h3
                  style={{
                    fontFamily: "Playfair Display, serif",
                    fontSize: 18,
                    fontWeight: 700,
                    marginBottom: 16,
                  }}
                >
                  My Students
                </h3>
                <table className="data-table">
                  <thead>
                    <tr>
                      <th>Name</th>
                      <th>ID</th>
                      <th>Major</th>
                      <th>Company</th>
                      <th>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      {
                        name: "Ahmed Mohamed",
                        id: "12345",
                        major: "Computer Science",
                        company: "TechCorp",
                        status: "flagged",
                      },
                      {
                        name: "Sarah Ahmed",
                        id: "12346",
                        major: "Business Admin",
                        company: "DesignStudio",
                        status: "approved",
                      },
                      {
                        name: "Mohamed Ali",
                        id: "12347",
                        major: "Engineering",
                        company: "InnovateLabs",
                        status: "pending",
                      },
                    ].map((s) => (
                      <tr key={s.id}>
                        <td style={{ fontWeight: 600 }}>{s.name}</td>
                        <td style={{ color: "var(--gray)" }}>{s.id}</td>
                        <td style={{ color: "var(--gray)" }}>{s.major}</td>
                        <td style={{ color: "var(--gray)" }}>{s.company}</td>
                        <td>
                          <span className={`status-badge status-${s.status}`}>
                            {s.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            {activeTab === "statistics" && (
              <div className="stats-grid">
                {[
                  { label: "Assigned Students", value: 3 },
                  { label: "Reports Reviewed", value: 2 },
                  { label: "Pending Reviews", value: 1 },
                  { label: "Avg. Report Score", value: "4.3" },
                ].map((s) => (
                  <div key={s.label} className="stat-card">
                    <h3>{s.label}</h3>
                    <div className="number">{s.value}</div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </main>
      </div>
    </>
  );
}

export default FacultyDashboard;
