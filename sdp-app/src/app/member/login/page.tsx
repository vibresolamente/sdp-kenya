"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function MemberLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    try {
      const response = await fetch('/api/member/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        router.push('/member/dashboard');
        router.refresh();
      } else {
        const errData = await response.json();
        setError(errData.error || 'Invalid credentials');
      }
    } catch (err) {
      setError('An error occurred during login');
    }
  };

  return (
    <section className="content-padding" style={{ minHeight: '80vh', display: 'flex', alignItems: 'center' }}>
      <div className="container" style={{ maxWidth: '500px' }}>
        <div className="bg-surface" style={{ padding: '40px', borderRadius: '12px', border: '1px solid var(--glass-border)' }}>
          <h1 className="text-center" style={{ fontSize: '2rem', marginBottom: '10px' }}>
            Member <span className="highlight-magenta animated-accent">Login</span>
          </h1>
          <p className="text-center mb-4" style={{ color: 'var(--color-text-muted)' }}>
            Log in to view your registration status and details.
          </p>

          <form onSubmit={handleLogin} className="contact-form">
            <input 
              type="email" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email Address" 
              required 
            />
            <input 
              type="password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password" 
              required 
            />
            <button type="submit" className="cta-button" style={{ width: '100%', marginTop: '10px' }}>
              Login
            </button>
          </form>
          
          {error && <p className="text-center mt-5 font-bold" style={{ color: 'var(--color-magenta)' }}>{error}</p>}
          
          <p className="text-center mt-5" style={{ fontSize: '0.9rem', color: 'var(--color-text-muted)' }}>
            Not a member yet? <Link href="/join-us" className="read-more-link" style={{ marginTop: 0 }}>Register here</Link><br/>
            <span style={{ color: 'var(--color-text-muted)', fontSize: '0.8rem' }}>Use the email you registered with</span>
          </p>
          <p className="text-center mt-3" style={{ fontSize: '0.9rem' }}>
            <Link href="/member/reset-password" style={{ color: 'var(--color-text-muted)' }}>Forgot Password?</Link>
          </p>
        </div>
      </div>
    </section>
  );
}
