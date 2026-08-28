"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function MemberLogin() {
  const [identifier, setIdentifier] = useState('');
  const [password, setPassword]     = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError]           = useState('');
  const [loading, setLoading]       = useState(false);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await fetch('/api/member/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id_number: identifier, password }),
      });

      if (response.ok) {
        router.push('/member/dashboard');
        router.refresh();
      } else {
        const errData = await response.json();
        setError(errData.error || 'Invalid credentials. Please verify and try again.');
      }
    } catch (err) {
      setError('An error occurred during login. Please check your connection.');
    } finally {
      setLoading(false);
    }
  };

  const inputStyle: React.CSSProperties = {
    width:           '100%',
    padding:         '14px 16px',
    borderRadius:    '10px',
    border:          '1.5px solid #cbd5e0',
    fontSize:        '1rem',
    color:           '#000000',
    backgroundColor: '#ffffff',
    marginBottom:    '16px',
    outline:         'none',
    fontWeight:      500,
  };

  return (
    <section className="content-padding" style={{ minHeight: '80vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div className="container" style={{ maxWidth: '480px' }}>
        <div className="bg-surface" style={{ padding: '40px 32px', borderRadius: '16px', border: '1px solid var(--glass-border)', boxShadow: '0 10px 30px rgba(0,0,0,0.3)' }}>
          
          <div className="text-center" style={{ marginBottom: '24px' }}>
            <div style={{ fontSize: '2.5rem', marginBottom: '8px' }}>🔐</div>
            <h1 style={{ fontSize: '1.8rem', marginBottom: '6px' }}>
              Member <span className="highlight-magenta animated-accent">Login</span>
            </h1>
            <p style={{ color: 'rgba(255,255,255,0.85)', fontSize: '0.92rem' }}>
              Access your digital membership card, statutory record, and party entitlements.
            </p>
          </div>

          <form onSubmit={handleLogin} className="contact-form">
            <label style={{ display: 'block', color: '#ffffff', fontSize: '0.85rem', fontWeight: 600, marginBottom: '6px' }}>
              National ID / Passport No. or Email
            </label>
            <input 
              type="text" 
              value={identifier}
              onChange={(e) => setIdentifier(e.target.value)}
              placeholder="e.g. 12345678 or name@example.com" 
              autoComplete="off"
              required 
              style={inputStyle}
            />
            
            <label style={{ display: 'block', color: '#ffffff', fontSize: '0.85rem', fontWeight: 600, marginBottom: '6px' }}>
              Password
            </label>
            <div style={{ position: 'relative', width: '100%', marginBottom: '16px' }}>
              <input 
                type={showPassword ? "text" : "password"} 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your member password" 
                autoComplete="new-password"
                required 
                style={{ ...inputStyle, paddingRight: '48px', marginBottom: 0 }}
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
                  fontSize: '1.2rem',
                  color: '#4a5568',
                  padding: '4px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
                title={showPassword ? "Hide password" : "Show password"}
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? '👁️' : '🔒'}
              </button>
            </div>

            {error && (
              <div style={{ background: 'rgba(255,235,59,0.15)', border: '1px solid rgba(255,235,59,0.4)', borderRadius: '8px', padding: '12px', marginBottom: '16px' }}>
                <p style={{ color: '#ffeb3b', fontWeight: 600, fontSize: '0.88rem', margin: 0 }}>⚠️ {error}</p>
              </div>
            )}

            <button 
              type="submit" 
              className="cta-button" 
              style={{ width: '100%', padding: '14px', fontSize: '1rem', opacity: loading ? 0.7 : 1, cursor: loading ? 'not-allowed' : 'pointer' }}
              disabled={loading}
            >
              {loading ? '⏳ Signing In...' : '🔐 Sign In to Member Portal'}
            </button>
          </form>
          
          <div style={{ textAlign: 'center', borderTop: '1px solid rgba(255,255,255,0.15)', paddingTop: '20px', marginTop: '24px' }}>
            <p style={{ fontSize: '0.9rem', color: 'rgba(255,255,255,0.8)', marginBottom: '12px' }}>
              Not yet a registered SDP member?
            </p>
            <Link 
              href="/join-us" 
              className="cta-button" 
              style={{ display: 'inline-block', fontSize: '0.9rem', padding: '10px 24px', background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.3)' }}
            >
              ✍️ Register on Form PPM1
            </Link>
          </div>
          
          <div style={{ textAlign: 'center', marginTop: '16px' }}>
            <Link href="/membership" style={{ fontSize: '0.85rem', color: 'var(--color-teal)', textDecoration: 'underline' }}>
              🏛️ Go to Membership Hub &amp; IPPMS Verification Tool
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
