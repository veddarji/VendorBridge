import React from 'react';

export default function HeroSection({ onOpenLogin, onLaunchDemo }) {
  return (
    <section className="animate-fade-in" style={{
      padding: '80px 0 100px 0',
      background: 'radial-gradient(circle at 50% -20%, rgba(100, 255, 218, 0.08), transparent 60%)',
    }}>
      <div className="container" style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        textAlign: 'center',
      }}>
        {/* Tagline */}
        <div style={{
          backgroundColor: 'rgba(100, 255, 218, 0.08)',
          border: '1px solid rgba(100, 255, 218, 0.2)',
          borderRadius: '30px',
          padding: '6px 16px',
          color: 'var(--accent)',
          fontSize: '13px',
          fontWeight: '600',
          letterSpacing: '1px',
          textTransform: 'uppercase',
          marginBottom: '28px',
          display: 'inline-flex',
          alignItems: 'center',
          gap: '8px',
        }}>
          <span style={{
            width: '6px',
            height: '6px',
            borderRadius: '50%',
            backgroundColor: 'var(--accent)',
            boxShadow: '0 0 8px var(--accent)',
          }}></span>
          Next-Gen B2B Procurement
        </div>

        {/* Headline */}
        <h1 style={{
          fontSize: '56px',
          fontWeight: '800',
          lineHeight: '1.15',
          letterSpacing: '-1px',
          maxWidth: '850px',
          margin: '0 0 24px 0',
          color: 'var(--text)',
        }}>
          Centralize & Digitize Your <br />
          <span style={{
            background: 'linear-gradient(90deg, var(--accent) 0%, #00ffd5 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          }}>Procurement Workflow</span>
        </h1>

        {/* Subtitle */}
        <p style={{
          fontSize: '18px',
          color: 'var(--text-muted)',
          maxWidth: '650px',
          lineHeight: '1.6',
          marginBottom: '40px',
        }}>
          VendorBridge is an enterprise-grade ERP designed to streamline vendor relationships, RFQ matching, quotation comparisons, and automated purchase ordering.
        </p>

        {/* CTAs */}
        <div style={{
          display: 'flex',
          gap: '18px',
          marginBottom: '70px',
          flexWrap: 'wrap',
          justifyContent: 'center',
        }}>
          <button
            onClick={onLaunchDemo}
            className="emerald-glow"
            style={{
              backgroundColor: 'var(--accent)',
              color: 'var(--bg)',
              border: 'none',
              borderRadius: '6px',
              padding: '14px 28px',
              fontSize: '15px',
              fontWeight: '700',
              letterSpacing: '0.3px',
            }}
            onMouseEnter={(e) => {
              e.target.style.filter = 'brightness(1.1)';
              e.target.style.transform = 'translateY(-2px)';
            }}
            onMouseLeave={(e) => {
              e.target.style.filter = 'none';
              e.target.style.transform = 'none';
            }}
          >
            Launch Interactive Demo
          </button>
          <button
            onClick={onOpenLogin}
            style={{
              backgroundColor: 'rgba(17, 34, 64, 0.6)',
              color: 'var(--text)',
              border: '1px solid var(--border)',
              borderRadius: '6px',
              padding: '14px 28px',
              fontSize: '15px',
              fontWeight: '600',
              backdropFilter: 'blur(5px)',
            }}
            onMouseEnter={(e) => {
              e.target.style.borderColor = 'var(--accent)';
              e.target.style.backgroundColor = 'rgba(17, 34, 64, 0.8)';
              e.target.style.transform = 'translateY(-2px)';
            }}
            onMouseLeave={(e) => {
              e.target.style.borderColor = 'var(--border)';
              e.target.style.backgroundColor = 'rgba(17, 34, 64, 0.6)';
              e.target.style.transform = 'none';
            }}
          >
            Sign In / Register
          </button>
        </div>

        {/* Dashboard Mockup Preview */}
        <div 
          className="glass-panel" 
          style={{
            width: '100%',
            maxWidth: '1000px',
            borderRadius: '12px',
            overflow: 'hidden',
            boxShadow: '0 25px 50px -12px rgba(2, 12, 27, 0.8), 0 0 40px rgba(100, 255, 218, 0.05)',
            border: '1px solid rgba(100, 255, 218, 0.1)',
            textAlign: 'left',
          }}
        >
          {/* Mock Window Controls */}
          <div style={{
            backgroundColor: 'rgba(2, 12, 27, 0.4)',
            padding: '12px 20px',
            borderBottom: '1px solid var(--border)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}>
            <div style={{ display: 'flex', gap: '8px' }}>
              <span style={{ width: '10px', height: '10px', borderRadius: '50%', backgroundColor: '#FF5F56' }}></span>
              <span style={{ width: '10px', height: '10px', borderRadius: '50%', backgroundColor: '#FFBD2E' }}></span>
              <span style={{ width: '10px', height: '10px', borderRadius: '50%', backgroundColor: '#27C93F' }}></span>
            </div>
            <div style={{ fontSize: '12px', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>
              vendorbridge-erp // dashboard_preview
            </div>
            <div style={{ width: '38px' }}></div>
          </div>

          {/* Mock Dashboard Layout */}
          <div style={{ display: 'grid', gridTemplateColumns: '200px 1fr', minHeight: '420px' }}>
            {/* Sidebar Mock */}
            <div style={{
              borderRight: '1px solid var(--border)',
              backgroundColor: 'rgba(17, 34, 64, 0.3)',
              padding: '20px 16px',
              display: 'flex',
              flexDirection: 'column',
              gap: '12px',
            }}>
              <div style={{ color: 'var(--accent)', fontWeight: '700', fontSize: '14px', marginBottom: '10px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{ display: 'inline-block', width: '8px', height: '8px', borderRadius: '50%', backgroundColor: 'var(--accent)' }}></span>
                System Console
              </div>
              {['Overview', 'Vendors', 'RFQs & Quotes', 'Approvals', 'Purchase Orders', 'Invoices', 'Analytics'].map((item, i) => (
                <div 
                  key={item} 
                  style={{
                    padding: '8px 12px',
                    borderRadius: '4px',
                    backgroundColor: i === 0 ? 'rgba(100, 255, 218, 0.08)' : 'transparent',
                    color: i === 0 ? 'var(--accent)' : 'var(--text-muted)',
                    fontSize: '13px',
                    fontWeight: i === 0 ? '600' : '400',
                    cursor: 'pointer',
                  }}
                >
                  {item}
                </div>
              ))}
            </div>

            {/* Dashboard Contents Mock */}
            <div style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
              {/* Header inside Mock */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <h3 style={{ fontSize: '18px', color: 'var(--text)' }}>Procurement Operations Overview</h3>
                  <p style={{ fontSize: '12px', color: 'var(--text-muted)' }}>Welcome back, Procurement Team. System online.</p>
                </div>
                <div style={{
                  fontSize: '11px',
                  backgroundColor: 'rgba(100, 255, 218, 0.1)',
                  color: 'var(--accent)',
                  padding: '4px 10px',
                  borderRadius: '4px',
                  fontWeight: '600',
                  border: '1px solid rgba(100, 255, 218, 0.2)',
                }}>
                  LIVE SYNC ACTIVE
                </div>
              </div>

              {/* Stats Cards Row */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))', gap: '14px' }}>
                {[
                  { label: 'Active RFQs', val: '12', color: 'var(--accent)', change: '+2 new' },
                  { label: 'Pending Approvals', val: '5', color: '#ffbd2e', change: 'Require Action' },
                  { label: 'Total Spending', val: '$2.3M', color: 'var(--text)', change: 'This Quarter' },
                  { label: 'Active Vendors', val: '48', color: 'var(--accent)', change: '99% Compliance' }
                ].map((stat, i) => (
                  <div key={i} style={{
                    backgroundColor: 'rgba(17, 34, 64, 0.8)',
                    border: '1px solid var(--border)',
                    borderRadius: '6px',
                    padding: '14px',
                  }}>
                    <span style={{ fontSize: '11px', color: 'var(--text-muted)', display: 'block' }}>{stat.label}</span>
                    <span style={{ fontSize: '22px', fontWeight: '700', color: stat.color, display: 'block', margin: '4px 0' }}>{stat.val}</span>
                    <span style={{ fontSize: '10px', color: 'var(--text-muted)' }}>{stat.change}</span>
                  </div>
                ))}
              </div>

              {/* Analytics and Activity Grid */}
              <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '16px', flexGrow: 1 }}>
                {/* Spend Chart Mock */}
                <div style={{
                  backgroundColor: 'rgba(17, 34, 64, 0.8)',
                  border: '1px solid var(--border)',
                  borderRadius: '6px',
                  padding: '16px',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px' }}>
                    <span style={{ fontSize: '12px', fontWeight: '600' }}>Procurement Trends</span>
                    <span style={{ fontSize: '10px', color: 'var(--accent)' }}>Q1-Q2 Analysis</span>
                  </div>
                  {/* Styled SVG graph */}
                  <svg width="100%" height="100" viewBox="0 0 300 100" preserveAspectRatio="none">
                    <defs>
                      <linearGradient id="chart-grad" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="var(--accent)" stopOpacity="0.4" />
                        <stop offset="100%" stopColor="var(--accent)" stopOpacity="0.0" />
                      </linearGradient>
                    </defs>
                    <path 
                      d="M0 80 Q 50 40, 100 60 T 200 20 T 300 10 L 300 100 L 0 100 Z" 
                      fill="url(#chart-grad)"
                    />
                    <path 
                      d="M0 80 Q 50 40, 100 60 T 200 20 T 300 10" 
                      fill="none" 
                      stroke="var(--accent)" 
                      strokeWidth="2"
                    />
                    {/* Data dots */}
                    <circle cx="50" cy="60" r="3" fill="var(--accent)" />
                    <circle cx="150" cy="40" r="3" fill="var(--accent)" />
                    <circle cx="250" cy="15" r="3" fill="var(--accent)" />
                  </svg>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '9px', color: 'var(--text-muted)', marginTop: '8px' }}>
                    <span>Jan</span>
                    <span>Feb</span>
                    <span>Mar</span>
                    <span>Apr</span>
                    <span>May</span>
                    <span>Jun</span>
                  </div>
                </div>

                {/* Activity log Mock */}
                <div style={{
                  backgroundColor: 'rgba(17, 34, 64, 0.8)',
                  border: '1px solid var(--border)',
                  borderRadius: '6px',
                  padding: '16px',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '10px',
                }}>
                  <span style={{ fontSize: '12px', fontWeight: '600', marginBottom: '4px' }}>Live Activity Feed</span>
                  {[
                    { text: 'RFQ-2026-004 created', time: '2 mins ago', icon: '📝' },
                    { text: 'Quotation submitted by Zenith Corp', time: '15 mins ago', icon: '💰' },
                    { text: 'PO-9842 approved by Manager', time: '1 hr ago', icon: '✅' },
                  ].map((act, i) => (
                    <div key={i} style={{ display: 'flex', gap: '10px', fontSize: '11px' }}>
                      <span>{act.icon}</span>
                      <div style={{ display: 'flex', flexDirection: 'column' }}>
                        <span style={{ color: 'var(--text)' }}>{act.text}</span>
                        <span style={{ color: 'var(--text-muted)', fontSize: '9px' }}>{act.time}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
