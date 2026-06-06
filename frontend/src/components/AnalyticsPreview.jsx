import React, { useState } from 'react';

export default function AnalyticsPreview() {
  const [exporting, setExporting] = useState(null); // null, 'csv', 'pdf'

  const handleExport = (type) => {
    setExporting(type);
    setTimeout(() => {
      setExporting(null);
      alert(`Export Complete: VendorBridge_${type.toUpperCase()}_Report.zip downloaded.`);
    }, 1500);
  };

  const spendCategories = [
    { name: 'IT Hardware & Cloud Infrastructure', percent: 52, val: '₹12,48,000', color: 'var(--accent)' },
    { name: 'Office Furniture & Supplies', percent: 28, val: '₹6,72,000', color: '#ffbd2e' },
    { name: 'Logistics & Freight Shipping', percent: 12, val: '₹2,88,000', color: '#ff5555' },
    { name: 'Administrative Utilities', percent: 8, val: '₹1,92,000', color: '#8892b0' },
  ];

  const vendorRatings = [
    { name: 'Apex Industries Ltd', category: 'Furniture', quality: '98%', speed: '99%', total: '4.8/5.0' },
    { name: 'SolarTech Energy Corp', category: 'Utilities', quality: '95%', speed: '96%', total: '4.5/5.0' },
    { name: 'Zenith Tech Solutions', category: 'IT Support', quality: '92%', speed: '90%', total: '4.2/5.0' },
  ];

  return (
    <section id="analytics" style={{
      padding: '80px 0',
      borderTop: '1px solid var(--border)',
    }}>
      <div className="container">
        <div style={{ textAlign: 'center', marginBottom: '50px' }}>
          <h2 style={{ fontSize: '32px', fontWeight: '700', marginBottom: '16px', color: 'var(--text)' }}>
            Procurement Reports & Spending Analytics
          </h2>
          <p style={{ color: 'var(--text-muted)', maxWidth: '600px', margin: '0 auto', fontSize: '16px' }}>
            Monitor spending breakdowns, vendor audit trails, and fulfillment performance rates in real-time.
          </p>
        </div>

        {/* Dashboard Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '30px',
          textAlign: 'left',
          alignItems: 'start',
        }}>
          
          {/* Left: Spend Breakdown */}
          <div className="glass-panel" style={{
            padding: '30px',
            borderRadius: '8px',
            border: '1px solid var(--border)',
            backgroundColor: 'rgba(17, 34, 64, 0.4)',
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
              <h3 style={{ fontSize: '18px', color: 'var(--text)', fontWeight: '600' }}>Spending Breakdown by Category</h3>
              <span style={{ fontSize: '12px', color: 'var(--text-muted)' }}>FY 2026-Q2</span>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              {spendCategories.map((cat, idx) => (
                <div key={idx} style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px' }}>
                    <span style={{ color: 'var(--text)' }}>{cat.name}</span>
                    <strong>{cat.val} <span style={{ color: 'var(--text-muted)', fontWeight: '400' }}>({cat.percent}%)</span></strong>
                  </div>
                  {/* Custom Progress Bar */}
                  <div style={{ width: '100%', height: '8px', backgroundColor: 'var(--surface)', borderRadius: '4px', overflow: 'hidden' }}>
                    <div style={{
                      width: `${cat.percent}%`,
                      height: '100%',
                      backgroundColor: cat.color,
                      borderRadius: '4px',
                      boxShadow: `0 0 8px ${cat.color}`,
                    }}></div>
                  </div>
                </div>
              ))}
            </div>

            {/* Total Budget Card inside panel */}
            <div style={{
              marginTop: '30px',
              padding: '16px',
              backgroundColor: 'rgba(100, 255, 218, 0.05)',
              border: '1.5px dashed var(--border-accent)',
              borderRadius: '6px',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}>
              <div>
                <span style={{ fontSize: '11px', color: 'var(--text-muted)', display: 'block' }}>GRAND TOTAL PROCURED BUDGET</span>
                <span style={{ fontSize: '24px', fontWeight: '800', color: 'var(--accent)' }}>₹24,00,000.00</span>
              </div>
              <div style={{ display: 'flex', gap: '10px' }}>
                <button
                  disabled={exporting !== null}
                  onClick={() => handleExport('csv')}
                  style={{
                    backgroundColor: 'var(--surface)',
                    color: 'var(--text)',
                    border: '1px solid var(--border)',
                    borderRadius: '4px',
                    padding: '8px 12px',
                    fontSize: '11px',
                    fontWeight: '600',
                  }}
                >
                  {exporting === 'csv' ? 'Exporting...' : 'Export CSV'}
                </button>
                <button
                  disabled={exporting !== null}
                  onClick={() => handleExport('pdf')}
                  style={{
                    backgroundColor: 'var(--surface)',
                    color: 'var(--text)',
                    border: '1px solid var(--border)',
                    borderRadius: '4px',
                    padding: '8px 12px',
                    fontSize: '11px',
                    fontWeight: '600',
                  }}
                >
                  {exporting === 'pdf' ? 'Exporting...' : 'Export PDF'}
                </button>
              </div>
            </div>
          </div>

          {/* Right: Vendor Performance & Fulfillment Scorecard */}
          <div className="glass-panel" style={{
            padding: '30px',
            borderRadius: '8px',
            border: '1px solid var(--border)',
            backgroundColor: 'rgba(17, 34, 64, 0.4)',
            height: '100%',
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
              <h3 style={{ fontSize: '18px', color: 'var(--text)', fontWeight: '600' }}>Vendor Performance Scorecard</h3>
              <span style={{ fontSize: '12px', color: 'var(--accent)', fontWeight: '600' }}>Top Rated</span>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {vendorRatings.map((vendor, idx) => (
                <div key={idx} style={{
                  backgroundColor: 'var(--surface)',
                  border: '1px solid var(--border)',
                  borderRadius: '6px',
                  padding: '16px',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}>
                  <div>
                    <h4 style={{ fontSize: '14px', fontWeight: '700', color: 'var(--text)' }}>{vendor.name}</h4>
                    <span style={{ fontSize: '11px', color: 'var(--text-muted)' }}>Category: {vendor.category}</span>
                  </div>
                  <div style={{ display: 'flex', gap: '20px', textAlign: 'right' }}>
                    <div>
                      <span style={{ fontSize: '9px', color: 'var(--text-muted)', display: 'block' }}>DELIVERY</span>
                      <span style={{ fontSize: '12px', fontWeight: '600', color: 'var(--text)' }}>{vendor.speed}</span>
                    </div>
                    <div>
                      <span style={{ fontSize: '9px', color: 'var(--text-muted)', display: 'block' }}>QUALITY</span>
                      <span style={{ fontSize: '12px', fontWeight: '600', color: 'var(--text)' }}>{vendor.quality}</span>
                    </div>
                    <div>
                      <span style={{ fontSize: '9px', color: 'var(--accent)', display: 'block', fontWeight: '700' }}>OVERALL</span>
                      <span style={{ fontSize: '12px', fontWeight: '700', color: 'var(--accent)' }}>{vendor.total}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div style={{
              marginTop: '24px',
              fontSize: '11px',
              color: 'var(--text-muted)',
              lineHeight: '1.5',
            }}>
              💡 **Platform Metrics Fact:** Vendor ratings are updated dynamically based on completed Purchase Order delivery timelines and quality audits submitted by warehouse officers.
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
