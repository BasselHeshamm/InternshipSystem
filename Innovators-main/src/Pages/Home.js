import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,600;0,700;0,900;1,600&family=DM+Sans:wght@300;400;500;600&display=swap');

  :root {
    --black: #1a1a1a;
    --black-mid: #2c2c2c;
    --black-light: #3a3a3a;
    --red: #CC0000;
    --red-light: #e63333;
    --gold: #FFCC00;
    --gold-light: #FFD633;
    --white: #ffffff;
    --off-white: #f9f9f9;
    --cream: #f5f0e8;
    --gray: #6b7280;
    --light-gray: #e5e7eb;
  }

  * { box-sizing: border-box; margin: 0; padding: 0; }
  body { overflow-x: hidden; }

  .home {
    font-family: 'DM Sans', sans-serif;
    background: var(--off-white);
    color: var(--black);
  }

  /* ── NAVBAR ── */
  .home-nav {
    position: fixed;
    top: 0; left: 0; right: 0;
    z-index: 100;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 20px 60px;
    transition: all 0.4s ease;
  }

  .home-nav.scrolled {
    background: rgba(26,26,26,0.97);
    backdrop-filter: blur(12px);
    padding: 14px 60px;
    box-shadow: 0 2px 40px rgba(0,0,0,0.4);
  }

  /* German flag bar under nav when scrolled */
  .home-nav.scrolled::after {
    content: '';
    position: absolute;
    bottom: 0; left: 0; right: 0;
    height: 3px;
    background: linear-gradient(90deg, var(--black) 33.3%, var(--red) 33.3%, var(--red) 66.6%, var(--gold) 66.6%);
  }

  .nav-logo {
    display: flex;
    align-items: center;
    gap: 12px;
    text-decoration: none;
  }

  .nav-logo img {
    width: 38px; height: 38px;
    object-fit: contain;
    filter: brightness(0) invert(1);
    opacity: 0.9;
  }

  .nav-logo-text {
    font-family: 'Playfair Display', serif;
    font-size: 16px;
    font-weight: 600;
    color: var(--white);
    line-height: 1.1;
  }

  .nav-logo-sub {
    font-size: 10px;
    color: var(--gold);
    letter-spacing: 2px;
    text-transform: uppercase;
    font-family: 'DM Sans', sans-serif;
    font-weight: 500;
  }

  .nav-actions { display: flex; align-items: center; gap: 12px; }

  .nav-link {
    font-size: 13px;
    font-weight: 500;
    color: rgba(255,255,255,0.75);
    text-decoration: none;
    padding: 8px 16px;
    border-radius: 6px;
    transition: all 0.2s;
  }

  .nav-link:hover { color: var(--white); background: rgba(255,255,255,0.08); }

  .nav-cta {
    font-size: 13px;
    font-weight: 600;
    color: var(--black);
    background: var(--gold);
    text-decoration: none;
    padding: 9px 22px;
    border-radius: 6px;
    transition: all 0.25s;
  }

  .nav-cta:hover {
    background: var(--gold-light);
    transform: translateY(-1px);
    box-shadow: 0 4px 16px rgba(255,204,0,0.4);
  }

  /* ── HERO ── */
  .hero {
    min-height: 100vh;
    background: var(--black);
    display: flex;
    align-items: center;
    position: relative;
    overflow: hidden;
  }

  /* German flag top stripe */
  .hero::before {
    content: '';
    position: absolute;
    top: 0; left: 0; right: 0;
    height: 5px;
    background: linear-gradient(90deg, var(--black) 33.3%, var(--red) 33.3%, var(--red) 66.6%, var(--gold) 66.6%);
    z-index: 3;
  }

  .hero-bg { position: absolute; inset: 0; overflow: hidden; }

  .hero-bg::before {
    content: '';
    position: absolute;
    inset: 0;
    background-image: repeating-linear-gradient(
      -45deg,
      transparent,
      transparent 60px,
      rgba(255,204,0,0.02) 60px,
      rgba(255,204,0,0.02) 61px
    );
  }

  .hero-circle-1 {
    position: absolute;
    top: -120px; right: -120px;
    width: 600px; height: 600px;
    border-radius: 50%;
    border: 1px solid rgba(204,0,0,0.12);
    animation: slowPulse 8s ease-in-out infinite;
  }

  .hero-circle-2 {
    position: absolute;
    top: -60px; right: -60px;
    width: 400px; height: 400px;
    border-radius: 50%;
    border: 1px solid rgba(255,204,0,0.08);
    animation: slowPulse 8s ease-in-out infinite 1s;
  }

  .hero-circle-3 {
    position: absolute;
    bottom: -200px; left: -200px;
    width: 700px; height: 700px;
    border-radius: 50%;
    border: 1px solid rgba(204,0,0,0.05);
  }

  .hero-glow {
    position: absolute;
    top: 30%; right: 10%;
    width: 400px; height: 400px;
    background: radial-gradient(circle, rgba(204,0,0,0.07) 0%, transparent 70%);
    border-radius: 50%;
  }

  @keyframes slowPulse {
    0%, 100% { transform: scale(1); opacity: 1; }
    50% { transform: scale(1.03); opacity: 0.7; }
  }

  .hero-content {
    position: relative;
    z-index: 2;
    max-width: 1200px;
    margin: 0 auto;
    padding: 120px 60px 80px;
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 80px;
    align-items: center;
    width: 100%;
  }

  .hero-badge {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    background: rgba(255,204,0,0.08);
    border: 1px solid rgba(255,204,0,0.2);
    border-radius: 100px;
    padding: 6px 14px;
    margin-bottom: 28px;
    animation: fadeUp 0.6s ease-out both;
  }

  .hero-badge-dot {
    width: 6px; height: 6px;
    border-radius: 50%;
    background: var(--gold);
    animation: blink 2s ease-in-out infinite;
  }

  @keyframes blink {
    0%, 100% { opacity: 1; }
    50% { opacity: 0.3; }
  }

  .hero-badge-text {
    font-size: 11px;
    font-weight: 600;
    letter-spacing: 2px;
    text-transform: uppercase;
    color: var(--gold);
  }

  .hero-title {
    font-family: 'Playfair Display', serif;
    font-size: 62px;
    font-weight: 900;
    color: var(--white);
    line-height: 1.05;
    margin-bottom: 24px;
    animation: fadeUp 0.6s ease-out 0.1s both;
  }

  .hero-title em { font-style: italic; color: var(--red); }

  .hero-desc {
    font-size: 16px;
    font-weight: 300;
    color: rgba(255,255,255,0.55);
    line-height: 1.75;
    max-width: 440px;
    margin-bottom: 40px;
    animation: fadeUp 0.6s ease-out 0.2s both;
  }

  .hero-actions {
    display: flex;
    gap: 14px;
    animation: fadeUp 0.6s ease-out 0.3s both;
  }

  .btn-primary {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    background: var(--red);
    color: var(--white);
    font-family: 'DM Sans', sans-serif;
    font-size: 14px;
    font-weight: 600;
    text-decoration: none;
    padding: 14px 28px;
    border-radius: 8px;
    transition: all 0.25s;
  }

  .btn-primary:hover {
    background: var(--red-light);
    transform: translateY(-2px);
    box-shadow: 0 8px 24px rgba(204,0,0,0.35);
  }

  .btn-secondary {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    background: transparent;
    color: rgba(255,255,255,0.8);
    font-family: 'DM Sans', sans-serif;
    font-size: 14px;
    font-weight: 500;
    text-decoration: none;
    padding: 14px 28px;
    border-radius: 8px;
    border: 1.5px solid rgba(255,255,255,0.15);
    transition: all 0.25s;
  }

  .btn-secondary:hover {
    border-color: rgba(255,255,255,0.4);
    color: var(--white);
    background: rgba(255,255,255,0.05);
  }

  /* HERO CARD */
  .hero-right { animation: fadeUp 0.6s ease-out 0.4s both; }

  .hero-card {
    background: rgba(255,255,255,0.04);
    border: 1px solid rgba(255,255,255,0.08);
    border-radius: 20px;
    padding: 36px;
    backdrop-filter: blur(10px);
    position: relative;
    overflow: hidden;
  }

  .hero-card::before {
    content: '';
    position: absolute;
    top: 0; left: 0; right: 0;
    height: 3px;
    background: linear-gradient(90deg, var(--black-mid) 33.3%, var(--red) 33.3%, var(--red) 66.6%, var(--gold) 66.6%);
  }

  .hero-card-title {
    font-size: 11px;
    font-weight: 600;
    letter-spacing: 3px;
    text-transform: uppercase;
    color: var(--gold);
    margin-bottom: 28px;
  }

  .stats-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 20px;
    margin-bottom: 28px;
  }

  .stat-card {
    background: rgba(255,255,255,0.04);
    border: 1px solid rgba(255,255,255,0.06);
    border-radius: 12px;
    padding: 20px;
    transition: all 0.3s;
  }

  .stat-card:hover {
    background: rgba(204,0,0,0.08);
    border-color: rgba(204,0,0,0.2);
    transform: translateY(-2px);
  }

  .stat-num {
    font-family: 'Playfair Display', serif;
    font-size: 32px;
    font-weight: 700;
    color: var(--gold);
    line-height: 1;
    margin-bottom: 6px;
  }

  .stat-label {
    font-size: 12px;
    color: rgba(255,255,255,0.4);
    text-transform: uppercase;
    letter-spacing: 1px;
  }

  .hero-card-divider { height: 1px; background: rgba(255,255,255,0.07); margin-bottom: 20px; }

  .hero-card-roles { display: flex; flex-wrap: wrap; gap: 8px; }

  .role-pill {
    font-size: 12px;
    font-weight: 500;
    color: rgba(255,255,255,0.6);
    background: rgba(255,255,255,0.05);
    border: 1px solid rgba(255,255,255,0.1);
    border-radius: 100px;
    padding: 5px 14px;
  }

  @keyframes fadeUp {
    from { opacity: 0; transform: translateY(24px); }
    to { opacity: 1; transform: translateY(0); }
  }

  /* ── HOW IT WORKS ── */
  .section {
    padding: 100px 60px;
    max-width: 1200px;
    margin: 0 auto;
  }

  .section-eyebrow {
    font-size: 11px;
    font-weight: 600;
    letter-spacing: 4px;
    text-transform: uppercase;
    color: var(--red);
    margin-bottom: 12px;
    text-align: center;
  }

  .section-title {
    font-family: 'Playfair Display', serif;
    font-size: 42px;
    font-weight: 700;
    color: var(--black);
    text-align: center;
    margin-bottom: 16px;
    line-height: 1.15;
  }

  .section-subtitle {
    font-size: 16px;
    font-weight: 300;
    color: var(--gray);
    text-align: center;
    max-width: 520px;
    margin: 0 auto 64px;
    line-height: 1.7;
  }

  .steps-row {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 0;
    position: relative;
  }

  .steps-row::before {
    content: '';
    position: absolute;
    top: 28px;
    left: 12.5%; right: 12.5%;
    height: 1px;
    background: linear-gradient(90deg, var(--red), rgba(255,204,0,0.3));
    z-index: 0;
  }

  .step { text-align: center; padding: 0 20px; position: relative; z-index: 1; }

  .step-num {
    width: 56px; height: 56px;
    border-radius: 50%;
    background: var(--black);
    border: 2px solid var(--red);
    display: flex; align-items: center; justify-content: center;
    margin: 0 auto 20px;
    font-family: 'Playfair Display', serif;
    font-size: 20px;
    font-weight: 700;
    color: var(--red);
    transition: all 0.3s;
  }

  .step:hover .step-num {
    background: var(--red);
    color: var(--white);
    transform: scale(1.1);
  }

  .step-title { font-size: 15px; font-weight: 600; color: var(--black); margin-bottom: 8px; }
  .step-desc { font-size: 13px; color: var(--gray); line-height: 1.6; font-weight: 300; }

  /* ── ROLES ── */
  .roles-section { background: var(--black); padding: 100px 0; }

  .section-inner { max-width: 1200px; margin: 0 auto; padding: 0 60px; }

  .roles-grid {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 20px;
    margin-top: 64px;
  }

  .role-card {
    background: rgba(255,255,255,0.03);
    border: 1px solid rgba(255,255,255,0.07);
    border-radius: 16px;
    padding: 32px 24px;
    transition: all 0.3s;
    position: relative;
    overflow: hidden;
  }

  .role-card::before {
    content: '';
    position: absolute;
    top: 0; left: 0; right: 0;
    height: 3px;
    background: linear-gradient(90deg, var(--red), var(--gold));
    opacity: 0;
    transition: opacity 0.3s;
  }

  .role-card:hover { background: rgba(204,0,0,0.05); border-color: rgba(204,0,0,0.2); transform: translateY(-4px); }
  .role-card:hover::before { opacity: 1; }

  .role-icon {
    width: 52px; height: 52px;
    border-radius: 12px;
    background: rgba(204,0,0,0.1);
    border: 1px solid rgba(204,0,0,0.2);
    display: flex; align-items: center; justify-content: center;
    font-size: 22px;
    margin-bottom: 20px;
  }

  .role-name {
    font-family: 'Playfair Display', serif;
    font-size: 20px;
    font-weight: 600;
    color: var(--white);
    margin-bottom: 10px;
  }

  .role-desc { font-size: 13px; font-weight: 300; color: rgba(255,255,255,0.5); line-height: 1.65; margin-bottom: 20px; }

  .role-features { list-style: none; display: flex; flex-direction: column; gap: 7px; }

  .role-features li {
    font-size: 12px;
    color: rgba(255,255,255,0.4);
    display: flex; align-items: center; gap: 8px;
  }

  .role-features li::before {
    content: '';
    width: 4px; height: 4px;
    border-radius: 50%;
    background: var(--red);
    flex-shrink: 0;
    opacity: 0.8;
  }

  /* ── CTA ── */
  .cta-section { padding: 100px 60px; text-align: center; background: var(--cream); position: relative; overflow: hidden; }

  .cta-section::before {
    content: '';
    position: absolute;
    top: -200px; left: 50%;
    transform: translateX(-50%);
    width: 800px; height: 800px;
    border-radius: 50%;
    border: 1px solid rgba(204,0,0,0.06);
  }

  .cta-inner { position: relative; z-index: 1; max-width: 600px; margin: 0 auto; }

  .cta-title {
    font-family: 'Playfair Display', serif;
    font-size: 48px;
    font-weight: 700;
    color: var(--black);
    line-height: 1.1;
    margin-bottom: 20px;
  }

  .cta-title em { font-style: italic; color: var(--red); }

  .cta-desc { font-size: 16px; font-weight: 300; color: var(--gray); line-height: 1.7; margin-bottom: 40px; }

  .cta-actions { display: flex; gap: 14px; justify-content: center; }

  .btn-dark {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    background: var(--black);
    color: var(--white);
    font-family: 'DM Sans', sans-serif;
    font-size: 14px;
    font-weight: 600;
    text-decoration: none;
    padding: 14px 28px;
    border-radius: 8px;
    transition: all 0.25s;
  }

  .btn-dark:hover { background: var(--black-mid); transform: translateY(-2px); box-shadow: 0 8px 24px rgba(0,0,0,0.2); }

  .btn-outline-dark {
    display: inline-flex;
    align-items: center;
    background: transparent;
    color: var(--black);
    font-family: 'DM Sans', sans-serif;
    font-size: 14px;
    font-weight: 500;
    text-decoration: none;
    padding: 14px 28px;
    border-radius: 8px;
    border: 1.5px solid var(--black);
    transition: all 0.25s;
    opacity: 0.6;
  }

  .btn-outline-dark:hover { opacity: 1; background: rgba(26,26,26,0.05); }

  /* ── FOOTER ── */
  .home-footer { background: var(--black); padding: 48px 60px; position: relative; }

  .home-footer::before {
    content: '';
    position: absolute;
    top: 0; left: 0; right: 0;
    height: 3px;
    background: linear-gradient(90deg, var(--black-mid) 33.3%, var(--red) 33.3%, var(--red) 66.6%, var(--gold) 66.6%);
  }

  .footer-inner { max-width: 1200px; margin: 0 auto; display: flex; align-items: center; justify-content: space-between; }

  .footer-brand { display: flex; align-items: center; gap: 12px; }

  .footer-brand img { width: 32px; height: 32px; object-fit: contain; filter: brightness(0) invert(1); opacity: 0.5; }

  .footer-brand-text { font-size: 13px; color: rgba(255,255,255,0.35); }

  .footer-copy { font-size: 12px; color: rgba(255,255,255,0.25); }

  .footer-links { display: flex; gap: 24px; }

  .footer-links a { font-size: 12px; color: rgba(255,255,255,0.3); text-decoration: none; transition: color 0.2s; }
  .footer-links a:hover { color: var(--gold); }

  @media (max-width: 900px) {
    .hero-content { grid-template-columns: 1fr; gap: 40px; padding: 100px 24px 60px; }
    .hero-title { font-size: 42px; }
    .hero-right { display: none; }
    .section { padding: 70px 24px; }
    .steps-row { grid-template-columns: 1fr 1fr; gap: 32px; }
    .steps-row::before { display: none; }
    .roles-grid { grid-template-columns: 1fr 1fr; }
    .home-nav { padding: 16px 24px; }
    .home-nav.scrolled { padding: 12px 24px; }
    .footer-inner { flex-direction: column; gap: 20px; text-align: center; }
    .footer-links { justify-content: center; }
    .cta-section { padding: 70px 24px; }
    .cta-title { font-size: 36px; }
    .section-inner { padding: 0 24px; }
  }

  @media (max-width: 600px) {
    .roles-grid { grid-template-columns: 1fr; }
    .steps-row { grid-template-columns: 1fr; }
    .cta-actions { flex-direction: column; align-items: center; }
    .hero-actions { flex-direction: column; }
  }
`;

const ROLES_DATA = [
  {
    icon: "🎓",
    name: "Students",
    desc: "Discover internship opportunities, apply with one click, track your progress, and submit reports seamlessly.",
    features: [
      "Browse & filter internships",
      "Application tracking",
      "Report submissions",
      "CV & profile builder",
    ],
  },
  {
    icon: "🏢",
    name: "Companies",
    desc: "Post internship positions, review talented applicants, and build lasting relationships with GUC's talent pool.",
    features: [
      "Post internship listings",
      "Review applications",
      "Evaluate interns",
      "Analytics dashboard",
    ],
  },
  {
    icon: "🏛️",
    name: "SCAD Office",
    desc: "Oversee the entire internship program, manage company approvals, and ensure quality standards are met.",
    features: [
      "Company approvals",
      "Student management",
      "Workshop management",
      "Statistics & reports",
    ],
  },
  {
    icon: "📚",
    name: "Faculty",
    desc: "Monitor your students' internship progress, review submitted reports, and provide academic guidance.",
    features: [
      "Track assigned students",
      "Review & grade reports",
      "Provide feedback",
      "Progress monitoring",
    ],
  },
];

const STEPS_DATA = [
  {
    num: "1",
    title: "Create Account",
    desc: "Register with your role — student, company, faculty, or SCAD.",
  },
  {
    num: "2",
    title: "Complete Profile",
    desc: "Add your details, upload your CV, and set your preferences.",
  },
  {
    num: "3",
    title: "Connect",
    desc: "Students apply, companies post, faculty monitor — all in one place.",
  },
  {
    num: "4",
    title: "Track & Grow",
    desc: "Manage the full cycle from application to final evaluation.",
  },
];

export default function Home() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <style>{styles}</style>
      <div className="home">
        <nav className={`home-nav ${scrolled ? "scrolled" : ""}`}>
          <Link to="/" className="nav-logo">
            <img src="/guc-logo.png" alt="GUC" />
            <div>
              <div className="nav-logo-text">GUC Internship</div>
              <div className="nav-logo-sub">Portal</div>
            </div>
          </Link>
          <div className="nav-actions">
            <Link to="/login" className="nav-link">
              Sign In
            </Link>
            <Link to="/register" className="nav-cta">
              Get Started
            </Link>
          </div>
        </nav>

        <section className="hero">
          <div className="hero-bg">
            <div className="hero-circle-1" />
            <div className="hero-circle-2" />
            <div className="hero-circle-3" />
            <div className="hero-glow" />
          </div>
          <div className="hero-content">
            <div className="hero-left">
              <div className="hero-badge">
                <div className="hero-badge-dot" />
                <span className="hero-badge-text">
                  Now Live — 2024/25 Season
                </span>
              </div>
              <h1 className="hero-title">
                Your Career
                <br />
                Starts <em>Here</em>
              </h1>
              <p className="hero-desc">
                GUC's official internship management portal — connecting
                students with top companies, streamlining applications, reports,
                and evaluations in one place.
              </p>
              <div className="hero-actions">
                <Link to="/register" className="btn-primary">
                  Get Started →
                </Link>
                <Link to="/login" className="btn-secondary">
                  Sign In
                </Link>
              </div>
            </div>
            <div className="hero-right">
              <div className="hero-card">
                <p className="hero-card-title">Platform Overview</p>
                <div className="stats-grid">
                  <div className="stat-card">
                    <div className="stat-num">500+</div>
                    <div className="stat-label">Students</div>
                  </div>
                  <div className="stat-card">
                    <div className="stat-num">120+</div>
                    <div className="stat-label">Companies</div>
                  </div>
                  <div className="stat-card">
                    <div className="stat-num">340+</div>
                    <div className="stat-label">Internships</div>
                  </div>
                  <div className="stat-card">
                    <div className="stat-num">92%</div>
                    <div className="stat-label">Placement Rate</div>
                  </div>
                </div>
                <div className="hero-card-divider" />
                <div className="hero-card-roles">
                  {["Students", "Companies", "SCAD Office", "Faculty"].map(
                    (r) => (
                      <span key={r} className="role-pill">
                        {r}
                      </span>
                    ),
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>

        <div className="section">
          <p className="section-eyebrow">Simple Process</p>
          <h2 className="section-title">How It Works</h2>
          <p className="section-subtitle">
            From registration to final evaluation — every step of your
            internship journey managed in one platform.
          </p>
          <div className="steps-row">
            {STEPS_DATA.map((s) => (
              <div className="step" key={s.num}>
                <div className="step-num">{s.num}</div>
                <h3 className="step-title">{s.title}</h3>
                <p className="step-desc">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="roles-section">
          <div className="section-inner">
            <p className="section-eyebrow" style={{ color: "var(--gold)" }}>
              Built For Everyone
            </p>
            <h2 className="section-title" style={{ color: "var(--white)" }}>
              Who Uses the Portal?
            </h2>
            <p
              className="section-subtitle"
              style={{ color: "rgba(255,255,255,0.4)" }}
            >
              A unified system for all stakeholders in the GUC internship
              program.
            </p>
            <div className="roles-grid">
              {ROLES_DATA.map((role) => (
                <div className="role-card" key={role.name}>
                  <div className="role-icon">{role.icon}</div>
                  <h3 className="role-name">{role.name}</h3>
                  <p className="role-desc">{role.desc}</p>
                  <ul className="role-features">
                    {role.features.map((f) => (
                      <li key={f}>{f}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="cta-section">
          <div className="cta-inner">
            <p className="section-eyebrow">Ready?</p>
            <h2 className="cta-title">
              Take the First Step
              <br />
              Towards Your <em>Future</em>
            </h2>
            <p className="cta-desc">
              Join hundreds of GUC students and companies already using the
              portal. Your internship journey starts with one click.
            </p>
            <div className="cta-actions">
              <Link to="/register" className="btn-dark">
                Create Your Account →
              </Link>
              <Link to="/login" className="btn-outline-dark">
                Already registered?
              </Link>
            </div>
          </div>
        </div>

        <footer className="home-footer">
          <div className="footer-inner">
            <div className="footer-brand">
              <img src="/guc-logo.png" alt="GUC" />
              <span className="footer-brand-text">
                German University in Cairo
              </span>
            </div>
            <p className="footer-copy">
              © {new Date().getFullYear()} GUC Internship System. All rights
              reserved.
            </p>
            <div className="footer-links">
              <Link to="/login">Sign In</Link>
              <Link to="/register">Register</Link>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
}
