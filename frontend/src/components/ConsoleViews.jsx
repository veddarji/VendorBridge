import React, { useState } from 'react';

// ==========================================
// 1. DASHBOARD OVERVIEW VIEW (Screen 3)
// ==========================================
export function ConsoleDashboard({ vendors, rfqs, auditLogs, onNavigate, userRole }) {
  const pendingApprovalsCount = rfqs.filter(r => r.status === 'Awaiting Approval').length;
  const activeRfqsCount = rfqs.filter(r => r.status === 'Active').length;
  
  return (
    <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '30px', textAlign: 'left' }}>
      <div>
        <h2 style={{ fontSize: '26px', color: 'var(--text)' }}>Welcome to VendorBridge Console</h2>
        <p style={{ color: 'var(--text-muted)', fontSize: '14px' }}>Logged in as: <strong style={{ color: 'var(--accent)', textTransform: 'capitalize' }}>{userRole.replace('_', ' ')}</strong></p>
      </div>

      {/* Analytics Summary Cards */}
      <div className="stats-grid">
        <div className="stat-card" onClick={() => onNavigate('rfqs')} style={{ cursor: 'pointer' }}>
          <span style={{ fontSize: '12px', color: 'var(--text-muted)' }}>Active RFQs</span>
          <h3 style={{ fontSize: '32px', color: 'var(--accent)', margin: '8px 0' }}>{activeRfqsCount}</h3>
          <span style={{ fontSize: '11px', color: 'var(--text-muted)' }}>Invitations dispatched</span>
        </div>
        <div className="stat-card" onClick={() => onNavigate('approvals')} style={{ cursor: 'pointer' }}>
          <span style={{ fontSize: '12px', color: 'var(--text-muted)' }}>Pending Approvals</span>
          <h3 style={{ fontSize: '32px', color: '#FFBD2E', margin: '8px 0' }}>{pendingApprovalsCount}</h3>
          <span style={{ fontSize: '11px', color: 'var(--text-muted)' }}>Requires Manager sign-off</span>
        </div>
        <div className="stat-card" onClick={() => onNavigate('analytics')} style={{ cursor: 'pointer' }}>
          <span style={{ fontSize: '12px', color: 'var(--text-muted)' }}>Total Spent YTD</span>
          <h3 style={{ fontSize: '32px', color: 'var(--text)', margin: '8px 0' }}>₹24.08L</h3>
          <span style={{ fontSize: '11px', color: 'var(--accent)' }}>99.2% budget utilization</span>
        </div>
        <div className="stat-card" onClick={() => onNavigate('vendors')} style={{ cursor: 'pointer' }}>
          <span style={{ fontSize: '12px', color: 'var(--text-muted)' }}>Approved Suppliers</span>
          <h3 style={{ fontSize: '32px', color: 'var(--accent)', margin: '8px 0' }}>{vendors.filter(v => v.status === 'Active').length}</h3>
          <span style={{ fontSize: '11px', color: 'var(--text-muted)' }}>Active network partners</span>
        </div>
      </div>

      {/* Main Grid: Quick Actions + Recent Activity */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '30px', flexWrap: 'wrap' }}>
        
        {/* Quick Action Panel */}
        <div className="glass-panel" style={{ padding: '24px', borderRadius: '8px', border: '1px solid var(--border)' }}>
          <h3 style={{ fontSize: '16px', color: 'var(--text)', marginBottom: '16px', fontWeight: '600' }}>Quick Actions Console</h3>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
            <button 
              onClick={() => onNavigate('rfqs')} 
              style={{ padding: '16px', backgroundColor: 'var(--surface)', border: '1px solid var(--border)', borderRadius: '6px', color: 'var(--text)', display: 'flex', flexDirection: 'column', gap: '8px', alignItems: 'center', transition: 'var(--transition)' }}
              onMouseEnter={(e) => { e.currentTarget.style.borderColor = 'var(--accent)'; e.currentTarget.style.backgroundColor = 'rgba(100,255,218,0.02)'; }}
              onMouseLeave={(e) => { e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.backgroundColor = 'var(--surface)'; }}
            >
              <span style={{ fontSize: '24px' }}>📝</span>
              <span style={{ fontSize: '13px', fontWeight: '600' }}>Create RFQ</span>
            </button>
            <button 
              onClick={() => onNavigate('quotes')} 
              style={{ padding: '16px', backgroundColor: 'var(--surface)', border: '1px solid var(--border)', borderRadius: '6px', color: 'var(--text)', display: 'flex', flexDirection: 'column', gap: '8px', alignItems: 'center', transition: 'var(--transition)' }}
              onMouseEnter={(e) => { e.currentTarget.style.borderColor = 'var(--accent)'; e.currentTarget.style.backgroundColor = 'rgba(100,255,218,0.02)'; }}
              onMouseLeave={(e) => { e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.backgroundColor = 'var(--surface)'; }}
            >
              <span style={{ fontSize: '24px' }}>📩</span>
              <span style={{ fontSize: '13px', fontWeight: '600' }}>Submit Quotation</span>
            </button>
            <button 
              onClick={() => onNavigate('compare')} 
              style={{ padding: '16px', backgroundColor: 'var(--surface)', border: '1px solid var(--border)', borderRadius: '6px', color: 'var(--text)', display: 'flex', flexDirection: 'column', gap: '8px', alignItems: 'center', transition: 'var(--transition)' }}
              onMouseEnter={(e) => { e.currentTarget.style.borderColor = 'var(--accent)'; e.currentTarget.style.backgroundColor = 'rgba(100,255,218,0.02)'; }}
              onMouseLeave={(e) => { e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.backgroundColor = 'var(--surface)'; }}
            >
              <span style={{ fontSize: '24px' }}>📊</span>
              <span style={{ fontSize: '13px', fontWeight: '600' }}>Compare Quotations</span>
            </button>
            <button 
              onClick={() => onNavigate('approvals')} 
              style={{ padding: '16px', backgroundColor: 'var(--surface)', border: '1px solid var(--border)', borderRadius: '6px', color: 'var(--text)', display: 'flex', flexDirection: 'column', gap: '8px', alignItems: 'center', transition: 'var(--transition)' }}
              onMouseEnter={(e) => { e.currentTarget.style.borderColor = 'var(--accent)'; e.currentTarget.style.backgroundColor = 'rgba(100,255,218,0.02)'; }}
              onMouseLeave={(e) => { e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.backgroundColor = 'var(--surface)'; }}
            >
              <span style={{ fontSize: '24px' }}>🛡️</span>
              <span style={{ fontSize: '13px', fontWeight: '600' }}>Procurement Approvals</span>
            </button>
          </div>
        </div>

        {/* Recent Activity Mini Log */}
        <div className="glass-panel" style={{ padding: '24px', borderRadius: '8px', border: '1px solid var(--border)', display: 'flex', flexDirection: 'column' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
            <h3 style={{ fontSize: '16px', color: 'var(--text)', fontWeight: '600' }}>Recent System Operations</h3>
            <button onClick={() => onNavigate('logs')} style={{ background: 'none', border: 'none', color: 'var(--accent)', fontSize: '12px' }}>View All</button>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', overflowY: 'auto', maxHeight: '180px', flexGrow: 1 }}>
            {auditLogs.slice(0, 5).map((log, i) => (
              <div key={i} style={{ display: 'flex', gap: '10px', fontSize: '12px', borderBottom: '1px solid rgba(35, 53, 84, 0.3)', paddingBottom: '8px' }}>
                <span style={{ color: 'var(--accent)', fontFamily: 'var(--font-mono)' }}>{log.time}</span>
                <div>
                  <strong style={{ color: 'var(--text)' }}>{log.role.replace('_', ' ')}:</strong>
                  <span style={{ color: 'var(--text-muted)', marginLeft: '6px' }}>{log.action}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}

// ==========================================
// 2. VENDOR DIRECTORY VIEW (Screen 4)
// ==========================================
export function ConsoleVendors({ vendors, setVendors, addLog }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('All');
  
  // Registration Form State
  const [showRegModal, setShowRegModal] = useState(false);
  const [newVendor, setNewVendor] = useState({ name: '', category: 'Manufacturing', gst: '', email: '' });

  const handleRegister = (e) => {
    e.preventDefault();
    if (!newVendor.name || !newVendor.gst || !newVendor.email) {
      alert('Please fill out all fields.');
      return;
    }
    const created = { ...newVendor, status: 'Active', rating: '--' };
    setVendors([created, ...vendors]);
    addLog('admin', `Registered new Vendor: ${newVendor.name} (GST: ${newVendor.gst})`);
    setNewVendor({ name: '', category: 'Manufacturing', gst: '', email: '' });
    setShowRegModal(false);
  };

  const toggleStatus = (idx) => {
    const updated = [...vendors];
    const prevStatus = updated[idx].status;
    const nextStatus = prevStatus === 'Active' ? 'Suspended' : 'Active';
    updated[idx].status = nextStatus;
    setVendors(updated);
    addLog('admin', `Changed vendor status of ${updated[idx].name} from ${prevStatus} to ${nextStatus}`);
  };

  const filteredVendors = vendors.filter(v => {
    const matchesSearch = v.name.toLowerCase().includes(searchTerm.toLowerCase()) || v.gst.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = categoryFilter === 'All' || v.category === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="animate-fade-in" style={{ textAlign: 'left' }}>
      <div className="actions-bar" style={{ flexWrap: 'wrap', gap: '16px' }}>
        <div>
          <h2 style={{ fontSize: '24px', color: 'var(--text)' }}>Vendor Partner Registry</h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '13px' }}>Monitor profiles, GST registration details, and accreditation records.</p>
        </div>
        <button
          onClick={() => setShowRegModal(true)}
          className="emerald-glow"
          style={{
            backgroundColor: 'var(--accent)',
            color: 'var(--bg)',
            border: 'none',
            borderRadius: '4px',
            padding: '10px 20px',
            fontWeight: '700',
            fontSize: '13px',
          }}
        >
          + Register New Vendor
        </button>
      </div>

      {/* Registration Modal Overlay */}
      {showRegModal && (
        <div style={{
          position: 'fixed',
          inset: 0,
          backgroundColor: 'rgba(2, 12, 27, 0.8)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 100,
        }}>
          <div className="glass-panel" style={{ padding: '30px', borderRadius: '8px', width: '100%', maxWidth: '440px', border: '1px solid var(--border)' }}>
            <h3 style={{ marginBottom: '20px', color: 'var(--text)' }}>Register Vendor Profile</h3>
            <form onSubmit={handleRegister} className="erp-form">
              <div className="form-group">
                <label>Vendor / Company Name</label>
                <input type="text" className="form-control" placeholder="E.g., Apex Industries Ltd" value={newVendor.name} onChange={e => setNewVendor({...newVendor, name: e.target.value})} />
              </div>
              <div className="form-group">
                <label>Category</label>
                <select className="form-control" value={newVendor.category} onChange={e => setNewVendor({...newVendor, category: e.target.value})}>
                  <option value="Manufacturing">Manufacturing & Hardware</option>
                  <option value="IT Services">IT Services & Hardware</option>
                  <option value="Logistics">Logistics & Shipping</option>
                  <option value="Utilities">Utilities & Facility Management</option>
                </select>
              </div>
              <div className="form-group">
                <label>GST Identification Number (GSTIN)</label>
                <input type="text" className="form-control" placeholder="29XXXXX0000F1Z5" value={newVendor.gst} onChange={e => setNewVendor({...newVendor, gst: e.target.value})} />
              </div>
              <div className="form-group">
                <label>Contact Email</label>
                <input type="email" className="form-control" placeholder="supplier@domain.com" value={newVendor.email} onChange={e => setNewVendor({...newVendor, email: e.target.value})} />
              </div>
              <div style={{ display: 'flex', gap: '12px', justifyContent: 'flex-end', marginTop: '10px' }}>
                <button type="button" onClick={() => setShowRegModal(false)} style={{ background: 'none', border: '1px solid var(--border)', color: 'var(--text)', padding: '8px 16px', borderRadius: '4px' }}>Cancel</button>
                <button type="submit" style={{ backgroundColor: 'var(--accent)', color: 'var(--bg)', border: 'none', padding: '8px 16px', borderRadius: '4px', fontWeight: '700' }}>Save Supplier</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Filters Area */}
      <div style={{
        display: 'flex',
        gap: '16px',
        marginBottom: '20px',
        flexWrap: 'wrap',
      }}>
        <input
          type="text"
          placeholder="Search by Name or GST..."
          className="form-control"
          style={{ flexGrow: 1, maxWidth: '300px' }}
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
        />
        <select
          className="form-control"
          style={{ width: '180px' }}
          value={categoryFilter}
          onChange={e => setCategoryFilter(e.target.value)}
        >
          <option value="All">All Categories</option>
          <option value="Manufacturing">Manufacturing</option>
          <option value="IT Services">IT Services</option>
          <option value="Logistics">Logistics</option>
          <option value="Utilities">Utilities</option>
        </select>
      </div>

      {/* Vendor Table */}
      <div className="erp-table-container">
        <table className="erp-table">
          <thead>
            <tr>
              <th>Vendor Name</th>
              <th>Category</th>
              <th>GSTIN Details</th>
              <th>Contact Email</th>
              <th>Accreditation Rating</th>
              <th>Fulfillment Status</th>
              <th style={{ textAlign: 'right' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredVendors.map((vendor, idx) => (
              <tr key={idx}>
                <td style={{ fontWeight: '600' }}>{vendor.name}</td>
                <td>{vendor.category}</td>
                <td style={{ fontFamily: 'var(--font-mono)', fontSize: '13px' }}>{vendor.gst}</td>
                <td>{vendor.email}</td>
                <td style={{ color: 'var(--accent)', fontWeight: '600' }}>{vendor.rating}</td>
                <td>
                  <span className={`badge ${vendor.status === 'Active' ? 'badge-emerald' : 'badge-red'}`}>
                    {vendor.status}
                  </span>
                </td>
                <td style={{ textAlign: 'right' }}>
                  <button
                    onClick={() => toggleStatus(vendors.indexOf(vendor))}
                    style={{
                      background: 'none',
                      border: '1px solid var(--border)',
                      borderRadius: '4px',
                      color: 'var(--text)',
                      padding: '4px 10px',
                      fontSize: '12px',
                    }}
                    onMouseEnter={(e) => e.target.style.borderColor = 'var(--accent)'}
                    onMouseLeave={(e) => e.target.style.borderColor = 'var(--border)'}
                  >
                    {vendor.status === 'Active' ? 'Suspend' : 'Accredit'}
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

// ==========================================
// 3. CREATE RFQ VIEW (Screen 5)
// ==========================================
export function ConsoleRFQs({ rfqs, setRfqs, vendors, addLog, onNavigate }) {
  const [step, setStep] = useState(1);
  const [form, setForm] = useState({
    title: 'Executive Office Desks',
    desc: 'Heavy duty office furniture with wire routing systems',
    qty: '10',
    deadline: '2026-06-20',
    assignedVendor: 'all',
    specs: '',
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.title || !form.qty || !form.deadline) {
      alert('Please fill out all required fields.');
      return;
    }
    const rfqId = `RFQ-2026-00${rfqs.length + 1}`;
    const newRfq = {
      id: rfqId,
      title: form.title,
      description: form.desc,
      qty: parseInt(form.qty),
      deadline: form.deadline,
      assignedVendor: form.assignedVendor,
      status: 'Active',
      quotesCount: 0,
    };
    setRfqs([newRfq, ...rfqs]);
    addLog('procurement_officer', `Created RFQ ${rfqId}: "${form.title}"`);
    setStep(1);
    setForm({ title: '', desc: '', qty: '', deadline: '', assignedVendor: 'all', specs: '' });
    alert(`RFQ ${rfqId} has been successfully broadcast!`);
    onNavigate('dashboard');
  };

  return (
    <div className="animate-fade-in" style={{ textAlign: 'left' }}>
      <div style={{ marginBottom: '24px' }}>
        <h2 style={{ fontSize: '24px', color: 'var(--text)' }}>Create Request For Quotation (RFQ)</h2>
        <p style={{ color: 'var(--text-muted)', fontSize: '13px' }}>Compose and broadcast specifications to eligible suppliers.</p>
      </div>

      <div className="glass-panel" style={{ padding: '30px', borderRadius: '8px', border: '1px solid var(--border)', maxWidth: '750px' }}>
        {/* Stepper Steps Header */}
        <div className="stepper-header">
          <div className={`step-indicator ${step === 1 ? 'active' : step > 1 ? 'completed' : ''}`}>
            <span className="step-num">1</span>
            <span>RFQ specifications</span>
          </div>
          <div className={`step-indicator ${step === 2 ? 'active' : step > 2 ? 'completed' : ''}`}>
            <span className="step-num">2</span>
            <span>Supplier assignment</span>
          </div>
          <div className={`step-indicator ${step === 3 ? 'active' : ''}`}>
            <span className="step-num">3</span>
            <span>Review & Broadcast</span>
          </div>
        </div>

        {/* Wizard Form */}
        <form onSubmit={handleSubmit} className="erp-form">
          
          {step === 1 && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }} className="animate-fade-in">
              <div className="form-group">
                <label>RFQ Title *</label>
                <input type="text" className="form-control" placeholder="E.g., Office Stationery Restock" value={form.title} onChange={e => setForm({...form, title: e.target.value})} required />
              </div>
              <div className="form-group">
                <label>Scope / Specifications Details</label>
                <textarea className="form-control" rows="3" placeholder="Describe the item requirements..." value={form.desc} onChange={e => setForm({...form, desc: e.target.value})} />
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                <div className="form-group">
                  <label>Quantity Needed *</label>
                  <input type="number" className="form-control" value={form.qty} onChange={e => setForm({...form, qty: e.target.value})} required />
                </div>
                <div className="form-group">
                  <label>Response Deadline *</label>
                  <input type="date" className="form-control" value={form.deadline} onChange={e => setForm({...form, deadline: e.target.value})} required />
                </div>
              </div>
              <button type="button" onClick={() => setStep(2)} className="emerald-glow" style={{ backgroundColor: 'var(--accent)', color: 'var(--bg)', border: 'none', padding: '12px', borderRadius: '4px', fontWeight: '700', alignSelf: 'flex-end', marginTop: '10px' }}>Next: Assign Suppliers</button>
            </div>
          )}

          {step === 2 && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }} className="animate-fade-in">
              <div className="form-group">
                <label>Select Target Supplier Assignment</label>
                <select className="form-control" value={form.assignedVendor} onChange={e => setForm({...form, assignedVendor: e.target.value})}>
                  <option value="all">Broadcast Invitation (All Registered Suppliers)</option>
                  {vendors.map((v, i) => (
                    <option key={i} value={v.name}>{v.name} ({v.category})</option>
                  ))}
                </select>
              </div>
              <div className="form-group">
                <label>Special Instructions / Warranties Required</label>
                <input type="text" className="form-control" placeholder="E.g., Require minimum 3-year replacement warranty." value={form.specs} onChange={e => setForm({...form, specs: e.target.value})} />
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '10px' }}>
                <button type="button" onClick={() => setStep(1)} style={{ background: 'none', border: '1px solid var(--border)', color: 'var(--text)', padding: '10px 20px', borderRadius: '4px' }}>Back</button>
                <button type="button" onClick={() => setStep(3)} className="emerald-glow" style={{ backgroundColor: 'var(--accent)', color: 'var(--bg)', border: 'none', padding: '10px 20px', borderRadius: '4px', fontWeight: '700' }}>Next: Review RFQ</button>
              </div>
            </div>
          )}

          {step === 3 && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }} className="animate-fade-in">
              <div style={{ border: '1px solid var(--border)', borderRadius: '6px', padding: '20px', backgroundColor: 'rgba(17, 34, 64, 0.4)' }}>
                <h4 style={{ color: 'var(--accent)', marginBottom: '14px', fontSize: '15px' }}>Draft Summary Validation</h4>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px', fontSize: '13px' }}>
                  <div><strong>Title:</strong> {form.title}</div>
                  <div><strong>Quantity:</strong> {form.qty} units</div>
                  <div><strong>Deadline:</strong> {form.deadline}</div>
                  <div><strong>Assignment:</strong> {form.assignedVendor === 'all' ? 'All Vendors (Broadcast)' : form.assignedVendor}</div>
                  <div style={{ gridColumn: 'span 2' }}><strong>Scope:</strong> {form.desc || '--'}</div>
                </div>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '10px' }}>
                <button type="button" onClick={() => setStep(2)} style={{ background: 'none', border: '1px solid var(--border)', color: 'var(--text)', padding: '10px 20px', borderRadius: '4px' }}>Back</button>
                <button type="submit" className="emerald-glow" style={{ backgroundColor: 'var(--accent)', color: 'var(--bg)', border: 'none', padding: '10px 20px', borderRadius: '4px', fontWeight: '700' }}>Confirm & Broadcast RFQ</button>
              </div>
            </div>
          )}

        </form>
      </div>
    </div>
  );
}

// ==========================================
// 4. SUBMIT QUOTATION VIEW (Screen 6)
// ==========================================
export function ConsoleSubmitQuote({ rfqs, quotes, setQuotes, setRfqs, vendors, addLog, onNavigate }) {
  const [rfqId, setRfqId] = useState(rfqs[0]?.id || '');
  const [vendorName, setVendorName] = useState(vendors[0]?.name || '');
  const [price, setPrice] = useState('');
  const [leadTime, setLeadTime] = useState('');
  const [notes, setNotes] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!rfqId || !vendorName || !price || !leadTime) {
      alert('Please fill out all fields.');
      return;
    }

    const matchedRfq = rfqs.find(r => r.id === rfqId);
    if (!matchedRfq) return;

    const newQuote = {
      rfqId,
      rfqTitle: matchedRfq.title,
      vendorName,
      price: parseFloat(price),
      leadTime: parseInt(leadTime),
      notes,
    };

    setQuotes([newQuote, ...quotes]);

    // Update quote count on the RFQ
    const updatedRfqs = rfqs.map(r => {
      if (r.id === rfqId) {
        return { ...r, quotesCount: (r.quotesCount || 0) + 1 };
      }
      return r;
    });
    setRfqs(updatedRfqs);

    addLog('vendor', `Vendor "${vendorName}" submitted Quotation for ${rfqId} (Bid: ₹${parseFloat(price).toLocaleString()})`);
    alert('Your quotation has been securely saved and submitted!');
    
    setPrice('');
    setLeadTime('');
    setNotes('');
    onNavigate('dashboard');
  };

  return (
    <div className="animate-fade-in" style={{ textAlign: 'left' }}>
      <div style={{ marginBottom: '24px' }}>
        <h2 style={{ fontSize: '24px', color: 'var(--text)' }}>Submit Vendor Quotation</h2>
        <p style={{ color: 'var(--text-muted)', fontSize: '13px' }}>Submit contract bidding pricing and delivery timelines as a vendor.</p>
      </div>

      <div className="glass-panel" style={{ padding: '30px', borderRadius: '8px', border: '1px solid var(--border)', maxWidth: '600px' }}>
        <form onSubmit={handleSubmit} className="erp-form">
          <div className="form-group">
            <label>Select RFQ Request *</label>
            <select className="form-control" value={rfqId} onChange={e => setRfqId(e.target.value)} required>
              <option value="">Select an invitation...</option>
              {rfqs.filter(r => r.status === 'Active').map((r, i) => (
                <option key={i} value={r.id}>{r.id}: {r.title} (Qty: {r.qty})</option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label>Select Vendor Identity *</label>
            <select className="form-control" value={vendorName} onChange={e => setVendorName(e.target.value)} required>
              {vendors.map((v, i) => (
                <option key={i} value={v.name}>{v.name} ({v.category})</option>
              ))}
            </select>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
            <div className="form-group">
              <label>Total Price Bid Amount (INR) *</label>
              <input type="number" className="form-control" placeholder="E.g., 420000" value={price} onChange={e => setPrice(e.target.value)} required />
            </div>
            <div className="form-group">
              <label>Estimated Delivery Lead Time (Days) *</label>
              <input type="number" className="form-control" placeholder="E.g., 10" value={leadTime} onChange={e => setLeadTime(e.target.value)} required />
            </div>
          </div>

          <div className="form-group">
            <label>Warranties & Technical Remarks</label>
            <textarea className="form-control" rows="2" placeholder="Include any support terms..." value={notes} onChange={e => setNotes(e.target.value)} />
          </div>

          <button type="submit" className="emerald-glow" style={{ backgroundColor: 'var(--accent)', color: 'var(--bg)', border: 'none', padding: '12px', borderRadius: '4px', fontWeight: '700', marginTop: '10px' }}>Sign & Submit Quotation Bid</button>
        </form>
      </div>
    </div>
  );
}

// ==========================================
// 5. COMPARE QUOTATIONS VIEW (Screen 7)
// ==========================================
export function ConsoleCompare({ rfqs, quotes, setRfqs, addLog, onNavigate }) {
  const [selectedRfqId, setSelectedRfqId] = useState(rfqs[0]?.id || '');

  // Filter quotes corresponding to selected RFQ
  const activeQuotes = quotes.filter(q => q.rfqId === selectedRfqId);
  const selectedRfq = rfqs.find(r => r.id === selectedRfqId);

  // Find lowest price
  let lowestPrice = Infinity;
  if (activeQuotes.length > 0) {
    lowestPrice = Math.min(...activeQuotes.map(q => q.price));
  }

  const handleRouteApproval = (quote) => {
    // Set status of RFQ to Awaiting Approval
    const updatedRfqs = rfqs.map(r => {
      if (r.id === selectedRfqId) {
        return {
          ...r,
          status: 'Awaiting Approval',
          selectedVendor: quote.vendorName,
          selectedBid: quote.price,
          selectedLeadTime: quote.leadTime
        };
      }
      return r;
    });
    setRfqs(updatedRfqs);
    addLog('procurement_officer', `Routed RFQ ${selectedRfqId} for approval. Selected Vendor: ${quote.vendorName} (Bid: ₹${quote.price.toLocaleString()})`);
    alert(`Quotation from ${quote.vendorName} selected and sent to manager for approval!`);
    onNavigate('approvals');
  };

  return (
    <div className="animate-fade-in" style={{ textAlign: 'left' }}>
      <div style={{ marginBottom: '24px' }}>
        <h2 style={{ fontSize: '24px', color: 'var(--text)' }}>Compare Vendor Quotations</h2>
        <p style={{ color: 'var(--text-muted)', fontSize: '13px' }}>Review bidding sheets and forward the selected proposal for manager sign-off.</p>
      </div>

      <div style={{ display: 'flex', gap: '16px', marginBottom: '24px' }}>
        <select
          className="form-control"
          style={{ width: '320px' }}
          value={selectedRfqId}
          onChange={e => setSelectedRfqId(e.target.value)}
        >
          {rfqs.map((r, i) => (
            <option key={i} value={r.id}>{r.id}: {r.title} ({r.quotesCount || 0} bids)</option>
          ))}
        </select>
      </div>

      {selectedRfq && (
        <div style={{ border: '1px solid var(--border)', borderRadius: '6px', padding: '16px', backgroundColor: 'var(--surface)', marginBottom: '24px' }}>
          <h4 style={{ fontSize: '15px', color: 'var(--text)', marginBottom: '6px' }}>RFQ Details: {selectedRfq.title}</h4>
          <div style={{ fontSize: '12px', color: 'var(--text-muted)' }}>
            <span>ID: <strong>{selectedRfq.id}</strong> | Quantity: {selectedRfq.qty} units | Status: <strong>{selectedRfq.status}</strong></span>
          </div>
        </div>
      )}

      {activeQuotes.length === 0 ? (
        <div style={{ padding: '40px', border: '1px dashed var(--border)', borderRadius: '8px', textAlign: 'center', color: 'var(--text-muted)' }}>
          No quotations submitted yet for this RFQ. Switch your role to **Vendor** or use the **Submit Quotation** screen to submit a bid.
        </div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px' }}>
          {activeQuotes.map((quote, idx) => {
            const isLowest = quote.price === lowestPrice;
            return (
              <div
                key={idx}
                className={`glass-panel compare-col ${isLowest ? 'highlighted' : ''}`}
                style={{
                  padding: '24px',
                  borderRadius: '8px',
                  border: isLowest ? '2px solid var(--accent)' : '1px solid var(--border)',
                  position: 'relative',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '12px',
                }}
              >
                {isLowest && (
                  <span style={{
                    position: 'absolute',
                    top: '-10px',
                    right: '12px',
                    backgroundColor: 'var(--accent)',
                    color: 'var(--bg)',
                    fontSize: '9px',
                    fontWeight: '800',
                    padding: '2px 8px',
                    borderRadius: '4px',
                    letterSpacing: '0.5px',
                  }}>
                    Lowest Price
                  </span>
                )}
                <div>
                  <h3 style={{ fontSize: '17px', fontWeight: '700', color: 'var(--text)' }}>{quote.vendorName}</h3>
                  <span style={{ fontSize: '11px', color: 'var(--text-muted)' }}>Verified Supplier</span>
                </div>

                <div style={{ borderBottom: '1px solid rgba(230, 241, 255, 0.1)', paddingBottom: '12px' }}>
                  <div style={{ fontSize: '24px', fontWeight: '800', color: isLowest ? 'var(--accent)' : 'var(--text)', margin: '4px 0' }}>
                    ₹{quote.price.toLocaleString()}
                  </div>
                  <div style={{ fontSize: '12px', color: 'var(--text-muted)' }}>Delivery: <strong>{quote.leadTime} Days</strong></div>
                </div>

                <div style={{ fontSize: '12px', color: 'var(--text-muted)', flexGrow: 1 }}>
                  <strong>Notes:</strong> {quote.notes || 'No comments provided.'}
                </div>

                {selectedRfq?.status === 'Active' ? (
                  <button
                    onClick={() => handleRouteApproval(quote)}
                    className="emerald-glow"
                    style={{
                      backgroundColor: 'var(--accent)',
                      color: 'var(--bg)',
                      border: 'none',
                      padding: '10px',
                      borderRadius: '4px',
                      fontWeight: '700',
                      fontSize: '13px',
                      marginTop: '10px',
                    }}
                  >
                    Select & Route for Approval
                  </button>
                ) : (
                  <div style={{ textAlign: 'center', fontSize: '12px', color: 'var(--text-muted)', borderTop: '1px solid var(--border)', paddingTop: '10px', marginTop: '10px' }}>
                    RFQ Status: <span style={{ color: 'var(--accent)', fontWeight: '600' }}>{selectedRfq?.status}</span>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

// ==========================================
// 6. APPROVAL WORKFLOW VIEW (Screen 8)
// ==========================================
export function ConsoleApprovals({ rfqs, setRfqs, addLog, onNavigate, setPoData }) {
  const pendingRfqs = rfqs.filter(r => r.status === 'Awaiting Approval');
  const [remarks, setRemarks] = useState('Reviewed prices, and Apex Industries has the best vendor compliance rating.');

  const handleDecision = (rfq, status) => {
    const nextStatus = status === 'approve' ? 'Approved' : 'Rejected';
    const updated = rfqs.map(r => {
      if (r.id === rfq.id) {
        return { ...r, status: nextStatus, approvalRemarks: remarks };
      }
      return r;
    });
    setRfqs(updated);
    addLog('manager', `${nextStatus} RFQ ${rfq.id}. Remarks: "${remarks}"`);
    
    if (status === 'approve') {
      // Set the active PO details to display in the PO screen
      const suffix = String(rfq.id).replace(/\D/g, '').slice(-2).padStart(2, '0');
      const poNum = `PO-2026-98${suffix}`;
      setPoData({
        poNumber: poNum,
        rfqId: rfq.id,
        title: rfq.title,
        vendor: rfq.selectedVendor,
        amount: rfq.selectedBid,
        qty: rfq.qty,
        leadTime: rfq.selectedLeadTime,
        remarks: remarks,
      });
      alert(`RFQ ${rfq.id} approved successfully! Purchase Order ${poNum} is generated.`);
      onNavigate('pos');
    } else {
      alert(`RFQ ${rfq.id} rejected.`);
      onNavigate('dashboard');
    }
  };

  return (
    <div className="animate-fade-in" style={{ textAlign: 'left' }}>
      <div style={{ marginBottom: '24px' }}>
        <h2 style={{ fontSize: '24px', color: 'var(--text)' }}>Procurement Approval Desk</h2>
        <p style={{ color: 'var(--text-muted)', fontSize: '13px' }}>Approve or reject procurement workflows with audited feedback logs.</p>
      </div>

      {pendingRfqs.length === 0 ? (
        <div style={{ padding: '40px', border: '1px dashed var(--border)', borderRadius: '8px', textAlign: 'center', color: 'var(--text-muted)' }}>
          No procurement requests currently awaiting approval. Use the **Compare Quotes** screen to route a bid for approval first.
        </div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '30px', alignItems: 'start' }}>
          {/* Main Approval Action Card */}
          {pendingRfqs.map((rfq, idx) => (
            <div key={idx} className="glass-panel" style={{ padding: '30px', borderRadius: '8px', border: '1px solid var(--border)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid var(--border)', paddingBottom: '12px', marginBottom: '20px' }}>
                <span style={{ fontSize: '12px', color: 'var(--accent)', fontFamily: 'var(--font-mono)' }}>RFQ ID: {rfq.id}</span>
                <span className="badge badge-yellow">Awaiting Approval</span>
              </div>

              <h3 style={{ fontSize: '19px', color: 'var(--text)', marginBottom: '14px' }}>{rfq.title}</h3>
              
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px', marginBottom: '20px', fontSize: '13px' }}>
                <div>Selected Vendor: <strong style={{ color: 'var(--text)' }}>{rfq.selectedVendor}</strong></div>
                <div>Quoted Amount: <strong style={{ color: 'var(--accent)' }}>₹{rfq.selectedBid.toLocaleString()}</strong></div>
                <div>Lead Time: <strong style={{ color: 'var(--text)' }}>{rfq.selectedLeadTime} Days</strong></div>
                <div>Required Quantity: <strong style={{ color: 'var(--text)' }}>{rfq.qty} units</strong></div>
              </div>

              <div className="form-group" style={{ marginBottom: '20px' }}>
                <label>Reviewer Remarks & Notes</label>
                <textarea
                  className="form-control"
                  rows="3"
                  value={remarks}
                  onChange={e => setRemarks(e.target.value)}
                />
              </div>

              <div style={{ display: 'flex', gap: '16px' }}>
                <button
                  onClick={() => handleDecision(rfq, 'approve')}
                  className="emerald-glow"
                  style={{
                    backgroundColor: 'var(--accent)',
                    color: 'var(--bg)',
                    border: 'none',
                    borderRadius: '4px',
                    padding: '12px 24px',
                    fontWeight: '700',
                    flexGrow: 1,
                  }}
                >
                  Approve & Disburse PO
                </button>
                <button
                  onClick={() => handleDecision(rfq, 'reject')}
                  style={{
                    backgroundColor: 'transparent',
                    color: '#FF5555',
                    border: '1px solid #FF5555',
                    borderRadius: '4px',
                    padding: '12px 24px',
                    fontWeight: '600',
                    flexGrow: 1,
                  }}
                  onMouseEnter={e => e.target.style.backgroundColor = 'rgba(255,85,85,0.1)'}
                  onMouseLeave={e => e.target.style.backgroundColor = 'transparent'}
                >
                  Reject & Send Back
                </button>
              </div>
            </div>
          ))}

          {/* Timeline View */}
          <div className="glass-panel" style={{ padding: '24px', borderRadius: '8px', border: '1px solid var(--border)' }}>
            <h4 style={{ fontSize: '15px', color: 'var(--text)', marginBottom: '20px' }}>Workflow Routing Status</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', position: 'relative' }}>
              {[
                { actor: 'Procurement Officer', action: 'Drafted specs and broadcast RFQ', status: 'Completed' },
                { actor: 'Vendor Bidding', action: 'Bids received & compared', status: 'Completed' },
                { actor: 'Budget Compliance Check', action: 'Auto-verified budget criteria', status: 'Completed' },
                { actor: 'Management Sign-off', action: 'Pending executive review remarks', status: 'In Progress' }
              ].map((step, i) => (
                <div key={i} style={{ display: 'flex', gap: '16px', alignItems: 'flex-start' }}>
                  <div style={{
                    width: '24px',
                    height: '24px',
                    borderRadius: '50%',
                    backgroundColor: step.status === 'Completed' ? 'var(--accent)' : 'transparent',
                    border: step.status === 'Completed' ? 'none' : '2px solid var(--accent)',
                    color: step.status === 'Completed' ? 'var(--bg)' : 'var(--accent)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '11px',
                    fontWeight: '700',
                  }}>
                    {step.status === 'Completed' ? '✓' : i + 1}
                  </div>
                  <div>
                    <h5 style={{ fontSize: '13px', color: 'var(--text)', margin: 0 }}>{step.actor}</h5>
                    <p style={{ fontSize: '11px', color: 'var(--text-muted)', margin: 0 }}>{step.action}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// ==========================================
// 7. PO & INVOICES VIEW (Screen 9)
// ==========================================
export function ConsolePOs({ poData, addLog }) {
  const [email, setEmail] = useState('accounts@vendorbridge-partner.com');
  const [mailSent, setMailSent] = useState(false);

  if (!poData) {
    return (
      <div className="animate-fade-in" style={{ textAlign: 'left' }}>
        <h2 style={{ fontSize: '24px', color: 'var(--text)', marginBottom: '16px' }}>Purchase Order & Invoice Ledger</h2>
        <div style={{ padding: '40px', border: '1px dashed var(--border)', borderRadius: '8px', textAlign: 'center', color: 'var(--text-muted)' }}>
          No approved purchase orders ready. Complete an approval workflow inside **Approvals Workflow** to inspect document generation.
        </div>
      </div>
    );
  }

  // Tax calculations
  const subtotal = poData.amount;
  const gstRate = 0.18; // 18% GST
  const gstAmount = subtotal * gstRate;
  const grandTotal = subtotal + gstAmount;

  const handlePrint = () => {
    alert('Mock Print: Formatting document layout for local printer spooler...');
  };

  const handleSendEmail = (e) => {
    e.preventDefault();
    setMailSent(true);
    addLog('system', `Dispatched Email for Invoice Ref: INV-2026-${poData.poNumber.substring(8)} to ${email}`);
    setTimeout(() => {
      setMailSent(false);
      alert(`Email dispatched successfully to ${email}`);
    }, 2000);
  };

  return (
    <div className="animate-fade-in" style={{ textAlign: 'left' }}>
      <div className="actions-bar" style={{ flexWrap: 'wrap', gap: '16px' }}>
        <div>
          <h2 style={{ fontSize: '24px', color: 'var(--text)' }}>Legal Procurement Documents</h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '13px' }}>Official generated Purchase Order and Invoice accounting files.</p>
        </div>
        <div style={{ display: 'flex', gap: '12px' }}>
          <button
            onClick={handlePrint}
            style={{
              backgroundColor: 'var(--surface)',
              color: 'var(--text)',
              border: '1px solid var(--border)',
              borderRadius: '4px',
              padding: '10px 18px',
              fontSize: '13px',
              fontWeight: '600',
            }}
          >
            🖨️ Print Document
          </button>
          <button
            onClick={() => alert(`Filing: Document ${poData.poNumber}.pdf has been downloaded.`)}
            className="emerald-glow"
            style={{
              backgroundColor: 'var(--accent)',
              color: 'var(--bg)',
              border: 'none',
              borderRadius: '4px',
              padding: '10px 18px',
              fontSize: '13px',
              fontWeight: '700',
            }}
          >
            📥 Download PDF
          </button>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '30px', alignItems: 'start' }}>
        {/* Invoice Layout Sheet */}
        <div className="glass-panel" style={{ padding: '36px', borderRadius: '8px', border: '1px solid var(--border)', backgroundColor: '#112240' }}>
          {/* Header */}
          <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '2px solid var(--border)', paddingBottom: '20px', marginBottom: '24px' }}>
            <div>
              <h3 style={{ color: 'var(--text)', fontSize: '20px', fontWeight: '800' }}>VENDORBRIDGE ERP</h3>
              <p style={{ fontSize: '11px', color: 'var(--text-muted)' }}>Corporate Procurement Systems</p>
            </div>
            <div style={{ textAlign: 'right' }}>
              <h4 style={{ color: 'var(--accent)', fontSize: '18px', fontWeight: '700' }}>INVOICE</h4>
              <p style={{ fontSize: '12px', color: 'var(--text-muted)' }}>No: INV-2026-{poData.poNumber.substring(8)}</p>
              <p style={{ fontSize: '12px', color: 'var(--text-muted)' }}>PO Ref: {poData.poNumber}</p>
            </div>
          </div>

          {/* Details */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '24px', fontSize: '12px', color: 'var(--text-muted)' }}>
            <div>
              <strong style={{ color: 'var(--text)', fontSize: '13px' }}>Billed To:</strong><br />
              Corporate Headquarters Bangalore<br />
              GSTIN: 29AAACV5482K1ZH<br />
              Email: finance@corporation.com
            </div>
            <div>
              <strong style={{ color: 'var(--text)', fontSize: '13px' }}>Supplier / Billed By:</strong><br />
              {poData.vendor}<br />
              Fulfillment Term: {poData.leadTime} Days<br />
              Remarks: {poData.remarks}
            </div>
          </div>

          {/* Invoice Table */}
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '13px', marginBottom: '24px' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid var(--border)', color: 'var(--text-muted)' }}>
                <th style={{ padding: '8px 0', textAlign: 'left' }}>Item Description</th>
                <th style={{ padding: '8px 0', textAlign: 'center' }}>Qty</th>
                <th style={{ padding: '8px 0', textAlign: 'right' }}>Unit Bid (INR)</th>
                <th style={{ padding: '8px 0', textAlign: 'right' }}>Subtotal</th>
              </tr>
            </thead>
            <tbody>
              <tr style={{ borderBottom: '1px solid var(--border)' }}>
                <td style={{ padding: '12px 0', fontWeight: '600', color: 'var(--text)' }}>
                  {poData.title}<br />
                  <span style={{ fontSize: '11px', color: 'var(--text-muted)', fontWeight: '400' }}>Procured under ID: {poData.rfqId}</span>
                </td>
                <td style={{ padding: '12px 0', textAlign: 'center' }}>{poData.qty}</td>
                <td style={{ padding: '12px 0', textAlign: 'right' }}>₹{(subtotal / poData.qty).toLocaleString()}</td>
                <td style={{ padding: '12px 0', textAlign: 'right' }}>₹{subtotal.toLocaleString()}</td>
              </tr>
            </tbody>
          </table>

          {/* Calculation Summary */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', maxWidth: '300px', marginLeft: 'auto', fontSize: '13px', borderTop: '1px dashed var(--border)', paddingTop: '12px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span>Subtotal:</span>
              <span>₹{subtotal.toLocaleString()}.00</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--text-muted)' }}>
              <span>GST (18% Compliance):</span>
              <span>₹{gstAmount.toLocaleString()}.00</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: '800', color: 'var(--accent)', fontSize: '14px', borderTop: '1.5px solid var(--border)', paddingTop: '8px' }}>
              <span>Total Payable:</span>
              <span>₹{grandTotal.toLocaleString()}.00</span>
            </div>
          </div>
        </div>

        {/* Email Sending widget */}
        <div className="glass-panel" style={{ padding: '24px', borderRadius: '8px', border: '1px solid var(--border)' }}>
          <h4 style={{ fontSize: '16px', color: 'var(--text)', marginBottom: '16px', fontWeight: '600' }}>Transmit Document to Supplier</h4>
          <p style={{ fontSize: '13px', color: 'var(--text-muted)', marginBottom: '20px' }}>Dispatch the verified invoice and purchase agreement directly to the vendor's billing team.</p>
          
          <form onSubmit={handleSendEmail} className="erp-form">
            <div className="form-group">
              <label>Billing Email Address</label>
              <input
                type="email"
                required
                className="form-control"
                value={email}
                onChange={e => setEmail(e.target.value)}
              />
            </div>
            <button
              type="submit"
              disabled={mailSent}
              className="emerald-glow"
              style={{
                backgroundColor: 'var(--accent)',
                color: 'var(--bg)',
                border: 'none',
                borderRadius: '4px',
                padding: '12px',
                fontWeight: '700',
                fontSize: '13px',
              }}
            >
              {mailSent ? 'Transmitting XML/PDF...' : 'Send via Secure Email'}
            </button>
          </form>

          {mailSent && (
            <div style={{
              marginTop: '16px',
              color: 'var(--accent)',
              fontSize: '12px',
              textAlign: 'center',
            }}>
              Sending email invitation with secure JWT tokens...
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// ==========================================
// 8. SYSTEM AUDIT LOGS VIEW (Screen 10)
// ==========================================
export function ConsoleLogs({ auditLogs }) {
  return (
    <div className="animate-fade-in" style={{ textAlign: 'left' }}>
      <div style={{ marginBottom: '24px' }}>
        <h2 style={{ fontSize: '24px', color: 'var(--text)' }}>System Audit Trails</h2>
        <p style={{ color: 'var(--text-muted)', fontSize: '13px' }}>Un-editable chronological audit log for regulatory B2B compliance audits.</p>
      </div>

      <div className="erp-table-container">
        <div style={{
          padding: '16px 20px',
          borderBottom: '1px solid var(--border)',
          backgroundColor: 'rgba(17,34,64,0.3)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}>
          <strong>Audit Logs Registry</strong>
          <span style={{ fontSize: '11px', color: 'var(--accent)', backgroundColor: 'rgba(100,255,218,0.1)', padding: '2px 8px', borderRadius: '4px' }}>SECURED LAYER ACTIVE</span>
        </div>

        <div style={{ maxHeight: '450px', overflowY: 'auto' }}>
          <table className="erp-table">
            <thead>
              <tr>
                <th style={{ width: '120px' }}>Timestamp</th>
                <th style={{ width: '150px' }}>User Role</th>
                <th>Action Performed</th>
                <th style={{ width: '120px', textAlign: 'right' }}>Security Code</th>
              </tr>
            </thead>
            <tbody>
              {auditLogs.map((log, idx) => (
                <tr key={idx}>
                  <td style={{ fontFamily: 'var(--font-mono)', fontSize: '13px', color: 'var(--accent)' }}>{log.time}</td>
                  <td style={{ fontWeight: '600', textTransform: 'capitalize' }}>{log.role.replace('_', ' ')}</td>
                  <td style={{ color: 'var(--text-muted)' }}>{log.action}</td>
                  <td style={{ fontFamily: 'var(--font-mono)', fontSize: '12px', textAlign: 'right', color: 'rgba(230,241,255,0.4)' }}>
                    SHA-256_{984 + idx}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

// ==========================================
// 9. ANALYTICS REPORTS VIEW (Screen 11)
// ==========================================
export function ConsoleAnalytics() {
  const [downloading, setDownloading] = useState(null);

  const triggerDownload = (type) => {
    setDownloading(type);
    setTimeout(() => {
      setDownloading(null);
      alert(`Report generated and saved as: VendorBridge_Report_${new Date().getFullYear()}.${type}`);
    }, 1500);
  };

  return (
    <div className="animate-fade-in" style={{ textAlign: 'left' }}>
      <div className="actions-bar" style={{ flexWrap: 'wrap', gap: '16px' }}>
        <div>
          <h2 style={{ fontSize: '24px', color: 'var(--text)' }}>Platform Analytics & Reports</h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '13px' }}>spending analysis, monthly trends, and vendor delivery rate metrics.</p>
        </div>
        <div style={{ display: 'flex', gap: '10px' }}>
          <button
            disabled={downloading !== null}
            onClick={() => triggerDownload('xlsx')}
            style={{
              backgroundColor: 'var(--surface)',
              color: 'var(--text)',
              border: '1px solid var(--border)',
              borderRadius: '4px',
              padding: '10px 18px',
              fontSize: '13px',
              fontWeight: '600',
            }}
          >
            {downloading === 'xlsx' ? 'Building Sheet...' : 'Export Excel Data'}
          </button>
          <button
            disabled={downloading !== null}
            onClick={() => triggerDownload('pdf')}
            className="emerald-glow"
            style={{
              backgroundColor: 'var(--accent)',
              color: 'var(--bg)',
              border: 'none',
              borderRadius: '4px',
              padding: '10px 18px',
              fontSize: '13px',
              fontWeight: '700',
            }}
          >
            {downloading === 'pdf' ? 'Formatting Layout...' : 'Export Analytics PDF'}
          </button>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '30px' }}>
        
        {/* Spending Trends Widget */}
        <div className="glass-panel" style={{ padding: '30px', borderRadius: '8px', border: '1px solid var(--border)', backgroundColor: 'rgba(17,34,64,0.4)' }}>
          <h3 style={{ fontSize: '17px', color: 'var(--text)', marginBottom: '24px', fontWeight: '600' }}>Spending Trends Timeline</h3>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
            {/* Visual CSS-based Bar Chart */}
            <div style={{ display: 'flex', height: '180px', alignItems: 'flex-end', justifyContent: 'space-between', borderBottom: '1px solid var(--border)', paddingBottom: '10px', gap: '14px' }}>
              {[
                { month: 'Jan', val: 320000, height: '40%' },
                { month: 'Feb', val: 450000, height: '55%' },
                { month: 'Mar', val: 680000, height: '85%' },
                { month: 'Apr', val: 280000, height: '35%' },
                { month: 'May', val: 510000, height: '65%' },
                { month: 'Jun', val: 740000, height: '95%' }
              ].map((bar, i) => (
                <div key={i} style={{ flexGrow: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
                  <span style={{ fontSize: '10px', color: 'var(--text-muted)' }}>₹{(bar.val / 1000).toFixed(0)}K</span>
                  <div style={{
                    width: '100%',
                    height: bar.height,
                    backgroundColor: 'var(--accent)',
                    borderRadius: '4px 4px 0 0',
                    boxShadow: '0 0 10px rgba(100, 255, 218, 0.2)',
                  }}></div>
                  <span style={{ fontSize: '11px', color: 'var(--text-muted)' }}>{bar.month}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Top Accreditations */}
        <div className="glass-panel" style={{ padding: '24px', borderRadius: '8px', border: '1px solid var(--border)', display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <h3 style={{ fontSize: '17px', color: 'var(--text)', fontWeight: '600' }}>Vendor Accreditation Scorecards</h3>
          
          {[
            { name: 'Apex Industries Ltd', score: 98.4, status: 'Top Supplier' },
            { name: 'SolarTech Energy Corp', score: 95.2, status: 'Compliant' },
            { name: 'Zenith Tech Solutions', score: 91.0, status: 'Compliant' },
          ].map((item, idx) => (
            <div key={idx} style={{
              backgroundColor: 'var(--surface)',
              border: '1px solid var(--border)',
              borderRadius: '6px',
              padding: '12px 16px',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}>
              <div>
                <strong style={{ fontSize: '13px', color: 'var(--text)', display: 'block' }}>{item.name}</strong>
                <span style={{ fontSize: '11px', color: 'var(--accent)' }}>{item.status}</span>
              </div>
              <div style={{ textAlign: 'right' }}>
                <span style={{ fontSize: '18px', fontWeight: '800', color: 'var(--text)' }}>{item.score}%</span>
                <span style={{ fontSize: '9px', display: 'block', color: 'var(--text-muted)' }}>Fulfillment Rate</span>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}
