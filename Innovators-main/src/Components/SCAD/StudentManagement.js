import React, { useState, useEffect } from "react";
import { Card, Button, Row, Col, Form } from "react-bootstrap";

function StudentManagement() {
  const [students, setStudents] = useState([]);
  const [filter, setFilter] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedStudent, setSelectedStudent] = useState(null);

  const [suggestedInternships] = useState([
    {
      id: 1,
      company: "Tech Solutions",
      logo: "https://upload.wikimedia.org/wikipedia/commons/4/44/Google-flutter-logo.svg",
      title: "Frontend Intern",
      skills: ["React", "JavaScript", "HTML/CSS"],
      duration: "3 months",
      stipend: "$1000/month",
      location: "Cairo, Egypt",
      type: "Remote",
      description: "Work on building responsive UI components.",
    },
    {
      id: 2,
      company: "Designify",
      logo: "https://upload.wikimedia.org/wikipedia/commons/a/a7/React-icon.svg",
      title: "UI/UX Intern",
      skills: ["Figma", "Adobe XD", "User Research"],
      duration: "4 months",
      stipend: "$1200/month",
      location: "Alexandria, Egypt",
      type: "Hybrid",
      description: "Assist in designing user-friendly interfaces.",
    },
  ]);

  const [internshipFilters, setInternshipFilters] = useState({
    industry: "",
    duration: "",
    paidStatus: "",
    search: "",
  });
  const [selectedInternship, setSelectedInternship] = useState(null);

  useEffect(() => {
    setStudents([
      {
        id: 1,
        name: "Ahmed Mohamed",
        major: "Computer Science",
        gpa: 3.8,
        internshipStatus: "applied",
        company: "TechCorp",
        applicationDate: "2024-03-15",
      },
      {
        id: 2,
        name: "Sarah Ahmed",
        major: "Business Administration",
        gpa: 3.9,
        internshipStatus: "accepted",
        company: "DesignStudio",
        applicationDate: "2024-03-10",
      },
      {
        id: 3,
        name: "Mohamed Ali",
        major: "Engineering",
        gpa: 3.7,
        internshipStatus: "pending",
        company: "InnovateLabs",
        applicationDate: "2024-03-18",
      },
    ]);
  }, []);

  const filteredStudents = students.filter((s) => {
    const matchesFilter = filter === "all" || s.internshipStatus === filter;
    const matchesSearch =
      s.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      s.major.toLowerCase().includes(searchTerm.toLowerCase()) ||
      s.company.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const filteredInternships = suggestedInternships.filter((i) => {
    const searchMatch =
      i.title.toLowerCase().includes(internshipFilters.search.toLowerCase()) ||
      i.company.toLowerCase().includes(internshipFilters.search.toLowerCase());
    const durationMatch =
      internshipFilters.duration === "" ||
      i.duration.includes(internshipFilters.duration);
    const paidMatch =
      internshipFilters.paidStatus === "" ||
      (internshipFilters.paidStatus === "paid" && i.stipend) ||
      (internshipFilters.paidStatus === "unpaid" && !i.stipend);
    return searchMatch && durationMatch && paidMatch;
  });

  const statusColor = (s) =>
    ({
      applied: "status-pending",
      accepted: "status-approved",
      rejected: "status-rejected",
      pending: "status-pending",
    })[s] || "";

  return (
    <div>
      {/* Student Table */}
      <div className="filter-bar">
        <input
          type="text"
          className="search-input"
          placeholder="Search students..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="form-group"
        >
          <option value="all">All Students</option>
          <option value="applied">Applied</option>
          <option value="accepted">Accepted</option>
          <option value="rejected">Rejected</option>
          <option value="pending">Pending</option>
        </select>
      </div>

      <div className="section-card" style={{ padding: 0, marginBottom: 24 }}>
        <table className="data-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Major</th>
              <th>GPA</th>
              <th>Company</th>
              <th>Applied</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredStudents.map((s) => (
              <tr key={s.id}>
                <td style={{ fontWeight: 600 }}>{s.name}</td>
                <td style={{ color: "var(--gray)" }}>{s.major}</td>
                <td>{s.gpa}</td>
                <td style={{ color: "var(--gray)" }}>{s.company}</td>
                <td style={{ color: "var(--gray)" }}>{s.applicationDate}</td>
                <td>
                  <span
                    className={`status-badge ${statusColor(s.internshipStatus)}`}
                  >
                    {s.internshipStatus}
                  </span>
                </td>
                <td>
                  <button
                    className="btn btn-outline-primary btn-sm"
                    onClick={() => setSelectedStudent(s)}
                  >
                    View
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {selectedStudent && (
        <div className="section-card" style={{ marginBottom: 24 }}>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "flex-start",
              marginBottom: 16,
            }}
          >
            <h3
              style={{
                fontFamily: "Playfair Display, serif",
                fontSize: 18,
                fontWeight: 700,
              }}
            >
              Student Profile
            </h3>
            <button
              className="btn btn-secondary btn-sm"
              onClick={() => setSelectedStudent(null)}
            >
              Close
            </button>
          </div>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(3, 1fr)",
              gap: 16,
            }}
          >
            {[
              ["Name", selectedStudent.name],
              ["Major", selectedStudent.major],
              ["GPA", selectedStudent.gpa],
              ["Company", selectedStudent.company],
              ["Application Date", selectedStudent.applicationDate],
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
                <div style={{ fontWeight: 600, fontSize: 14 }}>{value}</div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Internship Filters */}
      <div className="section-card">
        <h3
          style={{
            fontFamily: "Playfair Display, serif",
            fontSize: 18,
            fontWeight: 700,
            marginBottom: 16,
          }}
        >
          Browse Internships
        </h3>
        <div className="filter-bar" style={{ marginBottom: 20 }}>
          <input
            className="search-input"
            placeholder="Search by title or company"
            value={internshipFilters.search}
            onChange={(e) =>
              setInternshipFilters({
                ...internshipFilters,
                search: e.target.value,
              })
            }
          />
          <input
            className="form-group"
            placeholder="Filter by Duration"
            value={internshipFilters.duration}
            onChange={(e) =>
              setInternshipFilters({
                ...internshipFilters,
                duration: e.target.value,
              })
            }
          />
          <select
            className="form-group"
            value={internshipFilters.paidStatus}
            onChange={(e) =>
              setInternshipFilters({
                ...internshipFilters,
                paidStatus: e.target.value,
              })
            }
          >
            <option value="">All</option>
            <option value="paid">Paid</option>
            <option value="unpaid">Unpaid</option>
          </select>
        </div>
        <Row>
          {filteredInternships.map((i) => (
            <Col md={6} key={i.id} className="mb-3">
              <div
                style={{
                  border: "1px solid var(--border)",
                  borderRadius: 12,
                  padding: 18,
                  transition: "all 0.25s",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 12,
                    marginBottom: 12,
                  }}
                >
                  <img
                    src={i.logo}
                    alt={i.company}
                    style={{ width: 36, height: 36, objectFit: "contain" }}
                  />
                  <div>
                    <div style={{ fontWeight: 700, fontSize: 14 }}>
                      {i.title}
                    </div>
                    <div style={{ fontSize: 12, color: "var(--gray)" }}>
                      {i.company}
                    </div>
                  </div>
                </div>
                <div
                  style={{
                    fontSize: 13,
                    color: "var(--gray)",
                    marginBottom: 4,
                  }}
                >
                  <strong>Duration:</strong> {i.duration}
                </div>
                <div
                  style={{
                    fontSize: 13,
                    color: "var(--gray)",
                    marginBottom: 8,
                  }}
                >
                  <strong>Stipend:</strong> {i.stipend || "Unpaid"}
                </div>
                <button
                  className="btn btn-outline-primary btn-sm"
                  onClick={() => setSelectedInternship(i)}
                >
                  View Details
                </button>
              </div>
            </Col>
          ))}
        </Row>

        {selectedInternship && (
          <div
            style={{
              marginTop: 16,
              border: "1px solid var(--border)",
              borderRadius: 12,
              padding: 20,
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                marginBottom: 14,
              }}
            >
              <h4
                style={{
                  fontFamily: "Playfair Display, serif",
                  fontSize: 16,
                  fontWeight: 700,
                }}
              >
                Internship Details
              </h4>
              <button
                className="btn btn-secondary btn-sm"
                onClick={() => setSelectedInternship(null)}
              >
                Close
              </button>
            </div>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: 12,
                fontSize: 13,
              }}
            >
              <div>
                <strong>Title:</strong> {selectedInternship.title}
              </div>
              <div>
                <strong>Company:</strong> {selectedInternship.company}
              </div>
              <div>
                <strong>Duration:</strong> {selectedInternship.duration}
              </div>
              <div>
                <strong>Stipend:</strong>{" "}
                {selectedInternship.stipend || "Unpaid"}
              </div>
              <div style={{ gridColumn: "1 / -1" }}>
                <strong>Skills:</strong> {selectedInternship.skills.join(", ")}
              </div>
              <div style={{ gridColumn: "1 / -1" }}>
                <strong>Description:</strong> {selectedInternship.description}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default StudentManagement;
