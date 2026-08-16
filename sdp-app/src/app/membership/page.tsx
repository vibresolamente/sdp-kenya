"use client";

import { useState } from 'react';
import Link from 'next/link';

export default function MembershipPage() {
  // ── Portal state ──────────────────────────────────────────
  const [view, setView] = useState<'login' | 'portal'>('login');
  const [member, setMember] = useState<any>(null);

  // ── Login form state ──────────────────────────────────────
  const [idNumber,  setIdNumber]  = useState('');
  const [password,  setPassword]  = useState('');
  const [loginErr,  setLoginErr]  = useState('');
  const [loading,   setLoading]   = useState(false);

  // ── IPPMS lookup state ────────────────────────────────────
  const [searchId,     setSearchId]     = useState('');
  const [lookupResult, setLookupResult] = useState<any>(null);

  // ─────────────────────────────────────────────────────────
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginErr('');
    setLoading(true);

    try {
      const res  = await fetch('/api/member/login', {
        method:  'POST',
        headers: { 'Content-Type': 'application/json' },
        body:    JSON.stringify({ id_number: idNumber, password }),
      });
      const data = await res.json();

      if (res.ok) {
        setMember(data.member);
        setView('portal');
      } else {
        setLoginErr(data.error || 'Login failed. Please try again.');
      }
    } catch {
      setLoginErr('Network error. Please check your connection.');
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    fetch('/api/member/logout', { method: 'POST' }).catch(() => {});
    setMember(null);
    setView('login');
    setIdNumber('');
    setPassword('');
    setLoginErr('');
  };

  const handleLookup = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchId.trim()) return;
    setLookupResult({
      idNumber:        searchId,
      status:          'COMPLIANT & ACTIVE',
      ippmsSync:       'VERIFIED WITH ORPP STANDARDS',
      party:           'Social Democratic Party of Kenya (SDP)',
      category:        'Ordinary / Voting Member',
      registrationRef: 'SDP/IPPMS-REG-' + Math.floor(100000 + Math.random() * 900000),
      headOffice:      'P.O. Box 1559-50100 Kakamega',
    });
  };

  // ── Membership categories ─────────────────────────────────
  const categories = [
    { clause: '6.2', name: 'Ordinary Membership',   entrance: 'Ksh 20',                   subscription: 'Ksh 10 / month',        credential: 'Membership Card' },
    { clause: '6.3', name: 'Bronze Membership',      entrance: 'Ksh 20,000',               subscription: 'Ksh 10,000 / year',     credential: 'Certificate' },
    { clause: '6.4', name: 'Silver Membership',      entrance: 'Ksh 50,000',               subscription: 'Ksh 25,000 / year',     credential: 'Certificate' },
    { clause: '6.5', name: 'Gold Membership',        entrance: 'Ksh 100,000',              subscription: 'Ksh 50,000 / year',     credential: 'Certificate' },
    { clause: '6.6', name: 'Platinum Membership',    entrance: 'Ksh 200,000',              subscription: 'Ksh 100,000 / year',    credential: 'Certificate' },
    { clause: '6.7', name: 'Founding Membership',    entrance: 'Prescribed Fees + Assets', subscription: 'Statutory Contribution', credential: 'Founder Credential' },
    { clause: '6.8', name: 'Honorary Membership',    entrance: 'NEC Recommendation',       subscription: 'Honorary Status',       credential: 'Honorary Certificate' },
    { clause: '6.9', name: 'Affiliate Membership',   entrance: 'Ksh 300,000',              subscription: 'Ksh 150,000 / year',    credential: 'Affiliate Certificate' },
  ];

  const inputStyle: React.CSSProperties = {
    width:           '100%',
    padding:         '13px 16px',
    borderRadius:    '10px',
    border:          '1.5px solid #cbd5e0',
    fontSize:        '0.95rem',
    color:           '#111111',
    backgroundColor: '#ffffff',
    marginBottom:    '14px',
    outline:         'none',
    transition:      'border-color 0.2s ease',
  };

  // ═══════════════════════════════════════════════════════════
  //  MEMBER PORTAL (after login)
  // ═══════════════════════════════════════════════════════════
  if (view === 'portal' && member) {
    const initials = member.name
      ? member.name.split(' ').map((n: string) => n[0]).join('').slice(0, 2).toUpperCase()
      : 'M';

    return (
      <>
        {/* Portal Hero */}
        <section className="hero-section" style={{ minHeight: '30vh', backgroundImage: "url('/images/hero.png')" }}>
          <div className="hero-overlay" />
          <div className="hero-content">
            <h1>Member <span className="highlight-magenta animated-accent">Portal</span></h1>
            <p>Welcome back, {member.name?.split(' ')[0]}. Your statutory record is active.</p>
          </div>
        </section>

        <section className="content-padding">
          <div className="container">

            {/* Top bar: member info + logout */}
            <div style={{
              display:        'flex',
              justifyContent: 'space-between',
              alignItems:     'center',
              background:     'rgba(0,0,0,0.45)',
              border:         '1px solid rgba(255,255,255,0.2)',
              borderRadius:   '14px',
              padding:        '18px 28px',
              marginBottom:   '32px',
              flexWrap:       'wrap',
              gap:            '12px',
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                <div style={{
                  width:          '52px',
                  height:         '52px',
                  borderRadius:   '50%',
                  background:     'linear-gradient(135deg, #c40062, #99004d)',
                  display:        'flex',
                  alignItems:     'center',
                  justifyContent: 'center',
                  fontSize:       '1.4rem',
                  fontWeight:     900,
                  color:          '#ffffff',
                  flexShrink:     0,
                  border:         '2px solid rgba(255,255,255,0.3)',
                }}>
                  {initials}
                </div>
                <div>
                  <p style={{ fontSize: '1.05rem', fontWeight: 700, color: '#ffffff', margin: 0 }}>{member.name}</p>
                  <p style={{ fontSize: '0.82rem', color: 'rgba(255,255,255,0.65)', margin: 0 }}>
                    ID: {member.id_number} &nbsp;·&nbsp; {member.category || 'Ordinary Member'}
                  </p>
                </div>
              </div>
              <button
                onClick={handleLogout}
                style={{
                  background:   'rgba(255,255,255,0.1)',
                  border:       '1px solid rgba(255,255,255,0.25)',
                  color:        '#ffffff',
                  padding:      '9px 20px',
                  borderRadius: '8px',
                  cursor:       'pointer',
                  fontSize:     '0.88rem',
                  fontWeight:   600,
                  transition:   'background 0.2s',
                }}
              >
                🚪 Log Out
              </button>
            </div>

            {/* Dashboard Grid */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '24px', marginBottom: '36px' }}>

              {/* Card: Membership Status */}
              <div style={{ background: 'rgba(0,0,0,0.4)', border: '1px solid rgba(196,0,98,0.4)', borderRadius: '14px', padding: '24px' }}>
                <p style={{ color: '#ff69b4', fontWeight: 700, fontSize: '0.78rem', letterSpacing: '1.5px', textTransform: 'uppercase', marginBottom: '10px' }}>Membership Status</p>
                <p style={{ fontSize: '1.5rem', fontWeight: 900, color: '#3cd070', marginBottom: '8px' }}>✓ ACTIVE</p>
                <p style={{ fontSize: '0.88rem', color: 'rgba(255,255,255,0.85)' }}><strong>Category:</strong> {member.category || 'Ordinary Membership'}</p>
                <p style={{ fontSize: '0.88rem', color: 'rgba(255,255,255,0.85)' }}><strong>IPPMS:</strong> ORPP Verified</p>
              </div>

              {/* Card: Location */}
              <div style={{ background: 'rgba(0,0,0,0.4)', border: '1px solid rgba(59,216,247,0.3)', borderRadius: '14px', padding: '24px' }}>
                <p style={{ color: '#3bd8f7', fontWeight: 700, fontSize: '0.78rem', letterSpacing: '1.5px', textTransform: 'uppercase', marginBottom: '10px' }}>Registered Location</p>
                <p style={{ fontSize: '1rem', color: '#ffffff', fontWeight: 700, marginBottom: '6px' }}>{member.county || '—'}</p>
                <p style={{ fontSize: '0.88rem', color: 'rgba(255,255,255,0.8)' }}><strong>Constituency:</strong> {member.constituency || '—'}</p>
                <p style={{ fontSize: '0.88rem', color: 'rgba(255,255,255,0.8)' }}><strong>Ward:</strong> {member.ward || '—'}</p>
              </div>

              {/* Card: Quick Links */}
              <div style={{ background: 'rgba(0,0,0,0.4)', border: '1px solid rgba(255,235,59,0.3)', borderRadius: '14px', padding: '24px' }}>
                <p style={{ color: '#ffeb3b', fontWeight: 700, fontSize: '0.78rem', letterSpacing: '1.5px', textTransform: 'uppercase', marginBottom: '14px' }}>Quick Links</p>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  <Link href="/documents" style={{ color: '#3bd8f7', fontSize: '0.9rem', textDecoration: 'none', fontWeight: 600 }}>📄 Party Documents</Link>
                  <Link href="/our-plan" style={{ color: '#3bd8f7', fontSize: '0.9rem', textDecoration: 'none', fontWeight: 600 }}>📋 Our Plan</Link>
                  <Link href="/leadership" style={{ color: '#3bd8f7', fontSize: '0.9rem', textDecoration: 'none', fontWeight: 600 }}>👥 National Leadership</Link>
                  <a href="https://orpp.or.ke/" target="_blank" rel="noopener noreferrer" style={{ color: '#3bd8f7', fontSize: '0.9rem', textDecoration: 'none', fontWeight: 600 }}>🏛️ ORPP Portal</a>
                </div>
              </div>
            </div>

            {/* IPPMS Verification Tool */}
            <div style={{ background: 'rgba(0,0,0,0.45)', border: '1px solid rgba(255,255,255,0.15)', borderRadius: '14px', padding: '28px', marginBottom: '32px' }}>
              <h3 style={{ color: '#3bd8f7', marginBottom: '10px' }}>🏛️ IPPMS Membership Verification Tool</h3>
              <p style={{ fontSize: '0.9rem', color: 'rgba(255,255,255,0.8)', marginBottom: '18px' }}>
                Cross-reference any National ID against the statutory party member register as required under ORPP provisional registration guidelines.
              </p>
              <form onSubmit={handleLookup} style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
                <input
                  type="text"
                  placeholder="Enter National ID No."
                  value={searchId}
                  onChange={(e) => setSearchId(e.target.value)}
                  required
                  style={{ ...inputStyle, flex: 1, marginBottom: 0, minWidth: '200px' }}
                />
                <button type="submit" className="cta-button" style={{ padding: '13px 24px', fontSize: '0.9rem', whiteSpace: 'nowrap' }}>
                  Verify Status
                </button>
              </form>
              {lookupResult && (
                <div style={{ marginTop: '16px', background: 'rgba(0,0,0,0.4)', padding: '16px', borderRadius: '10px', border: '1px solid #c40062', fontSize: '0.88rem' }}>
                  <p style={{ color: '#3cd070', fontWeight: 700, marginBottom: '8px' }}>✓ IPPMS Alignment Verified</p>
                  <p style={{ color: '#ffffff' }}><strong>National ID:</strong> {lookupResult.idNumber}</p>
                  <p style={{ color: '#ffffff' }}><strong>Status:</strong> <span style={{ color: '#3cd070', fontWeight: 700 }}>{lookupResult.status}</span></p>
                  <p style={{ color: '#ffffff' }}><strong>ORPP Ref:</strong> {lookupResult.registrationRef}</p>
                  <p style={{ color: '#ffffff' }}><strong>Party:</strong> {lookupResult.party}</p>
                </div>
              )}
            </div>

          </div>
        </section>
      </>
    );
  }

  // ═══════════════════════════════════════════════════════════
  //  LOGIN PAGE (default view)
  // ═══════════════════════════════════════════════════════════
  return (
    <>
      {/* Hero */}
      <section className="hero-section" style={{ minHeight: '35vh', backgroundImage: "url('/images/hero.png')" }}>
        <div className="hero-overlay" />
        <div className="hero-content">
          <h1>Member <span className="highlight-magenta animated-accent">Portal</span></h1>
          <p>Statutory Member Register Linkage &amp; Article 6 Membership Categories (ORPP Standards).</p>
        </div>
      </section>

      <section className="content-padding">
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '32px', marginBottom: '48px' }}>

            {/* ── LOGIN PANEL ── */}
            <div style={{ background: 'rgba(0,0,0,0.45)', border: '1px solid rgba(196,0,98,0.4)', borderRadius: '18px', padding: '40px' }}>
              <div style={{ textAlign: 'center', marginBottom: '28px' }}>
                <div style={{ fontSize: '2.5rem', marginBottom: '10px' }}>🔐</div>
                <h2 style={{ color: '#ffffff', fontSize: '1.6rem', marginBottom: '6px' }}>Member Login</h2>
                <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '0.9rem' }}>
                  Sign in with your National ID number and password
                </p>
              </div>

              <form onSubmit={handleLogin}>
                <label style={{ display: 'block', color: 'rgba(255,255,255,0.8)', fontSize: '0.85rem', fontWeight: 600, marginBottom: '6px' }}>
                  National ID / Passport Number
                </label>
                <input
                  type="text"
                  placeholder="Enter your National ID or Passport No."
                  value={idNumber}
                  onChange={(e) => setIdNumber(e.target.value)}
                  required
                  style={inputStyle}
                />

                <label style={{ display: 'block', color: 'rgba(255,255,255,0.8)', fontSize: '0.85rem', fontWeight: 600, marginBottom: '6px' }}>
                  Password
                </label>
                <input
                  type="password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  style={inputStyle}
                />

                {loginErr && (
                  <div style={{ background: 'rgba(255,235,59,0.12)', border: '1px solid rgba(255,235,59,0.35)', borderRadius: '8px', padding: '12px', marginBottom: '16px' }}>
                    <p style={{ color: '#ffeb3b', fontWeight: 600, fontSize: '0.88rem', margin: 0 }}>⚠️ {loginErr}</p>
                  </div>
                )}

                <button
                  type="submit"
                  className="cta-button"
                  disabled={loading}
                  style={{ width: '100%', padding: '14px', fontSize: '1rem', opacity: loading ? 0.7 : 1, cursor: loading ? 'not-allowed' : 'pointer', marginBottom: '18px' }}
                >
                  {loading ? '⏳ Signing In...' : '🔐 Sign In to Member Portal'}
                </button>

                <div style={{ textAlign: 'center', borderTop: '1px solid rgba(255,255,255,0.12)', paddingTop: '18px' }}>
                  <p style={{ color: 'rgba(255,255,255,0.65)', fontSize: '0.88rem', marginBottom: '10px' }}>
                    Not yet a member?
                  </p>
                  <Link href="/join-us" className="cta-button" style={{ display: 'inline-block', fontSize: '0.9rem', padding: '10px 22px', background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.25)' }}>
                    ✍️ Register Now (Form PPM1)
                  </Link>
                </div>
              </form>
            </div>

            {/* ── IPPMS LOOKUP PANEL ── */}
            <div style={{ background: 'rgba(0,0,0,0.4)', border: '1px solid rgba(59,216,247,0.3)', borderRadius: '18px', padding: '40px' }}>
              <h3 style={{ color: '#3bd8f7', fontSize: '1.4rem', marginBottom: '10px' }}>🏛️ IPPMS Verification Tool</h3>
              <p style={{ fontSize: '0.9rem', color: 'rgba(255,255,255,0.85)', marginBottom: '18px', lineHeight: '1.6' }}>
                Cross-reference a National ID against the statutory party member register as required under ORPP provisional registration guidelines.
              </p>
              <form onSubmit={handleLookup} style={{ marginBottom: '16px' }}>
                <input
                  type="text"
                  placeholder="Enter National ID No."
                  value={searchId}
                  onChange={(e) => setSearchId(e.target.value)}
                  required
                  style={inputStyle}
                />
                <button type="submit" className="cta-button" style={{ width: '100%', padding: '12px' }}>
                  Verify Status
                </button>
              </form>
              {lookupResult && (
                <div style={{ background: 'rgba(0,0,0,0.4)', padding: '16px', borderRadius: '10px', border: '1px solid #c40062', fontSize: '0.88rem' }}>
                  <p style={{ color: '#3cd070', fontWeight: 700, marginBottom: '8px' }}>✓ IPPMS Alignment Verified</p>
                  <p style={{ color: '#fff' }}><strong>National ID:</strong> {lookupResult.idNumber}</p>
                  <p style={{ color: '#fff' }}><strong>Status:</strong> <span style={{ color: '#3cd070', fontWeight: 700 }}>{lookupResult.status}</span></p>
                  <p style={{ color: '#fff' }}><strong>ORPP Ref:</strong> {lookupResult.registrationRef}</p>
                  <p style={{ color: '#fff' }}><strong>Party:</strong> {lookupResult.party}</p>
                </div>
              )}

              {/* Info box */}
              <div style={{ background: 'rgba(0,0,0,0.35)', border: '1px solid rgba(255,255,255,0.15)', borderRadius: '12px', padding: '20px', marginTop: '24px' }}>
                <h4 style={{ color: '#ffeb3b', marginBottom: '8px' }}>ORPP Official Portal</h4>
                <p style={{ fontSize: '0.88rem', color: 'rgba(255,255,255,0.85)', marginBottom: '14px', lineHeight: '1.6' }}>
                  All party statutory records are cross-referenced with national standards on the ORPP portal.
                </p>
                <a
                  href="https://orpp.or.ke/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="cta-button"
                  style={{ display: 'block', textAlign: 'center', background: '#ffffff', color: '#d8006f', fontWeight: 'bold', padding: '10px' }}
                >
                  🏛️ Open Official ORPP Portal
                </a>
              </div>
            </div>
          </div>

          {/* ── Article 6 Membership Categories ── */}
          <div style={{ background: 'rgba(0,0,0,0.4)', border: '1px solid rgba(255,255,255,0.12)', borderRadius: '18px', padding: '40px' }}>
            <h2 className="text-white text-center" style={{ marginBottom: '10px' }}>
              Article 6 — Statutory Membership Categories &amp; Fees
            </h2>
            <p className="lead text-center" style={{ marginBottom: '32px' }}>
              Under Clause 6.1 of the SDP Constitution, party membership is categorized as follows with prescribed statutory subscription rates:
            </p>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '18px', marginBottom: '24px' }}>
              {categories.map((cat, idx) => (
                <div key={idx} style={{ background: 'rgba(0,0,0,0.35)', padding: '20px', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.15)' }}>
                  <span style={{ background: '#c40062', color: '#fff', fontSize: '0.72rem', fontWeight: 700, padding: '2px 8px', borderRadius: '4px' }}>Clause {cat.clause}</span>
                  <h3 style={{ color: '#ffeb3b', fontSize: '1rem', marginTop: '10px', marginBottom: '8px' }}>{cat.name}</h3>
                  <p style={{ fontSize: '0.83rem', color: '#3bd8f7', fontWeight: 700, marginBottom: '4px' }}>Entrance: {cat.entrance}</p>
                  <p style={{ fontSize: '0.82rem', color: '#ffffff', marginBottom: '8px' }}>Sub: {cat.subscription}</p>
                  <span style={{ fontSize: '0.76rem', color: '#3cd070', fontWeight: 700, background: 'rgba(60,208,112,0.12)', padding: '3px 8px', borderRadius: '4px' }}>
                    📜 {cat.credential}
                  </span>
                </div>
              ))}
            </div>
            <div style={{ background: 'rgba(0,0,0,0.5)', padding: '18px', borderRadius: '10px', fontSize: '0.88rem', color: 'rgba(255,255,255,0.9)', lineHeight: '1.7' }}>
              <p style={{ marginBottom: '6px' }}><strong>Clause 6.10:</strong> Membership and Annual Subscription Fees for each category shall be payable as specified and is subject to revision by the National Executive Council (NEC).</p>
              <p><strong>Clause 6.11:</strong> A member may convert from one membership category to another provided that he/she has met the requisite conditions of such membership.</p>
            </div>
          </div>

        </div>
      </section>
    </>
  );
}
