import { useState, useEffect } from 'react';
import './Auth.css';
import { ToastContainer } from './components/Toast';

// Default roles configuration
const ROLES = [
  {
    id: 'officer',
    name: 'Procurement Officer',
    description: 'Create RFQs, compare quotes, and generate purchase orders/invoices.',
    icon: (
      <svg className="role-icon" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
        <polyline points="14 2 14 8 20 8"></polyline>
        <line x1="16" y1="13" x2="8" y2="13"></line>
        <line x1="16" y1="17" x2="8" y2="17"></line>
        <polyline points="10 9 9 9 8 9"></polyline>
      </svg>
    )
  },
  {
    id: 'vendor',
    name: 'Vendor',
    description: 'Submit quotations, track RFQ status, and manage active purchase orders.',
    icon: (
      <svg className="role-icon" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="7" width="20" height="14" rx="2" ry="2"></rect>
        <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path>
      </svg>
    )
  },
  {
    id: 'approver',
    name: 'Manager / Approver',
    description: 'Approve or reject procurement workflows and monitor ERP activities.',
    icon: (
      <svg className="role-icon" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
        <polyline points="22 4 12 14.01 9 11.01"></polyline>
      </svg>
    )
  },
  {
    id: 'admin',
    name: 'Admin',
    description: 'Manage users, assign permissions, oversee system logs, and view analytics.',
    icon: (
      <svg className="role-icon" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="3"></circle>
        <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"></path>
      </svg>
    )
  }
];

function App() {
  const [view, setView] = useState('login'); // 'login' | 'register' | 'dashboard'
  const [theme, setTheme] = useState(() => localStorage.getItem('theme') || 'dark');
  const [toasts, setToasts] = useState([]);
  
  // Auth Form State
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [showLoginPassword, setShowLoginPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  
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
  const [showRegPassword, setShowRegPassword] = useState(false);
  
  // Modal / Forgot Password state
  const [showForgotModal, setShowForgotModal] = useState(false);
  const [forgotEmail, setForgotEmail] = useState('');
  
  // Session User State
  const [currentUser, setCurrentUser] = useState(null);

  // Initialize DB on mount
  useEffect(() => {
    // Setup background local users db if not existing
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
          additionalInfo: 'Default procurement admin'
        },
        {
          firstName: 'Global',
          lastName: 'Suppliers',
          email: 'vendor@vendorbridge.com',
          password: 'password123',
          role: 'vendor',
          country: 'Canada',
          phone: '+1 555-0233',
          additionalInfo: 'Corporate Vendor'
        },
        {
          firstName: 'Sarah',
          lastName: 'Executive',
          email: 'approver@vendorbridge.com',
          password: 'password123',
          role: 'approver',
          country: 'United Kingdom',
          phone: '+44 20 7946 0958',
          additionalInfo: 'Managerial sign-off'
        },
        {
          firstName: 'Admin',
          lastName: 'System',
          email: 'admin@vendorbridge.com',
          password: 'password123',
          role: 'admin',
          country: 'India',
          phone: '+91 98765 43210',
          additionalInfo: 'ERP Super Administrator'
        }
      ];
      localStorage.setItem('users', JSON.stringify(defaultUsers));
    }

    // Check remember me session
    const savedSession = localStorage.getItem('currentUser');
    if (savedSession) {
      setCurrentUser(JSON.parse(savedSession));
      setView('dashboard');
    }
  }, []);

  // Sync theme attribute with document root
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  // Toast helper
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

  // Form Handlers
  const handleLoginSubmit = (e) => {
    e.preventDefault();

    // Basic validation
    if (!loginEmail || !loginPassword) {
      addToast('Please fill in all credentials.', 'error');
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(loginEmail)) {
      addToast('Please enter a valid email address.', 'error');
      return;
    }

    // Look up user
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const matchedUser = users.find(
      (u) => u.email.toLowerCase() === loginEmail.toLowerCase() && u.password === loginPassword
    );

    if (matchedUser) {
      addToast(`Welcome back, ${matchedUser.firstName}!`, 'success');
      setCurrentUser(matchedUser);
      
      if (rememberMe) {
        localStorage.setItem('currentUser', JSON.stringify(matchedUser));
      }
      setView('dashboard');
    } else {
      addToast('Invalid email or password. Try demo accounts (e.g. officer@vendorbridge.com / password123)', 'error');
    }
  };

  const handleRegisterSubmit = (e) => {
    e.preventDefault();

    // Validations
    if (!regFirstName || !regLastName || !regEmail || !regPhone || !regCountry || !regPassword || !regConfirmPassword) {
      addToast('All fields marked as required must be filled.', 'error');
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

    // Check if email already registered
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    if (users.some((u) => u.email.toLowerCase() === regEmail.toLowerCase())) {
      addToast('This email is already registered.', 'error');
      return;
    }

    // Register User
    const newUser = {
      firstName: regFirstName,
      lastName: regLastName,
      email: regEmail,
      phone: regPhone,
      role: regRole,
      country: regCountry,
      additionalInfo: regInfo,
      password: regPassword
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
    
    // Switch to login screen
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

    // Simulate sending recovery link
    addToast(`Password recovery link has been sent to ${forgotEmail}`, 'warning');
    setShowForgotModal(false);
    setForgotEmail('');
  };

  const handleLogout = () => {
    localStorage.removeItem('currentUser');
    setCurrentUser(null);
    setView('login');
    addToast('Logged out successfully.', 'success');
  };

  return (
    <>
      {/* Toast notifications */}
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
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
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
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
          </svg>
        )}
      </button>

      {/* Routing Controller */}
      {view === 'login' && (
        <div className="auth-page">
          {/* Left panel */}
          <div className="auth-visual">
            <div className="auth-visual-grid"></div>
            <div className="auth-visual-glow-1"></div>
            <div className="auth-visual-glow-2"></div>
            
            <div className="auth-visual-header">
              <div className="auth-logo-group">
                <div className="auth-logo-icon">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
                  </svg>
                </div>
                <span className="auth-logo-text">VendorBridge</span>
              </div>
            </div>

            <div className="auth-visual-body">
              <h2>Simplify and digitize procurement operations</h2>
              <p>
                A centralized, secure ERP platform to manage vendors, RFQs, quotation comparisons, 
                audited workflows, and automated purchase orders.
              </p>
            </div>

            <div className="auth-visual-footer">
              <div className="auth-visual-stat">
                <div className="stat-item">
                  <span className="stat-val">99.8%</span>
                  <span className="stat-label">SLA Uptime</span>
                </div>
                <div className="stat-item">
                  <span className="stat-val">&lt; 2h</span>
                  <span className="stat-label">RFQ Cycle</span>
                </div>
              </div>
              <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>v1.0.0</span>
            </div>
          </div>

          {/* Right panel: Login Form */}
          <div className="auth-form-container">
            <div className="auth-form-card">
              <div className="auth-form-header">
                <h3>Sign in to ERP</h3>
                <p>Welcome back! Please enter your details below.</p>
              </div>

              <form onSubmit={handleLoginSubmit}>
                <div className="form-group">
                  <label htmlFor="login-email">Email Address</label>
                  <input
                    id="login-email"
                    type="email"
                    placeholder="name@company.com"
                    value={loginEmail}
                    onChange={(e) => setLoginEmail(e.target.value)}
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="login-password">Password</label>
                  <div className="input-wrapper">
                    <input
                      id="login-password"
                      type={showLoginPassword ? 'text' : 'password'}
                      placeholder="••••••••"
                      value={loginPassword}
                      onChange={(e) => setLoginPassword(e.target.value)}
                      required
                    />
                    <button
                      type="button"
                      className="input-icon-right"
                      onClick={() => setShowLoginPassword((prev) => !prev)}
                      aria-label={showLoginPassword ? 'Hide password' : 'Show password'}
                    >
                      {showLoginPassword ? (
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path>
                          <line x1="1" y1="1" x2="23" y2="23"></line>
                        </svg>
                      ) : (
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                          <circle cx="12" cy="12" r="3"></circle>
                        </svg>
                      )}
                    </button>
                  </div>
                </div>

                <div className="form-options">
                  <label className="remember-me">
                    <input
                      type="checkbox"
                      checked={rememberMe}
                      onChange={(e) => setRememberMe(e.target.checked)}
                    />
                    <span>Remember me</span>
                  </label>
                  <a
                    href="#forgot-password"
                    onClick={(e) => {
                      e.preventDefault();
                      setShowForgotModal(true);
                    }}
                  >
                    Forgot Password?
                  </a>
                </div>

                <button type="submit" className="btn-primary btn-full">
                  Sign In
                </button>

                <div style={{ marginTop: '16px', fontSize: '0.825rem', color: 'var(--text-muted)', lineHeight: '1.4' }}>
                  <strong>Demo Accounts (password: password123):</strong><br />
                  Officer: <code>officer@vendorbridge.com</code> | Vendor: <code>vendor@vendorbridge.com</code>
                </div>

                <div className="auth-alternative">
                  Don't have an account?{' '}
                  <a
                    href="#register"
                    onClick={(e) => {
                      e.preventDefault();
                      setView('register');
                    }}
                  >
                    Create account
                  </a>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {view === 'register' && (
        <div className="auth-page">
          {/* Left panel */}
          <div className="auth-visual">
            <div className="auth-visual-grid"></div>
            <div className="auth-visual-glow-1"></div>
            <div className="auth-visual-glow-2"></div>
            
            <div className="auth-visual-header">
              <div className="auth-logo-group">
                <div className="auth-logo-icon">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
                  </svg>
                </div>
                <span className="auth-logo-text">VendorBridge</span>
              </div>
            </div>

            <div className="auth-visual-body">
              <h2>Join VendorBridge ERP</h2>
              <p>
                Register as a Procurement Officer to manage vendor bids, or as a Vendor to respond 
                to active RFQs and process corporate invoices.
              </p>
            </div>

            <div className="auth-visual-footer">
              <div className="auth-visual-stat">
                <div className="stat-item">
                  <span className="stat-val">100%</span>
                  <span className="stat-label">Audit-Ready</span>
                </div>
                <div className="stat-item">
                  <span className="stat-val">Multi-Role</span>
                  <span className="stat-label">Permissions</span>
                </div>
              </div>
              <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>v1.0.0</span>
            </div>
          </div>

          {/* Right panel: Registration Form */}
          <div className="auth-form-container">
            <div className="auth-form-card register-card">
              <div className="auth-form-header">
                <h3>Register Account</h3>
                <p>Build your corporate connection to our procurement grid.</p>
              </div>

              <form onSubmit={handleRegisterSubmit}>
                {/* Role selection block */}
                <div className="form-group">
                  <span className="role-selection-label">Select Your Role</span>
                  <div className="role-cards-grid">
                    {ROLES.map((role) => (
                      <div
                        key={role.id}
                        className={`role-card ${regRole === role.id ? 'active' : ''}`}
                        onClick={() => setRegRole(role.id)}
                        title={role.description}
                      >
                        {role.icon}
                        <span className="role-name">{role.name}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="reg-firstname">First Name *</label>
                    <input
                      id="reg-firstname"
                      type="text"
                      placeholder="John"
                      value={regFirstName}
                      onChange={(e) => setRegFirstName(e.target.value)}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="reg-lastname">Last Name *</label>
                    <input
                      id="reg-lastname"
                      type="text"
                      placeholder="Doe"
                      value={regLastName}
                      onChange={(e) => setRegLastName(e.target.value)}
                      required
                    />
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="reg-email">Email Address *</label>
                    <input
                      id="reg-email"
                      type="email"
                      placeholder="john.doe@company.com"
                      value={regEmail}
                      onChange={(e) => setRegEmail(e.target.value)}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="reg-phone">Phone Number *</label>
                    <input
                      id="reg-phone"
                      type="tel"
                      placeholder="+1 (555) 000-0000"
                      value={regPhone}
                      onChange={(e) => setRegPhone(e.target.value)}
                      required
                    />
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="reg-country">Country *</label>
                    <input
                      id="reg-country"
                      type="text"
                      placeholder="United States"
                      value={regCountry}
                      onChange={(e) => setRegCountry(e.target.value)}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="reg-password">Password *</label>
                    <div className="input-wrapper">
                      <input
                        id="reg-password"
                        type={showRegPassword ? 'text' : 'password'}
                        placeholder="Min 6 chars"
                        value={regPassword}
                        onChange={(e) => setRegPassword(e.target.value)}
                        required
                      />
                      <button
                        type="button"
                        className="input-icon-right"
                        onClick={() => setShowRegPassword((prev) => !prev)}
                        aria-label={showRegPassword ? 'Hide password' : 'Show password'}
                      >
                        {showRegPassword ? (
                          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path>
                            <line x1="1" y1="1" x2="23" y2="23"></line>
                          </svg>
                        ) : (
                          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                            <circle cx="12" cy="12" r="3"></circle>
                          </svg>
                        )}
                      </button>
                    </div>
                  </div>
                </div>

                <div className="form-group">
                  <label htmlFor="reg-confirm-password">Confirm Password *</label>
                  <input
                    id="reg-confirm-password"
                    type="password"
                    placeholder="••••••••"
                    value={regConfirmPassword}
                    onChange={(e) => setRegConfirmPassword(e.target.value)}
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="reg-info">Additional Corporate Info (Optional)</label>
                  <textarea
                    id="reg-info"
                    placeholder="Briefly describe your department or supply category..."
                    value={regInfo}
                    onChange={(e) => setRegInfo(e.target.value)}
                    rows="2"
                  />
                </div>

                <button type="submit" className="btn-primary btn-full">
                  Create Account
                </button>

                <div className="auth-alternative">
                  Already have an account?{' '}
                  <a
                    href="#login"
                    onClick={(e) => {
                      e.preventDefault();
                      setView('login');
                    }}
                  >
                    Sign in
                  </a>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {view === 'dashboard' && (
        <div className="dashboard-mock animate-fade-in">
          <div className="dashboard-header">
            <div>
              <h2 style={{ fontSize: '2rem', display: 'flex', alignItems: 'center', gap: '10px' }}>
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ color: 'var(--primary)' }}>
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
                </svg>
                VendorBridge ERP
              </h2>
              <p style={{ color: 'var(--text-secondary)', marginTop: '4px' }}>
                Connected as: <strong>{currentUser?.firstName} {currentUser?.lastName}</strong> ({currentUser?.email})
              </p>
            </div>
            
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
              <span className="user-role-tag">
                {ROLES.find(r => r.id === currentUser?.role)?.name || currentUser?.role}
              </span>
              <button className="btn-secondary" onClick={handleLogout}>
                Logout
              </button>
            </div>
          </div>

          <div style={{ marginBottom: '32px' }}>
            <h3 style={{ fontSize: '1.4rem', marginBottom: '8px' }}>Auth Flow Successful!</h3>
            <p style={{ color: 'var(--text-secondary)' }}>
              You have authenticated successfully with local session persistence. In subsequent steps, we will build out full modules
              for this dashboard interface based on your role privileges.
            </p>
          </div>

          <div className="card-grid">
            <div className="dashboard-card">
              <h4>Role-Based Access Control</h4>
              <div className="value">{currentUser?.role.toUpperCase()}</div>
              <p className="desc">Permissions locked to this account profile details.</p>
            </div>
            <div className="dashboard-card">
              <h4>Active Session State</h4>
              <div className="value">PERSISTENT</div>
              <p className="desc">Refreshing the page keeps you logged in via secure local storage.</p>
            </div>
            <div className="dashboard-card">
              <h4>Mock Database Accounts</h4>
              <div className="value">
                {JSON.parse(localStorage.getItem('users') || '[]').length} Registered
              </div>
              <p className="desc">Total users currently stored in your browser's environment.</p>
            </div>
          </div>

          <div style={{ backgroundColor: 'var(--bg-secondary)', padding: '24px', borderRadius: 'var(--radius-lg)', border: '1px solid var(--border-light)' }}>
            <h4 style={{ marginBottom: '12px' }}>Your Profile Data</h4>
            <div style={{ display: 'grid', gridTemplateColumns: '150px 1fr', gap: '12px', fontSize: '0.95rem' }}>
              <span style={{ color: 'var(--text-muted)' }}>Full Name:</span>
              <span>{currentUser?.firstName} {currentUser?.lastName}</span>
              <span style={{ color: 'var(--text-muted)' }}>Email:</span>
              <span>{currentUser?.email}</span>
              <span style={{ color: 'var(--text-muted)' }}>Phone:</span>
              <span>{currentUser?.phone}</span>
              <span style={{ color: 'var(--text-muted)' }}>Country:</span>
              <span>{currentUser?.country}</span>
              <span style={{ color: 'var(--text-muted)' }}>Additional Details:</span>
              <span>{currentUser?.additionalInfo || 'N/A'}</span>
            </div>
          </div>
        </div>
      )}

      {/* Forgot Password Modal */}
      {showForgotModal && (
        <div className="modal-overlay" onClick={() => setShowForgotModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h4>Reset Password</h4>
              <p>Enter your email and we'll send you a recovery link.</p>
            </div>
            <form onSubmit={handleForgotSubmit}>
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
              <div className="modal-actions">
                <button type="button" className="btn-secondary" onClick={() => setShowForgotModal(false)}>
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
    </>
  );
}

export default App;
