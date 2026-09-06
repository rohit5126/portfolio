import React, { useEffect, useState } from 'react';

// Edit this to change what the terminal "types" out on load
const SCRIPT = [
  '$ whoami',
  'Rohit Kumar — Software Engineer',
  '',
  '$ cat about.me',
  'Software Engineer with around 4 years in multicloud infrastructure support (AWS, Azure) and observability (Grafana, Loki, Promtail, Prometheus) across 150+ production applications, transitioning into DevOps/SRE. Led resolution of 35+ P1/P2 incidents while maintaining 98% SLA compliance, and automated patch management/provisioning across 40+ servers using Python, Bash, and Ansible - cutting manual effort by up to 35%. Hands-on with Docker, Kubernetes, Amazon EKS, Helm, Terraform, AWS Lambda, AWS Secrets Manager, and DevSecOps CI/CD (Trivy, SonarQube, GitLeaks).',
];

function Hero({ config, metrics }) {
  const fullText = SCRIPT.join('\n');
  const [count, setCount] = useState(0);
  const done = count >= fullText.length;

  useEffect(() => {
    if (done) return;
    const t = setTimeout(() => setCount((c) => c + 1), 18);
    return () => clearTimeout(t);
  }, [count, done]);

  const shownLines = fullText.slice(0, count).split('\n');

  return (
    <section className="hero">
      <div className="hero-row">
        <div className="hero-photo-col">
          <img className="hero-photo" src="/profile-photo.jpg" alt="Rohit Kumar" />
        </div>

        <div className="hero-content-col">
          <div className="terminal">
            <div className="terminal-bar">
              <span className="dot dot-red" />
              <span className="dot dot-yellow" />
              <span className="dot dot-green" />
              <span className="terminal-title">rohit@portfolio</span>
            </div>
            <div className="terminal-body">
              {shownLines.map((line, i) => (
                <div
                  key={i}
                  className={line.startsWith('$') ? 'terminal-prompt' : 'terminal-output'}
                >
                  {line || '\u00A0'}
                  {!done && i === shownLines.length - 1 && <span className="cursor" />}
                </div>
              ))}
              {done && <span className="cursor" />}
            </div>
          </div>

          <div className="hero-actions">
            <a className="btn btn-primary" href={config.resumeUrl}>
              View resume
            </a>
            <a className="btn" href={`mailto:${config.email}`}>
              Contact
            </a>
            <a className="btn" href={config.github} target="_blank" rel="noreferrer">
              GitHub
            </a>
          </div>

          <div className="metrics">
            <div className="metric">
              <div className="metric-value">{metrics.repoCount}</div>
              <div className="metric-label">repos tracked</div>
            </div>
            <div className="metric">
              <div className="metric-value">{metrics.languageCount}</div>
              <div className="metric-label">languages</div>
            </div>
            <div className="metric">
              <div className="metric-value">{metrics.starCount}</div>
              <div className="metric-label">stars</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Hero;