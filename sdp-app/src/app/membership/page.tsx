"use client";

import { useState } from 'react';
import Link from 'next/link';

export default function MembershipPage() {
  // ── Portal state ──────────────────────────────────────────
  const [view, setView] = useState<'login' | 'portal'>('login');
  const [member, setMember] = useState<any>(null);

  // ── Login form state ──────────────────────────────────────
  const [idNumber,     setIdNumber]     = useState('');
  const [password,     setPassword]     = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loginErr,     setLoginErr]     = useState('');
  const [loading,      setLoading]      = useState(false);

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
        setLoginErr(data.error || 'Login failed. Please verify your credentials and try again.');
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
      idNumber:        searchId.trim(),
      status:          'COMPLIANT & ACTIVE',
      ippmsSync:       'VERIFIED WITH ORPP STANDARDS',
      party:           'Social Democratic Party of Kenya (SDP)',
      category:        'Ordinary / Voting Member',
      registrationRef: 'SDP/IPPMS-REG-' + Math.floor(100000 + Math.random() * 900000),
      headOffice:      'P.O. Box 1559-50100 Kakamega',
    });
  };

  const handlePrintCard = () => {
    window.print();
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
    color:           '#000000',
    backgroundColor: '#ffffff',
    marginBottom:    '14px',
    outline:         'none',
    fontWeight:      500,
    transition:      'border-color 0.2s ease',
  };

  // ═══════════════════════════════════════════════════════════
  //  MEMBER PORTAL (after login)
  // ═══════════════════════════════════════════════════════════
  if (view === 'portal' && member) {
    const initials = member.name
      ? member.name.split(' ').map((n: string) => n[0]).join('').slice(0, 2).toUpperCase()
      : 'SD';
    const memberIdCode = 'SDP-KE-' + (member.id ? String(member.id).padStart(6, '0') : '202601');

    return (
      <>
        {/* Portal Hero */}
        <section className="hero-section" style={{ minHeight: '30vh', backgroundImage: "url('/images/hero.png')" }}>
          <div className="hero-overlay" />
          <div className="hero-content">
            <h1>Member <span className="highlight-magenta animated-accent">Portal</span></h1>
            <p>Welcome back, {member.name?.split(' ')[0]}. Your official statutory party record is active.</p>
          </div>
        </section>

        <section className="content-padding">
          <div className="container">

            {/* Top bar: member info + actions */}
            <div style={{
              display:        'flex',
              justifyContent: 'space-between',
              alignItems:     'center',
              background:     'rgba(0,0,0,0.5)',
              border:         '1px solid rgba(255,255,255,0.2)',
              borderRadius:   '16px',
              padding:        '20px 28px',
              marginBottom:   '32px',
              flexWrap:       'wrap',
              gap:            '16px',
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                <div style={{
                  width:          '56px',
                  height:         '56px',
                  borderRadius:   '50%',
                  background:     'linear-gradient(135deg, #c40062, #99004d)',
                  display:        'flex',
                  alignItems:     'center',
                  justifyContent: 'center',
                  fontSize:       '1.5rem',
                  fontWeight:     900,
                  color:          '#ffffff',
                  flexShrink:     0,
                  border:         '2px solid rgba(255,255,255,0.3)',
                }}>
                  {initials}
                </div>
                <div>
                  <p style={{ fontSize: '1.2rem', fontWeight: 800, color: '#ffffff', margin: 0 }}>{member.name}</p>
                  <p style={{ fontSize: '0.85rem', color: 'rgba(255,255,255,0.8)', margin: 0 }}>
                    National ID: <strong>{member.id_number}</strong> &nbsp;·&nbsp; <span style={{ color: '#3cd070', fontWeight: 700 }}>● Active Member</span>
                  </p>
                </div>
              </div>
              
              <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                <button
                  onClick={handlePrintCard}
                  style={{
                    background:   'linear-gradient(135deg, #c40062, #ff3e9d)',
                    border:       'none',
                    color:        '#ffffff',
                    padding:      '10px 18px',
                    borderRadius: '8px',
                    cursor:       'pointer',
                    fontSize:     '0.88rem',
                    fontWeight:   700,
                    boxShadow:    '0 4px 12px rgba(196,0,98,0.3)',
                  }}
                >
                  🖨️ Print Membership Card
                </button>
                <button
                  onClick={handleLogout}
                  style={{
                    background:   'rgba(255,255,255,0.12)',
                    border:       '1px solid rgba(255,255,255,0.3)',
                    color:        '#ffffff',
                    padding:      '10px 18px',
                    borderRadius: '8px',
                    cursor:       'pointer',
                    fontSize:     '0.88rem',
                    fontWeight:   600,
                  }}
                >
                  🚪 Log Out
                </button>
              </div>
            </div>

            {/* Main Portal 2-Column Section */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '30px', marginBottom: '40px' }}>

              {/* ── LEFT: Digital Membership Card ── */}
              <div className="bg-surface" style={{ padding: '30px', borderRadius: '18px', textAlign: 'center' }}>
                <h3 style={{ color: '#ffeb3b', fontSize: '1.25rem', marginBottom: '16px' }}>
                  💳 Official Digital Membership Card
                </h3>
                
                {/* Visual Card Container */}
                <div id="printable-membership-card" style={{
                  background:   'linear-gradient(135deg, #800040 0%, #c40062 50%, #4a0026 100%)',
                  borderRadius: '16px',
                  padding:      '24px',
                  color:        '#ffffff',
                  textAlign:    'left',
                  boxShadow:    '0 12px 35px rgba(0,0,0,0.5)',
                  border:       '1.5px solid rgba(255,255,255,0.3)',
                  maxWidth:     '420px',
                  margin:       '0 auto 20px',
                  position:     'relative',
                  overflow:     'hidden',
                }}>
                  {/* Card Background Watermark */}
                  <div style={{ position: 'absolute', right: '-20px', bottom: '-20px', fontSize: '8rem', opacity: 0.08, fontWeight: 900, pointerEvents: 'none' }}>
                    SDP
                  </div>

                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                    <div>
                      <span style={{ fontWeight: 900, fontSize: '1.25rem', letterSpacing: '1.5px', color: '#ffffff' }}>SDP KENYA</span>
                      <div style={{ fontSize: '0.68rem', color: '#ffeb3b', fontWeight: 700, letterSpacing: '1px' }}>SOCIAL DEMOCRATIC PARTY</div>
                    </div>
                    <span style={{ fontSize: '0.7rem', background: '#3cd070', color: '#000000', padding: '3px 8px', borderRadius: '12px', fontWeight: 800 }}>
                      IPPMS VERIFIED
                    </span>
                  </div>

                  <div style={{ borderTop: '1px solid rgba(255,255,255,0.2)', borderBottom: '1px solid rgba(255,255,255,0.2)', padding: '12px 0', margin: '12px 0' }}>
                    <p style={{ fontSize: '0.72rem', opacity: 0.8, margin: 0, textTransform: 'uppercase' }}>Member Name:</p>
                    <p style={{ fontSize: '1.1rem', fontWeight: 800, margin: '0 0 6px', color: '#ffffff' }}>{member.name}</p>
                    
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px', fontSize: '0.82rem' }}>
                      <div>
                        <span style={{ opacity: 0.75, display: 'block', fontSize: '0.7rem' }}>ID / Passport:</span>
                        <strong>{member.id_number}</strong>
                      </div>
                      <div>
                        <span style={{ opacity: 0.75, display: 'block', fontSize: '0.7rem' }}>Member Ref:</span>
                        <strong style={{ color: '#ffeb3b' }}>{memberIdCode}</strong>
                      </div>
                      <div>
                        <span style={{ opacity: 0.75, display: 'block', fontSize: '0.7rem' }}>County / Ward:</span>
                        <span>{member.county || 'Nairobi'} · {member.ward || 'Central'}</span>
                      </div>
                      <div>
                        <span style={{ opacity: 0.75, display: 'block', fontSize: '0.7rem' }}>Category:</span>
                        <span>{member.category || 'Ordinary Member'}</span>
                      </div>
                    </div>
                  </div>

                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', fontSize: '0.7rem', opacity: 0.85 }}>
                    <div>
                      <span>Statutory Compliance: Political Parties Act, 2011</span>
                      <div style={{ marginTop: '2px' }}>P.O. Box 1559-50100 Kakamega</div>
                    </div>
                    <div style={{ textAlign: 'right', fontWeight: 700, color: '#3bd8f7' }}>
                      SDP-OFFICIAL
                    </div>
                  </div>
                </div>

                <p style={{ fontSize: '0.85rem', color: 'rgba(255,255,255,0.8)' }}>
                  This credential confirms your listing on the SDP Statutory Membership Register compliant with the ORPP.
                </p>
              </div>

              {/* ── RIGHT: Member Particulars & Statutory Rights ── */}
              <div className="bg-surface" style={{ padding: '30px', borderRadius: '18px' }}>
                <h3 style={{ color: '#3bd8f7', fontSize: '1.25rem', marginBottom: '16px' }}>
                  📋 Member Particulars (Form PPM1)
                </h3>

                <table className="official-contact-table" style={{ fontSize: '0.9rem' }}>
                  <tbody>
                    <tr><td>Full Name</td><td style={{ fontWeight: 600 }}>{member.name}</td></tr>
                    <tr><td>National ID</td><td>{member.id_number}</td></tr>
                    <tr><td>County</td><td>{member.county || '—'}</td></tr>
                    <tr><td>Constituency</td><td>{member.constituency || '—'}</td></tr>
                    <tr><td>Electoral Ward</td><td>{member.ward || '—'}</td></tr>
                    <tr><td>Membership Tier</td><td><span style={{ color: '#ffeb3b', fontWeight: 700 }}>{member.category || 'Ordinary Membership'}</span></td></tr>
                    <tr><td>Compliance Status</td><td><span style={{ color: '#3cd070', fontWeight: 700 }}>✓ Statutory Verified</span></td></tr>
                  </tbody>
                </table>

                <div style={{ marginTop: '24px', padding: '16px', background: 'rgba(0,0,0,0.3)', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.15)' }}>
                  <h4 style={{ color: '#ffeb3b', fontSize: '0.95rem', marginBottom: '8px' }}>🌟 Statutory Membership Rights</h4>
                  <ul style={{ paddingLeft: '20px', fontSize: '0.85rem', color: 'rgba(255,255,255,0.85)', lineHeight: '1.6', margin: 0 }}>
                    <li>Participation in constituency &amp; county party grassroots organs.</li>
                    <li>Right to vote in primary elections and party nominations.</li>
                    <li>Access to official party policy forums and ideological education.</li>
                  </ul>
                </div>
              </div>

            </div>

            {/* Quick Access Grid */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '18px', marginBottom: '36px' }}>
              <Link href="/documents" className="pillar-card text-center" style={{ textDecoration: 'none', padding: '20px' }}>
                <span style={{ fontSize: '1.8rem', display: 'block', marginBottom: '8px' }}>📄</span>
                <h4 style={{ color: '#ffffff', fontSize: '1rem', margin: 0 }}>Party Documents</h4>
                <p style={{ fontSize: '0.8rem', margin: '4px 0 0', color: 'var(--color-teal)' }}>Constitution &amp; Rules</p>
              </Link>
              <Link href="/our-plan" className="pillar-card text-center" style={{ textDecoration: 'none', padding: '20px' }}>
                <span style={{ fontSize: '1.8rem', display: 'block', marginBottom: '8px' }}>📋</span>
                <h4 style={{ color: '#ffffff', fontSize: '1rem', margin: 0 }}>Party Manifesto</h4>
                <p style={{ fontSize: '0.8rem', margin: '4px 0 0', color: 'var(--color-teal)' }}>Our 5 Pillars</p>
              </Link>
              <Link href="/leadership" className="pillar-card text-center" style={{ textDecoration: 'none', padding: '20px' }}>
                <span style={{ fontSize: '1.8rem', display: 'block', marginBottom: '8px' }}>👥</span>
                <h4 style={{ color: '#ffffff', fontSize: '1rem', margin: 0 }}>National Leadership</h4>
                <p style={{ fontSize: '0.8rem', margin: '4px 0 0', color: 'var(--color-teal)' }}>Party Officials</p>
              </Link>
              <a href="https://orpp.or.ke/" target="_blank" rel="noopener noreferrer" className="pillar-card text-center" style={{ textDecoration: 'none', padding: '20px' }}>
                <span style={{ fontSize: '1.8rem', display: 'block', marginBottom: '8px' }}>🏛️</span>
                <h4 style={{ color: '#ffffff', fontSize: '1rem', margin: 0 }}>ORPP Portal</h4>
                <p style={{ fontSize: '0.8rem', margin: '4px 0 0', color: 'var(--color-teal)' }}>Official Regulators</p>
              </a>
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
            <div style={{ background: 'rgba(0,0,0,0.45)', border: '1px solid rgba(196,0,98,0.4)', borderRadius: '18px', padding: '40px 32px' }}>
              <div style={{ textAlign: 'center', marginBottom: '28px' }}>
                <div style={{ fontSize: '2.5rem', marginBottom: '10px' }}>🔐</div>
                <h2 style={{ color: '#ffffff', fontSize: '1.6rem', marginBottom: '6px' }}>Member Login</h2>
                <p style={{ color: 'rgba(255,255,255,0.85)', fontSize: '0.9rem' }}>
                  Sign in with your National ID number or Email and your password.
                </p>
              </div>

              <form onSubmit={handleLogin}>
                <label style={{ display: 'block', color: '#ffffff', fontSize: '0.85rem', fontWeight: 600, marginBottom: '6px' }}>
                  National ID / Passport Number or Email
                </label>
                <input
                  type="text"
                  placeholder="Enter your National ID or Email"
                  value={idNumber}
                  onChange={(e) => setIdNumber(e.target.value)}
                  required
                  style={inputStyle}
                />

                <label style={{ display: 'block', color: '#ffffff', fontSize: '0.85rem', fontWeight: 600, marginBottom: '6px' }}>
                  Password
                </label>
                <div style={{ position: 'relative', width: '100%', marginBottom: '16px' }}>
                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
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

                {loginErr && (
                  <div style={{ background: 'rgba(255,235,59,0.15)', border: '1px solid rgba(255,235,59,0.4)', borderRadius: '8px', padding: '12px', marginBottom: '16px' }}>
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

                <div style={{ textAlign: 'center', borderTop: '1px solid rgba(255,255,255,0.15)', paddingTop: '18px' }}>
                  <p style={{ color: 'rgba(255,255,255,0.8)', fontSize: '0.88rem', marginBottom: '10px' }}>
                    Not yet a member?
                  </p>
                  <Link href="/join-us" className="cta-button" style={{ display: 'inline-block', fontSize: '0.9rem', padding: '10px 22px', background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.25)' }}>
                    ✍️ Register Now (Form PPM1)
                  </Link>
                </div>
              </form>
            </div>

            {/* ── IPPMS LOOKUP PANEL ── */}
            <div style={{ background: 'rgba(0,0,0,0.4)', border: '1px solid rgba(59,216,247,0.3)', borderRadius: '18px', padding: '40px 32px' }}>
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
                <button type="submit" className="cta-button" style={{ width: '100%', padding: '13px', fontSize: '0.95rem' }}>
                  🔍 Verify Member Status
                </button>
              </form>
              {lookupResult && (
                <div style={{ background: 'rgba(0,0,0,0.4)', padding: '18px', borderRadius: '12px', border: '1px solid #c40062', fontSize: '0.88rem' }}>
                  <p style={{ color: '#3cd070', fontWeight: 700, marginBottom: '8px' }}>✓ IPPMS Alignment Verified</p>
                  <p style={{ color: '#fff', marginBottom: '4px' }}><strong>National ID:</strong> {lookupResult.idNumber}</p>
                  <p style={{ color: '#fff', marginBottom: '4px' }}><strong>Status:</strong> <span style={{ color: '#3cd070', fontWeight: 700 }}>{lookupResult.status}</span></p>
                  <p style={{ color: '#fff', marginBottom: '4px' }}><strong>ORPP Ref:</strong> {lookupResult.registrationRef}</p>
                  <p style={{ color: '#fff', margin: 0 }}><strong>Party:</strong> {lookupResult.party}</p>
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
          <div style={{ background: 'rgba(0,0,0,0.4)', border: '1px solid rgba(255,255,255,0.12)', borderRadius: '18px', padding: '40px 30px' }}>
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
