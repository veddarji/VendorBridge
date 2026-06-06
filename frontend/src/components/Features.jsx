import React from 'react';

export default function Features() {
  const featureList = [
    {
      title: 'Vendor Records & Management',
      desc: 'Maintain comprehensive registries including GST registration, performance history, status tracking, and capabilities catalog.',
      icon: '🏢',
      bullets: ['GST registration checks', 'Preferred vendor categorization', 'Comprehensive contact database']
    },
    {
      title: 'Structured RFQ Creation',
      desc: 'Draft clear, itemized requests for product lines or service provisions. Manage dates, assign vendors, and attach documents.',
      icon: '📝',
      bullets: ['Itemized quantity sheets', 'PDF document attachments', 'Target group assignments']
    },
    {
      title: 'Bid & Quote Bidding Portal',
      desc: 'Suppliers receive automatic invitations to bid on RFQs. They submit delivery timelines, unit rates, and warranty specifications.',
      icon: '💰',
      bullets: ['Secure bid transmissions', 'Online status updates', 'Draft quotation editing']
    },
    {
      title: 'Quotation Comparison Engine',
      desc: 'Compare incoming proposals side-by-side. The system highlights lowest pricing options and ranks performance compliance.',
      icon: '📊',
      bullets: ['Side-by-side matrices', 'Cost savings highlighting', 'Vendor performance reviews']
    },
    {
      title: 'structured Approval Workflows',
      desc: 'Automate hierarchical routing based on project budget caps. Include manager remarks, approval timestamps, and audit records.',
      icon: '🛡️',
      bullets: ['Multi-level approvals', 'Audit trails', 'Workflow state logs']
    },
    {
      title: 'Invoice & PO Generation',
      desc: 'Convert approved quotes into official Purchase Orders. Generate invoices, calculate taxes, print documents, or send via email.',
      icon: '📄',
      bullets: ['Auto-computed GST totals', 'PDF export integrations', 'Email dispatch modules']
    }
  ];

  return (
    <section id="features" style={{
      padding: '80px 0',
      borderTop: '1px solid var(--border)',
      backgroundColor: 'rgba(17, 34, 64, 0.1)',
    }}>
      <div className="container">
        <div style={{ textAlign: 'center', marginBottom: '50px' }}>
          <h2 style={{ fontSize: '32px', fontWeight: '700', marginBottom: '16px', color: 'var(--text)' }}>
            Core Platform Functionalities
          </h2>
          <p style={{ color: 'var(--text-muted)', maxWidth: '600px', margin: '0 auto', fontSize: '16px' }}>
            A centralized ERP designed specifically to eliminate manual tracking overhead and minimize billing errors.
          </p>
        </div>

        {/* Feature Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: '24px',
        }}>
          {featureList.map((feat, idx) => (
            <div
              key={idx}
              className="glass-panel"
              style={{
                padding: '30px',
                borderRadius: '8px',
                border: '1px solid var(--border)',
                textAlign: 'left',
                transition: 'var(--transition)',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = 'rgba(100, 255, 218, 0.4)';
                e.currentTarget.style.transform = 'translateY(-5px)';
                e.currentTarget.style.boxShadow = '0 10px 30px -15px rgba(100, 255, 218, 0.1)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = 'var(--border)';
                e.currentTarget.style.transform = 'none';
                e.currentTarget.style.boxShadow = 'none';
              }}
            >
              <div style={{
                fontSize: '28px',
                backgroundColor: 'rgba(100, 255, 218, 0.08)',
                width: '50px',
                height: '50px',
                borderRadius: '6px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: '20px',
                border: '1px solid rgba(100, 255, 218, 0.2)',
              }}>
                {feat.icon}
              </div>
              <h3 style={{ fontSize: '19px', fontWeight: '700', color: 'var(--text)', marginBottom: '12px' }}>
                {feat.title}
              </h3>
              <p style={{ color: 'var(--text-muted)', fontSize: '14px', lineHeight: '1.6', marginBottom: '18px' }}>
                {feat.desc}
              </p>
              
              {/* Bullet points */}
              <ul style={{ listStyle: 'none', padding: 0 }}>
                {feat.bullets.map((b, i) => (
                  <li key={i} style={{
                    fontSize: '12px',
                    color: 'var(--text)',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    marginBottom: '6px',
                  }}>
                    <span style={{ color: 'var(--accent)' }}>✓</span>
                    {b}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
