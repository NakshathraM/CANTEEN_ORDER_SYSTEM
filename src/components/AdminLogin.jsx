import React, { useState } from 'react';
import { useCanteen } from '../context/CanteenContext';
import {
  ShieldCheck,
  Lock,
  ArrowRight,
  Eye,
  EyeOff,
  Sparkles,
  ArrowLeft,
  KeyRound
} from 'lucide-react';

export const AdminLogin = () => {
  const { adminLogin, setActiveView } = useCanteen();
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    if (!password) {
      setError('Please enter the canteen manager password.');
      return;
    }

    setIsSubmitting(true);
    setTimeout(() => {
      const success = adminLogin(password);
      if (!success) {
        setError('Incorrect password. Demo access: "campus2026" or "admin123"');
      }
      setIsSubmitting(false);
    }, 400);
  };

  const fillDemoPassword = () => {
    setPassword('campus2026');
    setError('');
  };

  return (
    <div className="container" style={{
      maxWidth: '460px',
      paddingTop: '4rem',
      paddingBottom: '5rem'
    }}>
      {/* Return to student storefront */}
      <button
        onClick={() => setActiveView('home')}
        className="btn btn-ghost btn-sm"
        style={{ marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}
      >
        <ArrowLeft size={16} />
        <span>Return to Student Storefront</span>
      </button>

      {/* Login Card */}
      <div style={{
        backgroundColor: '#ffffff',
        borderRadius: 'var(--radius-xl)',
        border: '1px solid var(--border-subtle)',
        boxShadow: 'var(--shadow-lg)',
        padding: '2.25rem 2rem'
      }}>
        <div style={{ textAlign: 'center', marginBottom: '1.75rem' }}>
          <div style={{
            width: '60px',
            height: '60px',
            borderRadius: '16px',
            backgroundColor: 'var(--royal-blue-light)',
            color: 'var(--royal-blue)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 1rem auto',
            boxShadow: '0 4px 14px rgba(39, 74, 179, 0.15)'
          }}>
            <ShieldCheck size={32} />
          </div>

          <span className="pill pill-royal" style={{ fontSize: '0.75rem', marginBottom: '0.4rem' }}>
            Staff Only Portal
          </span>

          <h1 style={{ fontSize: '1.7rem', color: 'var(--text-primary)', marginBottom: '0.35rem' }}>
            Canteen Admin Login
          </h1>

          <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>
            Enter your staff security key to manage incoming classroom orders and menu inventory.
          </p>
        </div>

        {/* Demo Credentials Helper Box */}
        <div style={{
          backgroundColor: 'var(--warm-beige-light)',
          border: '1px dashed var(--warm-beige-dark)',
          borderRadius: 'var(--radius-md)',
          padding: '0.85rem 1rem',
          marginBottom: '1.5rem',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '0.5rem'
        }}>
          <div style={{ fontSize: '0.8rem', color: '#4a3421' }}>
            <strong>Demo Password:</strong> <code>campus2026</code>
          </div>
          <button
            type="button"
            onClick={fillDemoPassword}
            className="btn btn-sm"
            style={{
              backgroundColor: '#ffffff',
              border: '1px solid var(--warm-beige-dark)',
              fontSize: '0.75rem',
              padding: '0.2rem 0.6rem'
            }}
          >
            Auto Fill
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit}>
          <div className="form-group" style={{ marginBottom: '1.25rem' }}>
            <label className="form-label" htmlFor="admin-password">
              <span>Admin Security Password</span>
            </label>
            <div style={{ position: 'relative' }}>
              <Lock size={16} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
              <input
                id="admin-password"
                type={showPassword ? 'text' : 'password'}
                className={`form-control ${error ? 'is-invalid' : ''}`}
                placeholder="Enter password..."
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  if (error) setError('');
                }}
                style={{ paddingLeft: '2.4rem', paddingRight: '2.4rem' }}
                autoFocus
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                style={{
                  position: 'absolute',
                  right: '12px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  color: 'var(--text-muted)'
                }}
                aria-label="Toggle password visibility"
              >
                {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
            {error && <span className="form-error">{error}</span>}
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="btn btn-royal btn-block"
            style={{ padding: '0.85rem', fontSize: '1rem', fontWeight: 700 }}
          >
            {isSubmitting ? (
              <span>Verifying credentials...</span>
            ) : (
              <>
                <span>Enter Admin Dashboard</span>
                <ArrowRight size={18} />
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
};
