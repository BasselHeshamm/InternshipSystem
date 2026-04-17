import React, { useState } from "react";
import { Routes, Route, Link, useNavigate } from "react-router-dom";
import "./SCADDashboard.css";
import {
  FaTachometerAlt,
  FaBuilding,
  FaUserGraduate,
  FaFileAlt,
  FaChalkboardTeacher,
  FaCog,
  FaUserCircle,
  FaVideo,
  FaSignOutAlt,
  FaGraduationCap,
} from "react-icons/fa";
import { Container } from "react-bootstrap";
import NavigationButtons from "../Components/NavigationButtons";

import DashboardStats from "../Components/SCAD/DashboardStats";
import CompanyManagement from "../Components/SCAD/CompanyManagement";
import StudentManagement from "../Components/SCAD/StudentManagement";
import ReportManagement from "../Components/SCAD/ReportManagement";
import WorkshopManagement from "../Components/SCAD/WorkshopManagement";
import Settings from "../Components/SCAD/Settings";
import VideoCallManagement from "../Components/SCAD/VideoCallManagement";

const NAV_ITEMS = [
  { key: "dashboard", label: "Dashboard", icon: <FaTachometerAlt /> },
  { key: "companies", label: "Companies", icon: <FaBuilding /> },
  { key: "students", label: "Students", icon: <FaUserGraduate /> },
  { key: "reports", label: "Reports", icon: <FaFileAlt /> },
  { key: "workshops", label: "Workshops", icon: <FaChalkboardTeacher /> },
  { key: "appointments", label: "Appointments", icon: <FaVideo /> },
  { key: "settings", label: "Settings", icon: <FaCog /> },
];

const SECTION_LABELS = {
  dashboard: "Dashboard Overview",
  companies: "Company Management",
  students: "Student Management",
  reports: "Report Management",
  workshops: "Workshop Management",
  appointments: "Appointments & Video Calls",
  settings: "Settings",
};

function SCADDashboard() {
  const [activeTab, setActiveTab] = useState("dashboard");
  const navigate = useNavigate();

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    navigate(`/scad-dashboard/${tab}`);
  };

  return (
    <div className="scad-dashboard">
      {/* ── SIDEBAR ── */}
      <aside className="scad-sidebar">
        <div className="scad-logo">
          <img src="/guc-logo.png" alt="GUC" />
        </div>
        <h2>SCAD Office</h2>
        <nav>
          <Link to="/" className="sidebar-link">
            🏠 Home
          </Link>
          {NAV_ITEMS.map((item) => (
            <button
              key={item.key}
              className={activeTab === item.key ? "active" : ""}
              onClick={() => handleTabChange(item.key)}
            >
              {item.icon} {item.label}
            </button>
          ))}
          <button style={{ marginTop: "auto" }} onClick={() => navigate("/")}>
            <FaSignOutAlt /> Logout
          </button>
        </nav>
      </aside>

      {/* ── MAIN ── */}
      <div className="scad-content">
        <div className="scad-header">
          <div className="scad-title">
            {SECTION_LABELS[activeTab] || "SCAD Dashboard"}
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <NavigationButtons />
            <div className="scad-avatar">
              <FaUserCircle />
            </div>
          </div>
        </div>

        <div className="scad-page">
          {activeTab === "dashboard" && <DashboardStats />}
          {activeTab === "companies" && <CompanyManagement />}
          {activeTab === "students" && <StudentManagement />}
          {activeTab === "reports" && <ReportManagement />}
          {activeTab === "workshops" && <WorkshopManagement />}
          {activeTab === "appointments" && <VideoCallManagement />}
          {activeTab === "settings" && <Settings />}
        </div>
      </div>
    </div>
  );
}

export default SCADDashboard;
