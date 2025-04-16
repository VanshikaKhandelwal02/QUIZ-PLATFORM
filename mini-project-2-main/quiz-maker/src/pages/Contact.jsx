import React, { useState } from "react";
import "../styles/Contact.css";

const Contact = () => {
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent page refresh
    if (email && phone && message) {
      alert("Your message has been sent! ✅");
      setEmail("");
      setPhone("");
      setMessage("");
    } else {
      alert("Please fill all fields before sending.");
    }
  };

  return (
    <div className="contact-container">
      <h2>Contact Us</h2>

      <input
        type="email"
        placeholder="Your Email"
        className="input-field"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <input
        type="tel"
        placeholder="Your Phone Number"
        className="input-field"
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
      />

      <textarea
        placeholder="Your Message"
        className="input-field textarea"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      ></textarea>

      <button className="btn-primary" onClick={handleSubmit}>Send Message</button>
    </div>
  );
};

export default Contact;
