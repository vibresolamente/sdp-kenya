"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function ResetPassword() {
  const [idNumber, setIdNumber] = useState('');
  const [email, setEmail] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [status, setStatus] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleReset = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('Verifying...');
    setError('');

    try {
      const response = await fetch('/api/member/reset-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id_number: idNumber, email, new_password: newPassword }),
      });

      if (response.ok) {
        setStatus('Password updated successfully! Redirecting to login...');
        setTimeout(() => {
          router.push('/member/login');
        }, 2000);
      } else {
        const errData = await response.json();
        setError(errData.error || 'Verification failed. Please check details.');
        setStatus('');
      }
    } catch (err) {
      setError('An error occurred during password reset');
      setStatus('');
    }
  };

  return (
    <section className="content-padding" style={{ minHeight: '80vh', display: 'flex', alignItems: 'center' }}>
      <div className="container" style={{ maxWidth: '500px' }}>
        <div className="bg-surface" style={{ padding: '40px', borderRadius: '12px', border: '1px solid var(--glass-border)' }}>
          <h1 className="text-center" style={{ fontSize: '2rem', marginBottom: '10px' }}>
            Reset <span className="highlight-magenta animated-accent">Password</span>
          </h1>
          <p className="text-center mb-4" style={{ color: 'var(--color-text-muted)', fontSize: '0.95rem' }}>
            Verify your registration details to update your portal password.
          </p>

          <form onSubmit={handleReset} className="contact-form">
            <input 
              type="text" 
              value={idNumber}
              onChange={(e) => setIdNumber(e.target.value)}
              placeholder="National ID / Passport Number" 
              required 
            />
            <input 
              type="email" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Registered Email Address" 
              required 
            />
            <input 
              type="password" 
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              placeholder="Choose New Password" 
              required 
            />
            <button type="submit" className="cta-button" style={{ width: '100%', marginTop: '10px' }}>
              Reset Password
            </button>
          </form>
          
          {status && <p className="text-center mt-5 font-bold" style={{ color: 'var(--color-teal)' }}>{status}</p>}
          {error && <p className="text-center mt-5 font-bold" style={{ color: 'var(--color-magenta)' }}>{error}</p>}
          
          <p className="text-center mt-5" style={{ fontSize: '0.9rem', color: 'var(--color-text-muted)' }}>
            Remembered your password? <Link href="/member/login" className="read-more-link" style={{ marginTop: 0 }}>Log in here</Link>
          </p>
        </div>
      </div>
    </section>
  );
}
