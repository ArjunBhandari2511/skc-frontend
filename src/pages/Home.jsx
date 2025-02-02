import React, { useEffect } from "react";
import { Button } from "primereact/button";
import { Card } from "primereact/card";
import { InputTextarea } from "primereact/inputtextarea";
import { useState } from "react";
import "primereact/resources/themes/saga-blue/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import "./css/Home.css";
import Purpose from "../assets/pimg.jpg";
import Navbar from "../components/Navbar.jsx";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({ name: "", email: "", message: "" });

  useEffect(() => {
    // Clear localStorage when navigating to the home page
    localStorage.clear();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Submitted", form);
  };

  const handleProfile = () => {
    navigate("/profile");
  };

  const handleNewsLetter = () => {
    alert('Email Submitted');
  };

  const handleForm = () => {
    alert('Form Submitted');
  };

  return (
    <div>
      <Navbar />
      <section className="hero">
        <div className="hero-content">
          <h1>AI Powered Python Tutor</h1>
          <Button label="Get Started" className="p-button-primary" onClick={handleProfile} />
        </div>
      </section>

      <section className="purpose">
        <img src={Purpose} alt="Purpose" className="purpose-img" />
        <div className="purpose-content">
          <h2>Purpose Of The App</h2>
          <p>
            This app is designed to revolutionize Python learning through
            AI-powered tutoring. Traditional learning methods often lack
            personalization, making it difficult for learners to grasp concepts
            at their own pace. <br /> Our AI-driven approach tailors lessons to
            individual needs, ensuring that users receive customized guidance
            based on their progress and performance. The app provides real-time
            feedback, helping users identify and correct mistakes instantly.
            With hands-on coding exercises, interactive challenges, and detailed
            AI-generated explanations, learners can build a solid foundation in
            Python. <br /> The chatbot mentor assists users in solving doubts, offering
            step-by-step solutions, and making complex topics easier to
            understand. Structured lesson plans cover everything from Python
            basics to advanced concepts like data structures, algorithms, and
            machine learning. Additionally, gamified learning, quizzes, and
            performance tracking keep users engaged and motivated. <br /> Whether
            you’re a beginner or an experienced coder, this app provides a
            seamless, effective, and enjoyable way to master Python. 🚀
          </p>
        </div>
      </section>

      <section className="unique-features">
        <h2>Unique Features</h2>
        <div className="feature-cards">
          <Card title="AI-Powered Insights" className="feature-card"></Card>
          <Card title="Personalized Learning" className="feature-card"></Card>
          <Card title="Instant Code Generator" className="feature-card"></Card>
        </div>
      </section>

      <section className="newsletter">
        <h2>Subscribe to Our Newsletter</h2>
        <InputTextarea
          placeholder="Enter your email"
          className="newsletter-input"
        />
        <Button label="Subscribe" className="p-button-success" onClick={handleNewsLetter} />
      </section>

      <section className="contact">
        <h2>Contact Us</h2>
        <div className="contact-container">
          <div className="contact-form">
            <form onSubmit={handleSubmit}>
              <InputTextarea
                name="name"
                placeholder="Your Name"
                onChange={handleChange}
                required
              />
              <InputTextarea
                name="email"
                placeholder="Your Email"
                onChange={handleChange}
                required
              />
              <InputTextarea
                name="message"
                placeholder="Your Message"
                onChange={handleChange}
                required
              />
              <Button
                label="Send Message"
                type="submit"
                className="p-button-primary"
                onClick={handleForm}
              />
            </form>
          </div>
          <div className="contact-map">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d51307684.780982375!2d-171.41648656503477!3d38.28940024763861!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xa3aca94c1a426ea1%3A0xa9b3a24bd4a5121!2sSkoolOfCode%20%7COnline%20coding%20classes%20for%20kids%20%7C%20Scratch%20%7C%20Robotics%20%7C%20AI%20for%20kids%20%7C%20Python!5e0!3m2!1sen!2sin!4v1738505727842!5m2!1sen!2sin"
              width="600"
              height="450"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
        </div>
      </section>

      <footer>
        <p>© 2024 AI Python Tutor. All Rights Reserved.</p>
      </footer>
    </div>
  );
};

export default Home;
