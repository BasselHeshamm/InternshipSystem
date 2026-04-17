import React, { useState, useEffect } from "react";

function WorkshopManagement() {
  const [workshops, setWorkshops] = useState([]);
  const [newWorkshop, setNewWorkshop] = useState({
    title: "",
    startDate: "",
    endDate: "",
    startTime: "",
    endTime: "",
    location: "",
    capacity: "",
    description: "",
    speakers: "",
    agenda: "",
  });
  const [editingId, setEditingId] = useState(null);
  const [showDetails, setShowDetails] = useState(false);
  const [selectedWorkshop, setSelectedWorkshop] = useState(null);

  useEffect(() => {
    setWorkshops([
      {
        id: 1,
        title: "Resume Building Workshop",
        startDate: "2025-05-01",
        endDate: "2025-05-01",
        startTime: "14:00",
        endTime: "16:00",
        location: "Room 101",
        capacity: 30,
        registered: 15,
        description: "Learn how to create an effective resume.",
        speakers: "Jane Doe (Career Coach)",
        agenda:
          "14:00-14:30: Introduction\n14:30-15:30: Resume Writing\n15:30-16:00: Q&A",
      },
      {
        id: 2,
        title: "Interview Preparation",
        startDate: "2025-05-05",
        endDate: "2025-05-05",
        startTime: "15:30",
        endTime: "17:00",
        location: "Room 203",
        capacity: 25,
        registered: 20,
        description: "Tips for successful job interviews.",
        speakers: "Sarah Lee (Recruiter)",
        agenda: "15:30-16:15: Techniques\n16:15-17:00: Mock Interviews",
      },
      {
        id: 3,
        title: "Career Fair Preparation",
        startDate: "2025-05-10",
        endDate: "2025-05-10",
        startTime: "13:00",
        endTime: "15:00",
        location: "Auditorium",
        capacity: 50,
        registered: 35,
        description: "How to make the most of the career fair.",
        speakers: "",
        agenda: "",
      },
    ]);
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewWorkshop((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editingId) {
      setWorkshops(
        workshops.map((w) =>
          w.id === editingId
            ? { ...w, ...newWorkshop, id: editingId, registered: w.registered }
            : w,
        ),
      );
      setEditingId(null);
    } else {
      setWorkshops([
        ...workshops,
        { id: Date.now(), ...newWorkshop, registered: 0 },
      ]);
    }
    setNewWorkshop({
      title: "",
      startDate: "",
      endDate: "",
      startTime: "",
      endTime: "",
      location: "",
      capacity: "",
      description: "",
      speakers: "",
      agenda: "",
    });
  };

  const handleEdit = (w) => {
    setEditingId(w.id);
    setNewWorkshop({
      title: w.title || "",
      startDate: w.startDate || "",
      endDate: w.endDate || "",
      startTime: w.startTime || "",
      endTime: w.endTime || "",
      location: w.location || "",
      capacity: w.capacity || "",
      description: w.description || "",
      speakers: w.speakers || "",
      agenda: w.agenda || "",
    });
  };
  const handleDelete = (id) =>
    setWorkshops(workshops.filter((w) => w.id !== id));

  return (
    <div>
      {/* Form */}
      <div className="section-card workshop-form">
        <h3
          style={{
            fontFamily: "Playfair Display, serif",
            fontSize: 18,
            fontWeight: 700,
            marginBottom: 20,
          }}
        >
          {editingId ? "Edit Workshop" : "Schedule New Workshop"}
        </h3>
        <form onSubmit={handleSubmit}>
          <div
            style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}
          >
            <div className="form-group">
              <label>Title</label>
              <input
                type="text"
                name="title"
                value={newWorkshop.title}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="form-group">
              <label>Location</label>
              <input
                type="text"
                name="location"
                value={newWorkshop.location}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="form-group">
              <label>Start Date</label>
              <input
                type="date"
                name="startDate"
                value={newWorkshop.startDate}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="form-group">
              <label>End Date</label>
              <input
                type="date"
                name="endDate"
                value={newWorkshop.endDate}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="form-group">
              <label>Start Time</label>
              <input
                type="time"
                name="startTime"
                value={newWorkshop.startTime}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="form-group">
              <label>End Time</label>
              <input
                type="time"
                name="endTime"
                value={newWorkshop.endTime}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="form-group">
              <label>Capacity</label>
              <input
                type="number"
                name="capacity"
                value={newWorkshop.capacity}
                onChange={handleInputChange}
                min="1"
                required
              />
            </div>
            <div className="form-group">
              <label>Speaker Bios</label>
              <input
                type="text"
                name="speakers"
                value={newWorkshop.speakers}
                onChange={handleInputChange}
                placeholder="Jane Doe (Career Coach)"
              />
            </div>
          </div>
          <div className="form-group">
            <label>Description</label>
            <textarea
              name="description"
              value={newWorkshop.description}
              onChange={handleInputChange}
              required
              style={{ width: "100%", minHeight: 80, resize: "vertical" }}
            />
          </div>
          <div className="form-group">
            <label>Agenda</label>
            <textarea
              name="agenda"
              value={newWorkshop.agenda}
              onChange={handleInputChange}
              placeholder="14:00-14:30: Introduction"
              style={{ width: "100%", minHeight: 80, resize: "vertical" }}
            />
          </div>
          <div style={{ display: "flex", gap: 8 }}>
            <button type="submit" className="btn btn-primary">
              {editingId ? "Update Workshop" : "Schedule Workshop"}
            </button>
            {editingId && (
              <button
                type="button"
                className="btn btn-secondary"
                onClick={() => {
                  setEditingId(null);
                  setNewWorkshop({
                    title: "",
                    startDate: "",
                    endDate: "",
                    startTime: "",
                    endTime: "",
                    location: "",
                    capacity: "",
                    description: "",
                    speakers: "",
                    agenda: "",
                  });
                }}
              >
                Cancel
              </button>
            )}
          </div>
        </form>
      </div>

      {/* Table */}
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
          Upcoming Workshops
        </div>
        <table className="data-table">
          <thead>
            <tr>
              <th>Title</th>
              <th>Date</th>
              <th>Time</th>
              <th>Location</th>
              <th>Capacity</th>
              <th>Registered</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {workshops.map((w) => (
              <tr key={w.id}>
                <td style={{ fontWeight: 600 }}>{w.title}</td>
                <td style={{ color: "var(--gray)" }}>
                  {w.startDate}
                  {w.startDate !== w.endDate ? ` → ${w.endDate}` : ""}
                </td>
                <td style={{ color: "var(--gray)" }}>
                  {w.startTime} – {w.endTime}
                </td>
                <td style={{ color: "var(--gray)" }}>{w.location}</td>
                <td>{w.capacity}</td>
                <td>
                  <span
                    style={{
                      fontWeight: 600,
                      color:
                        w.registered >= w.capacity
                          ? "var(--red)"
                          : "var(--text-primary)",
                    }}
                  >
                    {w.registered}/{w.capacity}
                  </span>
                </td>
                <td>
                  <div className="action-buttons">
                    <button
                      className="btn btn-outline-primary btn-sm"
                      onClick={() => {
                        setSelectedWorkshop(w);
                        setShowDetails(true);
                      }}
                    >
                      View
                    </button>
                    <button
                      className="btn btn-secondary btn-sm"
                      onClick={() => handleEdit(w)}
                    >
                      Edit
                    </button>
                    <button
                      className="btn btn-danger btn-sm"
                      onClick={() => handleDelete(w.id)}
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Details Modal */}
      {showDetails && selectedWorkshop && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(0,0,0,0.45)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 200,
          }}
        >
          <div
            style={{
              background: "var(--white)",
              borderRadius: 16,
              width: "90%",
              maxWidth: 520,
              maxHeight: "80vh",
              overflowY: "auto",
              boxShadow: "var(--shadow-lg)",
            }}
          >
            <div
              style={{
                padding: "18px 22px",
                borderBottom: "1px solid var(--border)",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <div
                style={{
                  fontFamily: "Playfair Display, serif",
                  fontSize: 18,
                  fontWeight: 700,
                }}
              >
                {selectedWorkshop.title}
              </div>
              <button
                onClick={() => setShowDetails(false)}
                style={{
                  background: "none",
                  border: "none",
                  fontSize: 20,
                  cursor: "pointer",
                  color: "var(--gray)",
                  lineHeight: 1,
                }}
              >
                ×
              </button>
            </div>
            <div style={{ padding: "20px 22px" }}>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr",
                  gap: 14,
                  marginBottom: 14,
                }}
              >
                {[
                  [
                    "Start",
                    `${selectedWorkshop.startDate} ${selectedWorkshop.startTime}`,
                  ],
                  [
                    "End",
                    `${selectedWorkshop.endDate} ${selectedWorkshop.endTime}`,
                  ],
                  ["Location", selectedWorkshop.location],
                  [
                    "Registered",
                    `${selectedWorkshop.registered}/${selectedWorkshop.capacity}`,
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
              <div style={{ marginBottom: 12 }}>
                <div
                  style={{
                    fontSize: 11,
                    color: "var(--gray)",
                    textTransform: "uppercase",
                    letterSpacing: 1,
                    marginBottom: 4,
                  }}
                >
                  Description
                </div>
                <div style={{ fontSize: 13 }}>
                  {selectedWorkshop.description}
                </div>
              </div>
              {selectedWorkshop.speakers && (
                <div style={{ marginBottom: 12 }}>
                  <div
                    style={{
                      fontSize: 11,
                      color: "var(--gray)",
                      textTransform: "uppercase",
                      letterSpacing: 1,
                      marginBottom: 4,
                    }}
                  >
                    Speakers
                  </div>
                  <div style={{ fontSize: 13 }}>
                    {selectedWorkshop.speakers}
                  </div>
                </div>
              )}
              {selectedWorkshop.agenda && (
                <div>
                  <div
                    style={{
                      fontSize: 11,
                      color: "var(--gray)",
                      textTransform: "uppercase",
                      letterSpacing: 1,
                      marginBottom: 4,
                    }}
                  >
                    Agenda
                  </div>
                  <div style={{ fontSize: 13, whiteSpace: "pre-line" }}>
                    {selectedWorkshop.agenda}
                  </div>
                </div>
              )}
            </div>
            <div
              style={{
                padding: "14px 22px",
                borderTop: "1px solid var(--border)",
                display: "flex",
                justifyContent: "flex-end",
              }}
            >
              <button
                className="btn btn-secondary btn-sm"
                onClick={() => setShowDetails(false)}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default WorkshopManagement;
