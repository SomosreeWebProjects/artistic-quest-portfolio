// src/components/Contact.jsx
import React, { useState } from "react";
import "../styles/contact.css";
import { motion } from "framer-motion";
import toast from 'react-hot-toast';

const Contact = () => {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const BACKEND_URL = process.env.REACT_APP_BACKEND_URL || 'http://localhost:5000';
      fetch(`${BACKEND_URL}/api/contact`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (data.success) {
        toast.success("✨ Message sent successfully!");
        setFormData({ name: "", email: "", message: "" });
      } else {
        toast.error("❌ Failed to send message.");
      }
    } catch (err) {
      toast.error("⚠️ Something went wrong.");
    }
  };

  return (
    <section className="contact-section" id="contact">
      <h2 className="contact-heading">📬 Get in Touch 📬</h2>
      <p className="contact-subtext">Have a project in mind or just want to say hello? Let’s connect.</p>

      <motion.form
        className="contact-form"
        onSubmit={handleSubmit}
        initial={{ opacity: 0, y: 60 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <input
          type="text"
          name="name"
          placeholder="Your Name"
          required
          value={formData.name}
          onChange={handleChange}
        />
        <input
          type="email"
          name="email"
          placeholder="Your Email"
          required
          value={formData.email}
          onChange={handleChange}
        />
        <textarea
          name="message"
          rows="5"
          placeholder="Your Message"
          required
          value={formData.message}
          onChange={handleChange}
        />
        <button type="submit">📩 Submit 📩</button>
      </motion.form>
    </section>
  );
};

export default Contact;
