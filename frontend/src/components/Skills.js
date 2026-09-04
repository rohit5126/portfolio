import React from 'react';

// Edit this list to match your actual stack
const SKILLS = [
  'docker',
  'kubernetes',
  'terraform',
  'ansible',
  'github-actions',
  'aws',
  'linux',
  'python',
  'javascript',
];

function Skills() {
  return (
    <section className="skills">
      <h2 className="section-title">Stack</h2>
      <div className="skills-grid">
        {SKILLS.map((s) => (
          <span className="skill-flag" key={s}>
            --{s}
          </span>
        ))}
      </div>
    </section>
  );
}

export default Skills;
