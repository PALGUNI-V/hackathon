import React, { useState, useEffect, useRef } from "react";
import { FaBars } from "react-icons/fa";
import "./HomePage.css";

export default function HomePage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navRef = useRef();

  // Close menu on outside click
  useEffect(() => {
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
            <img src="logo1.png" alt="HealthEase Logo" className="logo" />
          </div>

          {/* Desktop nav in center */}
          <div className="nav-links desktop-nav">
            <a href="#home">HOME</a>
            <a href="#askai">ASKAI</a>
            <a to="./Maps.jsx">MAPS</a>
            <a href="#appointment">APPOINTMENT</a>
          </div>

          {/* Right section with login/signup and mobile menu */}
          <div className="auth-right" ref={navRef}>
            <div className="auth-buttons">
              <button className="login-btn">LOGIN</button>
              <button className="signup-btn">SIGN UP</button>
            </div>

            {/* Hamburger (mobile only) */}
            <div className="hamburger" onClick={() => setIsMenuOpen(!isMenuOpen)}>
              <FaBars />
            </div>

            {/* Mobile Nav */}
            <div className={`nav-links mobile-nav ${isMenuOpen ? "open" : ""}`}>
              <a href="#home">HOME</a>
              <a href="#askai">ASKAI</a>
              <a href="#maps">MAPS</a>
              <a href="#appointment">APPOINTMENT</a>
            </div>
          </div>
        </header>


       <main className="main-content">
        <h1>Welcome to <span className="highlight">HealthEase</span></h1>
        <p className="tagline">Your gateway to smarter health solutions.</p>

        <p className="main-description">
          In today’s fast-paced world, accessing reliable and quick medical consultations
          is a growing concern. Long queues, limited access to specialists, and appointment
          delays often cause more stress than relief. <span className="highlight2">HealthEase</span>  is here to solve these
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
            <h3>Health Records</h3>
            <p>Access and manage your digital health records securely.</p>
          </div>
        </section>
      </main>     

      <footer className="footer">
        <div className="footer-content">
          <p>&copy; 2025 HealthEase. All rights reserved.</p>
          <p>Contact: +1 (555) 123-4567 | support@healthease.com</p>
          <div className="footer-links">
            <a href="#home">HOME</a>
            <a href="#askai">ASKAI</a>
            <a href="#maps">MAPS</a>
            <a href="#appointment">APPOINTMENT</a>
          </div>
          <div className="social-icons">
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
