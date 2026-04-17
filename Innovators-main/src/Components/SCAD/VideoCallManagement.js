import React, { useState } from "react";
import { Modal, Button, Badge } from "react-bootstrap";
import {
  FaVideo,
  FaMicrophone,
  FaMicrophoneSlash,
  FaVideoSlash,
  FaCheck,
  FaTimes,
  FaShareSquare,
  FaSignOutAlt,
  FaRegEye,
} from "react-icons/fa";

function VideoCallManagement() {
  const [inCall, setInCall] = useState(false);
  const [callMuted, setCallMuted] = useState(false);
  const [callVideo, setCallVideo] = useState(true);
  const [callScreen, setCallScreen] = useState(false);
  const [otherLeftCall, setOtherLeftCall] = useState(false);
  const [incomingCall, setIncomingCall] = useState(null);
  const [systemNotifications, setSystemNotifications] = useState([]);
  const [appointments, setAppointments] = useState([
    {
      id: 1,
      with: "Student A",
      type: "Career Guidance",
      time: "2:00 PM",
      status: "pending",
    },
    {
      id: 2,
      with: "Student B",
      type: "Technical Interview",
      time: "3:30 PM",
      status: "accepted",
    },
  ]);

  const onlineUsers = { "Student A": true, "Student B": false };

  const handleAcceptAppointment = (id) => {
    setAppointments(
      appointments.map((a) => (a.id === id ? { ...a, status: "accepted" } : a)),
    );
    setSystemNotifications([
      ...systemNotifications,
      { id: Date.now(), message: "Appointment accepted." },
    ]);
  };

  const handleRejectAppointment = (id) => {
    setAppointments(
      appointments.map((a) => (a.id === id ? { ...a, status: "rejected" } : a)),
    );
    setSystemNotifications([
      ...systemNotifications,
      { id: Date.now(), message: "Appointment rejected." },
    ]);
  };

  const handleLeaveCall = () => {
    setInCall(false);
    setOtherLeftCall(false);
    setSystemNotifications([
      ...systemNotifications,
      { id: Date.now(), message: "You left the call." },
    ]);
  };

  return (
    <div>
      <button
        className="btn btn-warning"
        style={{ marginBottom: 20 }}
        onClick={() =>
          setIncomingCall({ with: "Student A", type: "Career Guidance" })
        }
      >
        Simulate Incoming Call
      </button>

      {/* Appointments */}
      <div className="section-card" style={{ padding: 0, marginBottom: 20 }}>
        <div
          style={{
            padding: "16px 20px",
            borderBottom: "1px solid var(--border)",
            fontFamily: "Playfair Display, serif",
            fontSize: 16,
            fontWeight: 700,
          }}
        >
          Appointments
        </div>
        <table className="data-table">
          <thead>
            <tr>
              <th>With</th>
              <th>Online</th>
              <th>Type</th>
              <th>Time</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {appointments.map((app) => (
              <tr key={app.id}>
                <td style={{ fontWeight: 600 }}>{app.with}</td>
                <td>
                  {onlineUsers[app.with] ? (
                    <span
                      style={{
                        background: "rgba(22,163,74,0.12)",
                        color: "#15803d",
                        borderRadius: 6,
                        padding: "2px 8px",
                        fontSize: 11,
                        fontWeight: 600,
                      }}
                    >
                      Online
                    </span>
                  ) : (
                    <span
                      style={{
                        background: "rgba(107,114,128,0.12)",
                        color: "#4b5563",
                        borderRadius: 6,
                        padding: "2px 8px",
                        fontSize: 11,
                        fontWeight: 600,
                      }}
                    >
                      Offline
                    </span>
                  )}
                </td>
                <td style={{ color: "var(--gray)" }}>{app.type}</td>
                <td style={{ color: "var(--gray)" }}>{app.time}</td>
                <td>
                  <span className={`status-badge status-${app.status}`}>
                    {app.status}
                  </span>
                </td>
                <td>
                  <div className="action-buttons">
                    {app.status === "pending" && (
                      <>
                        <button
                          className="btn btn-primary btn-sm"
                          onClick={() => handleAcceptAppointment(app.id)}
                        >
                          <FaCheck /> Accept
                        </button>
                        <button
                          className="btn btn-danger btn-sm"
                          onClick={() => handleRejectAppointment(app.id)}
                        >
                          <FaTimes /> Reject
                        </button>
                      </>
                    )}
                    {app.status === "accepted" && (
                      <button
                        className="btn btn-primary btn-sm"
                        onClick={() => {
                          setInCall(true);
                          setIncomingCall(null);
                        }}
                      >
                        <FaVideo /> Join Call
                      </button>
                    )}
                    {app.status === "rejected" && (
                      <span style={{ fontSize: 12, color: "var(--red)" }}>
                        <FaTimes /> Rejected
                      </span>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Notifications */}
      {systemNotifications.length > 0 && (
        <div
          className="section-card"
          style={{
            background: "var(--gold-pale)",
            border: "1px solid rgba(255,204,0,0.3)",
          }}
        >
          <h3
            style={{
              fontFamily: "Playfair Display, serif",
              fontSize: 14,
              fontWeight: 700,
              marginBottom: 8,
            }}
          >
            Notifications
          </h3>
          <ul style={{ listStyle: "none", fontSize: 13 }}>
            {systemNotifications.map((n) => (
              <li key={n.id} style={{ padding: "4px 0" }}>
                • {n.message}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Incoming Call Modal */}
      {incomingCall && (
        <Modal show centered onHide={() => setIncomingCall(null)}>
          <Modal.Header closeButton>
            <Modal.Title>Incoming Call</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <p style={{ marginBottom: 16 }}>
              Call from <strong>{incomingCall.with}</strong> for{" "}
              {incomingCall.type}
            </p>
            <button
              className="btn btn-primary"
              onClick={() => {
                setInCall(true);
                setIncomingCall(null);
              }}
            >
              <FaCheck /> Accept
            </button>
            <button
              className="btn btn-danger"
              onClick={() => setIncomingCall(null)}
            >
              <FaTimes /> Reject
            </button>
          </Modal.Body>
        </Modal>
      )}

      {/* In-Call Modal */}
      {inCall && (
        <Modal show size="lg" onHide={handleLeaveCall}>
          <Modal.Header closeButton>
            <Modal.Title>Video Call</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div
              style={{
                background: "var(--black)",
                borderRadius: 12,
                height: 200,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                marginBottom: 16,
              }}
            >
              <div style={{ color: "rgba(255,255,255,0.4)", fontSize: 14 }}>
                📹 Video feed placeholder
              </div>
            </div>
            <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
              <button
                className="btn btn-secondary btn-sm"
                onClick={() => setCallMuted((m) => !m)}
              >
                {callMuted ? <FaMicrophoneSlash /> : <FaMicrophone />}{" "}
                {callMuted ? "Unmute" : "Mute"}
              </button>
              <button
                className="btn btn-secondary btn-sm"
                onClick={() => setCallVideo((v) => !v)}
              >
                {callVideo ? <FaVideoSlash /> : <FaVideo />}{" "}
                {callVideo ? "Disable Video" : "Enable Video"}
              </button>
              <button
                className="btn btn-secondary btn-sm"
                onClick={() => setCallScreen((s) => !s)}
              >
                <FaShareSquare /> {callScreen ? "Stop Sharing" : "Share Screen"}
              </button>
              <button
                className="btn btn-danger btn-sm"
                onClick={handleLeaveCall}
              >
                <FaSignOutAlt /> Leave Call
              </button>
              <button
                className="btn btn-outline-primary btn-sm"
                onClick={() => setOtherLeftCall(true)}
              >
                Simulate Other User Leaving
              </button>
            </div>
            {otherLeftCall && (
              <div
                style={{
                  marginTop: 12,
                  padding: "10px 14px",
                  background: "rgba(220,38,38,0.08)",
                  border: "1px solid rgba(220,38,38,0.2)",
                  borderRadius: 8,
                  fontSize: 13,
                  color: "var(--red)",
                }}
              >
                The other caller has left the call.
              </div>
            )}
          </Modal.Body>
        </Modal>
      )}
    </div>
  );
}

export default VideoCallManagement;
