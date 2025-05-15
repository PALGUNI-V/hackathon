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
        <p className="tagline">Your gateway to smarter health solutions.</p>

        <p className="magazine-text">
          In today’s fast-paced world, access to timely and reliable medical consultation is often a challenge. Long waiting times,
          lack of specialist availability, and geographic limitations create significant barriers to quality care. <br /><strong>HealthEase</strong> is here to revolutionize healthcare access—bringing AI-powered insights, seamless booking, and real-time location services all in one place. Whether you're seeking immediate answers or a trusted consultation, HealthEase bridges the gap between patients and care.
        </p>

        <div className="features">
          <div className="feature">
            <h3>🔍 AI Health Assistant</h3>
            <p>Ask health-related questions and get AI-generated responses instantly to guide your next steps.</p>
          </div>
          <div className="feature">
            <h3>📍 Nearby Clinics</h3>
            <p>Find clinics, hospitals, and pharmacies near you using our integrated maps and GPS services.</p>
          </div>
          <div className="feature">
            <h3>📅 Book Appointments</h3>
            <p>Schedule visits with verified doctors effortlessly—track your appointments and manage your health like a pro.</p>
          </div>
          <div className="feature">
            <h3>📊 Personalized Insights</h3>
            <p>Receive curated recommendations and health tips based on your symptoms and history.</p>
          </div>
        </div>
      </main>



      <footer className="footer">
        <div className="footer-content">
          <p>&copy; 2025 HealthEase. All rights reserved.</p>
          <p>Contact: +1-800-123-4567 | Email: contact@healthease.com</p>

          <div className="footer-links">
            <a href="#home">Home</a>
            <a href="#askai">AskAI</a>
            <a href="#maps">Maps</a>
            <a href="#appointment">Appointment</a>
          </div>

          <div className="social-icons">
            <a href="#"><i className="fab fa-facebook-f"></i></a>
            <a href="#"><i className="fab fa-twitter"></i></a>
            <a href="#"><i className="fab fa-instagram"></i></a>
            <a href="#"><i className="fab fa-linkedin-in"></i></a>
            <a href="#"><i className="fab fa-youtube"></i></a>
          </div>
        </div>
      </footer>


    </div>
  );
}
