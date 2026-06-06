import React from 'react';
import './DashboardLayout.css';

const NAV_ITEMS = [
  { id: 'dashboard', label: '- Dashboard' },
  { id: 'vendors', label: '- Vendors' },
  { id: 'rfqs', label: "- RFQ's" },
  { id: 'quotations', label: '- Quotations' },
  { id: 'approvals', label: '- Approvals' },
  { id: 'purchase_orders', label: '- Purchase orders' },
  { id: 'invoices', label: '- Invoices' },
  { id: 'reports', label: '- Reports' },
  { id: 'activity', label: '- Activity' },
];

export default function DashboardLayout({
  activeTab,
  setActiveTab,
  currentUser,
  onLogout,
  children,
}) {
  return (
    <div className="dashboard-layout animate-fade-in">
      <header className="dashboard-topbar">
        <div className="topbar-brand">
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
          </svg>
          VendorBridge
        </div>
        <div className="topbar-actions">
          {/* User Profile */}
          <div className="profile-circle" title="Profile">
            {currentUser?.photo ? (
              <img src={currentUser.photo} alt="Profile" />
            ) : (
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--primary)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                <circle cx="12" cy="7" r="4"></circle>
              </svg>
            )}
          </div>
          <button className="btn-secondary" onClick={onLogout} style={{ padding: '8px 16px', fontSize: '0.85rem' }}>
            Logout
          </button>
        </div>
      </header>

      <div className="dashboard-body">
        <aside className="dashboard-sidebar">
          {NAV_ITEMS.map((item) => (
            <div
              key={item.id}
              className={`nav-item ${activeTab === item.id ? 'active' : ''}`}
              onClick={() => setActiveTab(item.id)}
            >
              {item.label}
            </div>
          ))}
        </aside>

        <main className="dashboard-content">
          {children}
        </main>
      </div>
    </div>
  );
}
