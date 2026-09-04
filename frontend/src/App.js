import React, { useEffect, useState } from 'react';
import { getProjects } from './api';

function App() {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    getProjects().then((res) => setProjects(res.data));
  }, []);

  return (
    <div style={{ maxWidth: 900, margin: '40px auto', fontFamily: 'sans-serif' }}>
      <h1>My Portfolio</h1>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
        {projects.map((p) => (
          <div key={p.id} style={{ border: '1px solid #ccc', borderRadius: 8, padding: 16 }}>
            <h3>{p.name}</h3>
            <p>{p.description}</p>
            <p style={{ fontSize: 12, color: '#666' }}>
              {p.language} • ⭐ {p.stars} • 🍴 {p.forks}
            </p>
            {p.topics && (
              <p style={{ fontSize: 12 }}>{p.topics.split(',').join(', ')}</p>
            )}
            <a href={p.github_url} target="_blank" rel="noreferrer">GitHub</a>
            {p.live_url && (
              <>
                {' | '}
                <a href={p.live_url} target="_blank" rel="noreferrer">Live</a>
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
