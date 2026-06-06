import React from 'react';

export default function Navbar({ onOpenLogin, onLaunchDemo }) {
  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <nav className="glass-panel" style={{
      position: 'sticky',
      top: 0,
      zIndex: 100,
      width: '100%',
      padding: '16px 0',
      borderBottom: '1px solid var(--border)',
    }}>
      <div className="container" style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
      }}>
        {/* Brand Logo */}
        <div 
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            cursor: 'pointer',
            fontWeight: 700,
            fontSize: '22px',
            letterSpacing: '0.5px',
            color: 'var(--text)',
          }}
        >
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ filter: 'drop-shadow(0 0 8px rgba(100,255,218,0.5))' }}>
            <path d="M16 16v1a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2h11a2 2 0 0 1 2 2v1" />
            <path d="M18 8h4a2 2 0 0 1 2 2v7a2 2 0 0 1-2 2h-4" />
            <path d="M16 12h8" />
            <circle cx="9" cy="12" r="2" fill="var(--accent)" />
          </svg>
          <span>Vendor<span style={{ color: 'var(--accent)' }}>Bridge</span></span>
        </div>

        {/* Desktop Links */}
        <div className="nav-links" style={{
          display: 'flex',
          gap: '32px',
          alignItems: 'center',
        }}>
          {['Features', 'Workflow', 'Roles', 'Analytics'].map((section) => (
            <button
              key={section}
              onClick={() => scrollToSection(section.toLowerCase())}
              style={{
                background: 'none',
                border: 'none',
                color: 'var(--text-muted)',
                fontSize: '15px',
                fontWeight: '500',
                transition: 'var(--transition)',
              }}
              onMouseEnter={(e) => e.target.style.color = 'var(--accent)'}
              onMouseLeave={(e) => e.target.style.color = 'var(--text-muted)'}
            >
              {section}
            </button>
          ))}
        </div>

        {/* Action Buttons */}
        <div style={{
          display: 'flex',
          gap: '16px',
          alignItems: 'center',
        }}>
          <button
            onClick={onOpenLogin}
            style={{
              background: 'none',
              border: 'none',
              color: 'var(--text)',
              fontSize: '15px',
              fontWeight: '500',
              padding: '8px 16px',
            }}
            onMouseEnter={(e) => e.target.style.color = 'var(--accent)'}
            onMouseLeave={(e) => e.target.style.color = 'var(--text)'}
          >
            Sign In
          </button>
          <button
            onClick={onLaunchDemo}
            className="emerald-glow"
            style={{
              backgroundColor: 'transparent',
              color: 'var(--accent)',
              border: '1.5px solid var(--accent)',
              borderRadius: '6px',
              padding: '8px 18px',
              fontSize: '14px',
              fontWeight: '600',
              letterSpacing: '0.5px',
            }}
            onMouseEnter={(e) => {
              e.target.style.backgroundColor = 'rgba(100, 255, 218, 0.1)';
              e.target.style.transform = 'translateY(-2px)';
            }}
            onMouseLeave={(e) => {
              e.target.style.backgroundColor = 'transparent';
              e.target.style.transform = 'none';
            }}
          >
            Launch Demo
          </button>
        </div>
      </div>
    </nav>
  );
}
