import { useState, useEffect } from 'react';
import './Auth.css';
import { ToastContainer } from './components/Toast';

const ROLES = [
  { id: 'officer', name: 'Procurement Officer' },
  { id: 'vendor', name: 'Vendor' },
  { id: 'approver', name: 'Manager / Approver' },
  { id: 'admin', name: 'Admin' },
];

function App() {
  // Lazy state initializers to prevent synchronous set-state inside useEffect
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
      return savedSession ? 'dashboard' : 'login';
    } catch {
      return 'login';
    }
  });

  const [theme, setTheme] = useState(() => localStorage.getItem('theme') || 'dark');
  const [toasts, setToasts] = useState([]);

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
    setView('login');
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
      {view === 'login' && (
        <div className="auth-page">
          <div className="auth-card">
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
                <label htmlFor="login-email">Username</label>
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
                <button type="submit" className="btn-sketch-outline">
                  Log in
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
            </a>
          </div>
        </div>
      )}

      {view === 'register' && (
        <div className="auth-page">
          <div className="auth-card register-card">
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
              <div className="form-row">
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

              <div className="form-row">
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

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="reg-role">Job (admin, officer)</label>
                  <select
                    id="reg-role"
                    value={regRole}
                    onChange={(e) => setRegRole(e.target.value)}
                    required
                  >
                    <option value="officer">officer</option>
                    <option value="admin">admin</option>
                    <option value="vendor">vendor</option>
                    <option value="approver">approver</option>
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

              <div className="form-row">
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

              <div className="form-group">
                <label htmlFor="reg-info">Additional Information ....</label>
                <textarea
                  id="reg-info"
                  placeholder="Additional Information ...."
                  value={regInfo}
                  onChange={(e) => setRegInfo(e.target.value)}
                  rows="3"
                  required
                />
              </div>
            </form>
          </div>

          {/* Register button is situated OUTSIDE the card container strictly matching mockup */}
          <div className="register-action-container">
            <button type="submit" form="register-form" className="btn-sketch-outline">
              Register
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
            </a>
          </div>
        </div>
      )}

      {view === 'dashboard' && (
        <div className="dashboard-mock animate-fade-in">
          <div className="dashboard-header">
            <div>
              <h2 style={{ fontSize: '2rem', display: 'flex', alignItems: 'center', gap: '10px' }}>
                {currentUser?.photo ? (
                  <img
                    src={currentUser.photo}
                    alt="Avatar"
                    style={{
                      width: '40px',
                      height: '40px',
                      borderRadius: '50%',
                      objectFit: 'cover',
                      border: '2px solid var(--primary)',
                    }}
                  />
                ) : (
                  <svg
                    width="28"
                    height="28"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    style={{ color: 'var(--primary)' }}
                  >
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
                  </svg>
                )}
                <span style={{ marginLeft: '8px' }}>VendorBridge ERP</span>
              </h2>
              <p style={{ color: 'var(--text-secondary)', marginTop: '4px' }}>
                Connected as:{' '}
                <strong>
                  {currentUser?.firstName} {currentUser?.lastName}
                </strong>{' '}
                ({currentUser?.email})
              </p>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
              <span className="user-role-tag">
                {ROLES.find((r) => r.id === currentUser?.role)?.name || currentUser?.role}
              </span>
              <button className="btn-secondary" onClick={handleLogout}>
                Logout
              </button>
            </div>
          </div>

          <div style={{ marginBottom: '32px' }}>
            <h3 style={{ fontSize: '1.4rem', marginBottom: '8px' }}>Auth Flow Successful!</h3>
            <p style={{ color: 'var(--text-secondary)' }}>
              You have authenticated successfully with local session persistence. In subsequent
              steps, we will build out full modules for this dashboard interface based on your role
              privileges.
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
              <p className="desc">
                Refreshing the page keeps you logged in via secure local storage.
              </p>
            </div>
            <div className="dashboard-card">
              <h4>Mock Database Accounts</h4>
              <div className="value">
                {JSON.parse(localStorage.getItem('users') || '[]').length} Registered
              </div>
              <p className="desc">Total users currently stored in your browser's environment.</p>
            </div>
          </div>

          <div
            style={{
              backgroundColor: 'var(--bg-secondary)',
              padding: '24px',
              borderRadius: 'var(--radius-lg)',
              border: '2px solid var(--border-light)',
            }}
          >
            <h4 style={{ marginBottom: '12px' }}>Your Profile Data</h4>
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: '150px 1fr',
                gap: '12px',
                fontSize: '0.95rem',
              }}
            >
              <span style={{ color: 'var(--text-muted)' }}>Full Name:</span>
              <span>
                {currentUser?.firstName} {currentUser?.lastName}
              </span>
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
        <div className="modal-overlay" onClick={closePhotoModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h4>Profile Picture</h4>
              <p>Select how you would like to assign your profile photo.</p>
            </div>

            {!cameraMode ? (
              <div className="photo-options-list">
                <button
                  type="button"
                  className="photo-option-btn"
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
                  <span>Upload from File</span>
                </button>

                <button type="button" className="photo-option-btn" onClick={startCamera}>
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
                  <span>Capture from Camera</span>
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
              <div className="camera-preview-container">
                <video
                  id="camera-video"
                  className="camera-video"
                  autoPlay
                  playsInline
                  muted
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

            <div className="modal-actions" style={{ marginTop: '24px' }}>
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
