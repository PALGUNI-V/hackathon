import React from "react";
import { Link } from "react-router-dom";
import { FaBars } from "react-icons/fa";
import "../styles/HomePage.css";

export default function HomePage() {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const navRef = React.useRef();

  React.useEffect(() => {
    function handleClickOutside(event) {
      if (navRef.current && !navRef.current.contains(event.target)) {
        setIsMenuOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="homepage-container">
      <header className="header">
        <div className="logo-section">
          <img src="../logo1.png" alt="HealthEase Logo" className="logo" />
        </div>

        {/* Desktop nav */}
        <div className="nav-links desktop-nav">
          <Link to="/">HOME</Link>
          <Link to="/askai">ASKAI</Link>
          <Link to="/maps">MAPS</Link>
          <a href="#appointment">APPOINTMENT</a>
        </div>

        {/* Right section */}
        <div className="auth-right" ref={navRef}>
          <div className="auth-buttons">
            <button className="login-btn">LOGIN</button>
            <button className="signup-btn">SIGN UP</button>
          </div>

          <div className="hamburger" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            <FaBars />
          </div>

          <div className={`nav-links mobile-nav ${isMenuOpen ? "open" : ""}`}>
            <Link to="/">HOME</Link>
            <Link to="/askai">ASKAI</Link>
            <Link to="/maps">MAPS</Link>
            <a href="#appointment">APPOINTMENT</a>
          </div>
        </div>
      </header>

      <main className="main-content">
        <h1>
          Welcome to <span className="highlight">HealthEase</span>
        </h1>
        <p className="tagline">Your gateway to smarter health solutions.</p>

        <p className="main-description">
          In today’s fast-paced world, accessing reliable and quick medical consultations
          is a growing concern. Long queues, limited access to specialists, and appointment
          delays often cause more stress than relief. <span className="highlight2">HealthEase</span> is here to solve these
          issues with AI-powered instant queries, appointment scheduling, and map-based
          hospital locators — giving you seamless healthcare access from anywhere.
        </p>

        <section className="features">
          <div className="feature">
            <h3>AI Health Assistant</h3>
            <p>Get instant answers to health-related questions using our smart AI system.</p>
          </div>
          <div className="feature">
            <h3>Doctor Appointments</h3>
            <p>Book consultations with verified doctors anytime, anywhere.</p>
          </div>
          <div className="feature">
            <h3>Nearby Clinics</h3>
            <p>Use our map feature to locate nearby hospitals and clinics instantly.</p>
          </div>
          <div className="feature">
            <h3>Video Conferencing</h3>
            <p>Connect to doctors for video consultations.</p>
          </div>
        </section>
      </main>

      <footer className="footer">
        <div className="footer-content">
          <p>&copy; 2025 HealthEase. All rights reserved.</p>
          <p>Contact: +1 (555) 123-4567 | support@healthease.com</p>
          <div className="footer-links">
            <Link to="/">HOME</Link>
            <Link to="/askai">ASKAI</Link>
            <Link to="/maps">MAPS</Link>
            <a href="#appointment">APPOINTMENT</a>
          </div>
          <div className="social-icons">
            {/* You may want to replace these with React Icons or similar */}
            <a href="#"><i className="fab fa-facebook"></i></a>
            <a href="#"><i className="fab fa-twitter"></i></a>
            <a href="#"><i className="fab fa-linkedin"></i></a>
            <a href="#"><i className="fab fa-instagram"></i></a>
            <a href="#"><i className="fab fa-youtube"></i></a>
          </div>
        </div>
      </footer>
    </div>
  );
}
