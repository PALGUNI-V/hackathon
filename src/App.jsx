import React from "react";
import "./App.css";

export default function HomePage() {
  return (
    <div className="homepage-container">
      <header className="header">
        <div className="logo-section">
          <img src="logo1.png" alt="HealthEase Logo" className="logo" />
        </div>

        <nav className="nav-links">
          <a href="#home">HOME</a>
          <a href="#askai">ASKAI</a>
          <a href="#maps">MAPS</a>
          <a href="#appointment">APPOINTMENT</a>
        </nav>

        <div className="auth-buttons">
          <button className="login-btn">LOGIN</button>
          <button className="signup-btn">SIGNUP</button>
        </div>
      </header>

      <main className="main-content">
        <h1>Welcome to <span className="highlight">HealthEase</span></h1>
        <p className="tagline">
          Simplifying healthcare with smart tools and intuitive access.
        </p>

        <div className="features">
          <div className="feature">
            <h3>🧠 AI-Powered Assistance</h3>
            <p>Get instant answers to your health questions with our intelligent AskAI assistant.</p>
          </div>
          <div className="feature">
            <h3>📍 Health Maps</h3>
            <p>Quickly locate hospitals, clinics, and pharmacies near you in real-time.</p>
          </div>
          <div className="feature">
            <h3>📅 Appointment Management</h3>
            <p>Book and manage appointments effortlessly with a seamless scheduling system.</p>
          </div>
        </div>
      </main>


      <footer className="footer">
        <div className="footer-content">
          <p>© 2025 HealthEase. All rights reserved.</p>
          <p>Contact: +1 (234) 567-8901 | support@healthease.com</p>
          <div className="social-icons">
            <a href="#" aria-label="Facebook"><i className="fab fa-facebook-f"></i></a>
            <a href="#" aria-label="Twitter"><i className="fab fa-twitter"></i></a>
            <a href="#" aria-label="Instagram"><i className="fab fa-instagram"></i></a>
            <a href="#" aria-label="LinkedIn"><i className="fab fa-linkedin-in"></i></a>
            <a href="#" aria-label="YouTube"><i className="fab fa-youtube"></i></a>
          </div>
        </div>
      </footer>

    </div>
  );
}
