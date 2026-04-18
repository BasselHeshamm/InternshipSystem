import React, { useState, useEffect } from "react";
import { useStudentData } from "../hooks/useDashboardData";
import { useAuth } from "../context/AuthContext";
import BrowseInternships from "./BrowseInternships";
import {
  Card,
  Button,
  Row,
  Col,
  Badge,
  Form,
  ProgressBar,
  Container,
  Modal,
  Alert,
  InputGroup,
} from "react-bootstrap";
import {
  FaVideo,
  FaPhone,
  FaCheck,
  FaTimes,
  FaMicrophone,
  FaMicrophoneSlash,
  FaVideoSlash,
  FaRegEye,
  FaRegEyeSlash,
  FaShareSquare,
  FaSignOutAlt,
  FaAward,
  FaUser,
  FaBuilding,
  FaBell,
  FaGraduationCap,
  FaUserCircle,
  FaClock,
  FaDollarSign,
  FaCalendar,
  FaSearch,
  FaFilter,
  FaSortAmountDown,
  FaMapMarkerAlt,
  FaBriefcase,
  FaIndustry,
  FaArrowLeft,
  FaHome,
  FaPlay,
  FaPause,
  FaStop,
  FaFileAlt,
  FaCertificate,
  FaStar,
  FaComment,
  FaUpload,
  FaEye,
  FaTrash,
  FaPaperPlane,
  FaChartBar,
  FaClipboardList,
} from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import "./StudentDashboard.css";
import NavigationButtons from "../Components/NavigationButtons";
// ── ALL DATA (unchanged) ──
const initialSuggestedInternships = [
  {
    id: 1,
    company: "Tech Solutions",
    logo: "https://upload.wikimedia.org/wikipedia/commons/4/44/Google-flutter-logo.svg",
    title: "Frontend Developer Intern",
    description:
      "Join our dynamic team to build modern web applications using React and Next.js",
    skills: ["React", "JavaScript", "HTML/CSS"],
    duration: "3 months",
    stipend: "$1000/month",
    location: "Cairo, Egypt",
    type: "Remote",
    deadline: "2024-04-30",
    matchScore: 95,
  },
  {
    id: 2,
    company: "Designify",
    logo: "https://upload.wikimedia.org/wikipedia/commons/a/a7/React-icon.svg",
    title: "UI/UX Design Intern",
    description:
      "Create beautiful user interfaces and enhance user experiences for our clients",
    skills: ["Figma", "Adobe XD", "User Research"],
    duration: "4 months",
    stipend: "$1200/month",
    location: "Alexandria, Egypt",
    type: "Hybrid",
    deadline: "2024-04-25",
    matchScore: 90,
  },
  {
    id: 3,
    company: "DataTech Analytics",
    logo: "https://upload.wikimedia.org/wikipedia/commons/c/c3/Python-logo-notext.svg",
    title: "Data Science Intern",
    description:
      "Work with big data and machine learning models to derive meaningful insights",
    skills: ["Python", "Machine Learning", "SQL"],
    duration: "6 months",
    stipend: "$1500/month",
    location: "Cairo, Egypt",
    type: "On-site",
    deadline: "2024-05-15",
    matchScore: 88,
  },
  {
    id: 4,
    company: "CloudNet Systems",
    logo: "https://upload.wikimedia.org/wikipedia/commons/9/93/Amazon_Web_Services_Logo.svg",
    title: "Cloud Engineering Intern",
    description:
      "Learn and work with AWS cloud infrastructure and DevOps practices",
    skills: ["AWS", "Docker", "Kubernetes"],
    duration: "4 months",
    stipend: "$1300/month",
    location: "Giza, Egypt",
    type: "Hybrid",
    deadline: "2024-05-01",
    matchScore: 85,
  },
  {
    id: 5,
    company: "SecureGuard",
    logo: "https://upload.wikimedia.org/wikipedia/commons/5/5c/AWS_Simple_Icons_AWS_Cloud.svg",
    title: "Cybersecurity Intern",
    description:
      "Gain hands-on experience in network security and penetration testing",
    skills: ["Network Security", "Penetration Testing", "Security Tools"],
    duration: "5 months",
    stipend: "$1400/month",
    location: "Cairo, Egypt",
    type: "On-site",
    deadline: "2024-05-10",
    matchScore: 82,
  },
  {
    id: 6,
    company: "MobileFirst Tech",
    logo: "https://upload.wikimedia.org/wikipedia/commons/7/7e/Android_logo_2019.svg",
    title: "Mobile App Developer Intern",
    description:
      "Develop cutting-edge mobile applications for Android and iOS platforms",
    skills: ["Android", "iOS", "Flutter"],
    duration: "3 months",
    stipend: "$1100/month",
    location: "Smart Village, Egypt",
    type: "Remote",
    deadline: "2024-04-28",
    matchScore: 80,
  },
];
const initialApplications = [
  {
    id: 1,
    internship: "Frontend Intern",
    company: "Tech Solutions",
    status: "Pending",
  },
  {
    id: 2,
    internship: "UI/UX Intern",
    company: "Designify",
    status: "Finalized",
  },
];
const progressSteps = ["Application", "Internship", "Evaluation", "Report"];
const allInternships = [
  {
    id: 1,
    title: "Frontend Intern",
    company: "Tech Solutions",
    status: "current",
    start: "2025-05-25",
    end: "2025-05-31",
  },
  {
    id: 2,
    title: "UI/UX Intern",
    company: "Designify",
    status: "complete",
    start: "2025-05-26",
    end: "2025-05-30",
  },
];
const allCourses = [
  "Web Development",
  "UI/UX Design",
  "Database Systems",
  "Algorithms",
  "Software Engineering",
];
const majorVideos = {
  "Computer Science": {
    url: "https://www.youtube.com/embed/1hHMwLxN6EM",
    desc: "For Computer Science majors, internships should involve software development, IT support, data analysis, or related technical roles.",
  },
  "Business Administration": {
    url: "https://www.youtube.com/embed/2vj37yeQQHg",
    desc: "For Business Administration majors, internships in management, marketing, finance, HR, or consulting are recommended.",
  },
  Engineering: {
    url: "https://www.youtube.com/embed/3JZ_D3ELwOQ",
    desc: "For Engineering majors, internships should be in design, manufacturing, R&D, or technical project management.",
  },
  default: {
    url: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    desc: "Internships should be relevant to your field of study and provide practical, hands-on experience.",
  },
};
const dummyApplications = [
  {
    id: 1,
    position: "Frontend Developer Intern",
    company: "Tech Solutions",
    status: "Pending",
    appliedDate: "2024-03-15",
    deadline: "2024-04-30",
    matchScore: 95,
  },
  {
    id: 2,
    position: "UI/UX Design Intern",
    company: "Designify",
    status: "Accepted",
    appliedDate: "2024-03-10",
    deadline: "2024-04-25",
    matchScore: 90,
  },
  {
    id: 3,
    position: "Data Science Intern",
    company: "DataTech Analytics",
    status: "Rejected",
    appliedDate: "2024-03-05",
    deadline: "2024-05-15",
    matchScore: 85,
  },
];
const initialAssessments = [
  {
    id: 1,
    title: "Technical Skills Assessment",
    description: "Evaluate your programming and problem-solving skills",
    duration: "60 minutes",
    questions: 30,
    status: "Completed",
    score: 85,
    date: "2024-03-10",
    posted: true,
  },
  {
    id: 2,
    title: "Soft Skills Evaluation",
    description: "Assess your communication and teamwork abilities",
    duration: "45 minutes",
    questions: 25,
    status: "Pending",
    score: null,
    date: "2024-04-01",
    posted: false,
  },
  {
    id: 3,
    title: "Industry Knowledge Test",
    description: "Test your understanding of current industry trends",
    duration: "30 minutes",
    questions: 20,
    status: "Not Started",
    score: null,
    date: "2024-04-15",
    posted: false,
  },
];
const dummyCourses = [
  {
    id: 1,
    title: "Web Development Fundamentals",
    instructor: "Dr. Sarah Johnson",
    progress: 75,
    duration: "8 weeks",
    enrolled: true,
    startDate: "2024-03-01",
    endDate: "2024-04-30",
    topics: ["HTML5", "CSS3", "JavaScript", "React Basics"],
  },
  {
    id: 2,
    title: "Data Science Essentials",
    instructor: "Prof. Michael Chen",
    progress: 45,
    duration: "10 weeks",
    enrolled: true,
    startDate: "2024-03-15",
    endDate: "2024-05-15",
    topics: ["Python", "Data Analysis", "Machine Learning", "Statistics"],
  },
  {
    id: 3,
    title: "UI/UX Design Principles",
    instructor: "Ms. Emily Parker",
    progress: 0,
    duration: "6 weeks",
    enrolled: false,
    startDate: "2024-04-01",
    endDate: "2024-05-15",
    topics: ["Design Thinking", "User Research", "Prototyping", "Figma"],
  },
];
const industries = [
  "Technology",
  "Healthcare",
  "Finance",
  "Education",
  "Manufacturing",
  "Marketing",
];
const locations = [
  "Cairo",
  "Alexandria",
  "Giza",
  "New Cairo",
  "Smart Village",
  "Maadi",
];
const initialReports = [
  {
    id: 1,
    title: "Frontend Internship Report",
    internship: "Frontend Intern",
    intro: "Introduction to my internship experience...",
    body: "Detailed report content...",
    finalized: true,
    status: "flagged",
    comments:
      "Report lacks specific technical details. Please clarify the technologies used.",
    appeal: null,
  },
  {
    id: 2,
    title: "UI/UX Internship Report",
    internship: "UI/UX Intern",
    intro: "Overview of my design work...",
    body: "Detailed design process...",
    finalized: true,
    status: "rejected",
    comments:
      "Insufficient evidence of project impact. Please provide metrics or outcomes.",
    appeal: {
      message:
        "I believe the report includes relevant details. Can we discuss further?",
      status: "pending",
    },
  },
  {
    id: 3,
    title: "Draft Report",
    internship: "Data Science Intern",
    intro: "Draft intro...",
    body: "Draft body...",
    finalized: false,
    status: "draft",
    comments: null,
    appeal: null,
  },
];
const initialDocuments = [
  {
    id: 1,
    name: "React_Certificate.pdf",
    type: "Certificate",
    uploadDate: "2025-05-10",
    file: null,
  },
  {
    id: 2,
    name: "Cover_Letter.docx",
    type: "Cover Letter",
    uploadDate: "2025-05-12",
    file: null,
  },
];

// ── NAV ITEMS ──
const navItems = [
  {
    label: "Internships",
    items: [
      { key: "suggested", label: "Suggested" },
      { key: "myinternships", label: "My Internships" },
      { key: "browse", label: "Browse" },
      { key: "guidelines", label: "Guidelines" },
    ],
  },
  {
    label: "Profile",
    items: [
      { key: "profile", label: "Profile" },
      { key: "applications", label: "My Applications" },
      { key: "assessments", label: "Assessments" },
    ],
  },
  {
    label: "Learning",
    items: [
      { key: "courses", label: "Courses" },
      { key: "workshops", label: "Workshops" },
    ],
  },
  {
    label: "Reports & More",
    items: [
      { key: "reports", label: "Reports" },
      { key: "appointment", label: "Appointments" },
      { key: "companyviews", label: "Company Views" },
    ],
  },
];

function getSectionLabel(key) {
  for (const group of navItems) {
    const found = group.items.find((i) => i.key === key);
    if (found) return found.label;
  }
  return "Dashboard";
}

function StudentDashboard() {
  const [applications, setApplications] = useState(initialApplications);
  const [suggestedInternships, setSuggestedInternships] = useState(
    initialSuggestedInternships,
  );
  const [report, setReport] = useState({ title: "", body: "", file: null });
  const [currentStep, setCurrentStep] = useState(2);
  const notifications = [
    { id: 1, message: "Your application for Frontend Intern is pending." },
    { id: 2, message: "Report feedback received." },
  ];
  const [myInternships, setMyInternships] = useState(allInternships);
  const [selectedInternship, setSelectedInternship] = useState(null);
  const [evaluation, setEvaluation] = useState({ text: "", recommend: false });
  const [reports, setReports] = useState(initialReports);
  const [reportDraft, setReportDraft] = useState({
    title: "",
    intro: "",
    body: "",
    finalized: false,
  });
  const [courses, setCourses] = useState(allCourses);
  const [selectedCourses, setSelectedCourses] = useState([]);
  const [profile, setProfile] = useState({
    name: "",
    interests: "",
    previousJobs: "",
    activities: "",
    major: "Computer Science",
    email: "",
    semester: "",
    skills: "",
  });
  const [documents, setDocuments] = useState(initialDocuments);
  const [newDocument, setNewDocument] = useState({
    file: null,
    type: "Certificate",
  });
  const completedMonths =
    myInternships.filter((i) => i.status === "complete").length * 3;
  const isPRO = completedMonths >= 3;
  const [showAppointment, setShowAppointment] = useState(false);
  const [appointments, setAppointments] = useState([
    {
      id: 1,
      with: "SCAD Officer",
      status: "pending",
      type: "Career Guidance",
      time: "2025-05-30T14:00",
    },
  ]);
  const [incomingCall, setIncomingCall] = useState(null);
  const [inCall, setInCall] = useState(false);
  const [callMuted, setCallMuted] = useState(false);
  const [callVideo, setCallVideo] = useState(true);
  const [callScreen, setCallScreen] = useState(false);
  const [companyViews, setCompanyViews] = useState(["TechCorp", "Designify"]);
  const [myAssessments, setMyAssessments] = useState(initialAssessments);
  const [selectedAssessment, setSelectedAssessment] = useState(null);
  const [workshops, setWorkshops] = useState([
    {
      id: 1,
      title: "Resume Building",
      date: "2025-05-29",
      time: "15:00",
      type: "live",
      registered: true,
      completed: false,
      videoUrl: "",
    },
    {
      id: 2,
      title: "Interview Skills",
      date: "2025-05-28",
      time: "Anytime",
      type: "recorded",
      registered: true,
      completed: false,
      videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    },
  ]);
  const [selectedWorkshop, setSelectedWorkshop] = useState(null);
  const [inLiveWorkshop, setInLiveWorkshop] = useState(false);
  const [preRecordedPlaying, setPreRecordedPlaying] = useState(false);
  const [notes, setNotes] = useState("");
  const [certificate, setCertificate] = useState(null);
  const [feedback, setFeedback] = useState({ rating: 0, comment: "" });
  const [chatMessages, setChatMessages] = useState([]);
  const [chatInput, setChatInput] = useState("");
  const [myApplications, setMyApplications] = useState(dummyApplications);
  const [myCourses, setMyCourses] = useState(dummyCourses);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedIndustry, setSelectedIndustry] = useState("all");
  const [selectedLocation, setSelectedLocation] = useState("all");
  const [sortBy, setSortBy] = useState("match");
  const [workType, setWorkType] = useState("all");
  const [systemNotifications, setSystemNotifications] = useState([]);
  const [onlineUsers, setOnlineUsers] = useState({
    "SCAD Officer": true,
    Me: true,
  });
  const [otherLeftCall, setOtherLeftCall] = useState(false);
  const [notificationsList, setNotificationsList] = useState([]);
  const [activeSection, setActiveSection] = useState("dashboard");
  const [workshopNotifications, setWorkshopNotifications] = useState([]);
  const [showAppealModal, setShowAppealModal] = useState(false);
  const [selectedReport, setSelectedReport] = useState(null);
  const [appealMessage, setAppealMessage] = useState("");
  const { user } = useAuth();
  const apiData = useStudentData();
  const videoData = majorVideos[profile.major] || majorVideos["default"];
  const progressPercent = ((currentStep + 1) / progressSteps.length) * 100;

  // ── ALL HANDLERS (unchanged) ──
  const handleReportChange = (e) => {
    const { name, value, files } = e.target;
    setReport({ ...report, [name]: files ? files[0] : value });
  };
  const handleReportSubmit = (e) => {
    e.preventDefault();
    const newReport = {
      id: Date.now(),
      title: report.title,
      internship: "New Internship",
      intro: "",
      body: report.body,
      finalized: true,
      status: "finalized",
      comments: null,
      appeal: null,
    };
    setReports([...reports, newReport]);
    setReport({ title: "", body: "", file: null });
    alert("Report submitted (dummy action)");
  };
  const handleDocumentChange = (e) => {
    const { name, value, files } = e.target;
    setNewDocument({ ...newDocument, [name]: files ? files[0] : value });
  };
  const handleDocumentSubmit = (e) => {
    e.preventDefault();
    if (!newDocument.file) {
      alert("Please select a file to upload.");
      return;
    }
    const newDoc = {
      id: Date.now(),
      name: newDocument.file.name,
      type: newDocument.type,
      uploadDate: new Date().toISOString().slice(0, 10),
      file: newDocument.file,
    };
    setDocuments([...documents, newDoc]);
    setNewDocument({ file: null, type: "Certificate" });
    alert("Document uploaded successfully");
  };
  const handleViewDocument = (doc) => {
    if (doc.file) {
      const url = URL.createObjectURL(doc.file);
      window.open(url, "_blank");
    } else {
      alert("File preview not available for dummy data.");
    }
  };
  const handleDeleteDocument = (id) => {
    setDocuments(documents.filter((doc) => doc.id !== id));
  };
  const handleTogglePostAssessment = (id) => {
    setMyAssessments(
      myAssessments.map((a) => (a.id === id ? { ...a, posted: !a.posted } : a)),
    );
  };
  const handleApply = (internship) => {
    setApplications([
      ...applications,
      {
        id: Date.now(),
        internship: internship.title,
        company: internship.company,
        status: "Pending",
      },
    ]);
    alert(`Applied to ${internship.title} at ${internship.company}`);
  };
  const handleSectionChange = (section) => {
    setActiveSection(section);
  };
  const handleAcceptAppointment = (id) => {
    setAppointments(
      appointments.map((app) =>
        app.id === id ? { ...app, status: "accepted" } : app,
      ),
    );
  };
  const handleRejectAppointment = (id) => {
    setAppointments(
      appointments.map((app) =>
        app.id === id ? { ...app, status: "rejected" } : app,
      ),
    );
  };
  const handleLeaveCall = () => {
    setInCall(false);
    setOtherLeftCall(true);
  };
  const getFilteredInternships = () =>
    suggestedInternships
      .filter((i) => {
        const matchesSearch =
          i.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          i.company.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesType = workType === "all" || i.type === workType;
        const matchesLocation =
          selectedLocation === "all" || i.location.includes(selectedLocation);
        return matchesSearch && matchesType && matchesLocation;
      })
      .sort((a, b) => {
        switch (sortBy) {
          case "match":
            return b.matchScore - a.matchScore;
          case "deadline":
            return new Date(a.deadline) - new Date(b.deadline);
          case "stipend":
            return (
              parseInt(b.stipend.replace(/[^0-9]/g, "")) -
              parseInt(a.stipend.replace(/[^0-9]/g, ""))
            );
          default:
            return 0;
        }
      });
  const handleJoinLiveWorkshop = (workshop) => {
    setSelectedWorkshop(workshop);
    setInLiveWorkshop(true);
    setNotes("");
    setChatMessages([]);
  };
  const handlePlayPreRecorded = (workshop) => {
    setSelectedWorkshop(workshop);
    setPreRecordedPlaying(true);
    setNotes("");
  };
  const handlePausePreRecorded = () => {
    setPreRecordedPlaying(false);
  };
  const handleStopPreRecorded = () => {
    setPreRecordedPlaying(false);
    setSelectedWorkshop(null);
    setNotes("");
  };
  const handleSaveNotes = () => {
    localStorage.setItem(`workshop-notes-${selectedWorkshop.id}`, notes);
    alert("Notes saved!");
  };
  const handleCompleteWorkshop = (workshop) => {
    setWorkshops(
      workshops.map((w) =>
        w.id === workshop.id ? { ...w, completed: true } : w,
      ),
    );
    setCertificate({
      workshopId: workshop.id,
      title: workshop.title,
      date: new Date().toISOString().slice(0, 10),
    });
    setInLiveWorkshop(false);
    setPreRecordedPlaying(false);
  };
  const handleFeedbackSubmit = () => {
    alert(`Feedback submitted: ${feedback.rating} stars`);
    setFeedback({ rating: 0, comment: "" });
  };
  const handleSendChatMessage = () => {
    if (chatInput.trim()) {
      const newMessage = {
        id: Date.now(),
        sender: "Me",
        message: chatInput,
        timestamp: new Date().toLocaleTimeString(),
      };
      setChatMessages([...chatMessages, newMessage]);
      setChatInput("");
      setTimeout(() => {
        setChatMessages((prev) => [
          ...prev,
          {
            id: Date.now(),
            sender: "Attendee",
            message: "Thanks for your input!",
            timestamp: new Date().toLocaleTimeString(),
          },
        ]);
      }, 1000);
    }
  };
  const handleAppealSubmit = () => {
    if (!selectedReport || !appealMessage.trim()) return;
    setReports(
      reports.map((r) =>
        r.id === selectedReport.id
          ? { ...r, appeal: { message: appealMessage, status: "pending" } }
          : r,
      ),
    );
    setShowAppealModal(false);
    setAppealMessage("");
    setSelectedReport(null);
    alert("Appeal submitted");
  };

  const todayStr = new Date().toISOString().slice(0, 10);
  const nextCycle = { name: "Summer 2025", startDate: todayStr };

  useEffect(() => {
    const today = new Date();
    const cycleStart = new Date(nextCycle.startDate);
    const daysUntilStart = Math.ceil(
      (cycleStart - today) / (1000 * 60 * 60 * 24),
    );
    if (daysUntilStart === 7) {
      const aboutToKey = `notified-cycle-aboutto-${nextCycle.name}`;
      if (!localStorage.getItem(aboutToKey)) {
        localStorage.setItem(aboutToKey, "1");
      }
    }
  }, []);

  const statusColor = (s) => {
    if (s === "Pending" || s === "pending") return "warning";
    if (
      s === "Accepted" ||
      s === "accepted" ||
      s === "Finalized" ||
      s === "complete"
    )
      return "success";
    if (s === "Rejected" || s === "rejected") return "danger";
    if (s === "current") return "primary";
    if (s === "flagged") return "warning";
    if (s === "draft") return "secondary";
    return "secondary";
  };

  return (
    <>
      <div className="app-container">
        {/* ── SIDEBAR ── */}
        <aside className="sidebar">
          <div className="sidebar-avatar">
            <img src="/guc-logo.png" alt="GUC" />
          </div>
          <div className="sidebar-user">
            <div className="sidebar-name">
              {profile.name ? profile.name : "Student Portal"}
            </div>
            <div className="sidebar-role">
              Student
              {isPRO && (
                <span
                  style={{
                    background: "var(--gold)",
                    color: "var(--black)",
                    borderRadius: 4,
                    padding: "1px 6px",
                    fontSize: 10,
                    marginLeft: 6,
                  }}
                >
                  PRO
                </span>
              )}
            </div>
          </div>
          <nav className="sidebar-nav">
            <a
              href="#"
              className={`sidebar-link ${activeSection === "dashboard" ? "active" : ""}`}
              onClick={() => handleSectionChange("dashboard")}
            >
              🏠 Overview
            </a>
            {navItems.map((group) => (
              <div key={group.label} className="nav-group">
                <div className="nav-group-title">{group.label}</div>
                {group.items.map((item) => (
                  <a
                    href="#"
                    key={item.key}
                    className={`sidebar-link ${activeSection === item.key ? "active" : ""}`}
                    onClick={() => handleSectionChange(item.key)}
                  >
                    {item.label}
                  </a>
                ))}
              </div>
            ))}
          </nav>
        </aside>

        {/* ── MAIN ── */}
        <main className="main-content">
          {/* Top bar */}
          <div className="main-topbar">
            <div className="topbar-title">
              {getSectionLabel(activeSection) === "Dashboard"
                ? "Overview"
                : getSectionLabel(activeSection)}
            </div>
            <div className="topbar-right">
              {isPRO && (
                <div className="topbar-badge">
                  <div className="topbar-badge-dot" />
                  PRO Student
                </div>
              )}
              <div style={{ fontSize: 13, color: "var(--gray)" }}>
                {new Date().toLocaleDateString("en-GB", {
                  day: "numeric",
                  month: "short",
                  year: "numeric",
                })}
              </div>
            </div>
          </div>

          <div className="page-content">
            <NavigationButtons />

            {/* Progress bar on relevant sections */}
            {(activeSection === "dashboard" ||
              activeSection === "myinternships" ||
              activeSection === "reports") && (
              <div className="progress-card card mb-4">
                <div className="card-body">
                  <h5>Internship Progress</h5>
                  <ProgressBar
                    now={progressPercent}
                    label={progressSteps[currentStep]}
                    className="mb-2"
                  />
                  <div className="d-flex justify-content-between progress-steps">
                    {progressSteps.map((step, idx) => (
                      <span
                        key={step}
                        className={
                          idx === currentStep
                            ? "fw-bold text-primary"
                            : "text-muted"
                        }
                        style={{ fontSize: 12 }}
                      >
                        {step}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* ── DASHBOARD OVERVIEW ── */}
            {activeSection === "dashboard" && (
              <>
                {/* Mini stats */}
                <Row className="mb-4">
                  {[
                    {
                      icon: "📋",
                      value: applications.length,
                      label: "Applications",
                    },
                    {
                      icon: "🏢",
                      value: myInternships.length,
                      label: "Internships",
                    },
                    { icon: "📝", value: reports.length, label: "Reports" },
                    {
                      icon: "🏆",
                      value: myAssessments.filter(
                        (a) => a.status === "Completed",
                      ).length,
                      label: "Assessments Done",
                    },
                  ].map((s, i) => (
                    <Col md={3} sm={6} key={i} className="mb-3">
                      <div className="mini-stat">
                        <div className="mini-stat-icon">{s.icon}</div>
                        <div className="mini-stat-info">
                          <div className="mini-stat-value">{s.value}</div>
                          <div className="mini-stat-label">{s.label}</div>
                        </div>
                      </div>
                    </Col>
                  ))}
                </Row>

                <Row>
                  <Col lg={8}>
                    <Card className="mb-4">
                      <div className="card-body">
                        <div className="d-flex justify-content-between align-items-center mb-4">
                          <h5>Suggested Internships</h5>
                          <div className="d-flex gap-2">
                            <Form.Select
                              size="sm"
                              style={{ width: "auto" }}
                              onChange={(e) => {
                                const sorted = [...suggestedInternships].sort(
                                  (a, b) => {
                                    switch (e.target.value) {
                                      case "match":
                                        return b.matchScore - a.matchScore;
                                      case "deadline":
                                        return (
                                          new Date(a.deadline) -
                                          new Date(b.deadline)
                                        );
                                      case "stipend":
                                        return (
                                          parseInt(
                                            b.stipend.replace(/[^0-9]/g, ""),
                                          ) -
                                          parseInt(
                                            a.stipend.replace(/[^0-9]/g, ""),
                                          )
                                        );
                                      default:
                                        return 0;
                                    }
                                  },
                                );
                                setSuggestedInternships(sorted);
                              }}
                            >
                              <option value="match">Best Match</option>
                              <option value="deadline">Deadline</option>
                              <option value="stipend">Stipend</option>
                            </Form.Select>
                            <Form.Select
                              size="sm"
                              style={{ width: "auto" }}
                              onChange={(e) => {
                                const filtered =
                                  initialSuggestedInternships.filter((i) =>
                                    e.target.value === "all"
                                      ? true
                                      : i.type === e.target.value,
                                  );
                                setSuggestedInternships(filtered);
                              }}
                            >
                              <option value="all">All Types</option>
                              <option value="Remote">Remote</option>
                              <option value="Hybrid">Hybrid</option>
                              <option value="On-site">On-site</option>
                            </Form.Select>
                          </div>
                        </div>
                        <Row>
                          {suggestedInternships.map((internship) => (
                            <Col md={6} key={internship.id} className="mb-3">
                              <div className="internship-card-inner">
                                {internship.matchScore >= 90 && (
                                  <div className="match-badge">
                                    {internship.matchScore}% Match
                                  </div>
                                )}
                                <div className="d-flex align-items-center mb-3">
                                  <img
                                    src={internship.logo}
                                    alt={internship.company}
                                    style={{
                                      width: 36,
                                      height: 36,
                                      objectFit: "contain",
                                    }}
                                    className="me-3"
                                  />
                                  <div>
                                    <div
                                      style={{ fontWeight: 600, fontSize: 14 }}
                                    >
                                      {internship.title}
                                    </div>
                                    <div
                                      style={{
                                        fontSize: 12,
                                        color: "var(--gray)",
                                      }}
                                    >
                                      {internship.company}
                                    </div>
                                  </div>
                                </div>
                                <p
                                  style={{
                                    fontSize: 12,
                                    color: "var(--gray)",
                                    marginBottom: 12,
                                  }}
                                >
                                  {internship.description}
                                </p>
                                <div className="mb-3 d-flex flex-wrap gap-1">
                                  {internship.skills.map((s, i) => (
                                    <Badge bg="light" text="dark" key={i}>
                                      {s}
                                    </Badge>
                                  ))}
                                </div>
                                <div
                                  style={{ fontSize: 12, color: "var(--gray)" }}
                                  className="mb-1"
                                >
                                  <FaBuilding className="me-1" />
                                  {internship.location}
                                </div>
                                <div
                                  style={{ fontSize: 12, color: "var(--gray)" }}
                                  className="mb-1"
                                >
                                  <FaClock className="me-1" />
                                  {internship.duration}
                                </div>
                                <div
                                  style={{ fontSize: 12, color: "var(--gray)" }}
                                  className="mb-3"
                                >
                                  <FaDollarSign className="me-1" />
                                  {internship.stipend}
                                </div>
                                <div className="d-flex justify-content-between align-items-center">
                                  <Badge
                                    bg={
                                      internship.type === "Remote"
                                        ? "success"
                                        : internship.type === "Hybrid"
                                          ? "warning"
                                          : "primary"
                                    }
                                  >
                                    {internship.type}
                                  </Badge>
                                  <Button
                                    variant="primary"
                                    size="sm"
                                    onClick={() => handleApply(internship)}
                                  >
                                    Apply
                                  </Button>
                                </div>
                              </div>
                            </Col>
                          ))}
                        </Row>
                      </div>
                    </Card>
                  </Col>

                  <Col lg={4}>
                    <Card className="mb-4">
                      <div className="card-body">
                        <h5 className="mb-3">Notifications</h5>
                        {notifications.map((n) => (
                          <div key={n.id} className="notification-item">
                            <div className="notification-dot" />
                            <div className="notification-text">{n.message}</div>
                          </div>
                        ))}
                      </div>
                    </Card>
                    <Card>
                      <div className="card-body">
                        <h5 className="mb-3">Internship Guide</h5>
                        <p
                          style={{
                            fontSize: 13,
                            color: "var(--gray)",
                            marginBottom: 12,
                          }}
                        >
                          {videoData.desc}
                        </p>
                        <div className="ratio ratio-16x9">
                          <iframe
                            src={videoData.url}
                            title="Internship Guide"
                            allowFullScreen
                          ></iframe>
                        </div>
                      </div>
                    </Card>
                  </Col>
                </Row>
              </>
            )}

            {/* ── MY INTERNSHIPS ── */}
            {activeSection === "myinternships" && (
              <Row>
                {myInternships.map((internship) => (
                  <Col md={6} key={internship.id} className="mb-3">
                    <Card className="h-100">
                      <div className="card-body">
                        <h5>{internship.title}</h5>
                        <p
                          style={{
                            color: "var(--gray)",
                            fontSize: 14,
                            marginBottom: 12,
                          }}
                        >
                          {internship.company}
                        </p>
                        <Badge
                          bg={statusColor(internship.status)}
                          className="mb-3"
                        >
                          {internship.status.charAt(0).toUpperCase() +
                            internship.status.slice(1)}
                        </Badge>
                        <p style={{ fontSize: 13 }}>
                          <strong>Start:</strong> {internship.start}
                          <br />
                          <strong>End:</strong> {internship.end}
                        </p>
                        {internship.status === "current" && (
                          <Button
                            variant="primary"
                            className="mt-2"
                            onClick={() => setSelectedInternship(internship)}
                          >
                            Evaluate
                          </Button>
                        )}
                      </div>
                    </Card>
                  </Col>
                ))}
                {selectedInternship && (
                  <Col md={12}>
                    <Card className="mt-2">
                      <div className="card-body">
                        <h5>Evaluate {selectedInternship.title}</h5>
                        <Form>
                          <Form.Group className="mb-3">
                            <Form.Label>Feedback</Form.Label>
                            <Form.Control
                              as="textarea"
                              rows={4}
                              value={evaluation.text}
                              onChange={(e) =>
                                setEvaluation({
                                  ...evaluation,
                                  text: e.target.value,
                                })
                              }
                              placeholder="Share your experience..."
                            />
                          </Form.Group>
                          <Form.Check
                            type="checkbox"
                            label="Would recommend this internship"
                            checked={evaluation.recommend}
                            onChange={(e) =>
                              setEvaluation({
                                ...evaluation,
                                recommend: e.target.checked,
                              })
                            }
                            className="mb-3"
                          />
                          <Button
                            variant="primary"
                            onClick={() => {
                              alert("Evaluation submitted!");
                              setSelectedInternship(null);
                              setEvaluation({ text: "", recommend: false });
                            }}
                          >
                            Submit Evaluation
                          </Button>
                        </Form>
                      </div>
                    </Card>
                  </Col>
                )}
              </Row>
            )}

            {/* ── BROWSE ── */}
            {activeSection === "browse" && (
              <BrowseInternships
                internships={getFilteredInternships()}
                industries={industries}
                locations={locations}
                searchTerm={searchTerm}
                setSearchTerm={setSearchTerm}
                selectedIndustry={selectedIndustry}
                setSelectedIndustry={setSelectedIndustry}
                selectedLocation={selectedLocation}
                setSelectedLocation={setSelectedLocation}
                sortBy={sortBy}
                setSortBy={setSortBy}
                workType={workType}
                setWorkType={setWorkType}
                handleApply={handleApply}
              />
            )}

            {/* ── GUIDELINES ── */}
            {activeSection === "guidelines" && (
              <Card>
                <div className="card-body">
                  <h5>Internship Guidelines</h5>
                  <p
                    style={{
                      fontSize: 14,
                      color: "var(--gray)",
                      margin: "12px 0",
                    }}
                  >
                    {videoData.desc}
                  </p>
                  <div className="ratio ratio-16x9">
                    <iframe
                      src={videoData.url}
                      title="Guidelines"
                      allowFullScreen
                    ></iframe>
                  </div>
                </div>
              </Card>
            )}

            {/* ── PROFILE ── */}
            {activeSection === "profile" && (
              <>
                <Card className="mb-4">
                  <div className="card-body">
                    <h4 className="mb-4">My Profile</h4>
                    <Form>
                      <Row>
                        <Col md={6}>
                          <Form.Group className="mb-3">
                            <Form.Label>Full Name</Form.Label>
                            <Form.Control
                              type="text"
                              value={profile.name}
                              onChange={(e) =>
                                setProfile({ ...profile, name: e.target.value })
                              }
                              placeholder="Enter your full name"
                            />
                          </Form.Group>
                        </Col>
                        <Col md={6}>
                          <Form.Group className="mb-3">
                            <Form.Label>Email</Form.Label>
                            <Form.Control
                              type="email"
                              value={profile.email}
                              onChange={(e) =>
                                setProfile({
                                  ...profile,
                                  email: e.target.value,
                                })
                              }
                              placeholder="Enter your email"
                            />
                          </Form.Group>
                        </Col>
                      </Row>
                      <Row>
                        <Col md={6}>
                          <Form.Group className="mb-3">
                            <Form.Label>Major</Form.Label>
                            <Form.Control
                              type="text"
                              value={profile.major}
                              onChange={(e) =>
                                setProfile({
                                  ...profile,
                                  major: e.target.value,
                                })
                              }
                            />
                          </Form.Group>
                        </Col>
                        <Col md={6}>
                          <Form.Group className="mb-3">
                            <Form.Label>Semester</Form.Label>
                            <Form.Control
                              type="number"
                              value={profile.semester}
                              onChange={(e) =>
                                setProfile({
                                  ...profile,
                                  semester: e.target.value,
                                })
                              }
                              placeholder="Current semester"
                            />
                          </Form.Group>
                        </Col>
                      </Row>
                      <Form.Group className="mb-3">
                        <Form.Label>Skills</Form.Label>
                        <Form.Control
                          as="textarea"
                          rows={3}
                          value={profile.skills}
                          onChange={(e) =>
                            setProfile({ ...profile, skills: e.target.value })
                          }
                          placeholder="List your technical and soft skills"
                        />
                      </Form.Group>
                      <Button
                        variant="primary"
                        onClick={() => alert("Profile updated!")}
                      >
                        Save Changes
                      </Button>
                    </Form>
                  </div>
                </Card>

                <Card className="mb-4">
                  <div className="card-body">
                    <h4 className="mb-4">My Documents</h4>
                    <Form onSubmit={handleDocumentSubmit}>
                      <Row>
                        <Col md={6}>
                          <Form.Group className="mb-3">
                            <Form.Label>Document File</Form.Label>
                            <Form.Control
                              type="file"
                              name="file"
                              onChange={handleDocumentChange}
                              accept=".pdf,.doc,.docx"
                              required
                            />
                          </Form.Group>
                        </Col>
                        <Col md={6}>
                          <Form.Group className="mb-3">
                            <Form.Label>Document Type</Form.Label>
                            <Form.Select
                              name="type"
                              value={newDocument.type}
                              onChange={handleDocumentChange}
                            >
                              <option value="Certificate">Certificate</option>
                              <option value="Cover Letter">Cover Letter</option>
                              <option value="CV">CV</option>
                              <option value="Other">Other</option>
                            </Form.Select>
                          </Form.Group>
                        </Col>
                      </Row>
                      <Button type="submit" variant="primary">
                        <FaUpload className="me-2" />
                        Upload Document
                      </Button>
                    </Form>
                    {documents.length > 0 && (
                      <Row className="mt-4">
                        {documents.map((doc) => (
                          <Col md={6} key={doc.id} className="mb-3">
                            <Card className="h-100">
                              <div className="card-body">
                                <div
                                  style={{
                                    fontWeight: 600,
                                    fontSize: 14,
                                    marginBottom: 4,
                                  }}
                                >
                                  {doc.name}
                                </div>
                                <div
                                  style={{
                                    fontSize: 12,
                                    color: "var(--gray)",
                                    marginBottom: 8,
                                  }}
                                >
                                  {doc.type} · {doc.uploadDate}
                                </div>
                                <div className="d-flex gap-2">
                                  <Button
                                    variant="outline-primary"
                                    size="sm"
                                    onClick={() => handleViewDocument(doc)}
                                  >
                                    <FaEye className="me-1" />
                                    View
                                  </Button>
                                  <Button
                                    variant="outline-danger"
                                    size="sm"
                                    onClick={() => handleDeleteDocument(doc.id)}
                                  >
                                    <FaTrash className="me-1" />
                                    Delete
                                  </Button>
                                </div>
                              </div>
                            </Card>
                          </Col>
                        ))}
                      </Row>
                    )}
                  </div>
                </Card>

                <Card>
                  <div className="card-body">
                    <h4 className="mb-4">Posted Assessments</h4>
                    {myAssessments.filter((a) => a.posted).length > 0 ? (
                      <Row>
                        {myAssessments
                          .filter((a) => a.posted)
                          .map((a) => (
                            <Col md={6} key={a.id} className="mb-3">
                              <Card>
                                <div className="card-body">
                                  <div
                                    style={{ fontWeight: 600, fontSize: 14 }}
                                  >
                                    {a.title}
                                  </div>
                                  <div
                                    style={{
                                      fontSize: 13,
                                      color: "var(--gray)",
                                      marginTop: 4,
                                    }}
                                  >
                                    <FaStar
                                      className="me-1"
                                      style={{ color: "var(--gold)" }}
                                    />
                                    Score: {a.score}/100
                                  </div>
                                </div>
                              </Card>
                            </Col>
                          ))}
                      </Row>
                    ) : (
                      <p style={{ fontSize: 14, color: "var(--gray)" }}>
                        No assessments posted to profile.
                      </p>
                    )}
                  </div>
                </Card>
              </>
            )}

            {/* ── APPLICATIONS ── */}
            {activeSection === "applications" && (
              <Row>
                {myApplications.map((app) => (
                  <Col md={6} key={app.id} className="mb-3">
                    <Card className="h-100">
                      <div className="card-body">
                        <div
                          style={{
                            fontWeight: 700,
                            fontSize: 16,
                            marginBottom: 4,
                          }}
                        >
                          {app.position}
                        </div>
                        <div
                          style={{
                            fontSize: 13,
                            color: "var(--gray)",
                            marginBottom: 12,
                          }}
                        >
                          {app.company}
                        </div>
                        <Badge bg={statusColor(app.status)} className="mb-3">
                          {app.status}
                        </Badge>
                        <div style={{ fontSize: 13 }}>
                          <div>
                            <strong>Applied:</strong> {app.appliedDate}
                          </div>
                          <div>
                            <strong>Deadline:</strong> {app.deadline}
                          </div>
                          <div>
                            <strong>Match:</strong> {app.matchScore}%
                          </div>
                        </div>
                      </div>
                    </Card>
                  </Col>
                ))}
              </Row>
            )}

            {/* ── ASSESSMENTS ── */}
            {activeSection === "assessments" && (
              <Row>
                {myAssessments.map((assessment) => (
                  <Col md={6} key={assessment.id} className="mb-3">
                    <Card className="h-100">
                      <div className="card-body">
                        <div
                          style={{
                            fontWeight: 700,
                            fontSize: 15,
                            marginBottom: 4,
                          }}
                        >
                          {assessment.title}
                        </div>
                        <div
                          style={{
                            fontSize: 13,
                            color: "var(--gray)",
                            marginBottom: 12,
                          }}
                        >
                          {assessment.description}
                        </div>
                        <Badge
                          bg={statusColor(assessment.status)}
                          className="mb-3"
                        >
                          {assessment.status}
                        </Badge>
                        <div style={{ fontSize: 13, marginBottom: 12 }}>
                          <div>
                            <strong>Duration:</strong> {assessment.duration}
                          </div>
                          <div>
                            <strong>Questions:</strong> {assessment.questions}
                          </div>
                          {assessment.score !== null && (
                            <div>
                              <strong>Score:</strong> {assessment.score}/100
                            </div>
                          )}
                          <div>
                            <strong>Date:</strong> {assessment.date}
                          </div>
                        </div>
                        {assessment.status !== "Completed" && (
                          <Button
                            variant="primary"
                            size="sm"
                            onClick={() => setSelectedAssessment(assessment)}
                          >
                            {assessment.status === "Pending"
                              ? "Continue"
                              : "Start"}{" "}
                            Assessment
                          </Button>
                        )}
                        {assessment.status === "Completed" && (
                          <Button
                            variant={
                              assessment.posted
                                ? "outline-secondary"
                                : "outline-success"
                            }
                            size="sm"
                            onClick={() =>
                              handleTogglePostAssessment(assessment.id)
                            }
                          >
                            <FaStar className="me-1" />
                            {assessment.posted
                              ? "Remove from Profile"
                              : "Post to Profile"}
                          </Button>
                        )}
                      </div>
                    </Card>
                  </Col>
                ))}
              </Row>
            )}

            {/* ── COURSES ── */}
            {activeSection === "courses" && (
              <Row>
                {myCourses.map((course) => (
                  <Col md={6} key={course.id} className="mb-3">
                    <Card className="h-100">
                      <div className="card-body">
                        <div
                          style={{
                            fontWeight: 700,
                            fontSize: 15,
                            marginBottom: 4,
                          }}
                        >
                          {course.title}
                        </div>
                        <div
                          style={{
                            fontSize: 13,
                            color: "var(--gray)",
                            marginBottom: 12,
                          }}
                        >
                          Instructor: {course.instructor}
                        </div>
                        <ProgressBar
                          now={course.progress}
                          className="mb-2"
                          style={{ height: 6 }}
                        />
                        <div
                          style={{
                            fontSize: 12,
                            color: "var(--gray)",
                            marginBottom: 12,
                          }}
                        >
                          {course.progress}% complete
                        </div>
                        <div style={{ fontSize: 13, marginBottom: 12 }}>
                          <div>
                            <strong>Duration:</strong> {course.duration}
                          </div>
                          <div>
                            <strong>Topics:</strong> {course.topics.join(", ")}
                          </div>
                        </div>
                        <Button
                          variant={
                            course.enrolled ? "primary" : "outline-primary"
                          }
                          size="sm"
                          onClick={() =>
                            course.enrolled
                              ? alert(`Continue learning ${course.title}`)
                              : setMyCourses(
                                  myCourses.map((c) =>
                                    c.id === course.id
                                      ? { ...c, enrolled: true }
                                      : c,
                                  ),
                                )
                          }
                        >
                          {course.enrolled ? "Continue" : "Enroll"}
                        </Button>
                      </div>
                    </Card>
                  </Col>
                ))}
              </Row>
            )}

            {/* ── WORKSHOPS ── */}
            {activeSection === "workshops" && (
              <>
                <Row>
                  {workshops.map((workshop) => (
                    <Col md={6} key={workshop.id} className="mb-3">
                      <Card className="h-100">
                        <div className="card-body">
                          <div
                            style={{
                              fontWeight: 700,
                              fontSize: 15,
                              marginBottom: 4,
                            }}
                          >
                            {workshop.title}
                          </div>
                          <div
                            style={{
                              fontSize: 13,
                              color: "var(--gray)",
                              marginBottom: 12,
                            }}
                          >
                            {workshop.date} at {workshop.time}
                          </div>
                          <div className="d-flex gap-2 mb-3">
                            <Badge
                              bg={workshop.type === "live" ? "primary" : "info"}
                            >
                              {workshop.type.charAt(0).toUpperCase() +
                                workshop.type.slice(1)}
                            </Badge>
                            <Badge
                              bg={
                                workshop.completed
                                  ? "success"
                                  : workshop.registered
                                    ? "warning"
                                    : "secondary"
                              }
                            >
                              {workshop.completed
                                ? "Completed"
                                : workshop.registered
                                  ? "Registered"
                                  : "Not Registered"}
                            </Badge>
                          </div>
                          {!workshop.registered && (
                            <Button
                              variant="primary"
                              size="sm"
                              onClick={() =>
                                setWorkshops(
                                  workshops.map((w) =>
                                    w.id === workshop.id
                                      ? { ...w, registered: true }
                                      : w,
                                  ),
                                )
                              }
                            >
                              Register
                            </Button>
                          )}
                          {workshop.registered &&
                            !workshop.completed &&
                            workshop.type === "live" && (
                              <Button
                                variant="primary"
                                size="sm"
                                onClick={() => handleJoinLiveWorkshop(workshop)}
                              >
                                Join Live
                              </Button>
                            )}
                          {workshop.registered &&
                            !workshop.completed &&
                            workshop.type === "recorded" && (
                              <Button
                                variant="primary"
                                size="sm"
                                onClick={() => handlePlayPreRecorded(workshop)}
                              >
                                Play Recorded
                              </Button>
                            )}
                        </div>
                      </Card>
                    </Col>
                  ))}
                </Row>
                {(inLiveWorkshop || preRecordedPlaying) && selectedWorkshop && (
                  <Card className="mt-3">
                    <div className="card-body">
                      <h5>{selectedWorkshop.title}</h5>
                      <div className="ratio ratio-16x9 mb-3">
                        <iframe
                          src={
                            selectedWorkshop.videoUrl ||
                            "https://www.youtube.com/embed/dQw4w9WgXcQ"
                          }
                          title={selectedWorkshop.title}
                          allowFullScreen
                        ></iframe>
                      </div>
                      {inLiveWorkshop && (
                        <div className="mb-3">
                          <h6 style={{ fontWeight: 600, marginBottom: 8 }}>
                            Chat
                          </h6>
                          <div
                            className="border p-3 mb-2"
                            style={{
                              height: 200,
                              overflowY: "auto",
                              borderRadius: 8,
                              fontSize: 13,
                            }}
                          >
                            {chatMessages.map((msg) => (
                              <div key={msg.id}>
                                <strong>{msg.sender}:</strong> {msg.message}
                              </div>
                            ))}
                          </div>
                          <InputGroup>
                            <Form.Control
                              value={chatInput}
                              onChange={(e) => setChatInput(e.target.value)}
                              placeholder="Type a message..."
                            />
                            <Button
                              variant="primary"
                              onClick={handleSendChatMessage}
                            >
                              Send
                            </Button>
                          </InputGroup>
                        </div>
                      )}
                      <Form.Group className="mb-3">
                        <Form.Label>Notes</Form.Label>
                        <Form.Control
                          as="textarea"
                          rows={3}
                          value={notes}
                          onChange={(e) => setNotes(e.target.value)}
                          placeholder="Take notes here..."
                        />
                      </Form.Group>
                      <div className="d-flex gap-2 flex-wrap">
                        {preRecordedPlaying && (
                          <>
                            <Button
                              variant="primary"
                              size="sm"
                              onClick={handlePausePreRecorded}
                            >
                              <FaPause /> Pause
                            </Button>
                            <Button
                              variant="outline-secondary"
                              size="sm"
                              onClick={handleStopPreRecorded}
                            >
                              <FaStop /> Stop
                            </Button>
                          </>
                        )}
                        <Button
                          variant="outline-primary"
                          size="sm"
                          onClick={handleSaveNotes}
                        >
                          Save Notes
                        </Button>
                        <Button
                          variant="success"
                          size="sm"
                          onClick={() =>
                            handleCompleteWorkshop(selectedWorkshop)
                          }
                        >
                          Complete Workshop
                        </Button>
                      </div>
                      {certificate &&
                        certificate.workshopId === selectedWorkshop.id && (
                          <Alert variant="success" className="mt-3">
                            Certificate issued for {certificate.title} on{" "}
                            {certificate.date}
                          </Alert>
                        )}
                    </div>
                  </Card>
                )}
              </>
            )}

            {/* ── REPORTS ── */}
            {activeSection === "reports" && (
              <>
                <Card className="mb-4">
                  <div className="card-body">
                    <h4 className="mb-4">Submit Report</h4>
                    <Form onSubmit={handleReportSubmit}>
                      <Form.Group className="mb-3">
                        <Form.Label>Report Title</Form.Label>
                        <Form.Control
                          type="text"
                          name="title"
                          value={report.title}
                          onChange={handleReportChange}
                          required
                          placeholder="Enter report title"
                        />
                      </Form.Group>
                      <Form.Group className="mb-3">
                        <Form.Label>Report Content</Form.Label>
                        <Form.Control
                          as="textarea"
                          rows={6}
                          name="body"
                          value={report.body}
                          onChange={handleReportChange}
                          required
                          placeholder="Write your report content here..."
                        />
                      </Form.Group>
                      <Form.Group className="mb-3">
                        <Form.Label>Attachments</Form.Label>
                        <Form.Control
                          type="file"
                          name="file"
                          onChange={handleReportChange}
                          accept=".pdf,.doc,.docx"
                        />
                      </Form.Group>
                      <Button type="submit" variant="primary">
                        Submit Report
                      </Button>
                    </Form>
                  </div>
                </Card>
                <Card>
                  <div className="card-body">
                    <h5 className="mb-4">Past Reports</h5>
                    {reports.map((r) => (
                      <Card key={r.id} className="mb-3">
                        <div className="card-body">
                          <div className="d-flex justify-content-between align-items-start mb-2">
                            <div>
                              <div style={{ fontWeight: 700, fontSize: 15 }}>
                                {r.title}
                              </div>
                              <div
                                style={{ fontSize: 13, color: "var(--gray)" }}
                              >
                                {r.internship}
                              </div>
                            </div>
                            <Badge bg={statusColor(r.status)}>
                              {r.status.charAt(0).toUpperCase() +
                                r.status.slice(1)}
                            </Badge>
                          </div>
                          {(r.status === "flagged" ||
                            r.status === "rejected") &&
                            r.comments && (
                              <Alert
                                variant="info"
                                className="mt-2 mb-2"
                                style={{ fontSize: 13 }}
                              >
                                <FaComment className="me-2" />
                                {r.comments}
                              </Alert>
                            )}
                          {r.appeal && (
                            <div
                              style={{
                                fontSize: 13,
                                color: "var(--gray)",
                                marginBottom: 8,
                              }}
                            >
                              <strong>Appeal:</strong> {r.appeal.message} —{" "}
                              <Badge bg="warning">{r.appeal.status}</Badge>
                            </div>
                          )}
                          <div className="d-flex gap-2 mt-2">
                            <Button
                              variant="outline-secondary"
                              size="sm"
                              onClick={() => alert("Edit not implemented")}
                            >
                              Edit
                            </Button>
                            <Button
                              variant="outline-danger"
                              size="sm"
                              onClick={() =>
                                setReports(
                                  reports.filter((rep) => rep.id !== r.id),
                                )
                              }
                            >
                              Delete
                            </Button>
                            {(r.status === "flagged" ||
                              r.status === "rejected") &&
                              !r.appeal && (
                                <Button
                                  variant="outline-warning"
                                  size="sm"
                                  onClick={() => {
                                    setSelectedReport(r);
                                    setShowAppealModal(true);
                                  }}
                                >
                                  Appeal
                                </Button>
                              )}
                          </div>
                        </div>
                      </Card>
                    ))}
                  </div>
                </Card>
              </>
            )}

            {/* ── APPOINTMENTS ── */}
            {activeSection === "appointment" && (
              <Row>
                {appointments.map((app) => (
                  <Col md={6} key={app.id} className="mb-3">
                    <Card className="h-100">
                      <div className="card-body">
                        <div
                          style={{
                            fontWeight: 700,
                            fontSize: 15,
                            marginBottom: 4,
                          }}
                        >
                          {app.type}
                        </div>
                        <div
                          style={{
                            fontSize: 13,
                            color: "var(--gray)",
                            marginBottom: 12,
                          }}
                        >
                          With: {app.with}
                        </div>
                        <Badge bg={statusColor(app.status)} className="mb-3">
                          {app.status.charAt(0).toUpperCase() +
                            app.status.slice(1)}
                        </Badge>
                        <div style={{ fontSize: 13, marginBottom: 12 }}>
                          <strong>Time:</strong> {app.time}
                        </div>
                        {app.status === "pending" && (
                          <div className="d-flex gap-2">
                            <Button
                              variant="success"
                              size="sm"
                              onClick={() => handleAcceptAppointment(app.id)}
                            >
                              <FaCheck className="me-1" />
                              Accept
                            </Button>
                            <Button
                              variant="danger"
                              size="sm"
                              onClick={() => handleRejectAppointment(app.id)}
                            >
                              <FaTimes className="me-1" />
                              Reject
                            </Button>
                          </div>
                        )}
                      </div>
                    </Card>
                  </Col>
                ))}
              </Row>
            )}

            {/* ── COMPANY VIEWS ── */}
            {activeSection === "companyviews" && (
              <Card>
                <div className="card-body">
                  <h5 className="mb-4">Companies Who Viewed Your Profile</h5>
                  {companyViews.length > 0 ? (
                    <div className="d-flex flex-wrap">
                      {companyViews.map((company, i) => (
                        <div key={i} className="company-view-tag">
                          {company}
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p style={{ fontSize: 14, color: "var(--gray)" }}>
                      No companies have viewed your profile yet.
                    </p>
                  )}
                </div>
              </Card>
            )}
          </div>
        </main>
      </div>

      {/* ── APPEAL MODAL ── */}
      <Modal
        show={showAppealModal}
        onHide={() => setShowAppealModal(false)}
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>Appeal: {selectedReport?.title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group>
            <Form.Label>Appeal Message</Form.Label>
            <Form.Control
              as="textarea"
              rows={4}
              value={appealMessage}
              onChange={(e) => setAppealMessage(e.target.value)}
              placeholder="Explain why the report should be reconsidered..."
              required
            />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="outline-secondary"
            onClick={() => setShowAppealModal(false)}
          >
            Cancel
          </Button>
          <Button
            variant="primary"
            onClick={handleAppealSubmit}
            disabled={!appealMessage.trim()}
          >
            <FaPaperPlane className="me-2" />
            Submit Appeal
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default StudentDashboard;
