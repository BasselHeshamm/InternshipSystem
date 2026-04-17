import React, { useState } from "react";
import {
  Card,
  Button,
  Form,
  Row,
  Col,
  InputGroup,
  Table,
  Badge,
  Modal,
  Container,
} from "react-bootstrap";
import {
  FaBell,
  FaFilePdf,
  FaCertificate,
  FaStar,
  FaCheck,
  FaPlus,
  FaTrash,
  FaEye,
  FaBriefcase,
  FaUsers,
  FaClipboardList,
  FaChartBar,
} from "react-icons/fa";
import { Link } from "react-router-dom";
import NavigationButtons from "../Components/NavigationButtons";

// ── DATA ──
const initialInternships = [
  {
    id: 1,
    title: "Frontend Developer",
    duration: "3 months",
    paid: true,
    salary: "5000 EGP",
    skills: "React, CSS",
    description:
      "Work on frontend development projects using React and modern CSS.",
    status: "open",
  },
  {
    id: 2,
    title: "Backend Developer",
    duration: "4 months",
    paid: true,
    salary: "6000 EGP",
    skills: "Node.js, MongoDB",
    description: "Work on backend development with Node.js and MongoDB.",
    status: "open",
  },
];

const initialApplications = [
  {
    id: 1,
    applicant: "Ahmed Ali",
    internshipId: 1,
    internship: "Frontend Developer",
    status: "Pending",
    email: "ahmed@example.com",
    documents: {
      cv: { name: "Ahmed_Ali_CV.pdf", url: "#" },
      coverLetter: { name: "Ahmed_Ali_CoverLetter.pdf", url: "#" },
      certificates: [{ name: "React_Certification.pdf", url: "#" }],
    },
    assessments: [{ id: 1, title: "Career Skills", score: 85, posted: true }],
    details:
      "I am passionate about frontend development and have 2 years of experience.",
  },
  {
    id: 2,
    applicant: "Sara Youssef",
    internshipId: 1,
    internship: "Frontend Developer",
    status: "Accepted",
    email: "sara@example.com",
    documents: {
      cv: { name: "Sara_Youssef_CV.pdf", url: "#" },
      coverLetter: null,
      certificates: [{ name: "JavaScript_Certification.pdf", url: "#" }],
    },
    assessments: [{ id: 1, title: "Career Skills", score: 90, posted: true }],
    details:
      "I have extensive experience in React and modern frontend frameworks.",
  },
  {
    id: 3,
    applicant: "Omar Said",
    internshipId: 2,
    internship: "Backend Developer",
    status: "Pending",
    email: "omar@example.com",
    documents: {
      cv: { name: "Omar_Said_CV.pdf", url: "#" },
      coverLetter: { name: "Omar_Said_CoverLetter.pdf", url: "#" },
      certificates: [],
    },
    assessments: [{ id: 1, title: "Career Skills", score: 88, posted: true }],
    details: "I specialize in backend development with Node.js and MongoDB.",
  },
];

const initialInterns = [
  {
    id: 1,
    name: "Sara Youssef",
    internship: "Frontend Developer",
    status: "current",
    jobTitle: "Frontend Intern",
  },
  {
    id: 2,
    name: "Omar Said",
    internship: "Backend Developer",
    status: "complete",
    jobTitle: "Backend Intern",
  },
];

const initialEvaluations = [
  {
    id: 1,
    internId: 2,
    internName: "Omar Said",
    internship: "Backend Developer",
    evaluation: "Great work! Highly skilled.",
    completionDate: "2024-03-15",
    performance: 4.5,
    attendance: 4.0,
    teamwork: 4.5,
    technicalSkills: 4.0,
    communication: 4.5,
    overallRating: 4.3,
    strengths: ["Problem solving", "Technical knowledge"],
    areasForImprovement: ["Documentation"],
    recommendation: "Highly recommended",
  },
];

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@600;700&family=DM+Sans:wght@300;400;500;600&display=swap');

  :root {
    --black: #1a1a1a;
    --black-mid: #2c2c2c;
    --red: #CC0000;
    --red-light: #e63333;
    --red-pale: rgba(204,0,0,0.08);
    --gold: #FFCC00;
    --gold-pale: rgba(255,204,0,0.1);
    --white: #ffffff;
    --off-white: #f9f9f9;
    --gray: #6b7280;
    --light-gray: #e5e7eb;
    --border: #ebebeb;
    --shadow-sm: 0 1px 3px rgba(0,0,0,0.06);
    --shadow-md: 0 4px 12px rgba(0,0,0,0.08);
    --sidebar-width: 240px;
  }

  * { box-sizing: border-box; }

  .co-app { display: flex; min-height: 100vh; font-family: 'DM Sans', sans-serif; background: var(--off-white); }

  /* SIDEBAR */
  .co-sidebar {
    width: var(--sidebar-width);
    background: var(--black);
    position: fixed;
    top: 0; left: 0; bottom: 0;
    display: flex; flex-direction: column;
    z-index: 50; overflow-y: auto;
  }

  .co-sidebar::before {
    content: '';
    display: block; height: 5px;
    background: linear-gradient(90deg, var(--black-mid) 33.3%, var(--red) 33.3%, var(--red) 66.6%, var(--gold) 66.6%);
  }

  .co-sidebar-logo {
    display: flex; align-items: center; justify-content: center;
    padding: 24px 20px 16px;
  }

  .co-sidebar-logo img { width: 48px; height: 48px; object-fit: contain; filter: brightness(0) invert(1); opacity: 0.85; }

  .co-sidebar-user { padding: 0 20px 20px; border-bottom: 1px solid rgba(255,255,255,0.07); }

  .co-sidebar-name {
    font-family: 'Playfair Display', serif;
    font-size: 15px; font-weight: 600;
    color: var(--white); margin-bottom: 4px;
  }

  .co-sidebar-role {
    font-size: 11px; color: var(--gold);
    font-weight: 500; letter-spacing: 1px; text-transform: uppercase;
  }

  .co-nav { flex: 1; padding: 16px 0; }

  .co-nav-group-title {
    font-size: 10px; font-weight: 600; letter-spacing: 2px;
    text-transform: uppercase; color: rgba(255,255,255,0.25);
    padding: 12px 20px 6px;
  }

  .co-nav-link {
    display: flex; align-items: center; gap: 10px;
    padding: 9px 20px; font-size: 13px; font-weight: 400;
    color: rgba(255,255,255,0.55); text-decoration: none;
    transition: all 0.2s; border-left: 3px solid transparent; cursor: pointer;
  }

  .co-nav-link:hover { color: var(--white); background: rgba(255,255,255,0.05); border-left-color: rgba(255,204,0,0.4); }
  .co-nav-link.active { color: var(--white); background: rgba(204,0,0,0.15); border-left-color: var(--red); font-weight: 500; }

  /* MAIN */
  .co-main { margin-left: var(--sidebar-width); flex: 1; min-height: 100vh; }

  .co-topbar {
    background: var(--white); border-bottom: 1px solid var(--border);
    padding: 16px 28px; display: flex; align-items: center;
    justify-content: space-between; position: sticky; top: 0; z-index: 40;
  }

  .co-topbar-title {
    font-family: 'Playfair Display', serif;
    font-size: 20px; font-weight: 700; color: var(--black);
  }

  .co-topbar-actions { display: flex; align-items: center; gap: 12px; position: relative; }

  .co-bell-btn {
    position: relative; background: var(--off-white);
    border: 1px solid var(--border); border-radius: 8px;
    padding: 8px 10px; cursor: pointer; transition: all 0.2s;
  }

  .co-bell-btn:hover { border-color: var(--red); }

  .co-bell-dot {
    position: absolute; top: 4px; right: 4px;
    width: 8px; height: 8px; border-radius: 50%;
    background: var(--red); border: 2px solid var(--white);
  }

  .co-notif-dropdown {
    position: absolute; top: 44px; right: 0;
    width: 300px; background: var(--white);
    border: 1px solid var(--border); border-radius: 12px;
    box-shadow: var(--shadow-md); z-index: 100;
    overflow: hidden;
  }

  .co-notif-header {
    padding: 14px 16px; border-bottom: 1px solid var(--border);
    font-family: 'Playfair Display', serif; font-size: 14px; font-weight: 600; color: var(--black);
  }

  .co-notif-item { padding: 12px 16px; border-bottom: 1px solid var(--border); font-size: 13px; }
  .co-notif-item:last-child { border-bottom: none; }
  .co-notif-time { font-size: 11px; color: var(--gray); margin-top: 3px; }

  .co-content { padding: 24px 28px; }

  /* STAT CARDS */
  .co-stats { display: grid; grid-template-columns: repeat(4, 1fr); gap: 16px; margin-bottom: 24px; }

  .co-stat {
    background: var(--white); border: 1px solid var(--border);
    border-radius: 12px; padding: 18px 20px;
    display: flex; align-items: center; gap: 14px;
    transition: all 0.25s;
  }

  .co-stat:hover { border-color: var(--red); box-shadow: var(--shadow-md); transform: translateY(-2px); }

  .co-stat-icon {
    width: 42px; height: 42px; border-radius: 10px;
    background: var(--red-pale); display: flex;
    align-items: center; justify-content: center;
    font-size: 17px; color: var(--red); flex-shrink: 0;
  }

  .co-stat-val { font-family: 'Playfair Display', serif; font-size: 22px; font-weight: 700; color: var(--black); line-height: 1; }
  .co-stat-lbl { font-size: 11px; color: var(--gray); text-transform: uppercase; letter-spacing: 0.5px; margin-top: 2px; }

  /* CARDS */
  .co-card {
    background: var(--white); border: 1px solid var(--border);
    border-radius: 12px; box-shadow: var(--shadow-sm);
    margin-bottom: 20px; overflow: hidden;
  }

  .co-card-header {
    padding: 16px 20px; border-bottom: 1px solid var(--border);
    display: flex; align-items: center; justify-content: space-between;
  }

  .co-card-title {
    font-family: 'Playfair Display', serif;
    font-size: 16px; font-weight: 700; color: var(--black);
  }

  .co-card-body { padding: 20px; }

  /* FORM */
  .co-form-label {
    font-size: 11px; font-weight: 600; letter-spacing: 0.5px;
    text-transform: uppercase; color: var(--black); margin-bottom: 6px; display: block;
  }

  .co-input {
    width: 100%; padding: 10px 14px;
    border: 1.5px solid var(--light-gray); border-radius: 8px;
    font-family: 'DM Sans', sans-serif; font-size: 13px;
    color: var(--black); background: var(--off-white);
    transition: all 0.2s; outline: none;
  }

  .co-input:focus { border-color: var(--red); background: var(--white); box-shadow: 0 0 0 3px rgba(204,0,0,0.06); }
  .co-input::placeholder { color: #adb5bd; }

  /* BUTTONS */
  .co-btn {
    display: inline-flex; align-items: center; gap: 6px;
    padding: 9px 18px; border: none; border-radius: 8px;
    font-family: 'DM Sans', sans-serif; font-size: 13px; font-weight: 600;
    cursor: pointer; transition: all 0.2s;
  }

  .co-btn-primary { background: var(--black); color: var(--white); }
  .co-btn-primary:hover { background: var(--red); transform: translateY(-1px); box-shadow: 0 4px 12px rgba(204,0,0,0.25); }

  .co-btn-danger { background: #dc2626; color: var(--white); }
  .co-btn-danger:hover { background: #b91c1c; }

  .co-btn-outline { background: transparent; border: 1.5px solid var(--light-gray); color: var(--gray); }
  .co-btn-outline:hover { border-color: var(--black); color: var(--black); }

  .co-btn-sm { padding: 6px 12px; font-size: 12px; }

  /* TABLE */
  .co-table { width: 100%; border-collapse: collapse; font-size: 13px; }
  .co-table th { padding: 10px 14px; background: var(--off-white); font-size: 11px; font-weight: 600; letter-spacing: 0.5px; text-transform: uppercase; color: var(--gray); border-bottom: 1px solid var(--border); text-align: left; }
  .co-table td { padding: 12px 14px; border-bottom: 1px solid var(--border); color: var(--black); vertical-align: middle; }
  .co-table tr:last-child td { border-bottom: none; }
  .co-table tr:hover td { background: var(--off-white); }

  /* BADGE */
  .co-badge { display: inline-block; padding: 3px 10px; border-radius: 6px; font-size: 11px; font-weight: 600; }
  .co-badge-pending { background: rgba(255,204,0,0.15); color: #854d0e; }
  .co-badge-accepted { background: rgba(22,163,74,0.12); color: #15803d; }
  .co-badge-rejected { background: rgba(220,38,38,0.1); color: #b91c1c; }
  .co-badge-info { background: rgba(8,145,178,0.1); color: #0e7490; }
  .co-badge-open { background: rgba(22,163,74,0.12); color: #15803d; }
  .co-badge-closed { background: rgba(107,114,128,0.12); color: #4b5563; }
  .co-badge-current { background: rgba(204,0,0,0.1); color: var(--red); }
  .co-badge-complete { background: rgba(22,163,74,0.12); color: #15803d; }

  /* INTERNSHIP CARD GRID */
  .co-internship-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(280px, 1fr)); gap: 16px; }

  .co-internship-card {
    background: var(--white); border: 1px solid var(--border);
    border-radius: 12px; padding: 18px; transition: all 0.25s;
    position: relative;
  }

  .co-internship-card:hover { border-color: var(--red); box-shadow: var(--shadow-md); transform: translateY(-2px); }

  .co-internship-card::before {
    content: ''; position: absolute; top: 0; left: 0; right: 0; height: 3px;
    background: linear-gradient(90deg, var(--red), var(--gold));
    border-radius: 12px 12px 0 0; opacity: 0; transition: opacity 0.25s;
  }

  .co-internship-card:hover::before { opacity: 1; }

  .co-internship-title { font-weight: 700; font-size: 15px; color: var(--black); margin-bottom: 4px; }
  .co-internship-sub { font-size: 12px; color: var(--gray); margin-bottom: 12px; }
  .co-internship-meta { font-size: 12px; color: var(--gray); margin-bottom: 4px; }

  /* MODAL */
  .co-modal-overlay {
    position: fixed; inset: 0;
    background: rgba(0,0,0,0.45); display: flex;
    align-items: center; justify-content: center; z-index: 200;
  }

  .co-modal {
    background: var(--white); border-radius: 16px;
    box-shadow: 0 20px 60px rgba(0,0,0,0.15);
    width: 90%; max-width: 600px;
    max-height: 85vh; overflow-y: auto;
    animation: modalIn 0.25s ease-out;
  }

  @keyframes modalIn { from { opacity: 0; transform: scale(0.97) translateY(10px); } to { opacity: 1; transform: scale(1) translateY(0); } }

  .co-modal-header {
    padding: 20px 24px; border-bottom: 1px solid var(--border);
    display: flex; align-items: center; justify-content: space-between;
    position: sticky; top: 0; background: var(--white); z-index: 1;
  }

  .co-modal-title { font-family: 'Playfair Display', serif; font-size: 18px; font-weight: 700; color: var(--black); }

  .co-modal-close {
    background: none; border: none; font-size: 20px;
    color: var(--gray); cursor: pointer; padding: 0 4px; line-height: 1;
  }

  .co-modal-close:hover { color: var(--red); }

  .co-modal-body { padding: 20px 24px; }
  .co-modal-footer { padding: 16px 24px; border-top: 1px solid var(--border); display: flex; justify-content: flex-end; gap: 10px; }

  /* SEARCH ROW */
  .co-search-row { display: flex; gap: 12px; margin-bottom: 16px; flex-wrap: wrap; }
  .co-search-row .co-input { max-width: 260px; }

  /* RATING INPUT */
  .co-rating-group { display: grid; grid-template-columns: repeat(3, 1fr); gap: 14px; margin-bottom: 16px; }

  @media (max-width: 900px) {
    .co-sidebar { transform: translateX(-100%); }
    .co-main { margin-left: 0; }
    .co-stats { grid-template-columns: repeat(2, 1fr); }
    .co-content { padding: 20px 16px; }
  }

  @media (max-width: 600px) {
    .co-stats { grid-template-columns: 1fr; }
  }
`;

const TABS = [
  { key: "overview", label: "Overview", icon: <FaChartBar /> },
  { key: "posts", label: "Internship Posts", icon: <FaBriefcase /> },
  { key: "applications", label: "Applications", icon: <FaClipboardList /> },
  { key: "interns", label: "Interns", icon: <FaUsers /> },
];

function getBadgeClass(status) {
  switch (status) {
    case "Pending":
      return "co-badge co-badge-pending";
    case "Accepted":
      return "co-badge co-badge-accepted";
    case "Rejected":
      return "co-badge co-badge-rejected";
    case "open":
      return "co-badge co-badge-open";
    case "closed":
      return "co-badge co-badge-closed";
    case "current":
      return "co-badge co-badge-current";
    case "complete":
      return "co-badge co-badge-complete";
    default:
      return "co-badge co-badge-info";
  }
}

function CompanyDashboard({ isSCADOffice = false }) {
  const [activeTab, setActiveTab] = useState("overview");
  const [internships, setInternships] = useState(initialInternships);
  const [form, setForm] = useState({
    title: "",
    duration: "",
    paid: false,
    salary: "",
    skills: "",
    description: "",
  });
  const [applications, setApplications] = useState(initialApplications);
  const [appFilter, setAppFilter] = useState("All");
  const [searchApp, setSearchApp] = useState("");
  const [evaluations, setEvaluations] = useState(initialEvaluations);
  const [showNotifications, setShowNotifications] = useState(false);
  const [postSearch, setPostSearch] = useState("");
  const [postFilter, setPostFilter] = useState("all");
  const [selectedPost, setSelectedPost] = useState(null);
  const [selectedApp, setSelectedApp] = useState(null);
  const [interns, setInterns] = useState(initialInterns);
  const [internSearch, setInternSearch] = useState("");
  const [internFilter, setInternFilter] = useState("all");
  const [showEvaluationModal, setShowEvaluationModal] = useState(false);
  const [selectedInternForEval, setSelectedInternForEval] = useState(null);
  const [evaluationForm, setEvaluationForm] = useState({
    performance: 0,
    attendance: 0,
    teamwork: 0,
    technicalSkills: 0,
    communication: 0,
    evaluation: "",
    strengths: "",
    areasForImprovement: "",
    recommendation: "",
  });

  const notificationItems = [
    {
      id: 1,
      message: "New application received for Frontend Developer.",
      time: "2 hours ago",
    },
    {
      id: 2,
      message: "Internship post approved by SCAD Office.",
      time: "1 day ago",
    },
    {
      id: 3,
      message: "Application status updated: Accepted",
      time: "3 days ago",
    },
  ];

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm({ ...form, [name]: type === "checkbox" ? checked : value });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    setInternships([
      ...internships,
      { ...form, id: Date.now(), status: "open" },
    ]);
    setForm({
      title: "",
      duration: "",
      paid: false,
      salary: "",
      skills: "",
      description: "",
    });
  };
  const handleDelete = (id) =>
    setInternships(internships.filter((i) => i.id !== id));
  const filteredApps = applications.filter(
    (app) =>
      (appFilter === "All" || app.status === appFilter) &&
      (searchApp === "" ||
        app.applicant.toLowerCase().includes(searchApp.toLowerCase()) ||
        app.internship.toLowerCase().includes(searchApp.toLowerCase())),
  );
  const handleEvalChange = (e) => {
    const { name, value } = e.target;
    setEvaluationForm((prev) => ({ ...prev, [name]: value }));
  };
  const calculateOverallRating = () =>
    (
      (parseFloat(evaluationForm.performance || 0) +
        parseFloat(evaluationForm.attendance || 0) +
        parseFloat(evaluationForm.teamwork || 0) +
        parseFloat(evaluationForm.technicalSkills || 0) +
        parseFloat(evaluationForm.communication || 0)) /
      5
    ).toFixed(1);
  const handleSubmitEvaluation = () => {
    if (!selectedInternForEval) return;
    const newEval = {
      id: Date.now(),
      internId: selectedInternForEval.id,
      internName: selectedInternForEval.name,
      internship: selectedInternForEval.internship,
      completionDate: new Date().toISOString().split("T")[0],
      ...evaluationForm,
      overallRating: calculateOverallRating(),
      strengths: evaluationForm.strengths.split(",").map((s) => s.trim()),
      areasForImprovement: evaluationForm.areasForImprovement
        .split(",")
        .map((s) => s.trim()),
    };
    setEvaluations([...evaluations, newEval]);
    setShowEvaluationModal(false);
    setSelectedInternForEval(null);
    setEvaluationForm({
      performance: 0,
      attendance: 0,
      teamwork: 0,
      technicalSkills: 0,
      communication: 0,
      evaluation: "",
      strengths: "",
      areasForImprovement: "",
      recommendation: "",
    });
  };

  const pendingCount = applications.filter(
    (a) => a.status === "Pending",
  ).length;
  const currentInterns = interns.filter((i) => i.status === "current").length;

  return (
    <>
      <style>{styles}</style>
      <div className="co-app">
        {/* SIDEBAR */}
        <aside className="co-sidebar">
          <div className="co-sidebar-logo">
            <img src="/guc-logo.png" alt="GUC" />
          </div>
          <div className="co-sidebar-user">
            <div className="co-sidebar-name">Company Portal</div>
            <div className="co-sidebar-role">
              {isSCADOffice ? "SCAD Office" : "Company"}
            </div>
          </div>
          <nav className="co-nav">
            <div className="co-nav-group-title">Navigation</div>
            {TABS.map((tab) => (
              <a
                key={tab.key}
                className={`co-nav-link ${activeTab === tab.key ? "active" : ""}`}
                onClick={() => setActiveTab(tab.key)}
              >
                {tab.icon} {tab.label}
              </a>
            ))}
            <div className="co-nav-group-title">Quick Links</div>
            <Link to="/" className="co-nav-link">
              🏠 Home
            </Link>
          </nav>
        </aside>

        {/* MAIN */}
        <main className="co-main">
          {/* Top bar */}
          <div className="co-topbar">
            <div className="co-topbar-title">
              {TABS.find((t) => t.key === activeTab)?.label || "Dashboard"}
            </div>
            <div className="co-topbar-actions">
              <NavigationButtons />
              <div
                className="co-bell-btn"
                onClick={() => setShowNotifications(!showNotifications)}
              >
                <FaBell size={16} color="var(--gray)" />
                {notificationItems.length > 0 && (
                  <div className="co-bell-dot" />
                )}
              </div>
              {showNotifications && (
                <div className="co-notif-dropdown">
                  <div className="co-notif-header">Notifications</div>
                  {notificationItems.map((n) => (
                    <div key={n.id} className="co-notif-item">
                      <div>{n.message}</div>
                      <div className="co-notif-time">{n.time}</div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          <div className="co-content">
            {/* ── OVERVIEW ── */}
            {activeTab === "overview" && (
              <>
                <div className="co-stats">
                  {[
                    {
                      icon: <FaBriefcase />,
                      val: internships.length,
                      lbl: "Internship Posts",
                    },
                    {
                      icon: <FaClipboardList />,
                      val: applications.length,
                      lbl: "Total Applications",
                    },
                    {
                      icon: <FaUsers />,
                      val: currentInterns,
                      lbl: "Current Interns",
                    },
                    {
                      icon: <FaStar />,
                      val: pendingCount,
                      lbl: "Pending Reviews",
                    },
                  ].map((s, i) => (
                    <div key={i} className="co-stat">
                      <div className="co-stat-icon">{s.icon}</div>
                      <div>
                        <div className="co-stat-val">{s.val}</div>
                        <div className="co-stat-lbl">{s.lbl}</div>
                      </div>
                    </div>
                  ))}
                </div>

                <Row>
                  <Col md={7}>
                    <div className="co-card">
                      <div className="co-card-header">
                        <div className="co-card-title">Recent Applications</div>
                        <button
                          className="co-btn co-btn-outline co-btn-sm"
                          onClick={() => setActiveTab("applications")}
                        >
                          View All
                        </button>
                      </div>
                      <div className="co-card-body" style={{ padding: 0 }}>
                        <table className="co-table">
                          <thead>
                            <tr>
                              <th>Applicant</th>
                              <th>Internship</th>
                              <th>Status</th>
                            </tr>
                          </thead>
                          <tbody>
                            {applications.slice(0, 4).map((app) => (
                              <tr key={app.id}>
                                <td style={{ fontWeight: 500 }}>
                                  {app.applicant}
                                </td>
                                <td style={{ color: "var(--gray)" }}>
                                  {app.internship}
                                </td>
                                <td>
                                  <span className={getBadgeClass(app.status)}>
                                    {app.status}
                                  </span>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </Col>
                  <Col md={5}>
                    <div className="co-card">
                      <div className="co-card-header">
                        <div className="co-card-title">Active Internships</div>
                      </div>
                      <div className="co-card-body" style={{ padding: 0 }}>
                        {internships
                          .filter((i) => i.status === "open")
                          .map((i) => (
                            <div
                              key={i.id}
                              style={{
                                padding: "14px 20px",
                                borderBottom: "1px solid var(--border)",
                              }}
                            >
                              <div style={{ fontWeight: 600, fontSize: 14 }}>
                                {i.title}
                              </div>
                              <div
                                style={{
                                  fontSize: 12,
                                  color: "var(--gray)",
                                  marginTop: 2,
                                }}
                              >
                                {i.duration} · {i.paid ? i.salary : "Unpaid"}
                              </div>
                              <div
                                style={{
                                  fontSize: 12,
                                  color: "var(--gray)",
                                  marginTop: 2,
                                }}
                              >
                                {
                                  applications.filter(
                                    (a) => a.internshipId === i.id,
                                  ).length
                                }{" "}
                                applicants
                              </div>
                            </div>
                          ))}
                      </div>
                    </div>
                  </Col>
                </Row>
              </>
            )}

            {/* ── INTERNSHIP POSTS ── */}
            {activeTab === "posts" && (
              <>
                <div className="co-card">
                  <div className="co-card-header">
                    <div className="co-card-title">Post New Internship</div>
                  </div>
                  <div className="co-card-body">
                    <form onSubmit={handleSubmit}>
                      <Row>
                        <Col md={4} className="mb-3">
                          <label className="co-form-label">Title</label>
                          <input
                            className="co-input"
                            name="title"
                            placeholder="e.g. Frontend Developer"
                            value={form.title}
                            onChange={handleChange}
                            required
                          />
                        </Col>
                        <Col md={3} className="mb-3">
                          <label className="co-form-label">Duration</label>
                          <input
                            className="co-input"
                            name="duration"
                            placeholder="e.g. 3 months"
                            value={form.duration}
                            onChange={handleChange}
                            required
                          />
                        </Col>
                        <Col md={2} className="mb-3">
                          <label className="co-form-label">Skills</label>
                          <input
                            className="co-input"
                            name="skills"
                            placeholder="React, CSS"
                            value={form.skills}
                            onChange={handleChange}
                          />
                        </Col>
                        <Col md={3} className="mb-3">
                          <label className="co-form-label">Compensation</label>
                          <div
                            style={{
                              display: "flex",
                              alignItems: "center",
                              gap: 8,
                            }}
                          >
                            <input
                              type="checkbox"
                              name="paid"
                              checked={form.paid}
                              onChange={handleChange}
                              id="paid"
                              style={{
                                accentColor: "var(--red)",
                                width: 15,
                                height: 15,
                              }}
                            />
                            <label
                              htmlFor="paid"
                              style={{ fontSize: 13, marginBottom: 0 }}
                            >
                              Paid
                            </label>
                            {form.paid && (
                              <input
                                className="co-input"
                                name="salary"
                                placeholder="Salary"
                                value={form.salary}
                                onChange={handleChange}
                                style={{ flex: 1 }}
                              />
                            )}
                          </div>
                        </Col>
                      </Row>
                      <div className="mb-3">
                        <label className="co-form-label">Description</label>
                        <textarea
                          className="co-input"
                          name="description"
                          placeholder="Describe the internship role..."
                          value={form.description}
                          onChange={handleChange}
                          rows={3}
                          style={{ resize: "vertical" }}
                        />
                      </div>
                      <button type="submit" className="co-btn co-btn-primary">
                        <FaPlus /> Post Internship
                      </button>
                    </form>
                  </div>
                </div>

                <div className="co-search-row">
                  <input
                    className="co-input"
                    placeholder="Search by title..."
                    value={postSearch}
                    onChange={(e) => setPostSearch(e.target.value)}
                  />
                  <select
                    className="co-input"
                    value={postFilter}
                    onChange={(e) => setPostFilter(e.target.value)}
                    style={{ maxWidth: 160 }}
                  >
                    <option value="all">All Status</option>
                    <option value="open">Open</option>
                    <option value="closed">Closed</option>
                  </select>
                </div>

                <div className="co-internship-grid">
                  {internships
                    .filter(
                      (i) =>
                        (postFilter === "all" || i.status === postFilter) &&
                        i.title
                          .toLowerCase()
                          .includes(postSearch.toLowerCase()),
                    )
                    .map((i) => (
                      <div key={i.id} className="co-internship-card">
                        <div
                          style={{
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "flex-start",
                            marginBottom: 8,
                          }}
                        >
                          <div className="co-internship-title">{i.title}</div>
                          <span className={getBadgeClass(i.status)}>
                            {i.status}
                          </span>
                        </div>
                        <div className="co-internship-sub">
                          {i.duration} · {i.paid ? i.salary : "Unpaid"}
                        </div>
                        <div className="co-internship-meta">
                          <strong>Skills:</strong> {i.skills}
                        </div>
                        <div
                          className="co-internship-meta"
                          style={{ marginBottom: 14 }}
                        >
                          {i.description}
                        </div>
                        <div
                          style={{
                            fontSize: 12,
                            color: "var(--gray)",
                            marginBottom: 14,
                          }}
                        >
                          {
                            applications.filter((a) => a.internshipId === i.id)
                              .length
                          }{" "}
                          application(s)
                        </div>
                        <div style={{ display: "flex", gap: 8 }}>
                          <button
                            className="co-btn co-btn-outline co-btn-sm"
                            onClick={() => setSelectedPost(i)}
                          >
                            <FaEye /> Applications
                          </button>
                          <button
                            className="co-btn co-btn-danger co-btn-sm"
                            onClick={() => handleDelete(i.id)}
                          >
                            <FaTrash />
                          </button>
                        </div>
                      </div>
                    ))}
                </div>

                {selectedPost && (
                  <div className="co-card">
                    <div className="co-card-header">
                      <div className="co-card-title">
                        Applications for {selectedPost.title}
                      </div>
                      <button
                        className="co-btn co-btn-outline co-btn-sm"
                        onClick={() => setSelectedPost(null)}
                      >
                        Close
                      </button>
                    </div>
                    <div className="co-card-body" style={{ padding: 0 }}>
                      <table className="co-table">
                        <thead>
                          <tr>
                            <th>Applicant</th>
                            <th>Status</th>
                            <th>Action</th>
                          </tr>
                        </thead>
                        <tbody>
                          {applications
                            .filter(
                              (app) => app.internshipId === selectedPost.id,
                            )
                            .map((app) => (
                              <tr key={app.id}>
                                <td style={{ fontWeight: 500 }}>
                                  {app.applicant}
                                </td>
                                <td>
                                  <span className={getBadgeClass(app.status)}>
                                    {app.status}
                                  </span>
                                </td>
                                <td>
                                  <button
                                    className="co-btn co-btn-outline co-btn-sm"
                                    onClick={() => setSelectedApp(app)}
                                  >
                                    Details
                                  </button>
                                </td>
                              </tr>
                            ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}
              </>
            )}

            {/* ── APPLICATIONS ── */}
            {activeTab === "applications" && (
              <div className="co-card">
                <div className="co-card-header">
                  <div className="co-card-title">All Applications</div>
                </div>
                <div className="co-card-body">
                  <div className="co-search-row">
                    <select
                      className="co-input"
                      value={appFilter}
                      onChange={(e) => setAppFilter(e.target.value)}
                      style={{ maxWidth: 180 }}
                    >
                      <option value="All">All Status</option>
                      <option value="Pending">Pending</option>
                      <option value="Accepted">Accepted</option>
                      <option value="Rejected">Rejected</option>
                      <option value="Finalized">Finalized</option>
                      <option value="Current Intern">Current Intern</option>
                      <option value="Internship Complete">
                        Internship Complete
                      </option>
                    </select>
                    <input
                      className="co-input"
                      placeholder="Search applicant or internship..."
                      value={searchApp}
                      onChange={(e) => setSearchApp(e.target.value)}
                    />
                  </div>
                  <table className="co-table">
                    <thead>
                      <tr>
                        <th>Applicant</th>
                        <th>Internship</th>
                        <th>Status</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredApps.map((app) => (
                        <tr key={app.id}>
                          <td style={{ fontWeight: 500 }}>{app.applicant}</td>
                          <td style={{ color: "var(--gray)" }}>
                            {app.internship}
                          </td>
                          <td>
                            <span className={getBadgeClass(app.status)}>
                              {app.status}
                            </span>
                          </td>
                          <td>
                            <button
                              className="co-btn co-btn-outline co-btn-sm"
                              onClick={() => setSelectedApp(app)}
                            >
                              Details
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* ── INTERNS ── */}
            {activeTab === "interns" && (
              <>
                <div className="co-card">
                  <div className="co-card-header">
                    <div className="co-card-title">Interns</div>
                  </div>
                  <div className="co-card-body">
                    <div className="co-search-row">
                      <input
                        className="co-input"
                        placeholder="Search by name or title..."
                        value={internSearch}
                        onChange={(e) => setInternSearch(e.target.value)}
                      />
                      <select
                        className="co-input"
                        value={internFilter}
                        onChange={(e) => setInternFilter(e.target.value)}
                        style={{ maxWidth: 180 }}
                      >
                        <option value="all">All</option>
                        <option value="current">Current</option>
                        <option value="complete">Completed</option>
                      </select>
                    </div>
                    <table className="co-table">
                      <thead>
                        <tr>
                          <th>Name</th>
                          <th>Internship</th>
                          <th>Status</th>
                          <th>Job Title</th>
                          <th>Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {interns
                          .filter(
                            (intern) =>
                              (internFilter === "all" ||
                                intern.status === internFilter) &&
                              (internSearch === "" ||
                                intern.name
                                  .toLowerCase()
                                  .includes(internSearch.toLowerCase()) ||
                                intern.jobTitle
                                  .toLowerCase()
                                  .includes(internSearch.toLowerCase())),
                          )
                          .map((intern) => (
                            <tr key={intern.id}>
                              <td style={{ fontWeight: 500 }}>{intern.name}</td>
                              <td style={{ color: "var(--gray)" }}>
                                {intern.internship}
                              </td>
                              <td>
                                <span className={getBadgeClass(intern.status)}>
                                  {intern.status === "current"
                                    ? "Current"
                                    : "Completed"}
                                </span>
                              </td>
                              <td style={{ color: "var(--gray)" }}>
                                {intern.jobTitle}
                              </td>
                              <td>
                                {intern.status === "current" && (
                                  <button
                                    className="co-btn co-btn-outline co-btn-sm"
                                    onClick={() =>
                                      setInterns(
                                        interns.map((i) =>
                                          i.id === intern.id
                                            ? { ...i, status: "complete" }
                                            : i,
                                        ),
                                      )
                                    }
                                  >
                                    Mark Complete
                                  </button>
                                )}
                                {intern.status === "complete" &&
                                  !evaluations.some(
                                    (e) => e.internId === intern.id,
                                  ) && (
                                    <button
                                      className="co-btn co-btn-primary co-btn-sm"
                                      onClick={() => {
                                        setSelectedInternForEval(intern);
                                        setShowEvaluationModal(true);
                                      }}
                                    >
                                      Add Evaluation
                                    </button>
                                  )}
                                {intern.status === "complete" &&
                                  evaluations.some(
                                    (e) => e.internId === intern.id,
                                  ) && (
                                    <button
                                      className="co-btn co-btn-outline co-btn-sm"
                                      onClick={() => {
                                        const ex = evaluations.find(
                                          (e) => e.internId === intern.id,
                                        );
                                        setSelectedInternForEval(intern);
                                        setEvaluationForm({
                                          performance: ex.performance,
                                          attendance: ex.attendance,
                                          teamwork: ex.teamwork,
                                          technicalSkills: ex.technicalSkills,
                                          communication: ex.communication,
                                          evaluation: ex.evaluation,
                                          strengths: ex.strengths.join(", "),
                                          areasForImprovement:
                                            ex.areasForImprovement.join(", "),
                                          recommendation: ex.recommendation,
                                        });
                                        setShowEvaluationModal(true);
                                      }}
                                    >
                                      Edit Evaluation
                                    </button>
                                  )}
                              </td>
                            </tr>
                          ))}
                      </tbody>
                    </table>
                  </div>
                </div>

                {isSCADOffice && evaluations.length > 0 && (
                  <div className="co-card">
                    <div className="co-card-header">
                      <div className="co-card-title">
                        Internship Evaluations
                      </div>
                    </div>
                    <div className="co-card-body" style={{ padding: 0 }}>
                      <table className="co-table">
                        <thead>
                          <tr>
                            <th>Intern</th>
                            <th>Internship</th>
                            <th>Date</th>
                            <th>Rating</th>
                            <th>Action</th>
                          </tr>
                        </thead>
                        <tbody>
                          {evaluations.map((ev) => (
                            <tr key={ev.id}>
                              <td style={{ fontWeight: 500 }}>
                                {ev.internName}
                              </td>
                              <td style={{ color: "var(--gray)" }}>
                                {ev.internship}
                              </td>
                              <td style={{ color: "var(--gray)" }}>
                                {ev.completionDate}
                              </td>
                              <td>
                                <span
                                  style={{
                                    color: "var(--red)",
                                    fontWeight: 600,
                                  }}
                                >
                                  ⭐ {ev.overallRating}/5.0
                                </span>
                              </td>
                              <td>
                                <button
                                  className="co-btn co-btn-outline co-btn-sm"
                                  onClick={() => {
                                    const intern = interns.find(
                                      (i) => i.id === ev.internId,
                                    );
                                    setSelectedInternForEval(intern);
                                    setEvaluationForm({
                                      performance: ev.performance,
                                      attendance: ev.attendance,
                                      teamwork: ev.teamwork,
                                      technicalSkills: ev.technicalSkills,
                                      communication: ev.communication,
                                      evaluation: ev.evaluation,
                                      strengths: ev.strengths.join(", "),
                                      areasForImprovement:
                                        ev.areasForImprovement.join(", "),
                                      recommendation: ev.recommendation,
                                    });
                                    setShowEvaluationModal(true);
                                  }}
                                >
                                  View
                                </button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}
              </>
            )}
          </div>
        </main>
      </div>

      {/* ── APPLICATION DETAIL MODAL ── */}
      {selectedApp && (
        <div className="co-modal-overlay" onClick={() => setSelectedApp(null)}>
          <div className="co-modal" onClick={(e) => e.stopPropagation()}>
            <div className="co-modal-header">
              <div className="co-modal-title">
                Application — {selectedApp.applicant}
              </div>
              <button
                className="co-modal-close"
                onClick={() => setSelectedApp(null)}
              >
                ×
              </button>
            </div>
            <div className="co-modal-body">
              <div style={{ marginBottom: 20 }}>
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "1fr 1fr",
                    gap: 12,
                    marginBottom: 12,
                  }}
                >
                  <div>
                    <div
                      style={{
                        fontSize: 11,
                        color: "var(--gray)",
                        textTransform: "uppercase",
                        letterSpacing: 1,
                        marginBottom: 3,
                      }}
                    >
                      Name
                    </div>
                    <div style={{ fontWeight: 600 }}>
                      {selectedApp.applicant}
                    </div>
                  </div>
                  <div>
                    <div
                      style={{
                        fontSize: 11,
                        color: "var(--gray)",
                        textTransform: "uppercase",
                        letterSpacing: 1,
                        marginBottom: 3,
                      }}
                    >
                      Email
                    </div>
                    <div style={{ fontWeight: 600 }}>{selectedApp.email}</div>
                  </div>
                  <div>
                    <div
                      style={{
                        fontSize: 11,
                        color: "var(--gray)",
                        textTransform: "uppercase",
                        letterSpacing: 1,
                        marginBottom: 3,
                      }}
                    >
                      Internship
                    </div>
                    <div style={{ fontWeight: 600 }}>
                      {selectedApp.internship}
                    </div>
                  </div>
                  <div>
                    <div
                      style={{
                        fontSize: 11,
                        color: "var(--gray)",
                        textTransform: "uppercase",
                        letterSpacing: 1,
                        marginBottom: 3,
                      }}
                    >
                      Status
                    </div>
                    <span className={getBadgeClass(selectedApp.status)}>
                      {selectedApp.status}
                    </span>
                  </div>
                </div>
                <div
                  style={{
                    fontSize: 13,
                    color: "var(--gray)",
                    lineHeight: 1.6,
                  }}
                >
                  {selectedApp.details}
                </div>
              </div>

              <div style={{ marginBottom: 20 }}>
                <div
                  style={{ fontWeight: 600, fontSize: 14, marginBottom: 10 }}
                >
                  Documents
                </div>
                <div
                  style={{ display: "flex", flexDirection: "column", gap: 6 }}
                >
                  {selectedApp.documents.cv && (
                    <a
                      href={selectedApp.documents.cv.url}
                      style={{
                        fontSize: 13,
                        color: "var(--red)",
                        display: "flex",
                        alignItems: "center",
                        gap: 6,
                      }}
                    >
                      <FaFilePdf />
                      {selectedApp.documents.cv.name}
                    </a>
                  )}
                  {selectedApp.documents.coverLetter && (
                    <a
                      href={selectedApp.documents.coverLetter.url}
                      style={{
                        fontSize: 13,
                        color: "var(--red)",
                        display: "flex",
                        alignItems: "center",
                        gap: 6,
                      }}
                    >
                      <FaFilePdf />
                      {selectedApp.documents.coverLetter.name}
                    </a>
                  )}
                  {selectedApp.documents.certificates.map((cert, i) => (
                    <a
                      key={i}
                      href={cert.url}
                      style={{
                        fontSize: 13,
                        color: "var(--red)",
                        display: "flex",
                        alignItems: "center",
                        gap: 6,
                      }}
                    >
                      <FaCertificate />
                      {cert.name}
                    </a>
                  ))}
                </div>
              </div>

              {selectedApp.assessments.filter((a) => a.posted && a.score)
                .length > 0 && (
                <div style={{ marginBottom: 20 }}>
                  <div
                    style={{ fontWeight: 600, fontSize: 14, marginBottom: 10 }}
                  >
                    Assessment Scores
                  </div>
                  {selectedApp.assessments
                    .filter((a) => a.posted && a.score)
                    .map((a) => (
                      <div
                        key={a.id}
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                          padding: "8px 12px",
                          background: "var(--off-white)",
                          borderRadius: 8,
                          marginBottom: 6,
                          fontSize: 13,
                        }}
                      >
                        <span>{a.title}</span>
                        <span style={{ fontWeight: 600, color: "var(--red)" }}>
                          <FaStar style={{ marginRight: 4 }} />
                          {a.score}%
                        </span>
                      </div>
                    ))}
                </div>
              )}

              <div>
                <div
                  style={{ fontWeight: 600, fontSize: 14, marginBottom: 10 }}
                >
                  Update Status
                </div>
                <select
                  className="co-input"
                  value={selectedApp.status}
                  onChange={(e) => {
                    const s = e.target.value;
                    setApplications(
                      applications.map((app) =>
                        app.id === selectedApp.id ? { ...app, status: s } : app,
                      ),
                    );
                    setSelectedApp({ ...selectedApp, status: s });
                  }}
                >
                  <option value="Pending">Pending</option>
                  <option value="Accepted">Accepted</option>
                  <option value="Rejected">Rejected</option>
                  <option value="Finalized">Finalized</option>
                  <option value="Current Intern">Current Intern</option>
                  <option value="Internship Complete">
                    Internship Complete
                  </option>
                </select>
              </div>
            </div>
            <div className="co-modal-footer">
              <button
                className="co-btn co-btn-outline"
                onClick={() => setSelectedApp(null)}
              >
                Close
              </button>
              <button
                className="co-btn co-btn-primary"
                onClick={() => {
                  alert(`Status updated to ${selectedApp.status}`);
                  setSelectedApp(null);
                }}
              >
                <FaCheck /> Save Changes
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ── EVALUATION MODAL ── */}
      {showEvaluationModal && (
        <div
          className="co-modal-overlay"
          onClick={() => setShowEvaluationModal(false)}
        >
          <div className="co-modal" onClick={(e) => e.stopPropagation()}>
            <div className="co-modal-header">
              <div className="co-modal-title">
                Evaluation — {selectedInternForEval?.name}
              </div>
              <button
                className="co-modal-close"
                onClick={() => setShowEvaluationModal(false)}
              >
                ×
              </button>
            </div>
            <div className="co-modal-body">
              <div className="co-rating-group">
                {[
                  ["performance", "Performance"],
                  ["attendance", "Attendance"],
                  ["teamwork", "Teamwork"],
                  ["technicalSkills", "Technical Skills"],
                  ["communication", "Communication"],
                ].map(([key, label]) => (
                  <div key={key}>
                    <label className="co-form-label">{label}</label>
                    <input
                      className="co-input"
                      type="number"
                      name={key}
                      min="0"
                      max="5"
                      step="0.5"
                      value={evaluationForm[key]}
                      onChange={handleEvalChange}
                    />
                  </div>
                ))}
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    background: "var(--red-pale)",
                    border: "1px solid rgba(204,0,0,0.2)",
                    borderRadius: 8,
                    padding: "12px 16px",
                  }}
                >
                  <div style={{ textAlign: "center" }}>
                    <div
                      style={{
                        fontSize: 11,
                        color: "var(--gray)",
                        textTransform: "uppercase",
                        letterSpacing: 1,
                      }}
                    >
                      Overall
                    </div>
                    <div
                      style={{
                        fontSize: 24,
                        fontWeight: 700,
                        color: "var(--red)",
                      }}
                    >
                      {calculateOverallRating()}
                    </div>
                    <div style={{ fontSize: 11, color: "var(--gray)" }}>
                      out of 5.0
                    </div>
                  </div>
                </div>
              </div>
              {[
                ["evaluation", "Overall Evaluation", true],
                ["strengths", "Key Strengths (comma-separated)", false],
                [
                  "areasForImprovement",
                  "Areas for Improvement (comma-separated)",
                  false,
                ],
                ["recommendation", "Recommendation", true],
              ].map(([name, label, isTextarea]) => (
                <div key={name} style={{ marginBottom: 14 }}>
                  <label className="co-form-label">{label}</label>
                  {isTextarea ? (
                    <textarea
                      className="co-input"
                      name={name}
                      value={evaluationForm[name]}
                      onChange={handleEvalChange}
                      rows={3}
                      style={{ resize: "vertical" }}
                    />
                  ) : (
                    <input
                      className="co-input"
                      name={name}
                      value={evaluationForm[name]}
                      onChange={handleEvalChange}
                    />
                  )}
                </div>
              ))}
            </div>
            <div className="co-modal-footer">
              <button
                className="co-btn co-btn-outline"
                onClick={() => setShowEvaluationModal(false)}
              >
                Cancel
              </button>
              <button
                className="co-btn co-btn-primary"
                onClick={handleSubmitEvaluation}
              >
                <FaCheck /> Save Evaluation
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default CompanyDashboard;
