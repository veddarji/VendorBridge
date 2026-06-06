import React, { useState } from 'react';

export default function CreateRfq({ vendors, rfqs, setRfqs, addLog, onNavigate }) {
  // Stepper state
  const [activeStep, setActiveStep] = useState(1);

  // Form states
  const [title, setTitle] = useState('Office Stationery Restock');
  const [category, setCategory] = useState('office_supplies');
  const [deadline, setDeadline] = useState('2026-06-25');
  const [description, setDescription] = useState('Procuring premium corporate stationery, printing sheets, and writing desks.');
  
  // Item entry states
  const [itemName, setItemName] = useState('');
  const [itemQty, setItemQty] = useState('');
  const [itemPrice, setItemPrice] = useState('');
  const [itemsList, setItemsList] = useState([
    { name: 'A4 Printing Reams (80 GSM)', qty: 100, price: 350 },
    { name: 'Gel Ink Pens (Blue/Black)', qty: 300, price: 15 },
    { name: 'Ergonomic Desktop Organizers', qty: 20, price: 750 },
  ]);

  // Vendor selection state
  const [selectedVendors, setSelectedVendors] = useState(['Apex Industries Ltd', 'Zenith Tech Solutions']);

  // File upload state (simulated)
  const [attachedFiles, setAttachedFiles] = useState([
    { name: 'stationery_specifications.pdf', size: '1.2 MB' },
  ]);

  // Handle adding an item to the list
  const handleAddItem = (e) => {
    e.preventDefault();
    if (!itemName.trim() || !itemQty || !itemPrice) {
      alert('Please fill out all item fields.');
      return;
    }
    const newItem = {
      name: itemName.trim(),
      qty: parseInt(itemQty, 10),
      price: parseFloat(itemPrice),
    };
    setItemsList([...itemsList, newItem]);
    setItemName('');
    setItemQty('');
    setItemPrice('');
  };

  // Handle deleting an item from the list
  const handleDeleteItem = (index) => {
    setItemsList(itemsList.filter((_, idx) => idx !== index));
  };

  // Toggle vendor checkbox selection
  const handleToggleVendor = (vendorName) => {
    if (selectedVendors.includes(vendorName)) {
      setSelectedVendors(selectedVendors.filter((v) => v !== vendorName));
    } else {
      setSelectedVendors([...selectedVendors, vendorName]);
    }
  };

  // Simulated file upload triggers
  const handleFileUpload = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const sizeMB = (file.size / (1024 * 1024)).toFixed(1);
      setAttachedFiles([
        ...attachedFiles,
        { name: file.name, size: `${sizeMB} MB` },
      ]);
    }
  };

  const handleRemoveFile = (index) => {
    setAttachedFiles(attachedFiles.filter((_, idx) => idx !== index));
  };

  // Form Reset
  const handleReset = () => {
    if (window.confirm('Are you sure you want to reset all form entries?')) {
      setTitle('');
      setCategory('office_supplies');
      setDeadline('');
      setDescription('');
      setItemName('');
      setItemQty('');
      setItemPrice('');
      setItemsList([]);
      setSelectedVendors([]);
      setAttachedFiles([]);
      setActiveStep(1);
    }
  };

  // Submit complete RFQ
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title.trim() || !deadline || itemsList.length === 0 || selectedVendors.length === 0) {
      alert('Validation Error: Please specify RFQ Title, Deadline, at least 1 Item, and at least 1 Vendor.');
      return;
    }

    const assignedVendor = selectedVendors.length === vendors.length ? 'all' : selectedVendors.join(', ');

    const newRfqPayload = {
      title: title.trim(),
      description,
      deadline,
      assignedVendor,
      items: itemsList
    };

    try {
      const token = localStorage.getItem('jwt_token');
      const response = await fetch('http://localhost:8081/api/rfqs', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': token ? `Bearer ${token}` : ''
        },
        body: JSON.stringify(newRfqPayload)
      });

      if (response.ok) {
        const savedRfq = await response.json();
        setRfqs([savedRfq, ...rfqs]);
        addLog('procurement_officer', `Created RFQ ${savedRfq.id}: "${savedRfq.title}" with ${itemsList.length} items`);
        alert(`RFQ ${savedRfq.id} has been successfully broadcast!`);
        onNavigate('dashboard');
      } else {
        alert('Failed to broadcast RFQ to the server.');
      }
    } catch (error) {
      console.error(error);
      alert('Error connecting to the RFQ API.');
    }
  };

  return (
    <div className="animate-fade-in" style={{ textAlign: 'left', color: 'var(--text-primary)' }}>
      {/* Title Header */}
      <div style={{ marginBottom: '28px' }}>
        <h2 style={{ fontSize: '24px', fontWeight: '700', color: 'var(--text-primary)' }}>Create RFQs</h2>
        <p style={{ color: 'var(--text-secondary)', fontSize: '13px' }}>Compose requirements, item lists, and distribute to vendor groups.</p>
      </div>

      {/* Progress Bar Stepper */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '16px 24px',
        backgroundColor: 'var(--bg-secondary)',
        borderRadius: 'var(--radius-lg)',
        border: '1px solid var(--border-light)',
        marginBottom: '30px',
      }}>
        {[
          { step: 1, name: 'General Details' },
          { step: 2, name: 'Item Specifications' },
          { step: 3, name: 'Vendor Distribution' },
          { step: 4, name: 'Review & Send' },
        ].map((item) => {
          const isCurrent = activeStep === item.step;
          const isDone = item.step < activeStep;
          return (
            <div 
              key={item.step} 
              onClick={() => setActiveStep(item.step)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                cursor: 'pointer',
                color: isCurrent ? 'var(--primary)' : isDone ? 'var(--text-primary)' : 'var(--text-muted)',
                fontWeight: isCurrent ? '700' : '500',
                fontSize: '13px',
                transition: 'var(--transition-normal)',
              }}
            >
              <div style={{
                width: '26px',
                height: '26px',
                borderRadius: '50%',
                backgroundColor: isDone ? 'var(--primary)' : 'transparent',
                border: isCurrent ? '2.5px solid var(--primary)' : isDone ? 'none' : '2.5px solid var(--border-light)',
                color: isDone ? 'var(--bg-primary)' : 'inherit',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '11px',
                fontWeight: '700',
              }}>
                {isDone ? '✓' : item.step}
              </div>
              <span>{item.name}</span>
            </div>
          );
        })}
      </div>

      {/* Primary Layout Form Grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: '1.2fr 1fr',
        gap: '30px',
        alignItems: 'start',
        '@media (max-width: 992px)': {
          gridTemplateColumns: '1fr',
        },
      }}>
        
        {/* Left Side: Inputs */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          
          {/* Panel 1: General Specs */}
          <div className="glass-panel" style={{
            padding: '24px',
            borderRadius: 'var(--radius-lg)',
            border: '1px solid var(--border-light)',
            backgroundColor: 'var(--bg-secondary)',
          }}>
            <h3 style={{ fontSize: '15px', fontWeight: '600', color: 'var(--text-primary)', marginBottom: '16px', borderBottom: '1px solid var(--border-light)', paddingBottom: '8px' }}>
              1. RFQ Metadata Specs
            </h3>

            <div className="erp-form">
              <div className="form-group">
                <label htmlFor="rfq-title">RFQ Title *</label>
                <input
                  id="rfq-title"
                  type="text"
                  className="form-control"
                  placeholder="E.g., Office Stationery Restock"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  required
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                <div className="form-group">
                  <label htmlFor="rfq-cat">Accreditation Category *</label>
                  <select
                    id="rfq-cat"
                    className="form-control"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                  >
                    <option value="office_supplies">Office Furniture & Supplies</option>
                    <option value="it_hardware">IT Services & Hardware</option>
                    <option value="raw_materials">Raw Manufacturing Materials</option>
                    <option value="logistics">Logistics & Shipping</option>
                  </select>
                </div>
                <div className="form-group">
                  <label htmlFor="rfq-deadline">Response Deadline *</label>
                  <input
                    id="rfq-deadline"
                    type="date"
                    className="form-control"
                    value={deadline}
                    onChange={(e) => setDeadline(e.target.value)}
                    required
                  />
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="rfq-desc">Detailed Scope & Description</label>
                <textarea
                  id="rfq-desc"
                  className="form-control"
                  rows="3"
                  placeholder="Define quality metrics, shipping address, or SLA expectations..."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </div>
            </div>
          </div>

          {/* Panel 2: Attachments & Distribution */}
          <div className="glass-panel" style={{
            padding: '24px',
            borderRadius: 'var(--radius-lg)',
            border: '1px solid var(--border-light)',
            backgroundColor: 'var(--bg-secondary)',
          }}>
            <h3 style={{ fontSize: '15px', fontWeight: '600', color: 'var(--text-primary)', marginBottom: '16px', borderBottom: '1px solid var(--border-light)', paddingBottom: '8px' }}>
              2. Distribution & Technical Files
            </h3>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              {/* File Uploader */}
              <div className="form-group">
                <label>Upload Technical Specifications (PDF, DOCX)</label>
                <div style={{
                  border: '1.5px dashed var(--border-light)',
                  borderRadius: 'var(--radius-md)',
                  padding: '20px',
                  textAlign: 'center',
                  backgroundColor: 'var(--bg-tertiary)',
                  cursor: 'pointer',
                  position: 'relative',
                  transition: 'var(--transition-normal)',
                }}
                onMouseEnter={(e) => e.currentTarget.style.borderColor = 'var(--primary)'}
                onMouseLeave={(e) => e.currentTarget.style.borderColor = 'var(--border-light)'}
                >
                  <input
                    type="file"
                    multiple
                    onChange={handleFileUpload}
                    style={{
                      position: 'absolute',
                      inset: 0,
                      opacity: 0,
                      cursor: 'pointer',
                    }}
                  />
                  <span style={{ fontSize: '22px', display: 'block', marginBottom: '6px' }}>📎</span>
                  <span style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>
                    Drag and drop file here, or <strong style={{ color: 'var(--primary)' }}>browse files</strong>
                  </span>
                </div>

                {/* Attached File List */}
                {attachedFiles.length > 0 && (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginTop: '12px' }}>
                    {attachedFiles.map((file, idx) => (
                      <div 
                        key={idx} 
                        style={{
                          display: 'flex',
                          justifyContent: 'space-between',
                          alignItems: 'center',
                          backgroundColor: 'var(--bg-tertiary)',
                          padding: '8px 12px',
                          borderRadius: 'var(--radius-sm)',
                          fontSize: '12px',
                        }}
                      >
                        <span style={{ color: 'var(--text-primary)', fontWeight: '500' }}>
                          📄 {file.name} <span style={{ color: 'var(--text-muted)', fontSize: '10px' }}>({file.size})</span>
                        </span>
                        <button 
                          type="button"
                          onClick={() => handleRemoveFile(idx)}
                          style={{
                            background: 'none',
                            border: 'none',
                            color: 'var(--danger)',
                            padding: 0,
                            fontSize: '14px',
                          }}
                        >
                          &times;
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Vendor Assignment checklist */}
              <div className="form-group">
                <label>Select Assigned Bidders *</label>
                <div style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '10px',
                  backgroundColor: 'var(--bg-tertiary)',
                  padding: '14px',
                  borderRadius: 'var(--radius-md)',
                  maxHeight: '180px',
                  overflowY: 'auto',
                }}>
                  {vendors.map((vendor, idx) => {
                    const isChecked = selectedVendors.includes(vendor.name);
                    return (
                      <label 
                        key={idx}
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '10px',
                          margin: 0,
                          cursor: 'pointer',
                          fontSize: '13px',
                          color: 'var(--text-primary)',
                        }}
                      >
                        <input
                          type="checkbox"
                          checked={isChecked}
                          onChange={() => handleToggleVendor(vendor.name)}
                          style={{
                            width: '16px',
                            height: '16px',
                            accentColor: 'var(--primary)',
                            cursor: 'pointer',
                          }}
                        />
                        <span>
                          <strong>{vendor.name}</strong> <span style={{ color: 'var(--text-muted)', fontSize: '11px' }}>({vendor.category} | Rating: {vendor.rating})</span>
                        </span>
                      </label>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side: Specification Item Sheet */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          
          {/* Panel 3: Add Items Form */}
          <div className="glass-panel" style={{
            padding: '24px',
            borderRadius: 'var(--radius-lg)',
            border: '1px solid var(--border-light)',
            backgroundColor: 'var(--bg-secondary)',
          }}>
            <h3 style={{ fontSize: '15px', fontWeight: '600', color: 'var(--text-primary)', marginBottom: '16px', borderBottom: '1px solid var(--border-light)', paddingBottom: '8px' }}>
              3. Specification Items Sheet
            </h3>

            {/* Input Row for adding items */}
            <form onSubmit={handleAddItem} style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '20px' }}>
              <div className="form-group">
                <label htmlFor="item-name">Item Name / Description</label>
                <input
                  id="item-name"
                  type="text"
                  className="form-control"
                  placeholder="E.g., Ergonomic Chairs"
                  value={itemName}
                  onChange={(e) => setItemName(e.target.value)}
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                <div className="form-group">
                  <label htmlFor="item-qty">Quantity</label>
                  <input
                    id="item-qty"
                    type="number"
                    className="form-control"
                    placeholder="100"
                    value={itemQty}
                    onChange={(e) => setItemQty(e.target.value)}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="item-price">Target Unit Price (INR)</label>
                  <input
                    id="item-price"
                    type="number"
                    className="form-control"
                    placeholder="3500"
                    value={itemPrice}
                    onChange={(e) => setItemPrice(e.target.value)}
                  />
                </div>
              </div>

              <button 
                type="submit"
                className="btn-secondary"
                style={{
                  padding: '10px',
                  borderRadius: 'var(--radius-sm)',
                  fontSize: '13px',
                  fontWeight: '600',
                  marginTop: '6px',
                }}
              >
                + Add Item Specification
              </button>
            </form>

            {/* Items Table List */}
            {itemsList.length === 0 ? (
              <div style={{
                padding: '24px',
                border: '1px dashed var(--border-light)',
                borderRadius: 'var(--radius-md)',
                textAlign: 'center',
                color: 'var(--text-muted)',
                fontSize: '12px',
              }}>
                No item rows added. Use the form above to add required materials.
              </div>
            ) : (
              <div style={{ overflowX: 'auto', border: '1px solid var(--border-light)', borderRadius: 'var(--radius-md)' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '12px', textAlign: 'left' }}>
                  <thead>
                    <tr style={{ backgroundColor: 'var(--bg-tertiary)', borderBottom: '1px solid var(--border-light)', color: 'var(--text-secondary)' }}>
                      <th style={{ padding: '10px' }}>Item Description</th>
                      <th style={{ padding: '10px', textAlign: 'center' }}>Qty</th>
                      <th style={{ padding: '10px', textAlign: 'right' }}>Target (₹)</th>
                      <th style={{ padding: '10px', textAlign: 'right' }}>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {itemsList.map((item, idx) => (
                      <tr key={idx} style={{ borderBottom: '1px solid rgba(230, 241, 255, 0.05)' }}>
                        <td style={{ padding: '10px', fontWeight: '500', color: 'var(--text-primary)' }}>{item.name}</td>
                        <td style={{ padding: '10px', textAlign: 'center' }}>{item.qty}</td>
                        <td style={{ padding: '10px', textAlign: 'right' }}>₹{item.price.toLocaleString()}</td>
                        <td style={{ padding: '10px', textAlign: 'right' }}>
                          <button 
                            type="button"
                            onClick={() => handleDeleteItem(idx)}
                            style={{
                              background: 'none',
                              border: 'none',
                              color: '#ff5555',
                              cursor: 'pointer',
                              padding: '2px 6px',
                              fontSize: '12px',
                            }}
                          >
                            Remove
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>

      </div>

      {/* Action Button Tray */}
      <div style={{
        marginTop: '36px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingTop: '20px',
        borderTop: '1px solid var(--border-light)',
      }}>
        <button
          onClick={handleReset}
          className="btn-secondary"
          style={{
            borderColor: '#ff5555',
            color: '#ff5555',
            padding: '12px 24px',
            backgroundColor: 'transparent',
          }}
          onMouseEnter={(e) => e.target.style.backgroundColor = 'rgba(255,85,85,0.05)'}
          onMouseLeave={(e) => e.target.style.backgroundColor = 'transparent'}
        >
          Reset Form Specs
        </button>

        <div style={{ display: 'flex', gap: '16px' }}>
          <button
            onClick={() => onNavigate('dashboard')}
            className="btn-secondary"
            style={{ padding: '12px 24px' }}
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            className="emerald-glow btn-primary"
            style={{
              padding: '12px 30px',
              fontWeight: '700',
            }}
          >
            Confirm & Broadcast RFQ
          </button>
        </div>
      </div>
    </div>
  );
}
