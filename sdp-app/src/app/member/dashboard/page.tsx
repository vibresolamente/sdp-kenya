import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { getMemberById } from '@/lib/db';
import Link from 'next/link';

export default async function MemberDashboard() {
  const cookieStore = cookies();
  const session = cookieStore.get('sdp_member_session');

  if (!session || !session.value) {
    redirect('/member/login');
  }

  const memberId = parseInt(session.value, 10);
  const memberData = await getMemberById(memberId);

  if (!memberData) {
    redirect('/member/login');
  }

  const initials = memberData.name
    ? memberData.name.split(' ').map((n: string) => n[0]).join('').slice(0, 2).toUpperCase()
    : 'SD';
  const memberIdCode = 'SDP-KE-' + String(memberData.id).padStart(6, '0');

  return (
    <>
      <section className="hero-section" style={{ minHeight: '28vh', backgroundImage: "url('/images/hero.png')" }}>
        <div className="hero-overlay" />
        <div className="hero-content">
          <h1>Member <span className="highlight-magenta animated-accent">Portal</span></h1>
          <p>Official Statutory Party Register | Form PPM1 Record</p>
        </div>
      </section>

      <section className="content-padding">
        <div className="container" style={{ maxWidth: '1000px' }}>
          
          {/* Top Bar Header */}
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            background: 'rgba(0,0,0,0.5)',
            border: '1px solid rgba(255,255,255,0.2)',
            borderRadius: '16px',
            padding: '20px 28px',
            marginBottom: '32px',
            flexWrap: 'wrap',
            gap: '16px',
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
              <div style={{
                width: '56px',
                height: '56px',
                borderRadius: '50%',
                background: 'linear-gradient(135deg, #c40062, #99004d)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '1.5rem',
                fontWeight: 900,
                color: '#ffffff',
                flexShrink: 0,
                border: '2px solid rgba(255,255,255,0.3)',
              }}>
                {initials}
              </div>
              <div>
                <p style={{ fontSize: '1.2rem', fontWeight: 800, color: '#ffffff', margin: 0 }}>{memberData.name}</p>
                <p style={{ fontSize: '0.85rem', color: 'rgba(255,255,255,0.8)', margin: 0 }}>
                  National ID: <strong>{memberData.id_number}</strong> &nbsp;·&nbsp; <span style={{ color: '#3cd070', fontWeight: 700 }}>● Active Member</span>
                </p>
              </div>
            </div>

            <form action="/api/member/logout" method="POST" style={{ display: 'inline' }}>
              <button 
                type="submit" 
                className="cta-button" 
                style={{ background: 'rgba(255,255,255,0.12)', border: '1px solid rgba(255,255,255,0.3)', fontSize: '0.9rem', padding: '10px 20px', boxShadow: 'none' }}
              >
                🚪 Log Out
              </button>
            </form>
          </div>

          {/* Main 2-Column Grid */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '28px', marginBottom: '36px' }}>
            
            {/* ── LEFT: Digital Membership Card ── */}
            <div className="bg-surface" style={{ padding: '28px', borderRadius: '16px', textAlign: 'center' }}>
              <h3 style={{ color: '#ffeb3b', fontSize: '1.2rem', marginBottom: '16px' }}>
                💳 Official Digital Membership Card
              </h3>

              <div style={{
                background: 'linear-gradient(135deg, #800040 0%, #c40062 50%, #4a0026 100%)',
                borderRadius: '16px',
                padding: '24px',
                color: '#ffffff',
                textAlign: 'left',
                boxShadow: '0 12px 35px rgba(0,0,0,0.5)',
                border: '1.5px solid rgba(255,255,255,0.3)',
                maxWidth: '400px',
                margin: '0 auto 20px',
                position: 'relative',
                overflow: 'hidden',
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                  <div>
                    <span style={{ fontWeight: 900, fontSize: '1.2rem', letterSpacing: '1.5px', color: '#ffffff' }}>SDP KENYA</span>
                    <div style={{ fontSize: '0.65rem', color: '#ffeb3b', fontWeight: 700, letterSpacing: '1px' }}>SOCIAL DEMOCRATIC PARTY</div>
                  </div>
                  <span style={{ fontSize: '0.68rem', background: '#3cd070', color: '#000000', padding: '3px 8px', borderRadius: '12px', fontWeight: 800 }}>
                    IPPMS VERIFIED
                  </span>
                </div>

                <div style={{ borderTop: '1px solid rgba(255,255,255,0.2)', borderBottom: '1px solid rgba(255,255,255,0.2)', padding: '12px 0', margin: '12px 0' }}>
                  <p style={{ fontSize: '0.7rem', opacity: 0.8, margin: 0, textTransform: 'uppercase' }}>Member Name:</p>
                  <p style={{ fontSize: '1.1rem', fontWeight: 800, margin: '0 0 6px', color: '#ffffff' }}>{memberData.name}</p>
                  
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px', fontSize: '0.8rem' }}>
                    <div>
                      <span style={{ opacity: 0.75, display: 'block', fontSize: '0.68rem' }}>ID / Passport:</span>
                      <strong>{memberData.id_number}</strong>
                    </div>
                    <div>
                      <span style={{ opacity: 0.75, display: 'block', fontSize: '0.68rem' }}>Member Ref:</span>
                      <strong style={{ color: '#ffeb3b' }}>{memberIdCode}</strong>
                    </div>
                    <div>
                      <span style={{ opacity: 0.75, display: 'block', fontSize: '0.68rem' }}>County / Ward:</span>
                      <span>{memberData.county || '—'} · {memberData.ward || '—'}</span>
                    </div>
                    <div>
                      <span style={{ opacity: 0.75, display: 'block', fontSize: '0.68rem' }}>Category:</span>
                      <span>{memberData.category || 'Ordinary Member'}</span>
                    </div>
                  </div>
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', fontSize: '0.68rem', opacity: 0.85 }}>
                  <div>
                    <span>Statutory Compliance: Political Parties Act, 2011</span>
                    <div style={{ marginTop: '2px' }}>P.O. Box 1559-50100 Kakamega</div>
                  </div>
                  <div style={{ textAlign: 'right', fontWeight: 700, color: '#3bd8f7' }}>
                    SDP-OFFICIAL
                  </div>
                </div>
              </div>

              <div className="official-record mt-4" style={{ background: 'rgba(60, 208, 112, 0.1)', borderLeft: '4px solid #3cd070', padding: '14px', textAlign: 'left' }}>
                <p style={{ color: '#3cd070', fontWeight: 700, margin: '0 0 4px', fontSize: '0.9rem' }}>✓ IPPMS Statutory Transmission Ready</p>
                <p style={{ fontSize: '0.82rem', color: 'rgba(255,255,255,0.85)', margin: 0 }}>
                  Your record is synchronized in accordance with the Political Parties (Membership) Regulations, 2021.
                </p>
              </div>
            </div>

            {/* ── RIGHT: Form PPM1 Details ── */}
            <div className="bg-surface" style={{ padding: '28px', borderRadius: '16px' }}>
              <h3 style={{ color: '#3bd8f7', fontSize: '1.2rem', marginBottom: '16px' }}>
                📋 Statutory Particulars (Form PPM1)
              </h3>
              
              <table className="official-contact-table" style={{ fontSize: '0.88rem' }}>
                <tbody>
                  <tr><td>Full Name</td><td style={{ fontWeight: 600 }}>{memberData.name}</td></tr>
                  <tr><td>National ID</td><td>{memberData.id_number}</td></tr>
                  <tr><td>Date of Birth</td><td>{memberData.dob || 'Not Provided'}</td></tr>
                  <tr><td>Gender</td><td>{memberData.sex || 'Not Provided'}</td></tr>
                  <tr><td>Ethnicity</td><td>{memberData.ethnicity || 'Not Provided'}</td></tr>
                  <tr><td>Disability Status</td><td>{memberData.disability_status || 'None'}</td></tr>
                  <tr><td>Phone Number</td><td><a href={`tel:${memberData.phone}`} style={{ color: 'var(--color-teal)' }}>{memberData.phone}</a></td></tr>
                  <tr><td>Email Address</td><td>{memberData.email || 'Not Provided'}</td></tr>
                  <tr><td>County / Ward</td><td>{memberData.county} · {memberData.ward}</td></tr>
                  <tr><td>Constituency</td><td>{memberData.constituency}</td></tr>
                  <tr><td>Registration Date</td><td>{new Date(memberData.created_at).toLocaleDateString()}</td></tr>
                </tbody>
              </table>
            </div>

          </div>

          {/* Quick Party Links */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px', marginBottom: '32px' }}>
            <Link href="/documents" className="pillar-card text-center" style={{ textDecoration: 'none', padding: '18px' }}>
              <span style={{ fontSize: '1.6rem', display: 'block', marginBottom: '6px' }}>📄</span>
              <h4 style={{ color: '#ffffff', fontSize: '0.95rem', margin: 0 }}>Party Documents</h4>
              <p style={{ fontSize: '0.78rem', margin: '4px 0 0', color: 'var(--color-teal)' }}>Constitution &amp; Rules</p>
            </Link>
            <Link href="/our-plan" className="pillar-card text-center" style={{ textDecoration: 'none', padding: '18px' }}>
              <span style={{ fontSize: '1.6rem', display: 'block', marginBottom: '6px' }}>📋</span>
              <h4 style={{ color: '#ffffff', fontSize: '0.95rem', margin: 0 }}>Our Plan &amp; Manifesto</h4>
              <p style={{ fontSize: '0.78rem', margin: '4px 0 0', color: 'var(--color-teal)' }}>5 Strategic Pillars</p>
            </Link>
            <Link href="/leadership" className="pillar-card text-center" style={{ textDecoration: 'none', padding: '18px' }}>
              <span style={{ fontSize: '1.6rem', display: 'block', marginBottom: '6px' }}>👥</span>
              <h4 style={{ color: '#ffffff', fontSize: '0.95rem', margin: 0 }}>National Leadership</h4>
              <p style={{ fontSize: '0.78rem', margin: '4px 0 0', color: 'var(--color-teal)' }}>Executive Council</p>
            </Link>
            <a href="https://orpp.or.ke/" target="_blank" rel="noopener noreferrer" className="pillar-card text-center" style={{ textDecoration: 'none', padding: '18px' }}>
              <span style={{ fontSize: '1.6rem', display: 'block', marginBottom: '6px' }}>🏛️</span>
              <h4 style={{ color: '#ffffff', fontSize: '0.95rem', margin: 0 }}>Official ORPP Portal</h4>
              <p style={{ fontSize: '0.78rem', margin: '4px 0 0', color: 'var(--color-teal)' }}>orpp.or.ke</p>
            </a>
          </div>

        </div>
      </section>
    </>
  );
}
