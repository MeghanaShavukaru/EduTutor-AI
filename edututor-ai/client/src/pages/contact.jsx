import React, { useState } from 'react';

function Contact() {
  const [msg, setMsg] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    setMsg('✅ Message sent successfully!');
  };

  return (
    <section className="py-16 px-6 max-w-md mx-auto text-white">
      <h2 className="text-3xl font-bold text-neon glow mb-6">📬 Contact Us</h2>
      <form onSubmit={handleSubmit} className="space-y-4 glow-box">
        <input
          type="text"
          placeholder="Your Name"
          required
          className="w-full px-4 py-2 bg-black border border-neon rounded text-white"
        />
        <input
          type="email"
          placeholder="Your Email"
          required
          className="w-full px-4 py-2 bg-black border border-neon rounded text-white"
        />
        <textarea
          placeholder="Your Message"
          required
          rows="4"
          className="w-full px-4 py-2 bg-black border border-neon rounded text-white"
        />
        <button type="submit" className="neon-button w-full">Send Message</button>
        {msg && <p className="text-green-400 text-sm mt-2">{msg}</p>}
      </form>
    </section>
  );
}

export default Contact;
