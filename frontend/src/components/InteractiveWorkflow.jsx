import React, { useState } from 'react';

export default function InteractiveWorkflow() {
  const [activeStep, setActiveStep] = useState(0);
  const [emailInput, setEmailInput] = useState('accounts@apexindustries.com');
  const [emailStatus, setEmailStatus] = useState('');

  const steps = [
    { title: 'Create RFQ', icon: '📝', desc: 'Procurement Officer specifies requirements, items, quantity, and deadlines.' },
    { title: 'Vendor Bidding', icon: '📩', desc: 'Vendor Partners are notified and securely submit pricing, warranties, and delivery times.' },
    { title: 'Compare Quotes', icon: '📊', desc: 'Compare bids side-by-side with ratings. System automatically highlights the lowest price.' },
    { title: 'Approval Workflow', icon: '🛡️', desc: 'Approval is routed based on spending thresholds. Managers sign off with remarks.' },
    { title: 'Generate PO', icon: '📄', desc: 'Upon approval, a legally binding Purchase Order is generated with a unique PO number.' },
    { title: 'Generate Invoice', icon: '💰', desc: 'Convert the PO into an invoice. Automatically calculate GST, taxes, and grand totals.' },
    { title: 'Email & Print', icon: '✉️', desc: 'Send invoices via integrated email system or export/print for localized records.' },
    { title: 'Logs & Audit', icon: '🔍', desc: 'Full historical audit trail and analytics are logged to maintain compliance.' },
  ];

  const handleSendEmail = (e) => {
    e.preventDefault();
    setEmailStatus('sending');
    setTimeout(() => {
      setEmailStatus('success');
      setTimeout(() => setEmailStatus(''), 3000);
    }, 1500);
  };

  return (
    <section id="workflow" style={{
      padding: '80px 0',
      borderTop: '1px solid var(--border)',
    }}>
      <div className="container">
        <div style={{ textAlign: 'center', marginBottom: '50px' }}>
          <h2 style={{ fontSize: '32px', fontWeight: '700', marginBottom: '16px', color: 'var(--text)' }}>
            The VendorBridge Procurement Pipeline
          </h2>
          <p style={{ color: 'var(--text-muted)', maxWidth: '600px', margin: '0 auto', fontSize: '16px' }}>
            Click through the 8 stages of our structured workflow to see how requests are seamlessly processed from intent to invoice.
          </p>
        </div>

        {/* Stepper Timeline Header */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          position: 'relative',
          marginBottom: '50px',
          overflowX: 'auto',
          paddingBottom: '10px',
        }}>
          {/* Connector Line */}
          <div style={{
            position: 'absolute',
            top: '22px',
            left: '3%',
            right: '3%',
            height: '2px',
            backgroundColor: 'var(--border)',
            zIndex: 1,
          }}></div>
          
          {/* Active Connector Progress */}
          <div style={{
            position: 'absolute',
            top: '22px',
            left: '3%',
            width: `${(activeStep / (steps.length - 1)) * 94}%`,
            height: '2px',
            backgroundColor: 'var(--accent)',
            boxShadow: '0 0 10px var(--accent)',
            zIndex: 1,
            transition: 'width 0.4s ease',
          }}></div>

          {steps.map((step, index) => {
            const isActive = activeStep === index;
            const isCompleted = index < activeStep;
            return (
              <div
                key={index}
                onClick={() => setActiveStep(index)}
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  cursor: 'pointer',
                  zIndex: 2,
                  minWidth: '90px',
                }}
              >
                <div style={{
                  width: '44px',
                  height: '44px',
                  borderRadius: '50%',
                  backgroundColor: isActive ? 'var(--accent)' : isCompleted ? 'rgba(100, 255, 218, 0.1)' : 'var(--surface)',
                  border: isActive ? '2px solid var(--accent)' : isCompleted ? '2px solid var(--accent)' : '2px solid var(--border)',
                  color: isActive ? 'var(--bg)' : isCompleted ? 'var(--accent)' : 'var(--text-muted)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '18px',
                  fontWeight: '700',
                  boxShadow: isActive ? '0 0 15px rgba(100, 255, 218, 0.4)' : 'none',
                  transition: 'var(--transition)',
                }}
                onMouseEnter={(e) => {
                  if (!isActive) {
                    e.currentTarget.style.borderColor = 'var(--accent)';
                  }
                }}
                onMouseLeave={(e) => {
                  if (!isActive && !isCompleted) {
                    e.currentTarget.style.borderColor = 'var(--border)';
                  }
                }}
                >
                  {step.icon}
                </div>
                <span style={{
                  fontSize: '11px',
                  fontWeight: isActive ? '700' : '500',
                  color: isActive ? 'var(--accent)' : 'var(--text-muted)',
                  marginTop: '10px',
                  textAlign: 'center',
                  whiteSpace: 'nowrap',
                }}>
                  {step.title}
                </span>
              </div>
            );
          })}
        </div>

        {/* Selected Step Showcase */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1.5fr',
          gap: '40px',
          alignItems: 'start',
          textAlign: 'left',
        }}>
          {/* Left: Step Info */}
          <div className="glass-panel animate-fade-in" key={`info-${activeStep}`} style={{
            padding: '30px',
            borderRadius: '8px',
            border: '1px solid var(--border)',
            backgroundColor: 'rgba(17, 34, 64, 0.4)',
          }}>
            <span style={{
              fontSize: '12px',
              fontWeight: '700',
              color: 'var(--accent)',
              textTransform: 'uppercase',
              letterSpacing: '1.5px',
            }}>
              Step {activeStep + 1} of 8
            </span>
            <h3 style={{ fontSize: '24px', fontWeight: '700', margin: '8px 0 16px 0', color: 'var(--text)' }}>
              {steps[activeStep].title}
            </h3>
            <p style={{ color: 'var(--text-muted)', fontSize: '15px', lineHeight: '1.6', marginBottom: '24px' }}>
              {steps[activeStep].desc}
            </p>
            <div style={{ display: 'flex', gap: '12px' }}>
              <button
                disabled={activeStep === 0}
                onClick={() => setActiveStep(prev => prev - 1)}
                style={{
                  backgroundColor: 'transparent',
                  color: activeStep === 0 ? 'rgba(230, 241, 255, 0.2)' : 'var(--text)',
                  border: `1px solid ${activeStep === 0 ? 'rgba(35, 53, 84, 0.4)' : 'var(--border)'}`,
                  borderRadius: '4px',
                  padding: '8px 16px',
                  fontSize: '13px',
                  cursor: activeStep === 0 ? 'not-allowed' : 'pointer',
                }}
              >
                &larr; Previous
              </button>
              <button
                disabled={activeStep === steps.length - 1}
                onClick={() => setActiveStep(prev => prev + 1)}
                className={activeStep === steps.length - 1 ? '' : 'emerald-glow'}
                style={{
                  backgroundColor: activeStep === steps.length - 1 ? 'rgba(17, 34, 64, 0.5)' : 'var(--accent)',
                  color: activeStep === steps.length - 1 ? 'var(--text-muted)' : 'var(--bg)',
                  border: 'none',
                  borderRadius: '4px',
                  padding: '8px 16px',
                  fontSize: '13px',
                  fontWeight: '600',
                  cursor: activeStep === steps.length - 1 ? 'not-allowed' : 'pointer',
                }}
              >
                Next Step &rarr;
              </button>
            </div>
          </div>

          {/* Right: Step Mini UI Simulation */}
          <div className="glass-panel animate-fade-in" key={`ui-${activeStep}`} style={{
            padding: '28px',
            borderRadius: '8px',
            border: '1px solid var(--border)',
            minHeight: '280px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            backgroundColor: 'rgba(17, 34, 64, 0.6)',
          }}>
            {activeStep === 0 && (
              <div>
                <h4 style={{ fontSize: '14px', color: 'var(--accent)', marginBottom: '16px', fontWeight: '600' }}>[SIMULATION] Officer RFQ Composer</h4>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  <div style={{ border: '1px dashed var(--border)', borderRadius: '6px', padding: '12px', fontSize: '13px', backgroundColor: 'var(--surface)' }}>
                    <div><strong>Item:</strong> Heavy Duty Server Cabinets</div>
                    <div><strong>Qty:</strong> 15 units</div>
                    <div><strong>Required Lead Time:</strong> &lt; 14 days</div>
                    <div><strong>Specifications:</strong> 42U rack space, dual fan units, integrated PDU.</div>
                  </div>
                  <div style={{ display: 'flex', gap: '8px', fontSize: '11px', color: 'var(--text-muted)' }}>
                    <span>📎 server_specs.pdf (4.2 MB)</span>
                    <span style={{ color: 'var(--accent)' }}>attached</span>
                  </div>
                </div>
              </div>
            )}

            {activeStep === 1 && (
              <div>
                <h4 style={{ fontSize: '14px', color: 'var(--accent)', marginBottom: '16px', fontWeight: '600' }}>[SIMULATION] Vendor Portal Bidding</h4>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', borderBottom: '1px solid var(--border)', paddingBottom: '6px' }}>
                    <span>Vendor: <strong>Apex Industries Ltd</strong></span>
                    <span style={{ color: 'var(--accent)' }}>Online</span>
                  </div>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', fontSize: '12px' }}>
                    <div>Unit Price: <span style={{ color: 'var(--text)' }}>₹42,000</span></div>
                    <div>Delivery Lead: <span style={{ color: 'var(--text)' }}>10 days</span></div>
                  </div>
                  <div style={{ fontSize: '12px', color: 'var(--text-muted)' }}>
                    <em>"Can supply with custom front glass door options at no extra charge."</em>
                  </div>
                </div>
              </div>
            )}

            {activeStep === 2 && (
              <div>
                <h4 style={{ fontSize: '14px', color: 'var(--accent)', marginBottom: '16px', fontWeight: '600' }}>[SIMULATION] Side-by-Side Quotation Comparison</h4>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '10px' }}>
                  {/* Vendor 1 (Apex) */}
                  <div style={{
                    backgroundColor: 'rgba(100, 255, 218, 0.08)',
                    border: '1.5px solid var(--accent)',
                    borderRadius: '6px',
                    padding: '10px',
                    fontSize: '11px',
                    position: 'relative',
                  }}>
                    <span style={{
                      position: 'absolute',
                      top: '-8px',
                      right: '4px',
                      backgroundColor: 'var(--accent)',
                      color: 'var(--bg)',
                      fontSize: '8px',
                      fontWeight: '800',
                      padding: '1px 4px',
                      borderRadius: '2px',
                      textTransform: 'uppercase',
                    }}>
                      Lowest Price
                    </span>
                    <strong style={{ display: 'block', color: 'var(--text)', marginBottom: '4px' }}>Apex Industries</strong>
                    <div style={{ fontSize: '13px', fontWeight: '700', color: 'var(--accent)', margin: '4px 0' }}>₹6,30,000</div>
                    <div>Lead: 10 Days</div>
                    <div style={{ color: '#FFBD2E', marginTop: '4px' }}>⭐⭐⭐⭐★ (4.8)</div>
                  </div>
                  
                  {/* Vendor 2 (Zenith) */}
                  <div style={{
                    backgroundColor: 'var(--surface)',
                    border: '1px solid var(--border)',
                    borderRadius: '6px',
                    padding: '10px',
                    fontSize: '11px',
                  }}>
                    <strong style={{ display: 'block', color: 'var(--text)', marginBottom: '4px' }}>Zenith Tech</strong>
                    <div style={{ fontSize: '13px', fontWeight: '700', color: 'var(--text)', margin: '4px 0' }}>₹6,45,000</div>
                    <div>Lead: 7 Days</div>
                    <div style={{ color: '#FFBD2E', marginTop: '4px' }}>⭐⭐⭐⭐☆ (4.2)</div>
                  </div>

                  {/* Vendor 3 (SolarTech) */}
                  <div style={{
                    backgroundColor: 'var(--surface)',
                    border: '1px solid var(--border)',
                    borderRadius: '6px',
                    padding: '10px',
                    fontSize: '11px',
                  }}>
                    <strong style={{ display: 'block', color: 'var(--text)', marginBottom: '4px' }}>SolarTech Energy</strong>
                    <div style={{ fontSize: '13px', fontWeight: '700', color: 'var(--text)', margin: '4px 0' }}>₹6,70,000</div>
                    <div>Lead: 14 Days</div>
                    <div style={{ color: '#FFBD2E', marginTop: '4px' }}>⭐⭐⭐⭐★ (4.6)</div>
                  </div>
                </div>
              </div>
            )}

            {activeStep === 3 && (
              <div>
                <h4 style={{ fontSize: '14px', color: 'var(--accent)', marginBottom: '16px', fontWeight: '600' }}>[SIMULATION] approval_timeline</h4>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  {[
                    { role: 'Procurement Officer', name: 'Rohan Sharma', status: 'Submitted', date: 'Jun 6, 11:22 AM', desc: 'Auto-checks passed' },
                    { role: 'Finance Approver', name: 'Nikhil Verma', status: 'Pending Review', date: '--', desc: 'Threshold check: ₹6.3L (Requires Manager validation)' },
                  ].map((appr, i) => (
                    <div key={i} style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      backgroundColor: 'var(--surface)',
                      padding: '10px 12px',
                      borderRadius: '6px',
                      border: '1px solid var(--border)',
                    }}>
                      <div>
                        <span style={{ fontSize: '10px', color: 'var(--text-muted)', display: 'block' }}>{appr.role}</span>
                        <span style={{ fontSize: '13px', fontWeight: '600', color: 'var(--text)' }}>{appr.name}</span>
                        <span style={{ fontSize: '11px', color: 'var(--text-muted)', display: 'block' }}>{appr.desc}</span>
                      </div>
                      <div style={{ textAlign: 'right' }}>
                        <span style={{
                          fontSize: '10px',
                          color: appr.status === 'Submitted' ? 'var(--accent)' : '#FFBD2E',
                          backgroundColor: appr.status === 'Submitted' ? 'rgba(100, 255, 218, 0.1)' : 'rgba(255, 189, 46, 0.1)',
                          padding: '2px 6px',
                          borderRadius: '4px',
                          fontWeight: '600',
                        }}>{appr.status}</span>
                        <span style={{ fontSize: '10px', color: 'var(--text-muted)', display: 'block', marginTop: '4px' }}>{appr.date}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeStep === 4 && (
              <div>
                <h4 style={{ fontSize: '14px', color: 'var(--accent)', marginBottom: '12px', fontWeight: '600' }}>[SIMULATION] Purchase Order PO-2026-9842</h4>
                <div style={{
                  backgroundColor: 'var(--surface)',
                  border: '1px solid var(--border)',
                  borderRadius: '6px',
                  padding: '12px',
                  fontSize: '11px',
                  display: 'grid',
                  gridTemplateColumns: '1fr 1fr',
                  gap: '8px',
                }}>
                  <div>
                    <strong>Vendor:</strong> Apex Industries Ltd<br />
                    <strong>Deliver To:</strong> Bangalore HQ, Karnataka<br />
                    <strong>Shipment Terms:</strong> FOB Destination
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <strong>PO Number:</strong> PO-2026-9842<br />
                    <strong>Date Issued:</strong> Jun 6, 2026<br />
                    <strong>Authorized by:</strong> Manager System Sign
                  </div>
                  <div style={{ gridColumn: 'span 2', borderTop: '1px solid var(--border)', paddingTop: '6px', marginTop: '4px', textAlign: 'center' }}>
                    <span style={{ color: 'var(--accent)', fontWeight: '600' }}>STATUS: SIGNED & DISPATCHED TO SUPPLIER</span>
                  </div>
                </div>
              </div>
            )}

            {activeStep === 5 && (
              <div>
                <h4 style={{ fontSize: '14px', color: 'var(--accent)', marginBottom: '12px', fontWeight: '600' }}>[SIMULATION] Invoice INV-2026-8731</h4>
                <div style={{
                  backgroundColor: 'var(--surface)',
                  border: '1px solid var(--border)',
                  borderRadius: '6px',
                  padding: '14px',
                  fontSize: '12px',
                }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                    <strong>Invoice INV-2026-8731</strong>
                    <span>PO Reference: PO-2026-9842</span>
                  </div>
                  {/* Calculation Breakdown */}
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', borderTop: '1px solid var(--border)', paddingTop: '8px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                      <span>Subtotal (15 x Heavy Duty Cabinets @ ₹42,000)</span>
                      <span>₹6,30,000.00</span>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--text-muted)' }}>
                      <span>GST / Taxes (18% GST Compliance)</span>
                      <span>₹1,13,400.00</span>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', borderTop: '1px dashed var(--border)', paddingTop: '6px', fontWeight: '700', color: 'var(--accent)', fontSize: '13px' }}>
                      <span>Grand Total (Auto-calculated)</span>
                      <span>₹7,43,400.00</span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeStep === 6 && (
              <div>
                <h4 style={{ fontSize: '14px', color: 'var(--accent)', marginBottom: '14px', fontWeight: '600' }}>[SIMULATION] Document Operations</h4>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                  <form onSubmit={handleSendEmail} style={{ display: 'flex', gap: '10px' }}>
                    <input
                      type="email"
                      required
                      value={emailInput}
                      onChange={(e) => setEmailInput(e.target.value)}
                      style={{
                        backgroundColor: 'var(--surface)',
                        border: '1px solid var(--border)',
                        color: 'var(--text)',
                        borderRadius: '4px',
                        padding: '10px',
                        fontSize: '12px',
                        flexGrow: 1,
                        outline: 'none',
                      }}
                    />
                    <button
                      type="submit"
                      disabled={emailStatus === 'sending'}
                      style={{
                        backgroundColor: 'var(--accent)',
                        color: 'var(--bg)',
                        border: 'none',
                        borderRadius: '4px',
                        padding: '10px 16px',
                        fontSize: '12px',
                        fontWeight: '700',
                      }}
                    >
                      {emailStatus === 'sending' ? 'Sending...' : 'Send Invoice'}
                    </button>
                  </form>

                  {emailStatus === 'success' && (
                    <div style={{ fontSize: '11px', color: 'var(--accent)' }}>
                      ✓ Invoice PDF transmitted to **{emailInput}** securely.
                    </div>
                  )}

                  <div style={{ display: 'flex', gap: '10px' }}>
                    <button
                      onClick={() => alert('Simulating Print: Opening Print Document View...')}
                      style={{
                        backgroundColor: 'transparent',
                        color: 'var(--text)',
                        border: '1px solid var(--border)',
                        borderRadius: '4px',
                        padding: '10px 16px',
                        fontSize: '12px',
                        flexGrow: 1,
                      }}
                    >
                      🖨️ Print Invoice Layout
                    </button>
                    <button
                      onClick={() => alert('Simulating Download: File INV-2026-8731.pdf downloaded.')}
                      style={{
                        backgroundColor: 'transparent',
                        color: 'var(--text)',
                        border: '1px solid var(--border)',
                        borderRadius: '4px',
                        padding: '10px 16px',
                        fontSize: '12px',
                        flexGrow: 1,
                      }}
                    >
                      📥 Download PDF Document
                    </button>
                  </div>
                </div>
              </div>
            )}

            {activeStep === 7 && (
              <div>
                <h4 style={{ fontSize: '14px', color: 'var(--accent)', marginBottom: '12px', fontWeight: '600' }}>[SIMULATION] Audit Trail Activity Logs</h4>
                <div style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '8px',
                  maxHeight: '180px',
                  overflowY: 'auto',
                  fontSize: '11px',
                }}>
                  {[
                    { timestamp: '11:20:02', user: 'SYSTEM', log: 'RFQ-2026-004 validated for database schema.' },
                    { timestamp: '11:22:15', user: 'Procurement Officer', log: 'RFQ broadcast to Preferred Vendor list.' },
                    { timestamp: '11:24:50', user: 'Vendor (Apex)', log: 'Secure quote received: ₹6,30,000.' },
                    { timestamp: '11:26:01', user: 'SYSTEM', log: 'Lowest pricing algorithm matched Apex Industries.' },
                    { timestamp: '11:28:12', user: 'Manager', log: 'Approval request approved. Remarks: "Within budget limits".' },
                    { timestamp: '11:28:15', user: 'SYSTEM', log: 'PO-2026-9842 signed electronically and emailed.' },
                    { timestamp: '11:29:00', user: 'SYSTEM', log: 'INV-2026-8731 generated from PO reference.' },
                  ].map((audit, i) => (
                    <div key={i} style={{ display: 'flex', gap: '8px', borderBottom: '1px solid rgba(35, 53, 84, 0.3)', paddingBottom: '4px' }}>
                      <span style={{ color: 'var(--accent)', fontFamily: 'var(--font-mono)' }}>[{audit.timestamp}]</span>
                      <strong style={{ color: 'var(--text)' }}>{audit.user}:</strong>
                      <span style={{ color: 'var(--text-muted)' }}>{audit.log}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
