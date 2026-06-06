import { useState, useEffect } from 'react';
import Navbar from './components/Navbar.jsx';
import HeroSection from './components/HeroSection.jsx';
import Features from './components/Features.jsx';
import InteractiveWorkflow from './components/InteractiveWorkflow.jsx';
import RoleSimulator from './components/RoleSimulator.jsx';
import AnalyticsPreview from './components/AnalyticsPreview.jsx';
import { ToastContainer } from './components/Toast';
import CreateRfq from './components/CreateRfq.jsx';

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
import './Auth.css';

const ROLES = [
  { id: 'officer', name: 'Procurement Officer' },
  { id: 'vendor', name: 'Vendor' },
  { id: 'approver', name: 'Manager / Approver' },
  { id: 'admin', name: 'Admin' },
];

function App() {
  // Navigation & Screen States
  const [currentUser, setCurrentUser] = useState(() => {
    try {
      const savedSession = localStorage.getItem('currentUser');
      return savedSession ? JSON.parse(savedSession) : null;
    } catch {
      return null;
    }
  });

  const [view, setView] = useState(() => {
    try {
      const savedSession = localStorage.getItem('currentUser');
      return savedSession ? 'dashboard' : 'landing'; // Default to landing if not logged in
    } catch {
      return 'landing';
    }
  });

  const [theme, setTheme] = useState(() => localStorage.getItem('theme') || 'dark');
  const [toasts, setToasts] = useState([]);
  const [consoleTab, setConsoleTab] = useState('dashboard'); // dashboard, vendors, rfqs, quotes, compare, approvals, pos, logs, analytics

  // Map officer/approver role ids to their simulated view names
  const getMappedRole = (role) => {
    if (role === 'officer') return 'procurement_officer';
    if (role === 'approver') return 'manager';
    return role || 'procurement_officer';
  };

  // Auth Form State
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [loginPhoto, setLoginPhoto] = useState(null);

  // Registration Form State
  const [regFirstName, setRegFirstName] = useState('');
  const [regLastName, setRegLastName] = useState('');
  const [regEmail, setRegEmail] = useState('');
  const [regPhone, setRegPhone] = useState('');
  const [regRole, setRegRole] = useState('officer');
  const [regCountry, setRegCountry] = useState('');
  const [regInfo, setRegInfo] = useState('');
  const [regPassword, setRegPassword] = useState('');
  const [regConfirmPassword, setRegConfirmPassword] = useState('');
  const [regPhoto, setRegPhoto] = useState(null);

  // Photo capture/upload states
  const [showPhotoModal, setShowPhotoModal] = useState(false);
  const [photoModalContext, setPhotoModalContext] = useState('register'); // 'login' | 'register'
  const [cameraMode, setCameraMode] = useState(false);
  const [cameraStream, setCameraStream] = useState(null);

  // Modal / Forgot Password state
  const [showForgotModal, setShowForgotModal] = useState(false);
  const [forgotEmail, setForgotEmail] = useState('');

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

  // Initialize DB on mount
  useEffect(() => {
    if (!localStorage.getItem('users')) {
      const defaultUsers = [
        {
          firstName: 'Demo',
          lastName: 'Officer',
          email: 'officer@vendorbridge.com',
          password: 'password123',
          role: 'officer',
          country: 'United States',
          phone: '+1 555-0199',
          additionalInfo: 'Default procurement admin',
          photo: null,
        },
        {
          firstName: 'Global',
          lastName: 'Suppliers',
          email: 'vendor@vendorbridge.com',
          password: 'password123',
          role: 'vendor',
          country: 'Canada',
          phone: '+1 555-0233',
          additionalInfo: 'Corporate Vendor',
          photo: null,
        },
        {
          firstName: 'Sarah',
          lastName: 'Executive',
          email: 'approver@vendorbridge.com',
          password: 'password123',
          role: 'approver',
          country: 'United Kingdom',
          phone: '+44 20 7946 0958',
          additionalInfo: 'Managerial sign-off',
          photo: null,
        },
        {
          firstName: 'Admin',
          lastName: 'System',
          email: 'admin@vendorbridge.com',
          password: 'password123',
          role: 'admin',
          country: 'India',
          phone: '+91 98765 43210',
          additionalInfo: 'ERP Super Administrator',
          photo: null,
        },
      ];
      localStorage.setItem('users', JSON.stringify(defaultUsers));
    }
  }, []);

  // Sync theme attribute with document root
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  // Action log dispatcher helper
  const addLog = (role, action) => {
    const now = new Date();
    const timeStr = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });
    setAuditLogs((prev) => [{ time: timeStr, role, action }, ...prev]);
  };

  const handleNavigateConsole = (tab) => {
    setConsoleTab(tab);
  };

  const handleLoginEmailChange = (val) => {
    setLoginEmail(val);
    if (val) {
      const users = JSON.parse(localStorage.getItem('users') || '[]');
      const matchedUser = users.find((u) => u.email.toLowerCase() === val.toLowerCase());
      if (matchedUser && matchedUser.photo) {
        setLoginPhoto(matchedUser.photo);
      } else {
        setLoginPhoto(null);
      }
    } else {
      setLoginPhoto(null);
    }
  };

  // Toast helpers
  const addToast = (message, type = 'success') => {
    const id = Date.now().toString();
    setToasts((prev) => [...prev, { id, message, type }]);
  };

  const removeToast = (id) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id));
  };

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));
  };

  // Photo helpers
  const openPhotoModal = (context) => {
    setPhotoModalContext(context);
    setShowPhotoModal(true);
  };

  const closePhotoModal = () => {
    stopCamera();
    setShowPhotoModal(false);
  };

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { width: 320, height: 240 },
      });
      setCameraStream(stream);
      setCameraMode(true);
      setTimeout(() => {
        const video = document.getElementById('camera-video');
        if (video) {
          video.srcObject = stream;
        }
      }, 100);
    } catch {
      addToast('Could not access camera. Please upload a file instead.', 'error');
      setCameraMode(false);
    }
  };

  const stopCamera = () => {
    if (cameraStream) {
      cameraStream.getTracks().forEach((track) => track.stop());
      setCameraStream(null);
    }
    setCameraMode(false);
  };

  const handlePhotoUpload = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        if (photoModalContext === 'register') {
          setRegPhoto(reader.result);
        } else {
          setLoginPhoto(reader.result);
        }
        addToast('Photo uploaded successfully!', 'success');
        closePhotoModal();
      };
      reader.readAsDataURL(file);
    }
  };

  const captureSnapshot = () => {
    const video = document.getElementById('camera-video');
    if (video) {
      const canvas = document.createElement('canvas');
      canvas.width = video.videoWidth || 320;
      canvas.height = video.videoHeight || 240;
      const ctx = canvas.getContext('2d');
      ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
      const dataUrl = canvas.toDataURL('image/jpeg');

      if (photoModalContext === 'register') {
        setRegPhoto(dataUrl);
      } else {
        setLoginPhoto(dataUrl);
      }
      addToast('Snapshot captured successfully!', 'success');
      closePhotoModal();
    }
  };

  // Form Handlers
  const handleLoginSubmit = (e) => {
    e.preventDefault();

    if (!loginEmail || !loginPassword) {
      addToast('Please fill in all credentials.', 'error');
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(loginEmail)) {
      addToast('Please enter a valid email address.', 'error');
      return;
    }

    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const matchedUser = users.find(
      (u) => u.email.toLowerCase() === loginEmail.toLowerCase() && u.password === loginPassword,
    );

    if (matchedUser) {
      addToast(`Welcome back, ${matchedUser.firstName}!`, 'success');
      setCurrentUser(matchedUser);
      localStorage.setItem('currentUser', JSON.stringify(matchedUser));
      setView('dashboard');
      addLog(matchedUser.role, 'Successfully signed into the ERP console.');
    } else {
      addToast(
        'Invalid email or password. Try demo accounts (e.g. officer@vendorbridge.com / password123)',
        'error',
      );
    }
  };

  const handleRegisterSubmit = (e) => {
    e.preventDefault();

    // STRICT VALIDATION: Check that absolutely no field is empty
    if (
      !regFirstName.trim() ||
      !regLastName.trim() ||
      !regEmail.trim() ||
      !regPhone.trim() ||
      !regCountry.trim() ||
      !regPassword.trim() ||
      !regConfirmPassword.trim() ||
      !regInfo.trim()
    ) {
      addToast('All text entries are required. Please fill in all fields.', 'error');
      return;
    }

    if (!regPhoto) {
      addToast('Profile photo is required. Please upload or capture a photo.', 'error');
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(regEmail)) {
      addToast('Please enter a valid email address.', 'error');
      return;
    }

    if (regPassword.length < 6) {
      addToast('Password must be at least 6 characters long.', 'error');
      return;
    }

    if (regPassword !== regConfirmPassword) {
      addToast('Passwords do not match.', 'error');
      return;
    }

    const users = JSON.parse(localStorage.getItem('users') || '[]');
    if (users.some((u) => u.email.toLowerCase() === regEmail.toLowerCase())) {
      addToast('This email is already registered.', 'error');
      return;
    }

    const newUser = {
      firstName: regFirstName,
      lastName: regLastName,
      email: regEmail,
      phone: regPhone,
      role: regRole,
      country: regCountry,
      additionalInfo: regInfo,
      password: regPassword,
      photo: regPhoto,
    };

    const updatedUsers = [...users, newUser];
    localStorage.setItem('users', JSON.stringify(updatedUsers));

    addToast('Account created successfully! You can now log in.', 'success');

    // Clear registration fields
    setRegFirstName('');
    setRegLastName('');
    setRegEmail('');
    setRegPhone('');
    setRegCountry('');
    setRegInfo('');
    setRegPassword('');
    setRegConfirmPassword('');
    setRegPhoto(null);

    setView('login');
  };

  const handleForgotSubmit = (e) => {
    e.preventDefault();
    if (!forgotEmail) {
      addToast('Please enter your email address.', 'error');
      return;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(forgotEmail)) {
      addToast('Please enter a valid email address.', 'error');
      return;
    }

    addToast(`Password recovery link has been sent to ${forgotEmail}`, 'warning');
    setShowForgotModal(false);
    setForgotEmail('');
  };

  const handleLogout = () => {
    localStorage.removeItem('currentUser');
    setCurrentUser(null);
    setView('landing');
    addToast('Logged out successfully.', 'success');
  };

  return (
    <>
      <ToastContainer toasts={toasts} removeToast={removeToast} />

      {/* Theme Switcher Toggle */}
      <button
        type="button"
        className="theme-toggle"
        onClick={toggleTheme}
        aria-label="Toggle visual theme"
        title="Toggle dark/light theme"
      >
        {theme === 'dark' ? (
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="12" cy="12" r="5"></circle>
            <line x1="12" y1="1" x2="12" y2="3"></line>
            <line x1="12" y1="21" x2="12" y2="23"></line>
            <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
            <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
            <line x1="1" y1="12" x2="3" y2="12"></line>
            <line x1="21" y1="12" x2="23" y2="12"></line>
            <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
            <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
          </svg>
        ) : (
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
          </svg>
        )}
      </button>

      {/* Routing Controller */}
      {view === 'landing' && (
        <div className="landing-page">
          <Navbar 
            onOpenLogin={() => setView('login')} 
            onLaunchDemo={() => {
              const demoUser = {
                firstName: 'Demo',
                lastName: 'Officer',
                email: 'officer@vendorbridge.com',
                role: 'officer',
                country: 'India',
                phone: '+91 99999 99999',
                additionalInfo: 'Simulated Demo Account',
                photo: null
              };
              setCurrentUser(demoUser);
              setView('dashboard');
              addLog('system', 'User entered interactive ERP Demo Console.');
            }}
          />

          <HeroSection 
            onOpenLogin={() => setView('login')} 
            onLaunchDemo={() => {
              const demoUser = {
                firstName: 'Demo',
                lastName: 'Officer',
                email: 'officer@vendorbridge.com',
                role: 'officer',
                country: 'India',
                phone: '+91 99999 99999',
                additionalInfo: 'Simulated Demo Account',
                photo: null
              };
              setCurrentUser(demoUser);
              setView('dashboard');
              addLog('system', 'User entered interactive ERP Demo Console.');
            }}
          />

          <div id="features">
            <Features />
          </div>

          <div id="workflow">
            <InteractiveWorkflow />
          </div>

          <div id="roles">
            <RoleSimulator />
          </div>

          <div id="analytics">
            <AnalyticsPreview />
          </div>

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
        </div>
      )}

      {view === 'login' && (
        <div className="auth-page animate-fade-in">
          <div className="auth-card">
            <h2 style={{ fontSize: '1.8rem', marginBottom: '8px', color: 'var(--text-primary)' }}>Sign In</h2>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginBottom: '24px' }}>
              Access the VendorBridge Procurement ERP console.
            </p>

            {/* Interactive Photo Circle */}
            <div className="photo-circle-placeholder" onClick={() => openPhotoModal('login')}>
              {loginPhoto ? (
                <img src={loginPhoto} className="photo-circle-img" alt="Profile" />
              ) : (
                <span>Photo</span>
              )}
              <div className="photo-hover-overlay">
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"></path>
                  <circle cx="12" cy="13" r="4"></circle>
                </svg>
                <span>Edit</span>
              </div>
            </div>

            <form onSubmit={handleLoginSubmit}>
              <div className="form-group">
                <label htmlFor="login-email">Username / Email</label>
                <input
                  id="login-email"
                  type="email"
                  placeholder="name@company.com"
                  value={loginEmail}
                  onChange={(e) => handleLoginEmailChange(e.target.value)}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="login-password">Password</label>
                <input
                  id="login-password"
                  type="password"
                  placeholder="••••••••"
                  value={loginPassword}
                  onChange={(e) => setLoginPassword(e.target.value)}
                  required
                />
              </div>

              <div className="login-action-container">
                <button type="submit" className="btn-primary" style={{ width: '100%' }}>
                  Log in to ERP
                </button>
              </div>
            </form>
          </div>

          <div className="auth-view-switcher">
            Don't have an account?{' '}
            <a
              href="#register"
              onClick={(e) => {
                e.preventDefault();
                setView('register');
              }}
            >
              Register
            </a>{' '}
            |{' '}
            <a
              href="#forgot-password"
              onClick={(e) => {
                e.preventDefault();
                setShowForgotModal(true);
              }}
            >
              Forgot Password
            </a>{' '}
            |{' '}
            <a
              href="#back-landing"
              onClick={(e) => {
                e.preventDefault();
                setView('landing');
              }}
            >
              Back to Landing Page
            </a>
          </div>
        </div>
      )}

      {view === 'register' && (
        <div className="auth-page animate-fade-in">
          <div className="auth-card register-card">
            <h2 style={{ fontSize: '1.8rem', marginBottom: '8px', color: 'var(--text-primary)' }}>Supplier / User Registration</h2>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginBottom: '20px' }}>
              Create an authenticated profile on the VendorBridge ERP.
            </p>

            {/* Interactive Photo Circle */}
            <div className="photo-circle-placeholder" onClick={() => openPhotoModal('register')}>
              {regPhoto ? (
                <img src={regPhoto} className="photo-circle-img" alt="Profile" />
              ) : (
                <span>Photo</span>
              )}
              <div className="photo-hover-overlay">
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"></path>
                  <circle cx="12" cy="13" r="4"></circle>
                </svg>
                <span>Select</span>
              </div>
            </div>

            <form id="register-form" onSubmit={handleRegisterSubmit}>
              <div className="form-row" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                <div className="form-group">
                  <label htmlFor="reg-firstname">First Name</label>
                  <input
                    id="reg-firstname"
                    type="text"
                    placeholder="First Name"
                    value={regFirstName}
                    onChange={(e) => setRegFirstName(e.target.value)}
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="reg-lastname">Last Name</label>
                  <input
                    id="reg-lastname"
                    type="text"
                    placeholder="Last Name"
                    value={regLastName}
                    onChange={(e) => setRegLastName(e.target.value)}
                    required
                  />
                </div>
              </div>

              <div className="form-row" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginTop: '12px' }}>
                <div className="form-group">
                  <label htmlFor="reg-email">Email Address</label>
                  <input
                    id="reg-email"
                    type="email"
                    placeholder="Email Address"
                    value={regEmail}
                    onChange={(e) => setRegEmail(e.target.value)}
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="reg-phone">Phone Number</label>
                  <input
                    id="reg-phone"
                    type="tel"
                    placeholder="Phone Number"
                    value={regPhone}
                    onChange={(e) => setRegPhone(e.target.value)}
                    required
                  />
                </div>
              </div>

              <div className="form-row" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginTop: '12px' }}>
                <div className="form-group">
                  <label htmlFor="reg-role">Job Role</label>
                  <select
                    id="reg-role"
                    value={regRole}
                    onChange={(e) => setRegRole(e.target.value)}
                    required
                  >
                    <option value="officer">Procurement Officer</option>
                    <option value="vendor">Vendor Supplier</option>
                    <option value="approver">Manager / Approver</option>
                    <option value="admin">Administrator</option>
                  </select>
                </div>
                <div className="form-group">
                  <label htmlFor="reg-country">Country</label>
                  <input
                    id="reg-country"
                    type="text"
                    placeholder="Country"
                    value={regCountry}
                    onChange={(e) => setRegCountry(e.target.value)}
                    required
                  />
                </div>
              </div>

              <div className="form-row" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginTop: '12px' }}>
                <div className="form-group">
                  <label htmlFor="reg-password">Password</label>
                  <input
                    id="reg-password"
                    type="password"
                    placeholder="Password"
                    value={regPassword}
                    onChange={(e) => setRegPassword(e.target.value)}
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="reg-confirm-password">Confirm Password</label>
                  <input
                    id="reg-confirm-password"
                    type="password"
                    placeholder="Confirm Password"
                    value={regConfirmPassword}
                    onChange={(e) => setRegConfirmPassword(e.target.value)}
                    required
                  />
                </div>
              </div>

              <div className="form-group" style={{ marginTop: '12px' }}>
                <label htmlFor="reg-info">Additional Corporate Information</label>
                <textarea
                  id="reg-info"
                  placeholder="Tell us about your organization..."
                  value={regInfo}
                  onChange={(e) => setRegInfo(e.target.value)}
                  rows="3"
                  required
                />
              </div>
            </form>
          </div>

          {/* Register button situated outside the card container matching mockup */}
          <div className="register-action-container" style={{ marginTop: '20px', textAlign: 'center' }}>
            <button type="submit" form="register-form" className="btn-primary" style={{ width: '100%', maxWidth: '460px' }}>
              Register Account
            </button>
          </div>

          <div className="auth-view-switcher" style={{ marginTop: '16px' }}>
            Already have an account?{' '}
            <a
              href="#login"
              onClick={(e) => {
                e.preventDefault();
                setView('login');
              }}
            >
              Sign in
            </a>{' '}
            |{' '}
            <a
              href="#back-landing"
              onClick={(e) => {
                e.preventDefault();
                setView('landing');
              }}
            >
              Back to Landing Page
            </a>
          </div>
        </div>
      )}

      {view === 'dashboard' && (
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
              {currentUser?.photo ? (
                <img
                  src={currentUser.photo}
                  alt="Avatar"
                  style={{
                    width: '40px',
                    height: '40px',
                    borderRadius: '50%',
                    objectFit: 'cover',
                    border: '1.5px solid var(--accent)',
                  }}
                />
              ) : (
                <div className="user-avatar">
                  {currentUser?.firstName?.substring(0, 1)}{currentUser?.lastName?.substring(0, 1)}
                </div>
              )}
              <div style={{ textAlign: 'left', overflow: 'hidden' }}>
                <span style={{ fontSize: '13px', fontWeight: '600', color: 'var(--text)', display: 'block' }}>
                  {currentUser?.firstName} {currentUser?.lastName}
                </span>
                <span style={{ fontSize: '11px', color: 'var(--accent)', textTransform: 'capitalize' }}>
                  {getMappedRole(currentUser?.role).replace('_', ' ')}
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
                  ACTIVE ROLE: {getMappedRole(currentUser?.role).toUpperCase()}
                </div>
                <button
                  onClick={handleLogout}
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
                  Logout
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
                  userRole={getMappedRole(currentUser?.role)}
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
                <CreateRfq 
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

      {/* Forgot Password Modal */}
      {showForgotModal && (
        <div className="modal-overlay" onClick={() => setShowForgotModal(false)} style={{
          position: 'fixed',
          inset: 0,
          backgroundColor: 'rgba(2, 12, 27, 0.8)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 1000,
        }}>
          <div className="glass-panel modal-content" onClick={(e) => e.stopPropagation()} style={{
            padding: '30px',
            borderRadius: 'var(--radius-lg)',
            width: '100%',
            maxWidth: '440px',
            border: '1px solid var(--border)',
          }}>
            <div className="modal-header" style={{ marginBottom: '20px' }}>
              <h4 style={{ fontSize: '1.2rem', color: 'var(--text-primary)' }}>Reset Password</h4>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', marginTop: '4px' }}>
                Enter your email and we'll send you a recovery link.
              </p>
            </div>
            <form onSubmit={handleForgotSubmit} className="erp-form">
              <div className="form-group" style={{ marginBottom: '20px' }}>
                <label htmlFor="forgot-email">Email Address</label>
                <input
                  id="forgot-email"
                  type="email"
                  placeholder="name@company.com"
                  value={forgotEmail}
                  onChange={(e) => setForgotEmail(e.target.value)}
                  required
                />
              </div>
              <div className="modal-actions" style={{ display: 'flex', gap: '12px', justifyContent: 'flex-end' }}>
                <button
                  type="button"
                  className="btn-secondary"
                  onClick={() => setShowForgotModal(false)}
                >
                  Cancel
                </button>
                <button type="submit" className="btn-primary">
                  Send Recovery Link
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Photo Picker Options & Webcam capture modal */}
      {showPhotoModal && (
        <div className="modal-overlay" onClick={closePhotoModal} style={{
          position: 'fixed',
          inset: 0,
          backgroundColor: 'rgba(2, 12, 27, 0.8)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 1000,
        }}>
          <div className="glass-panel modal-content" onClick={(e) => e.stopPropagation()} style={{
            padding: '30px',
            borderRadius: 'var(--radius-lg)',
            width: '100%',
            maxWidth: '440px',
            border: '1px solid var(--border)',
          }}>
            <div className="modal-header" style={{ marginBottom: '20px' }}>
              <h4 style={{ fontSize: '1.2rem', color: 'var(--text-primary)' }}>Profile Picture</h4>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', marginTop: '4px' }}>
                Select how you would like to assign your profile photo.
              </p>
            </div>

            {!cameraMode ? (
              <div className="photo-options-list" style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <button
                  type="button"
                  className="photo-option-btn btn-secondary"
                  style={{ width: '100%', padding: '14px', justifyContent: 'center' }}
                  onClick={() => document.getElementById('photo-file-input')?.click()}
                >
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    style={{ color: 'var(--primary)' }}
                  >
                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                    <polyline points="17 8 12 3 7 8"></polyline>
                    <line x1="12" y1="3" x2="12" y2="15"></line>
                  </svg>
                  <span style={{ marginLeft: '8px' }}>Upload from File</span>
                </button>

                <button
                  type="button"
                  className="photo-option-btn btn-secondary"
                  style={{ width: '100%', padding: '14px', justifyContent: 'center' }}
                  onClick={startCamera}
                >
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    style={{ color: 'var(--primary)' }}
                  >
                    <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"></path>
                    <circle cx="12" cy="13" r="4"></circle>
                  </svg>
                  <span style={{ marginLeft: '8px' }}>Capture from Camera</span>
                </button>

                <input
                  id="photo-file-input"
                  type="file"
                  accept="image/*"
                  onChange={handlePhotoUpload}
                  style={{ display: 'none' }}
                />
              </div>
            ) : (
              <div className="camera-preview-container" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '16px' }}>
                <video
                  id="camera-video"
                  className="camera-video"
                  autoPlay
                  playsInline
                  muted
                  style={{ width: '100%', maxWidth: '320px', height: '240px', borderRadius: 'var(--radius-md)', backgroundColor: '#000', transform: 'scaleX(-1)' }}
                ></video>
                <div style={{ display: 'flex', gap: '12px' }}>
                  <button type="button" className="btn-secondary" onClick={stopCamera}>
                    Back
                  </button>
                  <button type="button" className="btn-primary" onClick={captureSnapshot}>
                    Capture
                  </button>
                </div>
              </div>
            )}

            <div className="modal-actions" style={{ marginTop: '24px', display: 'flex', justifyContent: 'flex-end' }}>
              <button type="button" className="btn-secondary" onClick={closePhotoModal}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default App;
