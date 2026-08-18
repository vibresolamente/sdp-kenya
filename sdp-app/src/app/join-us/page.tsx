"use client";

import { useState } from 'react';
import Link from 'next/link';

export default function JoinUs() {
  const [status, setStatus]             = useState('');
  const [error, setError]               = useState('');
  const [memberCard, setMemberCard]     = useState<any>(null);
  const [loading, setLoading]           = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm]   = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setStatus('Processing registration & validating IPPMS compliance...');

    const formEl   = e.currentTarget;
    const formData = new FormData(formEl);
    const data     = Object.fromEntries(formData.entries()) as Record<string, string>;

    // Client-side consent validation
    if (!data.consent_agreed) {
      setError('You must agree to the statutory declaration and IPPMS data processing to proceed.');
      setStatus('');
      setLoading(false);
      return;
    }

    // Password confirmation
    if (!data.password || data.password.length < 6) {
      setError('Password must be at least 6 characters.');
      setStatus('');
      setLoading(false);
      return;
    }
    if (data.password !== data.confirm_password) {
      setError('Passwords do not match. Please re-enter your password.');
      setStatus('');
      setLoading(false);
      return;
    }

    const payload = {
      category:          data.category,
      name:              data.name,
      id_number:         data.id_number,
      dob:               data.dob,
      sex:               data.sex,
      ethnicity:         data.ethnicity,
      disability_status: data.disability_status,
      religion:          data.religion,
      phone:             data.phone,
      email:             data.email,
      physical_address:  data.physical_address,
      county:            data.county,
      constituency:      data.constituency,
      ward:              data.ward,
      password:          data.password,
      consent_agreed:    true,
      message:           data.message || '',
    };

    try {
      const response = await fetch('/api/membership', {
        method:  'POST',
        headers: { 'Content-Type': 'application/json' },
        body:    JSON.stringify(payload),
      });

      const resData = await response.json();

      if (response.ok) {
        const randomId = 'SDP-2026-' + Math.floor(100000 + Math.random() * 900000);
        setStatus('Registration Successful! Your IPPMS statutory record has been compiled.');
        setMemberCard({
          id:           randomId,
          name:         data.name,
          id_number:    data.id_number,
          county:       data.county,
          constituency: data.constituency,
          ward:         data.ward,
          category:     data.category,
          date:         new Date().toLocaleDateString('en-GB'),
        });
        formEl.reset();
      } else {
        setError(resData.error || 'Failed to submit application. Please check all fields and try again.');
        setStatus('');
      }
    } catch {
      setError('Network error. Please check your connection and try again.');
      setStatus('');
    } finally {
      setLoading(false);
    }
  };

  const inputStyle: React.CSSProperties = {
    color:           '#000000',
    backgroundColor: '#ffffff',
    border:          '1.5px solid #cbd5e0',
    borderRadius:    '8px',
    padding:         '12px 14px',
    fontSize:        '0.95rem',
    width:           '100%',
    marginBottom:    '14px',
    outline:         'none',
    fontWeight:      500,
    transition:      'border-color 0.2s ease, box-shadow 0.2s ease',
  };

  const selectStyle: React.CSSProperties = {
    ...inputStyle,
    cursor: 'pointer',
  };

  const sectionLabel: React.CSSProperties = {
    fontSize:     '0.82rem',
    fontWeight:   700,
    color:        '#3bd8f7',
    letterSpacing:'1px',
    textTransform:'uppercase',
    marginBottom: '10px',
    marginTop:    '18px',
    display:      'block',
    borderBottom: '1px solid rgba(59,216,247,0.25)',
    paddingBottom:'5px',
  };

  return (
    <section id="join-us" className="content-padding">
      <div className="container">
        <h1 className="text-center" style={{ marginBottom: '8px' }}>Join SDP Kenya</h1>
        <p className="lead text-center" style={{ marginBottom: '48px', color: 'rgba(255,255,255,0.85)', fontWeight: 500 }}>
          Register as a member and be part of building a Kenya grounded in freedom, equality, justice and solidarity.
        </p>

        <div className="contact-grid">

          {/* ── LEFT: Information Panel ─────────────────────── */}
          <div className="contact-info bg-surface" style={{ padding: '36px', borderRadius: '18px' }}>
            <h2 style={{ color: '#ffeb3b', fontSize: '1.5rem', marginBottom: '12px' }}>
              Form PPM1 — Digital Recruitment Platform
            </h2>
            <p style={{ lineHeight: '1.7', color: 'rgba(255,255,255,0.9)', marginBottom: '20px' }}>
              The <strong>Social Democratic Party of Kenya (SDP)</strong> digital recruitment tool provides active
              member registration aligned with national statutory guidelines and the{' '}
              <strong>Integrated Political Parties Management System (IPPMS)</strong> managed by the ORPP.
            </p>

            <h3 style={{ color: '#ffffff', fontSize: '1rem', marginBottom: '10px' }}>Statutory Rights &amp; Benefits</h3>
            <ul className="action-points" style={{ marginBottom: '24px' }}>
              <li>Active participation in grassroots democratic policy development.</li>
              <li>Voting rights in internal party primary elections and nominations.</li>
              <li>Official listing in the statutory national membership register.</li>
              <li>Direct representation at county and constituency delegates conferences.</li>
              <li>Access to your personal Member Portal after registration.</li>
            </ul>

            {/* Login Call-to-Action */}
            <div style={{ background: 'rgba(196,0,98,0.15)', border: '1px solid rgba(196,0,98,0.4)', borderRadius: '12px', padding: '20px', marginBottom: '20px' }}>
              <h4 style={{ color: '#ff69b4', marginBottom: '8px' }}>Already a Member?</h4>
              <p style={{ fontSize: '0.9rem', color: 'rgba(255,255,255,0.9)', marginBottom: '14px' }}>
                Log in to your Member Portal using your National ID number and password.
              </p>
              <Link
                href="/membership"
                className="cta-button"
                style={{ display: 'block', textAlign: 'center', fontSize: '0.9rem', padding: '10px 18px' }}
              >
                🔐 Go to Member Portal Login
              </Link>
            </div>

            {/* IPPMS Box */}
            <div style={{ background: 'rgba(0,0,0,0.4)', padding: '20px', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.2)' }}>
              <h4 style={{ color: '#3bd8f7', marginBottom: '8px' }}>🏛️ IPPMS Statutory Alignment</h4>
              <p style={{ fontSize: '0.88rem', color: 'rgba(255,255,255,0.85)', lineHeight: '1.6', marginBottom: '14px' }}>
                Membership data is structured under the Political Parties (Membership) Regulations, 2021
                and cross-referenced with ORPP national regulatory standards.
              </p>
              <a
                href="https://orpp.or.ke/"
                target="_blank"
                rel="noopener noreferrer"
                className="cta-button"
                style={{ fontSize: '0.85rem', padding: '8px 16px', background: '#ffffff', color: '#d8006f', fontWeight: 'bold', display: 'inline-block' }}
              >
                Visit Official ORPP Portal (orpp.or.ke)
              </a>
            </div>
          </div>

          {/* ── RIGHT: Registration Form ──────────────────────── */}
          <div className="contact-form-container bg-surface" style={{ padding: '36px', borderRadius: '18px' }}>

            {memberCard ? (
              /* Success Card */
              <div className="text-center" style={{ padding: '24px', background: 'rgba(0,0,0,0.5)', borderRadius: '16px', border: '2px solid #c40062' }}>
                <div style={{ fontSize: '3rem', marginBottom: '12px' }}>🎉</div>
                <h2 style={{ color: '#ffeb3b', marginBottom: '8px' }}>Registration Successful!</h2>
                <p style={{ color: 'rgba(255,255,255,0.9)', marginBottom: '24px', fontSize: '0.95rem' }}>
                  Your Form PPM1 digital recruitment submission is complete and cross-referenced with IPPMS standards.
                  You can now log in to your Member Portal.
                </p>

                {/* Digital Membership Card */}
                <div style={{
                  background:   'linear-gradient(135deg, #99004d 0%, #c40062 50%, #660033 100%)',
                  padding:      '28px',
                  borderRadius: '18px',
                  color:        '#ffffff',
                  textAlign:    'left',
                  boxShadow:    '0 12px 40px rgba(0,0,0,0.6)',
                  border:       '1px solid rgba(255,255,255,0.3)',
                  maxWidth:     '420px',
                  margin:       '0 auto 28px',
                }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '18px' }}>
                    <span style={{ fontWeight: 900, fontSize: '1.3rem', letterSpacing: '2px' }}>SDP KENYA</span>
                    <span style={{ fontSize: '0.72rem', background: 'rgba(255,255,255,0.2)', padding: '3px 10px', borderRadius: '20px', fontWeight: 700 }}>IPPMS VERIFIED</span>
                  </div>
                  <p style={{ fontSize: '0.75rem', opacity: 0.8, marginBottom: '4px' }}>MEMBER REGISTRATION ID:</p>
                  <p style={{ fontSize: '1.5rem', fontWeight: 900, color: '#ffeb3b', letterSpacing: '2px', marginBottom: '18px' }}>{memberCard.id}</p>
                  <div style={{ fontSize: '0.88rem', lineHeight: '1.7', borderTop: '1px solid rgba(255,255,255,0.2)', paddingTop: '14px' }}>
                    <p><strong>Name:</strong> {memberCard.name}</p>
                    <p><strong>ID / Passport:</strong> {memberCard.id_number}</p>
                    <p><strong>Category:</strong> {memberCard.category}</p>
                    <p><strong>County:</strong> {memberCard.county} &nbsp;|&nbsp; <strong>Ward:</strong> {memberCard.ward}</p>
                    <p><strong>Issued:</strong> {memberCard.date}</p>
                    <p><strong>Head Office:</strong> P.O. Box 1559-50100 Kakamega</p>
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '14px', justifyContent: 'center', flexWrap: 'wrap' }}>
                  <Link href="/membership" className="cta-button" style={{ fontSize: '0.9rem' }}>
                    🔐 Login to Member Portal
                  </Link>
                  <button
                    onClick={() => { setMemberCard(null); setStatus(''); setError(''); }}
                    className="cta-button"
                    style={{ fontSize: '0.9rem', background: 'rgba(255,255,255,0.15)', border: '1px solid rgba(255,255,255,0.3)' }}
                  >
                    Register Another Member
                  </button>
                </div>
              </div>
            ) : (
              <>
                <h2 style={{ marginBottom: '6px' }}>Form PPM1 — Member Registration</h2>
                <p style={{ fontSize: '0.88rem', color: 'rgba(255,255,255,0.7)', marginBottom: '24px' }}>
                  All fields marked <span style={{ color: '#ff6b6b' }}>*</span> are required.
                </p>

                <form onSubmit={handleSubmit}>

                  {/* SECTION 1 – Membership Category */}
                  <span style={sectionLabel}>1. Membership Category (Article 6.1) <span style={{ color: '#ff6b6b' }}>*</span></span>
                  <select name="category" required style={selectStyle}>
                    <option value="Ordinary Membership">Ordinary Membership (Entrance Ksh 20 | Sub Ksh 10/mo)</option>
                    <option value="Bronze Membership">Bronze Membership (Entrance Ksh 20,000 | Sub Ksh 10,000/yr)</option>
                    <option value="Silver Membership">Silver Membership (Entrance Ksh 50,000 | Sub Ksh 25,000/yr)</option>
                    <option value="Gold Membership">Gold Membership (Entrance Ksh 100,000 | Sub Ksh 50,000/yr)</option>
                    <option value="Platinum Membership">Platinum Membership (Entrance Ksh 200,000 | Sub Ksh 100,000/yr)</option>
                    <option value="Affiliate Membership">Affiliate Membership — Organization (Entrance Ksh 300,000 | Sub Ksh 150,000/yr)</option>
                  </select>

                  {/* SECTION 2 – Personal Particulars */}
                  <span style={sectionLabel}>2. Personal Particulars <span style={{ color: '#ff6b6b' }}>*</span></span>
                  <input type="text"  name="name"      placeholder="Full Legal Name (as per National ID) *"  required style={inputStyle} />
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <input type="text" name="id_number" placeholder="National ID / Passport No. *" required style={inputStyle} />
                    <input type="date" name="dob"       title="Date of Birth *"                    required style={inputStyle} />
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <select name="sex" required style={selectStyle}>
                      <option value="">Select Gender *</option>
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                      <option value="Corporate / Organization">Corporate / Organization</option>
                    </select>
                    <input type="text" name="ethnicity" placeholder="Ethnicity / Sector (optional)" style={inputStyle} />
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <input type="text" name="disability_status" placeholder="Disability Status (optional)" style={inputStyle} />
                    <input type="text" name="religion"          placeholder="Religion (optional)"           style={inputStyle} />
                  </div>

                  {/* SECTION 3 – Contact & Location */}
                  <span style={sectionLabel}>3. Contact &amp; Residential Location <span style={{ color: '#ff6b6b' }}>*</span></span>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <input type="tel"   name="phone" placeholder="Phone Number * (e.g. 0712345678)" required style={inputStyle} />
                    <input type="email" name="email" placeholder="Email Address"                             style={inputStyle} />
                  </div>
                  <input type="text" name="physical_address" placeholder="Physical / Postal Address (e.g. Kakamega)" style={inputStyle} />
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <input type="text" name="county"        placeholder="County of Residence *"  required style={inputStyle} />
                    <input type="text" name="constituency"  placeholder="Constituency *"          required style={inputStyle} />
                  </div>
                  <input type="text" name="ward" placeholder="Electoral Ward *" required style={inputStyle} />

                  {/* SECTION 4 – Account Password */}
                  <span style={sectionLabel}>4. Create Member Portal Password <span style={{ color: '#ff6b6b' }}>*</span></span>
                  <p style={{ fontSize: '0.85rem', color: 'rgba(255,255,255,0.85)', marginBottom: '12px', lineHeight: '1.5' }}>
                    Your <strong>National ID / Passport number</strong> will be your login username. Set a secure password below to access your Member Portal.
                  </p>
                  
                  <div style={{ position: 'relative', width: '100%', marginBottom: '14px' }}>
                    <input
                      type={showPassword ? "text" : "password"}
                      name="password"
                      placeholder="Create Password (min. 6 characters) *"
                      required
                      minLength={6}
                      style={{ ...inputStyle, paddingRight: '46px', marginBottom: 0 }}
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
                        fontSize: '1.15rem',
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

                  <div style={{ position: 'relative', width: '100%', marginBottom: '14px' }}>
                    <input
                      type={showConfirm ? "text" : "password"}
                      name="confirm_password"
                      placeholder="Confirm Password *"
                      required
                      minLength={6}
                      style={{ ...inputStyle, paddingRight: '46px', marginBottom: 0 }}
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirm(!showConfirm)}
                      style={{
                        position: 'absolute',
                        right: '12px',
                        top: '50%',
                        transform: 'translateY(-50%)',
                        background: 'none',
                        border: 'none',
                        cursor: 'pointer',
                        fontSize: '1.15rem',
                        color: '#4a5568',
                        padding: '4px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                      }}
                      title={showConfirm ? "Hide password" : "Show password"}
                      aria-label={showConfirm ? "Hide password" : "Show password"}
                    >
                      {showConfirm ? '👁️' : '🔒'}
                    </button>
                  </div>

                  {/* SECTION 5 – Statutory Declaration */}
                  <span style={sectionLabel}>5. Statutory Declaration</span>
                  <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px', marginBottom: '24px', background: 'rgba(0,0,0,0.3)', padding: '16px', borderRadius: '10px', border: '1px solid rgba(255,255,255,0.15)' }}>
                    <input
                      type="checkbox"
                      name="consent_agreed"
                      id="consent"
                      style={{ width: '18px', height: '18px', marginTop: '4px', cursor: 'pointer', accentColor: '#c40062', flexShrink: 0 }}
                      required
                    />
                    <label htmlFor="consent" style={{ fontSize: '0.87rem', color: 'rgba(255,255,255,0.9)', cursor: 'pointer', lineHeight: '1.6' }}>
                      I declare that I am a citizen of Kenya aged 18 years or above (or an authorized affiliate entity),
                      and <strong>I am not a registered member of any other political party</strong>. I consent to
                      statutory data processing under ORPP &amp; IPPMS guidelines as per the{' '}
                      <Link href="/privacy" style={{ color: '#ffeb3b', textDecoration: 'underline' }}>Privacy Policy</Link>. <span style={{ color: '#ff6b6b' }}>*</span>
                    </label>
                  </div>

                  <button
                    type="submit"
                    className="cta-button"
                    disabled={loading}
                    style={{ width: '100%', fontSize: '1rem', padding: '14px', opacity: loading ? 0.7 : 1, cursor: loading ? 'not-allowed' : 'pointer' }}
                  >
                    {loading ? '⏳ Submitting...' : '✅ Submit & Generate Digital Credential'}
                  </button>

                  {status && (
                    <p style={{ marginTop: '16px', textAlign: 'center', fontWeight: 700, color: '#3bd8f7', padding: '12px', background: 'rgba(59,216,247,0.1)', borderRadius: '8px' }}>
                      {status}
                    </p>
                  )}
                  {error && (
                    <p style={{ marginTop: '16px', textAlign: 'center', fontWeight: 700, color: '#ffeb3b', padding: '12px', background: 'rgba(255,235,59,0.1)', borderRadius: '8px', border: '1px solid rgba(255,235,59,0.3)' }}>
                      ⚠️ {error}
                    </p>
                  )}
                </form>
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
