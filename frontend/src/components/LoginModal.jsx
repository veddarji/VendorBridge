import React, { useState } from 'react';

export default function LoginModal({ isOpen, onClose, onLoginSuccess }) {
  const [activeTab, setActiveTab] = useState('login'); // 'login', 'signup', 'forgot'
  const [role, setRole] = useState('procurement_officer'); // Default role
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState('');

  if (!isOpen) return null;

  const validateEmail = (val) => {
    return /\S+@\S+\.\S+/.test(val);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = {};

    if (!email) {
      newErrors.email = 'Email is required';
    } else if (!validateEmail(email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (activeTab === 'login') {
      if (!password) {
        newErrors.password = 'Password is required';
      } else if (password.length < 6) {
        newErrors.password = 'Password must be at least 6 characters';
      }
    } else if (activeTab === 'signup') {
      if (!fullName) newErrors.fullName = 'Full Name is required';
      if (!password) {
        newErrors.password = 'Password is required';
      } else if (password.length < 6) {
        newErrors.password = 'Password must be at least 6 characters';
      }
      if (role === 'vendor' && !companyName) {
        newErrors.companyName = 'Company / Vendor Name is required';
      }
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    // Clear errors and submit
    setErrors({});
    if (activeTab === 'forgot') {
      setSuccessMessage(`Password reset link sent to ${email}`);
      setTimeout(() => {
        setActiveTab('login');
        setSuccessMessage('');
      }, 3000);
    } else {
      // Successful Login / Signup Simulation
      onLoginSuccess(role);
      onClose();
    }
  };

  return (
    <div style={{
      position: 'fixed',
      inset: 0,
      backgroundColor: 'rgba(2, 12, 27, 0.85)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 1000,
      backdropFilter: 'blur(8px)',
      padding: '20px',
    }}>
      <div 
        className="glass-panel animate-fade-in" 
        style={{
          width: '100%',
          maxWidth: '460px',
          borderRadius: '12px',
          boxShadow: 'var(--shadow), 0 0 30px rgba(100, 255, 218, 0.1)',
          position: 'relative',
          padding: '36px',
        }}
      >
        {/* Close Button */}
        <button 
          onClick={onClose}
          style={{
            position: 'absolute',
            top: '20px',
            right: '20px',
            background: 'none',
            border: 'none',
            color: 'var(--text-muted)',
            fontSize: '20px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            transition: 'var(--transition)',
          }}
          onMouseEnter={(e) => e.target.style.color = 'var(--accent)'}
          onMouseLeave={(e) => e.target.style.color = 'var(--text-muted)'}
        >
          &times;
        </button>

        {/* Brand / Logo inside modal */}
        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '24px', gap: '8px' }}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M16 16v1a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2h11a2 2 0 0 1 2 2v1" />
            <path d="M18 8h4a2 2 0 0 1 2 2v7a2 2 0 0 1-2 2h-4" />
            <path d="M16 12h8" />
          </svg>
          <span style={{ fontWeight: 700, fontSize: '18px' }}>VendorBridge ERP</span>
        </div>

        {/* Tab Headers */}
        {activeTab !== 'forgot' && (
          <div style={{
            display: 'flex',
            borderBottom: '1px solid var(--border)',
            marginBottom: '28px',
          }}>
            <button
              onClick={() => { setActiveTab('login'); setErrors({}); }}
              style={{
                flex: 1,
                padding: '12px',
                background: 'none',
                border: 'none',
                borderBottom: activeTab === 'login' ? '2px solid var(--accent)' : '2px solid transparent',
                color: activeTab === 'login' ? 'var(--accent)' : 'var(--text-muted)',
                fontWeight: '600',
                fontSize: '15px',
              }}
            >
              Sign In
            </button>
            <button
              onClick={() => { setActiveTab('signup'); setErrors({}); }}
              style={{
                flex: 1,
                padding: '12px',
                background: 'none',
                border: 'none',
                borderBottom: activeTab === 'signup' ? '2px solid var(--accent)' : '2px solid transparent',
                color: activeTab === 'signup' ? 'var(--accent)' : 'var(--text-muted)',
                fontWeight: '600',
                fontSize: '15px',
              }}
            >
              Register
            </button>
          </div>
        )}

        {activeTab === 'forgot' && (
          <h3 style={{ color: 'var(--text)', marginBottom: '20px', fontSize: '20px', textAlign: 'center' }}>
            Reset Password
          </h3>
        )}

        {/* Error / Success Banners */}
        {successMessage && (
          <div style={{
            backgroundColor: 'rgba(100, 255, 218, 0.15)',
            border: '1px solid var(--accent)',
            borderRadius: '6px',
            color: 'var(--accent)',
            padding: '12px',
            fontSize: '14px',
            marginBottom: '20px',
            textAlign: 'center',
          }}>
            {successMessage}
          </div>
        )}

        {/* Input Form */}
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
          
          {/* Full Name (Sign Up only) */}
          {activeTab === 'signup' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
              <label style={{ fontSize: '13px', color: 'var(--text-muted)', fontWeight: '500' }}>Full Name</label>
              <input
                type="text"
                placeholder="John Doe"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                style={{
                  backgroundColor: 'var(--surface)',
                  border: errors.fullName ? '1px solid #FF5555' : '1px solid var(--border)',
                  borderRadius: '6px',
                  color: 'var(--text)',
                  padding: '12px',
                  fontSize: '14px',
                  outline: 'none',
                }}
              />
              {errors.fullName && <span style={{ color: '#FF5555', fontSize: '11px' }}>{errors.fullName}</span>}
            </div>
          )}

          {/* Email Address (All modes) */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
            <label style={{ fontSize: '13px', color: 'var(--text-muted)', fontWeight: '500' }}>Email Address</label>
            <input
              type="text"
              placeholder="name@company.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={{
                backgroundColor: 'var(--surface)',
                border: errors.email ? '1px solid #FF5555' : '1px solid var(--border)',
                borderRadius: '6px',
                color: 'var(--text)',
                padding: '12px',
                fontSize: '14px',
                outline: 'none',
              }}
            />
            {errors.email && <span style={{ color: '#FF5555', fontSize: '11px' }}>{errors.email}</span>}
          </div>

          {/* Password (Sign In / Sign Up only) */}
          {activeTab !== 'forgot' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
              <label style={{ fontSize: '13px', color: 'var(--text-muted)', fontWeight: '500' }}>Password</label>
              <input
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                style={{
                  backgroundColor: 'var(--surface)',
                  border: errors.password ? '1px solid #FF5555' : '1px solid var(--border)',
                  borderRadius: '6px',
                  color: 'var(--text)',
                  padding: '12px',
                  fontSize: '14px',
                  outline: 'none',
                }}
              />
              {errors.password && <span style={{ color: '#FF5555', fontSize: '11px' }}>{errors.password}</span>}
            </div>
          )}

          {/* Role selector (Login / Register) */}
          {activeTab !== 'forgot' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
              <label style={{ fontSize: '13px', color: 'var(--text-muted)', fontWeight: '500' }}>Access Role</label>
              <select
                value={role}
                onChange={(e) => setRole(e.target.value)}
                style={{
                  backgroundColor: 'var(--surface)',
                  border: '1px solid var(--border)',
                  borderRadius: '6px',
                  color: 'var(--text)',
                  padding: '12px',
                  fontSize: '14px',
                  outline: 'none',
                  cursor: 'pointer',
                }}
              >
                <option value="procurement_officer">Procurement Officer</option>
                <option value="vendor">Vendor</option>
                <option value="manager">Manager / Approver</option>
                <option value="admin">Admin</option>
              </select>
            </div>
          )}

          {/* Company Name (Sign Up as Vendor only) */}
          {activeTab === 'signup' && role === 'vendor' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
              <label style={{ fontSize: '13px', color: 'var(--text-muted)', fontWeight: '500' }}>Company / Vendor Name</label>
              <input
                type="text"
                placeholder="Apex Industries Ltd"
                value={companyName}
                onChange={(e) => setCompanyName(e.target.value)}
                style={{
                  backgroundColor: 'var(--surface)',
                  border: errors.companyName ? '1px solid #FF5555' : '1px solid var(--border)',
                  borderRadius: '6px',
                  color: 'var(--text)',
                  padding: '12px',
                  fontSize: '14px',
                  outline: 'none',
                }}
              />
              {errors.companyName && <span style={{ color: '#FF5555', fontSize: '11px' }}>{errors.companyName}</span>}
            </div>
          )}

          {/* Forgot Password Link */}
          {activeTab === 'login' && (
            <button
              type="button"
              onClick={() => { setActiveTab('forgot'); setErrors({}); }}
              style={{
                alignSelf: 'flex-end',
                background: 'none',
                border: 'none',
                color: 'var(--accent)',
                fontSize: '13px',
                cursor: 'pointer',
                padding: '2px 0',
              }}
            >
              Forgot Password?
            </button>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            className="emerald-glow"
            style={{
              backgroundColor: 'var(--accent)',
              color: 'var(--bg)',
              border: 'none',
              borderRadius: '6px',
              padding: '14px',
              fontSize: '15px',
              fontWeight: '700',
              marginTop: '10px',
              transition: 'var(--transition)',
            }}
            onMouseEnter={(e) => {
              e.target.style.filter = 'brightness(1.15)';
              e.target.style.transform = 'translateY(-1px)';
            }}
            onMouseLeave={(e) => {
              e.target.style.filter = 'none';
              e.target.style.transform = 'none';
            }}
          >
            {activeTab === 'login' ? 'Sign In to Dashboard' : activeTab === 'signup' ? 'Create ERP Account' : 'Send Reset Link'}
          </button>

          {/* Back to Login option */}
          {activeTab === 'forgot' && (
            <button
              type="button"
              onClick={() => { setActiveTab('login'); setErrors({}); }}
              style={{
                background: 'none',
                border: 'none',
                color: 'var(--text-muted)',
                fontSize: '14px',
                cursor: 'pointer',
                textAlign: 'center',
                marginTop: '10px',
              }}
              onMouseEnter={(e) => e.target.style.color = 'var(--text)'}
              onMouseLeave={(e) => e.target.style.color = 'var(--text-muted)'}
            >
              &larr; Back to Login
            </button>
          )}
        </form>
      </div>
    </div>
  );
}
