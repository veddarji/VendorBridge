import { useState } from 'react';
import Navbar from './components/Navbar.jsx';
import HeroSection from './components/HeroSection.jsx';
import Features from './components/Features.jsx';
import InteractiveWorkflow from './components/InteractiveWorkflow.jsx';
import RoleSimulator from './components/RoleSimulator.jsx';
import AnalyticsPreview from './components/AnalyticsPreview.jsx';
import LoginModal from './components/LoginModal.jsx';

// Import all Console Views
import {
  ConsoleDashboard,
  ConsoleVendors,
  ConsoleRFQs,
  ConsoleSubmitQuote,
  ConsoleCompare,
  ConsoleApprovals,
  ConsolePOs,
  ConsoleLogs,
  ConsoleAnalytics,
} from './components/ConsoleViews.jsx';

import './App.css';

function App() {
  // Navigation & Screen States
  const [isDemoActive, setIsDemoActive] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [userRole, setUserRole] = useState('procurement_officer'); // procurement_officer, vendor, manager, admin
  const [consoleTab, setConsoleTab] = useState('dashboard'); // dashboard, vendors, rfqs, quotes, compare, approvals, pos, logs, analytics

  // ==========================================
  // SHARED STATE ENGINE (SIMULATED DATABASE)
  // ==========================================
  
  // 1. Vendor Partners Directory State
  const [vendors, setVendors] = useState([
    { name: 'Apex Industries Ltd', category: 'Manufacturing', gst: '29AAACA5481M1Z3', email: 'billing@apexindustries.com', rating: '4.8/5.0', status: 'Active' },
    { name: 'Zenith Tech Solutions', category: 'IT Services', gst: '29AABBB8490C1ZH', email: 'sales@zenithtech.com', rating: '4.2/5.0', status: 'Active' },
    { name: 'SolarTech Energy Corp', category: 'Utilities', gst: '29AACCC4120D2Z1', email: 'contracts@solartech.com', rating: '4.5/5.0', status: 'Active' },
  ]);

  // 2. Broadcasted RFQs State
  const [rfqs, setRfqs] = useState([
    { id: 'RFQ-2026-003', title: 'Enterprise Server Upgrade', description: 'Procure 15 heavy duty server rack units with fan grids.', qty: 15, deadline: '2026-06-18', assignedVendor: 'Zenith Tech Solutions', status: 'Active', quotesCount: 1 },
    { id: 'RFQ-2026-002', title: 'Facility LED Installations', description: 'Re-bulb corporate hub floor 3 with power-saving LEDs.', qty: 120, deadline: '2026-06-15', assignedVendor: 'all', status: 'Awaiting Approval', selectedVendor: 'SolarTech Energy Corp', selectedBid: 85000, selectedLeadTime: 5, quotesCount: 2 },
    { id: 'RFQ-2026-001', title: 'Office Supplies Q1 Contract', description: 'Regular paper, printing cartridges, and desk kits.', qty: 500, deadline: '2026-05-30', assignedVendor: 'all', status: 'Approved', selectedVendor: 'Apex Industries Ltd', selectedBid: 12400, selectedLeadTime: 7, quotesCount: 3 },
  ]);

  // 3. Submitted Quotation Bids State
  const [quotes, setQuotes] = useState([
    { rfqId: 'RFQ-2026-003', rfqTitle: 'Enterprise Server Upgrade', vendorName: 'Zenith Tech Solutions', price: 420000, leadTime: 10, notes: 'Includes 3 years on-site hardware support.' },
    { rfqId: 'RFQ-2026-002', rfqTitle: 'Facility LED Installations', vendorName: 'SolarTech Energy Corp', price: 85000, leadTime: 5, notes: 'Includes free installation and certificates.' },
    { rfqId: 'RFQ-2026-002', rfqTitle: 'Facility LED Installations', vendorName: 'Zenith Tech Solutions', price: 92000, leadTime: 7, notes: 'Fittings only, warranties are additional.' },
    { rfqId: 'RFQ-2026-001', rfqTitle: 'Office Supplies Q1 Contract', vendorName: 'Apex Industries Ltd', price: 12400, leadTime: 7, notes: '100% recycled paper sheets.' },
  ]);

  // 4. Chronological Audit Logs State
  const [auditLogs, setAuditLogs] = useState([
    { time: '11:15 AM', role: 'system', action: 'Database backup synchronized.' },
    { time: '11:02 AM', role: 'admin', action: 'Accredited Apex Industries Ltd.' },
    { time: '10:48 AM', role: 'procurement_officer', action: 'Issued Purchase Order PO-2026-9801 to Apex Industries.' },
    { time: '10:30 AM', role: 'manager', action: 'Approved RFQ-2026-001.' },
    { time: '10:15 AM', role: 'vendor', action: 'Submitted Bid Quote for RFQ-2026-001.' },
  ]);

  // 5. Active PO/Invoice Sheet Data State
  const [poData, setPoData] = useState({
    poNumber: 'PO-2026-9801',
    rfqId: 'RFQ-2026-001',
    title: 'Office Supplies Q1 Contract',
    vendor: 'Apex Industries Ltd',
    amount: 12400,
    qty: 500,
    leadTime: 7,
    remarks: 'Approved based on best pricing bid and delivery timeline.',
  });

  // Action log dispatcher helper
  const addLog = (role, action) => {
    const now = new Date();
    const timeStr = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });
    setAuditLogs((prev) => [{ time: timeStr, role, action }, ...prev]);
  };

  const handleNavigateConsole = (tab) => {
    setConsoleTab(tab);
  };

  return (
    <div className="app-container">
      {/* ---------------------------------------------------- */}
      {/* CONDITIONAL RENDER: LANDING PAGE VS ERP CONSOLE */}
      {/* ---------------------------------------------------- */}
      {!isDemoActive ? (
        <div className="landing-page">
          {/* Header/Navbar */}
          <Navbar 
            onOpenLogin={() => setIsLoginModalOpen(true)} 
            onLaunchDemo={() => {
              setIsDemoActive(true);
              addLog('system', 'User entered interactive ERP Demo Console.');
            }}
          />

          {/* Hero Section */}
          <HeroSection 
            onOpenLogin={() => setIsLoginModalOpen(true)} 
            onLaunchDemo={() => {
              setIsDemoActive(true);
              addLog('system', 'User entered interactive ERP Demo Console.');
            }}
          />

          {/* Core Feature Grid */}
          <div id="features">
            <Features />
          </div>

          {/* Stepper Pipeline Walkthrough */}
          <div id="workflow">
            <InteractiveWorkflow />
          </div>

          {/* Role Simulators */}
          <div id="roles">
            <RoleSimulator />
          </div>

          {/* Analytics Overview Section */}
          <div id="analytics">
            <AnalyticsPreview />
          </div>

          {/* Footer */}
          <footer className="landing-footer">
            <div className="container">
              <div className="footer-links">
                <a href="#features" className="footer-link">Features</a>
                <a href="#workflow" className="footer-link">Workflow</a>
                <a href="#roles" className="footer-link">Roles</a>
                <a href="#analytics" className="footer-link">Analytics</a>
              </div>
              <p style={{ color: 'var(--text-muted)', fontSize: '13px' }}>
                &copy; {new Date().getFullYear()} VendorBridge ERP. All rights reserved. Created for Next-Gen Procurement Operations.
              </p>
            </div>
          </footer>

          {/* Login/Signup Modal */}
          <LoginModal 
            isOpen={isLoginModalOpen} 
            onClose={() => setIsLoginModalOpen(false)} 
            onLoginSuccess={(role) => {
              setUserRole(role);
              setIsDemoActive(true);
              addLog(role, 'Successfully signed into the ERP console.');
            }}
          />
        </div>
      ) : (
        /* ---------------------------------------------------- */
        /* CONSOLE APPLICATION CONTAINER */
        /* ---------------------------------------------------- */
        <div className="erp-console animate-fade-in">
          {/* Sidebar */}
          <aside className="erp-sidebar">
            <div className="sidebar-logo">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ filter: 'drop-shadow(0 0 6px var(--accent))' }}>
                <path d="M16 16v1a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2h11a2 2 0 0 1 2 2v1" />
                <path d="M18 8h4a2 2 0 0 1 2 2v7a2 2 0 0 1-2 2h-4" />
                <path d="M16 12h8" />
              </svg>
              <span>Vendor<span style={{ color: 'var(--accent)' }}>Bridge</span></span>
            </div>

            <div className="sidebar-menu">
              <button 
                onClick={() => handleNavigateConsole('dashboard')}
                className={`menu-item ${consoleTab === 'dashboard' ? 'active' : ''}`}
              >
                📊 Dashboard Overview
              </button>
              <button 
                onClick={() => handleNavigateConsole('vendors')}
                className={`menu-item ${consoleTab === 'vendors' ? 'active' : ''}`}
              >
                🏢 Vendor Directory
              </button>
              <button 
                onClick={() => handleNavigateConsole('rfqs')}
                className={`menu-item ${consoleTab === 'rfqs' ? 'active' : ''}`}
              >
                📝 RFQ Composer
              </button>
              <button 
                onClick={() => handleNavigateConsole('quotes')}
                className={`menu-item ${consoleTab === 'quotes' ? 'active' : ''}`}
              >
                📩 Submit Bids
              </button>
              <button 
                onClick={() => handleNavigateConsole('compare')}
                className={`menu-item ${consoleTab === 'compare' ? 'active' : ''}`}
              >
                ⚖️ Compare Quotes
              </button>
              <button 
                onClick={() => handleNavigateConsole('approvals')}
                className={`menu-item ${consoleTab === 'approvals' ? 'active' : ''}`}
              >
                🛡️ Approvals Desk
              </button>
              <button 
                onClick={() => handleNavigateConsole('pos')}
                className={`menu-item ${consoleTab === 'pos' ? 'active' : ''}`}
              >
                📄 PO & Invoices
              </button>
              <button 
                onClick={() => handleNavigateConsole('logs')}
                className={`menu-item ${consoleTab === 'logs' ? 'active' : ''}`}
              >
                🔍 Audit Trails
              </button>
              <button 
                onClick={() => handleNavigateConsole('analytics')}
                className={`menu-item ${consoleTab === 'analytics' ? 'active' : ''}`}
              >
                📈 Reports & Trends
              </button>
            </div>

            {/* User Profile Info Widget */}
            <div className="user-profile-widget">
              <div className="user-avatar">
                {userRole === 'procurement_officer' ? 'PO' : userRole === 'vendor' ? 'VE' : userRole === 'manager' ? 'MA' : 'AD'}
              </div>
              <div style={{ textAlign: 'left', overflow: 'hidden' }}>
                <span style={{ fontSize: '13px', fontWeight: '600', color: 'var(--text)', display: 'block' }}>
                  {userRole === 'procurement_officer' ? 'Rohan Sharma' : userRole === 'vendor' ? 'Zenith Billing' : userRole === 'manager' ? 'Nikhil Verma' : 'System Admin'}
                </span>
                <span style={{ fontSize: '11px', color: 'var(--accent)', textTransform: 'capitalize' }}>
                  {userRole.replace('_', ' ')}
                </span>
              </div>
            </div>
          </aside>

          {/* Console Workarea Content */}
          <main className="console-workarea">
            {/* Console top header banner */}
            <header className="console-header">
              <div style={{ textAlign: 'left' }}>
                <span style={{ fontSize: '12px', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>
                  Console Core // {consoleTab.toUpperCase()}
                </span>
                <h1 style={{ fontSize: '20px', margin: '4px 0 0 0', fontWeight: '700' }}>
                  {consoleTab === 'dashboard' && 'Operations Dashboard'}
                  {consoleTab === 'vendors' && 'Supplier Accreditation Console'}
                  {consoleTab === 'rfqs' && 'Request For Quotation (RFQ) Composer'}
                  {consoleTab === 'quotes' && 'Supplier Bidding Console'}
                  {consoleTab === 'compare' && 'Quotation Evaluator'}
                  {consoleTab === 'approvals' && 'Hierarchy Approvals Manager'}
                  {consoleTab === 'pos' && 'Legal Accounting & Dispatches'}
                  {consoleTab === 'logs' && 'System Transaction Logs'}
                  {consoleTab === 'analytics' && 'Spending Analysis & Audits'}
                </h1>
              </div>

              <div style={{ display: 'flex', gap: '14px', alignItems: 'center' }}>
                <div style={{
                  fontSize: '11px',
                  backgroundColor: 'rgba(100, 255, 218, 0.08)',
                  color: 'var(--accent)',
                  border: '1px solid rgba(100, 255, 218, 0.2)',
                  borderRadius: '30px',
                  padding: '4px 12px',
                  fontWeight: '600',
                }}>
                  ACTIVE ROLE: {userRole.toUpperCase()}
                </div>
                <button
                  onClick={() => {
                    setIsDemoActive(false);
                    addLog('system', 'User exited interactive ERP Console and returned to the Landing Page.');
                  }}
                  style={{
                    backgroundColor: 'rgba(255, 85, 85, 0.1)',
                    color: '#FF5555',
                    border: '1px solid rgba(255, 85, 85, 0.3)',
                    borderRadius: '4px',
                    padding: '8px 14px',
                    fontSize: '12px',
                    fontWeight: '600',
                  }}
                  onMouseEnter={e => e.target.style.backgroundColor = 'rgba(255, 85, 85, 0.2)'}
                  onMouseLeave={e => e.target.style.backgroundColor = 'rgba(255, 85, 85, 0.1)'}
                >
                  Exit Console
                </button>
              </div>
            </header>

            {/* Renders Selected View */}
            <div className="console-content">
              {consoleTab === 'dashboard' && (
                <ConsoleDashboard 
                  vendors={vendors} 
                  rfqs={rfqs} 
                  quotes={quotes} 
                  auditLogs={auditLogs} 
                  onNavigate={handleNavigateConsole}
                  userRole={userRole}
                />
              )}
              {consoleTab === 'vendors' && (
                <ConsoleVendors 
                  vendors={vendors} 
                  setVendors={setVendors}
                  addLog={addLog}
                />
              )}
              {consoleTab === 'rfqs' && (
                <ConsoleRFQs 
                  rfqs={rfqs} 
                  setRfqs={setRfqs} 
                  vendors={vendors}
                  addLog={addLog}
                  onNavigate={handleNavigateConsole}
                />
              )}
              {consoleTab === 'quotes' && (
                <ConsoleSubmitQuote 
                  rfqs={rfqs} 
                  quotes={quotes} 
                  setQuotes={setQuotes}
                  setRfqs={setRfqs}
                  vendors={vendors}
                  addLog={addLog}
                  onNavigate={handleNavigateConsole}
                />
              )}
              {consoleTab === 'compare' && (
                <ConsoleCompare 
                  rfqs={rfqs} 
                  quotes={quotes}
                  setRfqs={setRfqs}
                  addLog={addLog}
                  onNavigate={handleNavigateConsole}
                />
              )}
              {consoleTab === 'approvals' && (
                <ConsoleApprovals 
                  rfqs={rfqs} 
                  setRfqs={setRfqs} 
                  addLog={addLog}
                  onNavigate={handleNavigateConsole}
                  setPoData={setPoData}
                />
              )}
              {consoleTab === 'pos' && (
                <ConsolePOs 
                  poData={poData}
                  addLog={addLog}
                />
              )}
              {consoleTab === 'logs' && (
                <ConsoleLogs 
                  auditLogs={auditLogs}
                />
              )}
              {consoleTab === 'analytics' && (
                <ConsoleAnalytics />
              )}
            </div>
          </main>
        </div>
      )}
    </div>
  );
}

export default App;
