import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@600;700&family=DM+Sans:wght@300;400;500;600&display=swap');

  :root {
    --black: #1a1a1a;
    --black-mid: #2c2c2c;
    --red: #CC0000;
    --red-light: #e63333;
    --gold: #FFCC00;
    --gold-light: #FFD633;
    --white: #ffffff;
    --off-white: #f9f9f9;
    --gray: #6b7280;
    --light-gray: #e5e7eb;
    --error: #dc2626;
  }

  * { box-sizing: border-box; margin: 0; padding: 0; }

  .auth-page {
    min-height: 100vh;
    display: flex;
    font-family: 'DM Sans', sans-serif;
    background: var(--off-white);
  }

  .auth-brand {
    width: 38%;
    background: var(--black);
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
    padding: 60px 50px;
    position: relative;
    overflow: hidden;
  }

  .auth-brand::before {
    content: '';
    position: absolute;
    top: 0; left: 0; right: 0;
    height: 6px;
    background: linear-gradient(90deg, #1a1a1a 33.3%, var(--red) 33.3%, var(--red) 66.6%, var(--gold) 66.6%);
  }

  .brand-circle-1 {
    position: absolute;
    top: -100px; right: -100px;
    width: 450px; height: 450px;
    border-radius: 50%;
    border: 1.5px solid rgba(255,204,0,0.1);
    animation: rotate 25s linear infinite;
  }

  .brand-circle-2 {
    position: absolute;
    bottom: -80px; left: -80px;
    width: 350px; height: 350px;
    border-radius: 50%;
    border: 1px solid rgba(204,0,0,0.1);
    animation: rotate 35s linear infinite reverse;
  }

  @keyframes rotate {
    from { transform: rotate(0deg); }
    to { transform: rotate(360deg); }
  }

  .brand-content { position: relative; z-index: 2; }

  .brand-logo {
    width: 65px; height: 65px;
    object-fit: contain;
    margin-bottom: 32px;
    filter: brightness(0) invert(1);
    opacity: 0.9;
  }

  .brand-flag-stripe {
    display: flex;
    gap: 6px;
    margin-bottom: 20px;
  }

  .flag-bar { height: 4px; border-radius: 2px; width: 36px; }
  .flag-bar-black { background: rgba(255,255,255,0.5); }
  .flag-bar-red   { background: var(--red); }
  .flag-bar-gold  { background: var(--gold); }

  .brand-tagline {
    font-size: 10px;
    font-weight: 600;
    letter-spacing: 4px;
    text-transform: uppercase;
    color: var(--gold);
    margin-bottom: 16px;
  }

  .brand-title {
    font-family: 'Playfair Display', serif;
    font-size: 36px;
    font-weight: 700;
    color: var(--white);
    line-height: 1.2;
    margin-bottom: 16px;
  }

  .brand-title span { color: var(--red); }

  .brand-divider {
    width: 40px; height: 2px;
    background: linear-gradient(90deg, var(--red), var(--gold));
    margin-bottom: 16px;
  }

  .brand-desc {
    font-size: 13px;
    font-weight: 300;
    color: rgba(255,255,255,0.5);
    line-height: 1.7;
    margin-bottom: 40px;
  }

  .steps-indicator {
    display: flex;
    flex-direction: column;
    gap: 14px;
  }

  .step-item { display: flex; align-items: center; gap: 12px; }

  .step-dot {
    width: 28px; height: 28px;
    border-radius: 50%;
    border: 1.5px solid rgba(255,204,0,0.25);
    display: flex; align-items: center; justify-content: center;
    font-size: 11px;
    font-weight: 600;
    color: rgba(255,255,255,0.35);
    flex-shrink: 0;
    transition: all 0.3s;
  }

  .step-dot.active { background: var(--red); border-color: var(--red); color: var(--white); }
  .step-dot.done { background: rgba(255,204,0,0.15); border-color: rgba(255,204,0,0.4); color: var(--gold); }

  .step-label { font-size: 13px; color: rgba(255,255,255,0.35); font-weight: 400; }
  .step-item.active .step-label { color: var(--white); font-weight: 500; }

  /* FORM PANEL */
  .auth-form-panel {
    width: 62%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 50px 70px;
    background: var(--white);
    overflow-y: auto;
    position: relative;
    animation: slideIn 0.5s ease-out;
  }

  .auth-form-panel::before {
    content: '';
    position: absolute;
    top: 0; left: 0; right: 0;
    height: 4px;
    background: linear-gradient(90deg, #1a1a1a 33.3%, var(--red) 33.3%, var(--red) 66.6%, var(--gold) 66.6%);
  }

  @keyframes slideIn {
    from { opacity: 0; transform: translateX(20px); }
    to { opacity: 1; transform: translateX(0); }
  }

  .form-inner { width: 100%; max-width: 480px; }
  .form-header { margin-bottom: 32px; }

  .form-eyebrow {
    font-size: 10px;
    font-weight: 600;
    letter-spacing: 3px;
    text-transform: uppercase;
    color: var(--red);
    margin-bottom: 8px;
  }

  .form-title {
    font-family: 'Playfair Display', serif;
    font-size: 30px;
    font-weight: 700;
    color: var(--black);
    margin-bottom: 6px;
  }

  .form-subtitle { font-size: 13px; color: var(--gray); font-weight: 300; }

  .role-selector {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 8px;
    margin-bottom: 28px;
  }

  .role-btn {
    padding: 10px 12px;
    border: 1.5px solid var(--light-gray);
    border-radius: 8px;
    background: var(--white);
    color: var(--gray);
    font-family: 'DM Sans', sans-serif;
    font-size: 13px;
    font-weight: 500;
    cursor: pointer;
    transition: all 0.2s;
    text-align: center;
  }

  .role-btn:hover { border-color: var(--red); color: var(--red); }
  .role-btn.active { background: var(--black); border-color: var(--black); color: var(--white); }

  .field-row { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; }
  .field-group { margin-bottom: 18px; }

  .field-label {
    display: block;
    font-size: 11px;
    font-weight: 600;
    letter-spacing: 1px;
    text-transform: uppercase;
    color: var(--black);
    margin-bottom: 7px;
  }

  .field-input, .field-select {
    width: 100%;
    padding: 12px 14px;
    border: 1.5px solid var(--light-gray);
    border-radius: 8px;
    font-family: 'DM Sans', sans-serif;
    font-size: 14px;
    color: var(--black);
    background: var(--off-white);
    transition: all 0.2s;
    outline: none;
    appearance: none;
  }

  .field-input:focus, .field-select:focus {
    border-color: var(--red);
    background: var(--white);
    box-shadow: 0 0 0 3px rgba(204,0,0,0.06);
  }

  .field-input::placeholder { color: #adb5bd; }

  .file-input-wrapper input[type="file"] {
    width: 100%;
    padding: 10px 14px;
    border: 1.5px dashed var(--light-gray);
    border-radius: 8px;
    font-family: 'DM Sans', sans-serif;
    font-size: 13px;
    color: var(--gray);
    background: var(--off-white);
    cursor: pointer;
    transition: all 0.2s;
    outline: none;
  }

  .file-input-wrapper input[type="file"]:hover { border-color: var(--red); }

  .section-label {
    font-size: 10px;
    font-weight: 600;
    letter-spacing: 3px;
    text-transform: uppercase;
    color: var(--red);
    margin: 24px 0 16px;
    display: flex;
    align-items: center;
    gap: 10px;
  }

  .section-label::after {
    content: '';
    flex: 1;
    height: 1px;
    background: var(--light-gray);
  }

  .submit-btn {
    width: 100%;
    padding: 14px;
    background: var(--black);
    color: var(--white);
    border: none;
    border-radius: 8px;
    font-family: 'DM Sans', sans-serif;
    font-size: 14px;
    font-weight: 600;
    letter-spacing: 1px;
    text-transform: uppercase;
    cursor: pointer;
    transition: all 0.25s;
    margin-top: 8px;
    position: relative;
    overflow: hidden;
  }

  .submit-btn::after {
    content: '';
    position: absolute;
    inset: 0;
    background: var(--red);
    opacity: 0;
    transition: opacity 0.25s;
  }

  .submit-btn:hover::after { opacity: 0.15; }
  .submit-btn:active { transform: scale(0.99); }
  .submit-btn:disabled { opacity: 0.6; cursor: not-allowed; }

  .error-msg {
    background: #fff5f5;
    border: 1px solid #fecaca;
    color: var(--error);
    padding: 10px 14px;
    border-radius: 6px;
    font-size: 13px;
    margin-bottom: 20px;
  }

  .form-footer {
    text-align: center;
    margin-top: 24px;
    font-size: 13px;
    color: var(--gray);
  }

  .form-footer a {
    color: var(--red);
    font-weight: 600;
    text-decoration: none;
    border-bottom: 1px solid var(--gold);
    padding-bottom: 1px;
    transition: color 0.2s;
  }

  .form-footer a:hover { color: var(--black); }

  .checkbox-group {
    display: flex;
    align-items: flex-start;
    gap: 10px;
    padding: 14px;
    border: 1.5px solid var(--light-gray);
    border-radius: 8px;
    background: var(--off-white);
    cursor: pointer;
    margin-bottom: 18px;
    transition: all 0.2s;
  }

  .checkbox-group:hover { border-color: var(--red); }
  .checkbox-group input { margin-top: 2px; accent-color: var(--red); width: 16px; height: 16px; cursor: pointer; flex-shrink: 0; }
  .checkbox-group label { font-size: 13px; color: var(--black); cursor: pointer; line-height: 1.5; }

  @media (max-width: 768px) {
    .auth-brand { display: none; }
    .auth-form-panel { width: 100%; padding: 40px 24px; }
    .field-row { grid-template-columns: 1fr; }
  }
`;

const ROLES = [
  "Student",
  "PRO Student",
  "Company",
  "SCAD Office",
  "Faculty Member",
];
const STEPS = {
  Student: ["Role", "Account Info", "Done"],
  "PRO Student": ["Role", "Account Info", "Done"],
  Company: ["Role", "Account Info", "Company Details", "Done"],
  "SCAD Office": ["Role", "Account Info", "Done"],
  "Faculty Member": ["Role", "Account Info", "Done"],
};

export default function Register() {
  const [role, setRole] = useState("Student");
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
    logo: null,
    documents: null,
    proBadge: false,
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;
    setForm((f) => ({
      ...f,
      [name]: type === "checkbox" ? checked : files ? files[0] : value,
    }));
  };

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
    await new Promise((r) => setTimeout(r, 900));
    setLoading(false);
    if (role === "Student" || role === "PRO Student")
      navigate("/student-dashboard");
    else if (role === "Company") navigate("/company-dashboard");
    else if (role === "SCAD Office") navigate("/scad-dashboard");
    else if (role === "Faculty Member") navigate("/faculty-dashboard");
  };

  const steps = STEPS[role] || STEPS["Student"];
  const currentStep = role === "Company" ? 2 : 1;

  return (
    <>
      <style>{styles}</style>
      <div className="auth-page">
        <div className="auth-brand">
          <div className="brand-circle-1" />
          <div className="brand-circle-2" />
          <div className="brand-content">
            <img src="/guc-logo.png" alt="GUC" className="brand-logo" />
            <div className="brand-flag-stripe">
              <div className="flag-bar flag-bar-black" />
              <div className="flag-bar flag-bar-red" />
              <div className="flag-bar flag-bar-gold" />
            </div>
            <p className="brand-tagline">German University in Cairo</p>
            <h1 className="brand-title">
              Join the
              <br />
              <span>Portal</span>
            </h1>
            <div className="brand-divider" />
            <p className="brand-desc">
              Create your account and become part of GUC's professional
              internship network.
            </p>
            <div className="steps-indicator">
              {steps.map((step, i) => (
                <div
                  key={step}
                  className={`step-item ${i === currentStep ? "active" : ""}`}
                >
                  <div
                    className={`step-dot ${i < currentStep ? "done" : i === currentStep ? "active" : ""}`}
                  >
                    {i < currentStep ? "✓" : i + 1}
                  </div>
                  <span className="step-label">{step}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="auth-form-panel">
          <div className="form-inner">
            <div className="form-header">
              <p className="form-eyebrow">Create account</p>
              <h2 className="form-title">Register</h2>
              <p className="form-subtitle">
                Fill in your details to get started
              </p>
            </div>

            <div style={{ marginBottom: 8 }}>
              <label className="field-label">I am a</label>
            </div>
            <div className="role-selector">
              {ROLES.map((r) => (
                <button
                  key={r}
                  className={`role-btn ${role === r ? "active" : ""}`}
                  onClick={() => setRole(r)}
                  type="button"
                >
                  {r}
                </button>
              ))}
            </div>

            {error && <div className="error-msg">{error}</div>}

            <form onSubmit={handleSubmit}>
              <p className="section-label">Personal Information</p>
              <div className="field-row">
                <div className="field-group">
                  <label className="field-label">First Name</label>
                  <input
                    className="field-input"
                    name="firstName"
                    placeholder="Ahmed"
                    value={form.firstName}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="field-group">
                  <label className="field-label">Last Name</label>
                  <input
                    className="field-input"
                    name="lastName"
                    placeholder="Hassan"
                    value={form.lastName}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>
              <div className="field-group">
                <label className="field-label">Email Address</label>
                <input
                  className="field-input"
                  type="email"
                  name="email"
                  placeholder="your@guc.edu.eg"
                  value={form.email}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="field-row">
                <div className="field-group">
                  <label className="field-label">Password</label>
                  <input
                    className="field-input"
                    type="password"
                    name="password"
                    placeholder="Min. 8 characters"
                    value={form.password}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="field-group">
                  <label className="field-label">Confirm Password</label>
                  <input
                    className="field-input"
                    type="password"
                    name="confirmPassword"
                    placeholder="Repeat password"
                    value={form.confirmPassword}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              {role === "Company" && (
                <>
                  <p className="section-label">Company Details</p>
                  <div className="field-row">
                    <div className="field-group">
                      <label className="field-label">Company Name</label>
                      <input
                        className="field-input"
                        name="companyName"
                        placeholder="Acme Corp"
                        value={form.companyName}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div className="field-group">
                      <label className="field-label">Industry</label>
                      <input
                        className="field-input"
                        name="industry"
                        placeholder="Technology"
                        value={form.industry}
                        onChange={handleChange}
                        required
                      />
                    </div>
                  </div>
                  <div className="field-row">
                    <div className="field-group">
                      <label className="field-label">Company Size</label>
                      <select
                        className="field-select"
                        name="companySize"
                        value={form.companySize}
                        onChange={handleChange}
                        required
                      >
                        <option value="">Select size</option>
                        <option value="small">Small (≤50)</option>
                        <option value="medium">Medium (≤100)</option>
                        <option value="large">Large (≤500)</option>
                        <option value="corporate">Corporate ({">"} 500)</option>
                      </select>
                    </div>
                    <div className="field-group">
                      <label className="field-label">Website</label>
                      <input
                        className="field-input"
                        name="website"
                        placeholder="https://..."
                        value={form.website}
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                  <div className="field-row">
                    <div className="field-group">
                      <label className="field-label">Company Logo</label>
                      <div className="file-input-wrapper">
                        <input
                          type="file"
                          name="logo"
                          accept="image/*"
                          onChange={handleChange}
                        />
                      </div>
                    </div>
                    <div className="field-group">
                      <label className="field-label">Documents</label>
                      <div className="file-input-wrapper">
                        <input
                          type="file"
                          name="documents"
                          accept=".pdf,.doc,.docx"
                          onChange={handleChange}
                        />
                      </div>
                    </div>
                  </div>
                </>
              )}

              {role === "PRO Student" && (
                <div className="checkbox-group">
                  <input
                    type="checkbox"
                    id="proBadge"
                    name="proBadge"
                    checked={form.proBadge}
                    onChange={handleChange}
                  />
                  <label htmlFor="proBadge">
                    I confirm I am eligible for a <strong>PRO Student</strong>{" "}
                    badge and acknowledge the additional responsibilities.
                  </label>
                </div>
              )}

              <button className="submit-btn" type="submit" disabled={loading}>
                {loading ? "Creating Account..." : "Create Account"}
              </button>
            </form>

            <div className="form-footer">
              Already have an account? <Link to="/login">Sign in here</Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
