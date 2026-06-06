import React, { useState, useEffect } from 'react';
import './Vendors.css';

const INITIAL_VENDORS = [
  { id: 1, name: 'Infra Supplies Pvt Ltd', category: 'Constructions', gst: '27AAACCS1429B1Z0', contact: '+91 98765 43210', status: 'Active' },
  { id: 2, name: 'Tech Core LTD', category: 'IT', gst: '27AABC5678Z0', contact: '+91 87654 32109', status: 'Active' },
  { id: 3, name: 'Fasting Transport', category: 'Logistics', gst: '27AABC9012Z0', contact: '+91 76543 21098', status: 'Blocked' },
  { id: 4, name: 'Apex Builders', category: 'Constructions', gst: '27AABC1111Z1', contact: '+91 99999 88888', status: 'Active' },
  { id: 5, name: 'ByteWave Software', category: 'IT', gst: '27AABC2222Z2', contact: '+91 88888 77777', status: 'Active' },
  { id: 6, name: 'Swift Cargo logistics', category: 'Logistics', gst: '27AABC3333Z3', contact: '+91 77777 66666', status: 'Active' },
  { id: 7, name: 'Nova Industries', category: 'Manufacturing', gst: '27AABC4444Z4', contact: '+91 66666 55555', status: 'Active' },
  { id: 8, name: 'Beacon Consultants', category: 'Consulting', gst: '27AABC5555Z5', contact: '+91 55555 44444', status: 'Active' },
  { id: 9, name: 'Vertex Services', category: 'Services', gst: '27AABC6666Z6', contact: '+91 44444 33333', status: 'Active' },
  { id: 10, name: 'Blue Sky Energy', category: 'Energy', gst: '27AABC7777Z7', contact: '+91 33333 22222', status: 'Active' },
  { id: 11, name: 'Zenith Tech Solutions', category: 'IT', gst: '27AABC8888Z8', contact: '+91 22222 11111', status: 'Active' },
  { id: 12, name: 'Global Logistics Corp', category: 'Logistics', gst: '27AABC9999Z9', contact: '+91 11111 00000', status: 'Active' },
  { id: 13, name: 'Prime Metal Works', category: 'Manufacturing', gst: '27AABCA1B2C3', contact: '+91 98123 45678', status: 'Active' },
  { id: 14, name: 'Alpha Consultants', category: 'Consulting', gst: '27AABCD4E5F6', contact: '+91 98234 56789', status: 'Active' },
  { id: 15, name: 'Omni Facility Services', category: 'Services', gst: '27AABCG7H8I9', contact: '+91 98345 67890', status: 'Active' },
  { id: 16, name: 'EcoPower Systems', category: 'Energy', gst: '27AABCJ0K1L2', contact: '+91 98456 78901', status: 'Active' },
  { id: 17, name: 'Matrix IT Consultants', category: 'IT', gst: '27AABCM3N4O5', contact: '+91 98567 89012', status: 'Active' },
  { id: 18, name: 'Titan Logistics', category: 'Logistics', gst: '27AABCP6Q7R8', contact: '+91 98678 90123', status: 'Active' },
  { id: 19, name: 'Eagle Steel Fabrication', category: 'Manufacturing', gst: '27AABCS9T0U1', contact: '+91 98789 01234', status: 'Active' },
  { id: 20, name: 'Stratosphere Consulting', category: 'Consulting', gst: '27AABCV2W3X4', contact: '+91 98890 12345', status: 'Active' },
  { id: 21, name: 'Pioneer Facility Care', category: 'Services', gst: '27AABCY5Z6A7', contact: '+91 98901 23456', status: 'Active' },
  { id: 22, name: 'Dynamic Tech Inc', category: 'IT', gst: '27AABCB8C9D0', contact: '+91 99012 34567', status: 'Pending' },
  { id: 23, name: 'Greenfield Agri Solutions', category: 'Agriculture', gst: '27AABCE1F2G3', contact: '+91 99123 45678', status: 'Pending' },
  { id: 24, name: 'Falcon Express', category: 'Logistics', gst: '27AABCH4I5J6', contact: '+91 99234 56789', status: 'Pending' },
  { id: 25, name: 'Steel Weld Corp', category: 'Manufacturing', gst: '27AABCK7L8M9', contact: '+91 99345 67890', status: 'Pending' },
  { id: 26, name: 'Rogue Traders', category: 'Trading', gst: '27AABCN0O1P2', contact: '+91 99456 78901', status: 'Blocked' },
  { id: 27, name: 'Shady Supplies', category: 'Constructions', gst: '27AABCT8U9V0', contact: '+91 99567 89012', status: 'Blocked' },
  { id: 28, name: 'Quantum Energy (Suspended)', category: 'Energy', gst: '27AABCQ3R4S5', contact: '+91 99678 90123', status: 'Blocked' },
];

export default function Vendors({ vendors: propVendors, setVendors: propSetVendors }) {
  const [localVendors, setLocalVendors] = useState(() => {
    try {
      const savedVendors = localStorage.getItem('vendors');
      return savedVendors ? JSON.parse(savedVendors) : INITIAL_VENDORS;
    } catch {
      return INITIAL_VENDORS;
    }
  });

  const vendors = propVendors || localVendors;
  const setVendors = propSetVendors || setLocalVendors;

  const [activeTab, setActiveTab] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  // Modals state
  const [selectedVendor, setSelectedVendor] = useState(null);
  const [showAddModal, setShowAddModal] = useState(false);

  // Form states
  const [newVendorName, setNewVendorName] = useState('');
  const [newVendorCategory, setNewVendorCategory] = useState('IT');
  const [newVendorGst, setNewVendorGst] = useState('');
  const [newVendorContact, setNewVendorContact] = useState('');
  const [newVendorStatus, setNewVendorStatus] = useState('Active');

  useEffect(() => {
    localStorage.setItem('vendors', JSON.stringify(vendors));
  }, [vendors]);

  // Dynamic status count calculations
  const totalCount = vendors.length;
  const activeCount = vendors.filter(v => v.status === 'Active').length;
  const pendingCount = vendors.filter(v => v.status === 'Pending').length;
  const blockedCount = vendors.filter(v => v.status === 'Blocked').length;

  const filteredVendors = vendors.filter(vendor => {
    const matchesTab = activeTab === 'All' || vendor.status === activeTab;
    const matchesSearch = vendor.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          vendor.gst.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          vendor.category.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesTab && matchesSearch;
  });

  const handleAddVendorSubmit = (e) => {
    e.preventDefault();
    if (!newVendorName || !newVendorGst || !newVendorContact) {
      alert('Please fill out all fields.');
      return;
    }

    const newVendor = {
      id: Date.now(),
      name: newVendorName,
      category: newVendorCategory,
      gst: newVendorGst.toUpperCase(),
      contact: newVendorContact,
      status: newVendorStatus,
    };

    setVendors(prev => [newVendor, ...prev]);

    // Reset Form
    setNewVendorName('');
    setNewVendorCategory('IT');
    setNewVendorGst('');
    setNewVendorContact('');
    setNewVendorStatus('Active');
    setShowAddModal(false);
  };

  return (
    <div className="vendors-page animate-fade-in">
      {/* Header Section */}
      <div className="vendors-header">
        <div className="vendors-title">
          <h1>Vendors</h1>
          <p>Manage supplier profiles and registrations</p>
        </div>
        <button className="btn-primary" onClick={() => setShowAddModal(true)}>
          + Add Vendor
        </button>
      </div>

      {/* Search Bar */}
      <div className="search-container">
        <input 
          type="text" 
          className="search-input" 
          placeholder="Search bar ...... search by name, gst number, category..." 
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      {/* Status Tabs */}
      <div className="tabs-container">
        <button 
          className={`status-tab ${activeTab === 'All' ? 'active' : ''}`}
          onClick={() => setActiveTab('All')}
        >
          All ({totalCount})
        </button>
        <button 
          className={`status-tab ${activeTab === 'Active' ? 'active' : ''}`}
          onClick={() => setActiveTab('Active')}
        >
          Active ({activeCount})
        </button>
        <button 
          className={`status-tab ${activeTab === 'Pending' ? 'active' : ''}`}
          onClick={() => setActiveTab('Pending')}
        >
          Pending ({pendingCount})
        </button>
        <button 
          className={`status-tab ${activeTab === 'Blocked' ? 'active' : ''}`}
          onClick={() => setActiveTab('Blocked')}
        >
          Blocked ({blockedCount})
        </button>
      </div>

      {/* Vendors Table */}
      <div className="table-container">
        <table className="vendors-table">
          <thead>
            <tr>
              <th>Vendor Name</th>
              <th>Category</th>
              <th>GST no.</th>
              <th>Contact no.</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredVendors.length > 0 ? (
              filteredVendors.map((vendor) => (
                <tr key={vendor.id}>
                  <td style={{ fontWeight: 500 }}>{vendor.name}</td>
                  <td>{vendor.category}</td>
                  <td style={{ fontFamily: 'monospace', fontSize: '0.9rem' }}>{vendor.gst}</td>
                  <td>{vendor.contact}</td>
                  <td>
                    <span className={`status-badge ${vendor.status.toLowerCase()}`}>
                      {vendor.status}
                    </span>
                  </td>
                  <td>
                    <button className="btn-outline" onClick={() => setSelectedVendor(vendor)}>View</button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" style={{ textAlign: 'center', padding: '32px', color: 'var(--text-muted)' }}>
                  No vendors found matching your search.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* View Vendor Modal */}
      {selectedVendor && (
        <div className="modal-overlay" onClick={() => setSelectedVendor(null)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h4>Vendor Profile</h4>
              <p>Detailed verification information for {selectedVendor.name}</p>
            </div>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', margin: '24px 0' }}>
              <div style={{ display: 'grid', gridTemplateColumns: '130px 1fr', gap: '8px' }}>
                <span style={{ color: 'var(--text-muted)' }}>Vendor Name:</span>
                <span style={{ fontWeight: 600 }}>{selectedVendor.name}</span>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '130px 1fr', gap: '8px' }}>
                <span style={{ color: 'var(--text-muted)' }}>Category:</span>
                <span>{selectedVendor.category}</span>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '130px 1fr', gap: '8px' }}>
                <span style={{ color: 'var(--text-muted)' }}>GST Number:</span>
                <span style={{ fontFamily: 'monospace' }}>{selectedVendor.gst}</span>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '130px 1fr', gap: '8px' }}>
                <span style={{ color: 'var(--text-muted)' }}>Contact Details:</span>
                <span>{selectedVendor.contact}</span>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '130px 1fr', gap: '8px', alignItems: 'center' }}>
                <span style={{ color: 'var(--text-muted)' }}>Status:</span>
                <span className={`status-badge ${selectedVendor.status.toLowerCase()}`} style={{ width: 'fit-content' }}>
                  {selectedVendor.status}
                </span>
              </div>
            </div>

            <div className="modal-actions">
              <button className="btn-secondary" onClick={() => setSelectedVendor(null)}>
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Add Vendor Modal */}
      {showAddModal && (
        <div className="modal-overlay" onClick={() => setShowAddModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h4>Register New Vendor</h4>
              <p>Add a new supplier profile to the VendorBridge directory</p>
            </div>
            
            <form onSubmit={handleAddVendorSubmit} style={{ marginTop: '16px' }}>
              <div className="form-group">
                <label htmlFor="vendor-name">Vendor Name</label>
                <input 
                  id="vendor-name" 
                  type="text" 
                  placeholder="e.g. Acme Corporation" 
                  value={newVendorName}
                  onChange={(e) => setNewVendorName(e.target.value)}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="vendor-category">Category</label>
                <select 
                  id="vendor-category" 
                  value={newVendorCategory}
                  onChange={(e) => setNewVendorCategory(e.target.value)}
                >
                  <option value="IT">IT</option>
                  <option value="Constructions">Constructions</option>
                  <option value="Logistics">Logistics</option>
                  <option value="Manufacturing">Manufacturing</option>
                  <option value="Consulting">Consulting</option>
                  <option value="Services">Services</option>
                  <option value="Energy">Energy</option>
                </select>
              </div>

              <div className="form-group">
                <label htmlFor="vendor-gst">GST Number</label>
                <input 
                  id="vendor-gst" 
                  type="text" 
                  placeholder="e.g. 27AABC1234Z0" 
                  maxLength={15}
                  value={newVendorGst}
                  onChange={(e) => setNewVendorGst(e.target.value)}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="vendor-contact">Contact Number / Email</label>
                <input 
                  id="vendor-contact" 
                  type="text" 
                  placeholder="e.g. +91 98765 43210 or sales@acme.com" 
                  value={newVendorContact}
                  onChange={(e) => setNewVendorContact(e.target.value)}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="vendor-status">Initial Status</label>
                <select 
                  id="vendor-status" 
                  value={newVendorStatus}
                  onChange={(e) => setNewVendorStatus(e.target.value)}
                >
                  <option value="Active">Active</option>
                  <option value="Pending">Pending</option>
                  <option value="Blocked">Blocked</option>
                </select>
              </div>

              <div className="modal-actions" style={{ marginTop: '24px' }}>
                <button type="button" className="btn-secondary" onClick={() => setShowAddModal(false)}>
                  Cancel
                </button>
                <button type="submit" className="btn-primary">
                  Save Vendor
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
