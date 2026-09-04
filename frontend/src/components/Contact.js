import React, { useState } from 'react';
import { sendMessage } from '../api';

function Contact() {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState(null); // null | 'sending' | 'sent' | 'error'

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('sending');
    try {
      await sendMessage(form);
      setForm({ name: '', email: '', message: '' });
      setStatus('sent');
    } catch {
      setStatus('error');
    }
  };

  return (
    <section className="contact">
      <h2 className="section-title">Contact</h2>
      <form className="contact-form" onSubmit={handleSubmit}>
        <input
          className="form-input"
          name="name"
          placeholder="Name"
          value={form.name}
          onChange={handleChange}
          required
        />
        <input
          className="form-input"
          name="email"
          type="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          required
        />
        <textarea
          className="form-input form-textarea"
          name="message"
          placeholder="Message"
          value={form.message}
          onChange={handleChange}
          required
        />
        <button className="btn btn-primary" type="submit" disabled={status === 'sending'}>
          {status === 'sending' ? 'Sending...' : 'Send message'}
        </button>
        {status === 'sent' && <p className="form-status form-status-ok">Message sent — thanks!</p>}
        {status === 'error' && <p className="form-status form-status-error">Something went wrong, try again.</p>}
      </form>
    </section>
  );
}

export default Contact;