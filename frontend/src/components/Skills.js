import React, { useEffect, useState } from 'react';
import { getSkills } from '../api';

// Fallback so the section never looks empty while the API loads or if it's down
const FALLBACK = [
  { name: 'docker', category: '' },
  { name: 'kubernetes', category: '' },
  { name: 'terraform', category: '' },
  { name: 'ansible', category: '' },
  { name: 'github-actions', category: '' },
  { name: 'aws', category: '' },
  { name: 'linux', category: '' },
  { name: 'python', category: '' },
  { name: 'Bash Scripting', category: '' },
];

function Skills() {
  const [skills, setSkills] = useState(FALLBACK);

  useEffect(() => {
    getSkills().then((res) => {
      if (res.data && res.data.length > 0) setSkills(res.data);
    });
  }, []);

  const grouped = skills.reduce((acc, s) => {
    const key = s.category || 'Skills';
    (acc[key] = acc[key] || []).push(s);
    return acc;
  }, {});

  return (
    <section className="skills">
      <h2 className="section-title">Skills</h2>
      {Object.entries(grouped).map(([category, items]) => (
        <div className="skills-category" key={category}>
          {Object.keys(grouped).length > 1 && (
            <div className="skills-category-label">{category}</div>
          )}
          <div className="skills-grid">
            {items.map((s) => (
              <span className="skill-flag" key={s.name}>
                --{s.name.toLowerCase()}
              </span>
            ))}
          </div>
        </div>
      ))}
    </section>
  );
}

export default Skills;