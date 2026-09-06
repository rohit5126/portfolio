import React, { useEffect, useState } from 'react';
import { getProfile, getCertifications } from '../api';

function About() {
  const [profile, setProfile] = useState(null);
  const [certs, setCerts] = useState([]);

  useEffect(() => {
    getProfile().then((res) => setProfile(res.data));
    getCertifications().then((res) => setCerts(res.data));
  }, []);

  if (!profile) return null;

  const facts = [
    { label: 'Location', value: profile.location },
    { label: 'Experience', value: profile.experience },
    { label: 'Focus', value: profile.focus },
    { label: 'Availability', value: profile.availability },
  ].filter((f) => f.value);

  return (
    <section className="about">
      <h2 className="section-title">About me</h2>

      <div className="about-text">
        <h3 className="about-title">{profile.title}</h3>
        <p className="about-bio">{profile.bio}</p>
      </div>

      {facts.length > 0 && (
        <div className="facts-grid">
          {facts.map((f) => (
            <div className="fact-item" key={f.label}>
              <div className="fact-label">{f.label}</div>
              <div className="fact-value">{f.value}</div>
            </div>
          ))}
        </div>
      )}

      {certs.length > 0 && (
        <div className="certifications">
          <h3 className="subsection-title">Certifications</h3>
          <ul className="cert-list">
            {certs.map((c) => (
              <li className="cert-item" key={c.id}>
                <span className="cert-name">
                  {c.url ? (
                    <a href={c.url} target="_blank" rel="noreferrer">{c.name}</a>
                  ) : (
                    c.name
                  )}
                </span>
                <span className="cert-meta">{c.issuer} · {c.year}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </section>
  );
}

export default About;