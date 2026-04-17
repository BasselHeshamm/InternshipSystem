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
    width: 45%;
    background: var(--black);
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
    padding: 60px;
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
    width: 70px; height: 70px;
    object-fit: contain;
    margin-bottom: 36px;
    filter: brightness(0) invert(1);
    opacity: 0.9;
  }

  .brand-flag-stripe {
    display: flex;
    gap: 6px;
    margin-bottom: 24px;
  }

  .flag-bar { height: 4px; border-radius: 2px; width: 40px; }
  .flag-bar-black { background: rgba(255,255,255,0.5); }
  .flag-bar-red   { background: var(--red); }
  .flag-bar-gold  { background: var(--gold); }

  .brand-tagline {
    font-size: 11px;
    font-weight: 600;
    letter-spacing: 4px;
    text-transform: uppercase;
    color: var(--gold);
    margin-bottom: 20px;
  }

  .brand-title {
    font-family: 'Playfair Display', serif;
    font-size: 42px;
    font-weight: 700;
    color: var(--white);
    line-height: 1.15;
    margin-bottom: 24px;
  }

  .brand-title span { color: var(--red); }

  .brand-divider {
    width: 48px; height: 2px;
    background: linear-gradient(90deg, var(--red), var(--gold));
    margin-bottom: 24px;
  }

  .brand-desc {
    font-size: 15px;
    font-weight: 300;
    color: rgba(255,255,255,0.55);
    line-height: 1.7;
    max-width: 340px;
    margin-bottom: 48px;
  }

  .brand-stats { display: flex; gap: 40px; }

  .stat-num {
    font-family: 'Playfair Display', serif;
    font-size: 28px;
    color: var(--gold);
    font-weight: 600;
  }

  .stat-label {
    font-size: 12px;
    color: rgba(255,255,255,0.4);
    margin-top: 2px;
    letter-spacing: 1px;
    text-transform: uppercase;
  }

  .auth-form-panel {
    width: 55%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 60px 80px;
    background: var(--white);
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

  .form-inner { width: 100%; max-width: 400px; }
  .form-header { margin-bottom: 40px; }

  .form-eyebrow {
    font-size: 11px;
    font-weight: 600;
    letter-spacing: 3px;
    text-transform: uppercase;
    color: var(--red);
    margin-bottom: 10px;
  }

  .form-title {
    font-family: 'Playfair Display', serif;
    font-size: 34px;
    font-weight: 700;
    color: var(--black);
    margin-bottom: 8px;
  }

  .form-subtitle { font-size: 14px; color: var(--gray); font-weight: 300; }

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

  .field-group { margin-bottom: 20px; }

  .field-label {
    display: block;
    font-size: 12px;
    font-weight: 600;
    letter-spacing: 1px;
    text-transform: uppercase;
    color: var(--black);
    margin-bottom: 8px;
  }

  .field-input {
    width: 100%;
    padding: 13px 16px;
    border: 1.5px solid var(--light-gray);
    border-radius: 8px;
    font-family: 'DM Sans', sans-serif;
    font-size: 14px;
    color: var(--black);
    background: var(--off-white);
    transition: all 0.2s;
    outline: none;
  }

  .field-input:focus {
    border-color: var(--red);
    background: var(--white);
    box-shadow: 0 0 0 3px rgba(204,0,0,0.06);
  }

  .field-input::placeholder { color: #adb5bd; }

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

  .form-footer {
    text-align: center;
    margin-top: 28px;
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

  .error-msg {
    background: #fff5f5;
    border: 1px solid #fecaca;
    color: var(--error);
    padding: 10px 14px;
    border-radius: 6px;
    font-size: 13px;
    margin-bottom: 20px;
  }

  @media (max-width: 768px) {
    .auth-brand { display: none; }
    .auth-form-panel { width: 100%; padding: 40px 24px; }
  }
`;

const ROLES = [
  "Student",
  "PRO Student",
  "Company",
  "SCAD Office",
  "Faculty Member",
];

export default function Login() {
  const [role, setRole] = useState("Student");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    if (!email || !password) {
      setError("Please fill in all fields.");
      return;
    }
    setLoading(true);
    await new Promise((r) => setTimeout(r, 800));
    setLoading(false);
    if (role === "Student" || role === "PRO Student")
      navigate("/student-dashboard");
    else if (role === "Company") navigate("/company-dashboard");
    else if (role === "SCAD Office") navigate("/scad-dashboard");
    else if (role === "Faculty Member") navigate("/faculty-dashboard");
  };

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
              Internship
              <br />
              Management
              <br />
              <span>Portal</span>
            </h1>
            <div className="brand-divider" />
            <p className="brand-desc">
              Connecting students, companies, faculty, and SCAD — streamlining
              every step of the internship journey.
            </p>
            <div className="brand-stats">
              <div>
                <div className="stat-num">500+</div>
                <div className="stat-label">Students</div>
              </div>
              <div>
                <div className="stat-num">120+</div>
                <div className="stat-label">Companies</div>
              </div>
              <div>
                <div className="stat-num">5</div>
                <div className="stat-label">Faculties</div>
              </div>
            </div>
          </div>
        </div>

        <div className="auth-form-panel">
          <div className="form-inner">
            <div className="form-header">
              <p className="form-eyebrow">Welcome back</p>
              <h2 className="form-title">Sign In</h2>
              <p className="form-subtitle">
                Select your role and enter your credentials
              </p>
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
              <div className="field-group">
                <label className="field-label">Email Address</label>
                <input
                  className="field-input"
                  type="email"
                  placeholder="your@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className="field-group">
                <label className="field-label">Password</label>
                <input
                  className="field-input"
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              <button className="submit-btn" type="submit" disabled={loading}>
                {loading ? "Signing in..." : "Sign In"}
              </button>
            </form>
            <div className="form-footer">
              Don't have an account? <Link to="/register">Create one here</Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
