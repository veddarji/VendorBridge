import React, { useState } from 'react';

export default function RoleSimulator() {
  const [selectedRole, setSelectedRole] = useState('procurement_officer');

  // Role details metadata
  const roles = [
    {
      id: 'procurement_officer',
      title: 'Procurement Officer',
      description: 'Responsible for sourcing materials, managing requests, comparing pricing, and issuing legal purchase orders.',
      icon: '💼',
      capabilities: ['Create RFQs', 'Compare Quotations', 'Generate Purchase Orders', 'Generate Invoices']
    },
    {
      id: 'vendor',
      title: 'Vendor Partner',
      description: 'Bids on public/private RFQs, submits details on lead times, pricing structure, and monitors contract terms.',
      icon: '🏢',
      capabilities: ['Submit Quotations', 'Track RFQ Status', 'View Purchase Orders', 'Receive Invoices']
    },
    {
      id: 'manager',
      title: 'Manager / Approver',
      description: 'Responsible for budget validation, evaluating risk factors, and approving or rejecting procurement workflows.',
      icon: '🛡️',
      capabilities: ['Approve/Reject RFQs', 'Workflow Audit Trails', 'Spending Threshold Approvals']
    },
    {
      id: 'admin',
      title: 'Administrator',
      description: 'Manages user accounts, configures corporate policies, monitors integrations, and tracks compliance logs.',
      icon: '⚙️',
      capabilities: ['Manage Vendor Registry', 'User Role Management', 'View Platform Analytics', 'Audit Trail Analysis']
    }
  ];

  return (
    <section id="roles" style={{
      padding: '80px 0',
      borderTop: '1px solid var(--border)',
      backgroundColor: 'rgba(17, 34, 64, 0.2)',
    }}>
      <div className="container">
        <div style={{ textAlign: 'center', marginBottom: '50px' }}>
          <h2 style={{ fontSize: '32px', fontWeight: '700', marginBottom: '16px', color: 'var(--text)' }}>
            Experience Role-Based Workflows
          </h2>
          <p style={{ color: 'var(--text-muted)', maxWidth: '600px', margin: '0 auto', fontSize: '16px' }}>
            Select a role below to interact with the simulated workspace built specifically for their daily tasks.
          </p>
        </div>

        {/* Roles Selector Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(230px, 1fr))',
          gap: '20px',
          marginBottom: '40px',
        }}>
          {roles.map((role) => {
            const isSelected = selectedRole === role.id;
            return (
              <div
                key={role.id}
                onClick={() => setSelectedRole(role.id)}
                className="glass-panel"
                style={{
                  padding: '24px',
                  borderRadius: '8px',
                  cursor: 'pointer',
                  border: isSelected ? '1px solid var(--accent)' : '1px solid var(--border)',
                  boxShadow: isSelected ? '0 0 15px rgba(100, 255, 218, 0.15)' : 'none',
                  transition: 'var(--transition)',
                  backgroundColor: isSelected ? 'rgba(17, 34, 64, 0.9)' : 'rgba(17, 34, 64, 0.5)',
                  transform: isSelected ? 'translateY(-4px)' : 'none',
                }}
                onMouseEnter={(e) => {
                  if (!isSelected) {
                    e.currentTarget.style.borderColor = 'rgba(100, 255, 218, 0.4)';
                    e.currentTarget.style.transform = 'translateY(-2px)';
                  }
                }}
                onMouseLeave={(e) => {
                  if (!isSelected) {
                    e.currentTarget.style.borderColor = 'var(--border)';
                    e.currentTarget.style.transform = 'none';
                  }
                }}
              >
                <div style={{ fontSize: '36px', marginBottom: '12px' }}>{role.icon}</div>
                <h3 style={{ fontSize: '18px', fontWeight: '600', color: 'var(--text)', marginBottom: '8px' }}>
                  {role.title}
                </h3>
                <p style={{ fontSize: '13px', color: 'var(--text-muted)', lineHeight: '1.4' }}>
                  {role.description}
                </p>
              </div>
            );
          })}
        </div>

        {/* Dynamic Simulated Panel Console */}
        <div 
          className="glass-panel"
          style={{
            borderRadius: '10px',
            border: '1px solid var(--border)',
            overflow: 'hidden',
            boxShadow: 'var(--shadow)',
          }}
        >
          {/* Console Header */}
          <div style={{
            backgroundColor: '#112240',
            padding: '14px 24px',
            borderBottom: '1px solid var(--border)',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: '12px',
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <span style={{
                display: 'inline-block',
                width: '10px',
                height: '10px',
                borderRadius: '50%',
                backgroundColor: 'var(--accent)',
                boxShadow: '0 0 8px var(--accent)',
              }}></span>
              <span style={{ fontSize: '14px', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                Simulated {roles.find(r => r.id === selectedRole).title} Console
              </span>
            </div>
            <div style={{ display: 'flex', gap: '8px' }}>
              {roles.find(r => r.id === selectedRole).capabilities.map((cap, i) => (
                <span key={i} style={{
                  fontSize: '10px',
                  backgroundColor: 'rgba(100, 255, 218, 0.08)',
                  color: 'var(--accent)',
                  border: '1px solid rgba(100, 255, 218, 0.2)',
                  padding: '2px 8px',
                  borderRadius: '30px',
                  fontWeight: '500',
                }}>
                  {cap}
                </span>
              ))}
            </div>
          </div>

          {/* Console Body */}
          <div style={{ padding: '30px', backgroundColor: 'rgba(10, 25, 47, 0.4)' }}>
            {selectedRole === 'procurement_officer' && <OfficerConsole />}
            {selectedRole === 'vendor' && <VendorConsole />}
            {selectedRole === 'manager' && <ManagerConsole />}
            {selectedRole === 'admin' && <AdminConsole />}
          </div>
        </div>
      </div>
    </section>
  );
}

// ----------------------------------------------------
// PROCUREMENT OFFICER SIMULATION SUB-COMPONENT
// ----------------------------------------------------
function OfficerConsole() {
  const [rfqTitle, setRfqTitle] = useState('Office Stationery Restock');
  const [rfqCategory, setRfqCategory] = useState('office_supplies');
  const [rfqQuantity, setRfqQuantity] = useState('500');
  const [assignedVendor, setAssignedVendor] = useState('all');
  const [submitted, setSubmitted] = useState(false);

  const handleCreateRFQ = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 4000);
  };

  return (
    <div className="animate-fade-in" style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '30px', textAlign: 'left', flexWrap: 'wrap' }}>
      <div>
        <h4 style={{ color: 'var(--accent)', fontSize: '16px', fontWeight: '600', marginBottom: '16px' }}>
          Action: Draft & Distribute RFQ
        </h4>
        {submitted ? (
          <div style={{
            backgroundColor: 'rgba(100, 255, 218, 0.1)',
            border: '1px solid var(--accent)',
            padding: '16px',
            borderRadius: '6px',
            color: 'var(--text)',
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            gap: '12px',
          }}>
            <span style={{ fontSize: '32px' }}>✅</span>
            <strong style={{ color: 'var(--accent)' }}>RFQ Broadcasted Successfully!</strong>
            <p style={{ fontSize: '13px', color: 'var(--text-muted)', textAlign: 'center' }}>
              Your Request for Quotation **"{rfqTitle}"** has been serialized, signed, and broadcast to all assigned Vendor Partners.
            </p>
          </div>
        ) : (
          <form onSubmit={handleCreateRFQ} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                <label style={{ fontSize: '12px', color: 'var(--text-muted)' }}>RFQ Title</label>
                <input
                  type="text"
                  value={rfqTitle}
                  onChange={(e) => setRfqTitle(e.target.value)}
                  style={{ backgroundColor: 'var(--surface)', border: '1px solid var(--border)', borderRadius: '4px', padding: '10px', color: 'var(--text)', outline: 'none', fontSize: '13px' }}
                />
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                <label style={{ fontSize: '12px', color: 'var(--text-muted)' }}>Category</label>
                <select
                  value={rfqCategory}
                  onChange={(e) => setRfqCategory(e.target.value)}
                  style={{ backgroundColor: 'var(--surface)', border: '1px solid var(--border)', borderRadius: '4px', padding: '10px', color: 'var(--text)', outline: 'none', fontSize: '13px' }}
                >
                  <option value="office_supplies">Office Supplies</option>
                  <option value="it_hardware">IT & Hardware</option>
                  <option value="raw_materials">Raw Materials</option>
                  <option value="logistics">Logistics & Freight</option>
                </select>
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                <label style={{ fontSize: '12px', color: 'var(--text-muted)' }}>Quantity Required</label>
                <input
                  type="number"
                  value={rfqQuantity}
                  onChange={(e) => setRfqQuantity(e.target.value)}
                  style={{ backgroundColor: 'var(--surface)', border: '1px solid var(--border)', borderRadius: '4px', padding: '10px', color: 'var(--text)', outline: 'none', fontSize: '13px' }}
                />
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                <label style={{ fontSize: '12px', color: 'var(--text-muted)' }}>Vendor Target Group</label>
                <select
                  value={assignedVendor}
                  onChange={(e) => setAssignedVendor(e.target.value)}
                  style={{ backgroundColor: 'var(--surface)', border: '1px solid var(--border)', borderRadius: '4px', padding: '10px', color: 'var(--text)', outline: 'none', fontSize: '13px' }}
                >
                  <option value="all">Broadcast (All Registered Vendors)</option>
                  <option value="preferred">Preferred Suppliers Only</option>
                  <option value="local">GST-Registered Local Vendors</option>
                </select>
              </div>
            </div>

            <button
              type="submit"
              className="emerald-glow"
              style={{
                backgroundColor: 'var(--accent)',
                color: 'var(--bg)',
                fontWeight: '700',
                fontSize: '13px',
                padding: '12px',
                borderRadius: '4px',
                border: 'none',
                marginTop: '10px',
              }}
            >
              Sign & Broadcast RFQ
            </button>
          </form>
        )}
      </div>

      <div style={{ borderLeft: '1px solid var(--border)', paddingLeft: '30px' }}>
        <h4 style={{ color: 'var(--text)', fontSize: '15px', fontWeight: '600', marginBottom: '14px' }}>
          Live RFQ Ledger
        </h4>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          {[
            { id: 'RFQ-2026-004', name: 'Premium Office Desks', quotes: 3, status: 'Active' },
            { id: 'RFQ-2026-003', name: 'Enterprise Server Upgrade', quotes: 5, status: 'Evaluating' },
            { id: 'RFQ-2026-002', name: 'Logistics Courier Contract', quotes: 2, status: 'PO Issued' },
          ].map((item) => (
            <div key={item.id} style={{
              backgroundColor: 'var(--surface)',
              padding: '12px',
              borderRadius: '6px',
              border: '1px solid var(--border)',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}>
              <div>
                <strong style={{ fontSize: '12px', fontFamily: 'var(--font-mono)', color: 'var(--accent)' }}>{item.id}</strong>
                <div style={{ fontSize: '13px', color: 'var(--text)' }}>{item.name}</div>
              </div>
              <div style={{ textAlign: 'right' }}>
                <span style={{ fontSize: '11px', display: 'block', color: 'var(--text-muted)' }}>{item.quotes} quotes</span>
                <span style={{
                  fontSize: '10px',
                  backgroundColor: item.status === 'Active' ? 'rgba(100, 255, 218, 0.1)' : 'rgba(255,255,255,0.05)',
                  color: item.status === 'Active' ? 'var(--accent)' : 'var(--text-muted)',
                  padding: '2px 6px',
                  borderRadius: '4px',
                }}>
                  {item.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ----------------------------------------------------
// VENDOR SIMULATION SUB-COMPONENT
// ----------------------------------------------------
function VendorConsole() {
  const [rfqChoice, setRfqChoice] = useState('RFQ-2026-004');
  const [price, setPrice] = useState('12000');
  const [deliveryDays, setDeliveryDays] = useState('14');
  const [vendorNotes, setVendorNotes] = useState('Includes free installation and 2-year warranty.');
  const [submitted, setSubmitted] = useState(false);

  const handleQuoteSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 4000);
  };

  return (
    <div className="animate-fade-in" style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '30px', textAlign: 'left' }}>
      <div>
        <h4 style={{ color: 'var(--accent)', fontSize: '16px', fontWeight: '600', marginBottom: '16px' }}>
          Action: Submit Bidding Quotation
        </h4>
        {submitted ? (
          <div style={{
            backgroundColor: 'rgba(100, 255, 218, 0.1)',
            border: '1px solid var(--accent)',
            padding: '16px',
            borderRadius: '6px',
            color: 'var(--text)',
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            gap: '12px',
          }}>
            <span style={{ fontSize: '32px' }}>💰</span>
            <strong style={{ color: 'var(--accent)' }}>Quotation Transmitted!</strong>
            <p style={{ fontSize: '13px', color: 'var(--text-muted)', textAlign: 'center' }}>
              Your bid for **{rfqChoice}** has been encrypted and saved. The procurement team has been notified.
            </p>
          </div>
        ) : (
          <form onSubmit={handleQuoteSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
              <label style={{ fontSize: '12px', color: 'var(--text-muted)' }}>Select RFQ Invitation</label>
              <select
                value={rfqChoice}
                onChange={(e) => setRfqChoice(e.target.value)}
                style={{ backgroundColor: 'var(--surface)', border: '1px solid var(--border)', borderRadius: '4px', padding: '10px', color: 'var(--text)', outline: 'none', fontSize: '13px' }}
              >
                <option value="RFQ-2026-004">RFQ-2026-004: Office Stationery Restock</option>
                <option value="RFQ-2026-003">RFQ-2026-003: Enterprise Server Upgrade</option>
              </select>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                <label style={{ fontSize: '12px', color: 'var(--text-muted)' }}>Quotation Bid Price (INR)</label>
                <input
                  type="number"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  style={{ backgroundColor: 'var(--surface)', border: '1px solid var(--border)', borderRadius: '4px', padding: '10px', color: 'var(--text)', outline: 'none', fontSize: '13px' }}
                />
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                <label style={{ fontSize: '12px', color: 'var(--text-muted)' }}>Delivery Lead Time (Days)</label>
                <input
                  type="number"
                  value={deliveryDays}
                  onChange={(e) => setDeliveryDays(e.target.value)}
                  style={{ backgroundColor: 'var(--surface)', border: '1px solid var(--border)', borderRadius: '4px', padding: '10px', color: 'var(--text)', outline: 'none', fontSize: '13px' }}
                />
              </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
              <label style={{ fontSize: '12px', color: 'var(--text-muted)' }}>Notes / Warranties</label>
              <textarea
                value={vendorNotes}
                onChange={(e) => setVendorNotes(e.target.value)}
                rows="2"
                style={{ backgroundColor: 'var(--surface)', border: '1px solid var(--border)', borderRadius: '4px', padding: '10px', color: 'var(--text)', outline: 'none', fontSize: '13px', resize: 'none' }}
              />
            </div>

            <button
              type="submit"
              className="emerald-glow"
              style={{
                backgroundColor: 'var(--accent)',
                color: 'var(--bg)',
                fontWeight: '700',
                fontSize: '13px',
                padding: '12px',
                borderRadius: '4px',
                border: 'none',
                marginTop: '6px',
              }}
            >
              Sign & Submit Bid Quotation
            </button>
          </form>
        )}
      </div>

      <div style={{ borderLeft: '1px solid var(--border)', paddingLeft: '30px' }}>
        <h4 style={{ color: 'var(--text)', fontSize: '15px', fontWeight: '600', marginBottom: '14px' }}>
          Vendor Ledger (Active Bids)
        </h4>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          {[
            { rfq: 'RFQ-2026-003', title: 'Server Rack Upgrade', bid: '₹4,20,000', status: 'Under Review' },
            { rfq: 'RFQ-2026-002', title: 'Couriers Q2 Contract', bid: '₹85,000', status: 'PO Received' },
          ].map((item, idx) => (
            <div key={idx} style={{
              backgroundColor: 'var(--surface)',
              padding: '12px',
              borderRadius: '6px',
              border: '1px solid var(--border)',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}>
              <div>
                <strong style={{ fontSize: '12px', fontFamily: 'var(--font-mono)', color: 'var(--accent)' }}>{item.rfq}</strong>
                <div style={{ fontSize: '13px', color: 'var(--text)' }}>{item.title}</div>
              </div>
              <div style={{ textAlign: 'right' }}>
                <span style={{ fontSize: '12px', color: 'var(--text)', fontWeight: '600' }}>{item.bid}</span>
                <span style={{
                  fontSize: '9px',
                  display: 'block',
                  backgroundColor: item.status === 'PO Received' ? 'rgba(100, 255, 218, 0.1)' : 'rgba(255, 255, 255, 0.05)',
                  color: item.status === 'PO Received' ? 'var(--accent)' : 'var(--text-muted)',
                  padding: '1px 5px',
                  borderRadius: '3px',
                  marginTop: '4px',
                }}>
                  {item.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ----------------------------------------------------
// MANAGER SIMULATION SUB-COMPONENT
// ----------------------------------------------------
function ManagerConsole() {
  const [remark, setRemark] = useState('Approved based on lowest cost and vendor rating of 4.8/5.');
  const [actionDone, setActionDone] = useState(null); // 'approve', 'reject'

  const handleAction = (type) => {
    setActionDone(type);
    setTimeout(() => setActionDone(null), 4000);
  };

  return (
    <div className="animate-fade-in" style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '30px', textAlign: 'left' }}>
      <div>
        <h4 style={{ color: 'var(--accent)', fontSize: '16px', fontWeight: '600', marginBottom: '16px' }}>
          Action: Review Pending RFQ for Approval
        </h4>
        {actionDone ? (
          <div style={{
            backgroundColor: actionDone === 'approve' ? 'rgba(100, 255, 218, 0.1)' : 'rgba(255, 85, 85, 0.1)',
            border: actionDone === 'approve' ? '1px solid var(--accent)' : '1px solid #FF5555',
            padding: '24px',
            borderRadius: '6px',
            color: 'var(--text)',
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            gap: '12px',
          }}>
            <span style={{ fontSize: '32px' }}>{actionDone === 'approve' ? '🛡️' : '❌'}</span>
            <strong style={{ color: actionDone === 'approve' ? 'var(--accent)' : '#FF5555' }}>
              {actionDone === 'approve' ? 'RFQ Workflow Approved!' : 'RFQ Workflow Rejected'}
            </strong>
            <p style={{ fontSize: '13px', color: 'var(--text-muted)', textAlign: 'center' }}>
              Your decision has been logged into the Audit Trail. A Purchase Order draft is now generated.
            </p>
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            <div style={{ backgroundColor: 'var(--surface)', padding: '16px', borderRadius: '6px', border: '1px solid var(--border)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                <span style={{ fontSize: '12px', fontFamily: 'var(--font-mono)', color: 'var(--accent)' }}>APPROVAL REQ: RFQ-2026-004</span>
                <span style={{ fontSize: '11px', color: 'var(--text-muted)' }}>Created: Today</span>
              </div>
              <h5 style={{ fontSize: '15px', color: 'var(--text)', marginBottom: '8px' }}>Office Stationery Restock</h5>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', fontSize: '12px', color: 'var(--text-muted)' }}>
                <div>Selected Vendor: <span style={{ color: 'var(--text)' }}>Apex Industries</span></div>
                <div>Quoted Amount: <span style={{ color: 'var(--accent)' }}>₹12,400</span></div>
                <div>Delivery Term: <span style={{ color: 'var(--text)' }}>7 Days</span></div>
                <div>Budget Limit: <span style={{ color: 'var(--text)' }}>₹15,000 (Within limit)</span></div>
              </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
              <label style={{ fontSize: '12px', color: 'var(--text-muted)' }}>Approval Remarks (Optional)</label>
              <textarea
                value={remark}
                onChange={(e) => setRemark(e.target.value)}
                rows="2"
                style={{ backgroundColor: 'var(--surface)', border: '1px solid var(--border)', borderRadius: '4px', padding: '10px', color: 'var(--text)', outline: 'none', fontSize: '13px', resize: 'none' }}
              />
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px', marginTop: '6px' }}>
              <button
                onClick={() => handleAction('approve')}
                className="emerald-glow"
                style={{
                  backgroundColor: 'var(--accent)',
                  color: 'var(--bg)',
                  fontWeight: '700',
                  fontSize: '13px',
                  padding: '12px',
                  borderRadius: '4px',
                  border: 'none',
                }}
              >
                Approve & Issue PO
              </button>
              <button
                onClick={() => handleAction('reject')}
                style={{
                  backgroundColor: 'transparent',
                  color: '#FF5555',
                  border: '1px solid #FF5555',
                  fontWeight: '600',
                  fontSize: '13px',
                  padding: '12px',
                  borderRadius: '4px',
                }}
                onMouseEnter={(e) => e.target.style.backgroundColor = 'rgba(255, 85, 85, 0.1)'}
                onMouseLeave={(e) => e.target.style.backgroundColor = 'transparent'}
              >
                Reject & Send Back
              </button>
            </div>
          </div>
        )}
      </div>

      <div style={{ borderLeft: '1px solid var(--border)', paddingLeft: '30px' }}>
        <h4 style={{ color: 'var(--text)', fontSize: '15px', fontWeight: '600', marginBottom: '14px' }}>
          Approval Timeline Queue
        </h4>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', position: 'relative' }}>
          {[
            { step: '1', title: 'RFQ Created', desc: 'Sourced by Officer', status: 'done' },
            { step: '2', title: 'Bidding Closed', desc: '3 Vendors submitted bids', status: 'done' },
            { step: '3', title: 'Manager Review', desc: 'Awaiting your approval remarks', status: 'active' },
            { step: '4', title: 'PO Dispatched', desc: 'Auto-generates upon approval', status: 'pending' }
          ].map((item, i) => (
            <div key={i} style={{ display: 'flex', gap: '16px', alignItems: 'flex-start', position: 'relative' }}>
              {/* Stepper Dot */}
              <div style={{
                width: '24px',
                height: '24px',
                borderRadius: '50%',
                backgroundColor: item.status === 'done' ? 'var(--accent)' : item.status === 'active' ? 'transparent' : 'var(--border)',
                border: item.status === 'active' ? '2px solid var(--accent)' : 'none',
                color: item.status === 'done' ? 'var(--bg)' : 'var(--text)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '11px',
                fontWeight: '700',
                zIndex: 2,
              }}>
                {item.status === 'done' ? '✓' : item.step}
              </div>
              <div>
                <h5 style={{ fontSize: '13px', color: item.status === 'pending' ? 'var(--text-muted)' : 'var(--text)', margin: 0 }}>{item.title}</h5>
                <p style={{ fontSize: '11px', color: 'var(--text-muted)', margin: 0 }}>{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ----------------------------------------------------
// ADMIN SIMULATION SUB-COMPONENT
// ----------------------------------------------------
function AdminConsole() {
  const [vendors, setVendors] = useState([
    { name: 'Apex Industries Ltd', category: 'Manufacturing', status: 'Active', rating: '4.8/5' },
    { name: 'Zenith Tech Solutions', category: 'IT Hardware', status: 'Pending Approval', rating: '--' },
    { name: 'SolarTech Energy Corp', category: 'Energy Supplies', status: 'Active', rating: '4.5/5' },
  ]);

  const toggleVendorStatus = (index) => {
    const updated = [...vendors];
    updated[index].status = updated[index].status === 'Active' ? 'Suspended' : 'Active';
    setVendors(updated);
  };

  return (
    <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '20px', textAlign: 'left' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h4 style={{ color: 'var(--accent)', fontSize: '16px', fontWeight: '600' }}>
          Action: Manage Supplier Directory & Accreditations
        </h4>
        <span style={{ fontSize: '12px', color: 'var(--text-muted)' }}>Total Database: 48 registered suppliers</span>
      </div>

      <div style={{ overflowX: 'auto' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '13px' }}>
          <thead>
            <tr style={{ borderBottom: '1px solid var(--border)', color: 'var(--text-muted)' }}>
              <th style={{ padding: '10px', textAlign: 'left' }}>Vendor Name</th>
              <th style={{ padding: '10px', textAlign: 'left' }}>Accreditation Category</th>
              <th style={{ padding: '10px', textAlign: 'center' }}>Performance Rating</th>
              <th style={{ padding: '10px', textAlign: 'center' }}>Registration Status</th>
              <th style={{ padding: '10px', textAlign: 'right' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {vendors.map((vendor, idx) => (
              <tr key={idx} style={{ borderBottom: '1px solid rgba(35, 53, 84, 0.5)', transition: 'background 0.2s' }}>
                <td style={{ padding: '12px 10px', fontWeight: '600', color: 'var(--text)' }}>{vendor.name}</td>
                <td style={{ padding: '12px 10px', color: 'var(--text-muted)' }}>{vendor.category}</td>
                <td style={{ padding: '12px 10px', textAlign: 'center', color: 'var(--accent)' }}>{vendor.rating}</td>
                <td style={{ padding: '12px 10px', textAlign: 'center' }}>
                  <span style={{
                    fontSize: '10px',
                    padding: '2px 8px',
                    borderRadius: '4px',
                    backgroundColor: vendor.status === 'Active' ? 'rgba(100, 255, 218, 0.1)' : vendor.status === 'Suspended' ? 'rgba(255, 85, 85, 0.1)' : 'rgba(255, 189, 46, 0.1)',
                    color: vendor.status === 'Active' ? 'var(--accent)' : vendor.status === 'Suspended' ? '#FF5555' : '#FFBD2E',
                  }}>
                    {vendor.status}
                  </span>
                </td>
                <td style={{ padding: '12px 10px', textAlign: 'right' }}>
                  <button
                    onClick={() => toggleVendorStatus(idx)}
                    style={{
                      backgroundColor: 'transparent',
                      border: '1px solid var(--border)',
                      borderRadius: '4px',
                      color: 'var(--text)',
                      fontSize: '11px',
                      padding: '4px 8px',
                    }}
                    onMouseEnter={(e) => { e.target.style.borderColor = 'var(--accent)'; e.target.style.color = 'var(--accent)'; }}
                    onMouseLeave={(e) => { e.target.style.borderColor = 'var(--border)'; e.target.style.color = 'var(--text)'; }}
                  >
                    {vendor.status === 'Active' ? 'Suspend' : 'Activate'}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
