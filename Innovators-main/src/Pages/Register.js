import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { register } from "../services/api";
import { useAuth } from "../context/AuthContext";

const ROLES = [
  "Student",
  "PRO Student",
  "Company",
  "SCAD Office",
  "Faculty Member",
];

const getRoleValue = (label) => {
  switch (label) {
    case "Company":
      return "company";
    case "SCAD Office":
      return "scad";
    case "Faculty Member":
      return "faculty";
    default:
      return "student";
  }
};

const getRedirect = (role) => {
  switch (role) {
    case "student":
      return "/student-dashboard";
    case "company":
      return "/company-dashboard";
    case "scad":
      return "/scad-dashboard";
    case "faculty":
      return "/faculty-dashboard";
    default:
      return "/";
  }
};

export default function Register() {
  const [roleLabel, setRoleLabel] = useState("Student");
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    companyName: "",
    industry: "",
    companySize: "",
    website: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { loginUser } = useAuth();

  const role = getRoleValue(roleLabel);
  const handleChange = (e) =>
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    if (form.password !== form.confirmPassword) {
      setError("Passwords do not match.");
      return;
    }
    if (form.password.length < 8) {
      setError("Password must be at least 8 characters.");
      return;
    }
    setLoading(true);
    try {
      const payload = {
        firstName: form.firstName,
        lastName: form.lastName,
        email: form.email,
        password: form.password,
        role,
        ...(role === "company" && {
          companyName: form.companyName,
          industry: form.industry,
          companySize: form.companySize,
          website: form.website,
        }),
      };
      const res = await register(payload);
      loginUser(res.data.token, res.data.user);
      navigate(getRedirect(res.data.user.role));
    } catch (err) {
      setError(err.response?.data?.error || "Registration failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "#f9f9f9",
      }}
    >
      <div
        style={{
          background: "white",
          padding: 40,
          borderRadius: 12,
          width: 440,
          boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
        }}
      >
        <h2 style={{ marginBottom: 24, fontFamily: "serif" }}>
          Create Account
        </h2>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: 8,
            marginBottom: 24,
          }}
        >
          {ROLES.map((r) => (
            <button
              key={r}
              onClick={() => setRoleLabel(r)}
              type="button"
              style={{
                padding: "8px 12px",
                border: `1.5px solid ${roleLabel === r ? "#1a1a1a" : "#e5e7eb"}`,
                borderRadius: 8,
                background: roleLabel === r ? "#1a1a1a" : "white",
                color: roleLabel === r ? "white" : "#6b7280",
                cursor: "pointer",
                fontSize: 13,
              }}
            >
              {r}
            </button>
          ))}
        </div>
        {error && (
          <div style={{ color: "red", marginBottom: 16, fontSize: 13 }}>
            {error}
          </div>
        )}
        <form onSubmit={handleSubmit}>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: 12,
              marginBottom: 12,
            }}
          >
            <div>
              <label
                style={{
                  display: "block",
                  fontSize: 11,
                  fontWeight: 600,
                  textTransform: "uppercase",
                  marginBottom: 5,
                }}
              >
                First Name
              </label>
              <input
                name="firstName"
                value={form.firstName}
                onChange={handleChange}
                required
                style={{
                  width: "100%",
                  padding: "10px 12px",
                  border: "1.5px solid #e5e7eb",
                  borderRadius: 8,
                  fontSize: 14,
                }}
              />
            </div>
            <div>
              <label
                style={{
                  display: "block",
                  fontSize: 11,
                  fontWeight: 600,
                  textTransform: "uppercase",
                  marginBottom: 5,
                }}
              >
                Last Name
              </label>
              <input
                name="lastName"
                value={form.lastName}
                onChange={handleChange}
                required
                style={{
                  width: "100%",
                  padding: "10px 12px",
                  border: "1.5px solid #e5e7eb",
                  borderRadius: 8,
                  fontSize: 14,
                }}
              />
            </div>
          </div>
          <div style={{ marginBottom: 12 }}>
            <label
              style={{
                display: "block",
                fontSize: 11,
                fontWeight: 600,
                textTransform: "uppercase",
                marginBottom: 5,
              }}
            >
              Email
            </label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              required
              style={{
                width: "100%",
                padding: "10px 12px",
                border: "1.5px solid #e5e7eb",
                borderRadius: 8,
                fontSize: 14,
              }}
            />
          </div>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: 12,
              marginBottom: 12,
            }}
          >
            <div>
              <label
                style={{
                  display: "block",
                  fontSize: 11,
                  fontWeight: 600,
                  textTransform: "uppercase",
                  marginBottom: 5,
                }}
              >
                Password
              </label>
              <input
                type="password"
                name="password"
                value={form.password}
                onChange={handleChange}
                required
                style={{
                  width: "100%",
                  padding: "10px 12px",
                  border: "1.5px solid #e5e7eb",
                  borderRadius: 8,
                  fontSize: 14,
                }}
              />
            </div>
            <div>
              <label
                style={{
                  display: "block",
                  fontSize: 11,
                  fontWeight: 600,
                  textTransform: "uppercase",
                  marginBottom: 5,
                }}
              >
                Confirm
              </label>
              <input
                type="password"
                name="confirmPassword"
                value={form.confirmPassword}
                onChange={handleChange}
                required
                style={{
                  width: "100%",
                  padding: "10px 12px",
                  border: "1.5px solid #e5e7eb",
                  borderRadius: 8,
                  fontSize: 14,
                }}
              />
            </div>
          </div>
          {role === "company" && (
            <>
              <div style={{ marginBottom: 12 }}>
                <label
                  style={{
                    display: "block",
                    fontSize: 11,
                    fontWeight: 600,
                    textTransform: "uppercase",
                    marginBottom: 5,
                  }}
                >
                  Company Name
                </label>
                <input
                  name="companyName"
                  value={form.companyName}
                  onChange={handleChange}
                  required
                  style={{
                    width: "100%",
                    padding: "10px 12px",
                    border: "1.5px solid #e5e7eb",
                    borderRadius: 8,
                    fontSize: 14,
                  }}
                />
              </div>
              <div style={{ marginBottom: 12 }}>
                <label
                  style={{
                    display: "block",
                    fontSize: 11,
                    fontWeight: 600,
                    textTransform: "uppercase",
                    marginBottom: 5,
                  }}
                >
                  Industry
                </label>
                <input
                  name="industry"
                  value={form.industry}
                  onChange={handleChange}
                  required
                  style={{
                    width: "100%",
                    padding: "10px 12px",
                    border: "1.5px solid #e5e7eb",
                    borderRadius: 8,
                    fontSize: 14,
                  }}
                />
              </div>
            </>
          )}
          <button
            type="submit"
            disabled={loading}
            style={{
              width: "100%",
              padding: 14,
              background: "#1a1a1a",
              color: "white",
              border: "none",
              borderRadius: 8,
              fontSize: 14,
              fontWeight: 600,
              cursor: "pointer",
              marginTop: 8,
            }}
          >
            {loading ? "Creating..." : "Create Account"}
          </button>
        </form>
        <div style={{ textAlign: "center", marginTop: 16, fontSize: 13 }}>
          Already have an account? <Link to="/login">Sign in</Link>
        </div>
      </div>
    </div>
  );
}
