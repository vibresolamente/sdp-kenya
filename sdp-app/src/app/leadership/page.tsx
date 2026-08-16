import Image from 'next/image';
import Link from 'next/link';

export const metadata = {
  title: 'Party National Leadership - SDP Kenya',
  description: 'National Leadership and Statutory Elected Officials (Article 10.1) of the Social Democratic Party of Kenya (SDP).',
};

export default function LeadershipPage() {
  const primaryLeaders = [
    {
      name: "Mr. Nyumbah Nyanjong'",
      designation: "Party President and Founder (10.1.1)",
      image: "/pictures/ken mwanymba.png",
      phone: "0724484592",
      email: "nyumbah@gmail.com",
      roleDescription: "Leader and Founder of the Social Democratic Party of Kenya, championing democratic socialism, social justice, and constitutional integrity."
    },
    {
      name: "Mr Jared Dishon Omwandasi",
      designation: "Secretary-General and Founder (10.1.4)",
      image: "/pictures/jared omwandasi.png",
      phone: "0725382047",
      email: "sdpkenya@gmail.com",
      roleDescription: "Chief Administrative Officer and Founder responsible for party operations, statutory compliance with ORPP, and national member mobilization."
    },
    {
      name: "Ms Mary Wacuka Kinyua",
      designation: "National Treasurer and Founder (10.1.7)",
      image: "/pictures/treasue.png",
      phone: "0725382047",
      email: "sdpkenya@gmail.com",
      roleDescription: "Custodian of party financial management, transparency, statutory audits, and member subscription registries."
    }
  ];

  const nationalOfficials = [
    { clause: "10.1.1", title: "Party President", holder: "Mr. Nyumbah Nyanjong' (Founder & Elected)" },
    { clause: "10.1.2", title: "Deputy Party President (Politics)", holder: "National Executive Bureau" },
    { clause: "10.1.3", title: "Deputy Party President (Administration)", holder: "National Executive Bureau" },
    { clause: "10.1.4", title: "Secretary – General", holder: "Mr Jared Dishon Omwandasi (Founder & Elected)" },
    { clause: "10.1.5", title: "Deputy Secretary – General", holder: "National Secretariat" },
    { clause: "10.1.6", title: "Deputy Secretary-General", holder: "National Secretariat" },
    { clause: "10.1.7", title: "National Treasurer", holder: "Ms Mary Wacuka Kinyua (Founder & Elected)" },
    { clause: "10.1.8", title: "Deputy National Treasurer", holder: "National Treasury" },
    { clause: "10.1.9", title: "Deputy National Treasurer", holder: "National Treasury" },
    { clause: "10.1.10", title: "National Organizing Secretary", holder: "Field Operations & Mobilization" },
    { clause: "10.1.11", title: "Deputy National Organizing Secretary", holder: "Field Operations & Mobilization" },
    { clause: "10.1.12", title: "Deputy National Organizing Secretary", holder: "Field Operations & Mobilization" },
    { clause: "10.1.13", title: "National Women Social Democrats Leader", holder: "Women Social Democrats League" },
    { clause: "10.1.14", title: "Deputy National Women Social Democrats Leader", holder: "Women Social Democrats League" },
    { clause: "10.1.15", title: "Deputy National Women Social Democrats Leader", holder: "Women Social Democrats League" },
    { clause: "10.1.16", title: "National Young Social Democrats Leader", holder: "Young Social Democrats League" },
    { clause: "10.1.17", title: "Deputy National Young Democrats Leader", holder: "Young Social Democrats League" },
    { clause: "10.1.18", title: "Deputy National Young Social Democrats Leader", holder: "Young Social Democrats League" },
    { clause: "10.1.19", title: "National People with Disabilities Leader", holder: "PWD Social Democrats League" },
    { clause: "10.1.20", title: "Deputy National People with Disabilities Leader", holder: "PWD Social Democrats League" },
    { clause: "10.1.21", title: "Deputy National People with Disabilities Leader", holder: "PWD Social Democrats League" },
    { clause: "10.1.22", title: "National Minorities and Marginalized Group Leader", holder: "Minorities & Marginalized League" },
    { clause: "10.1.23", title: "Deputy National Minorities and Marginalized Group Leader", holder: "Minorities & Marginalized League" },
    { clause: "10.1.24", title: "Deputy National Minority and Marginalized Group Leader", holder: "Minorities & Marginalized League" },
    { clause: "10.1.25", title: "Executive Director", holder: "Directorate of Party Operations" }
  ];

  return (
    <>
      {/* HERO SECTION */}
      <section className="hero-section" style={{ minHeight: '35vh', backgroundImage: "url('/images/hero.png')" }}>
        <div className="hero-overlay"></div>
        <div className="hero-content">
          <h1>Party National <span className="highlight-magenta animated-accent">Leadership</span></h1>
          <p>Statutory Elected National Officials (Article 10.1) &amp; Executive Structure of the SDP.</p>
        </div>
      </section>

      {/* LEADERSHIP GRID SECTION */}
      <section className="content-padding">
        <div className="container">
          {/* FOUNDING OFFICIALS SHOWCASE */}
          <div className="bg-surface" style={{ padding: '40px', borderRadius: '16px', marginBottom: '40px' }}>
            <h2 className="text-white text-center" style={{ marginBottom: '10px' }}>Founding National Officials</h2>
            <p className="text-center lead" style={{ marginBottom: '35px', color: 'rgba(255, 255, 255, 0.9)' }}>
              Under Constitution Clause 6.7, the original founders of the party are <strong>Mr. Nyumbah Nyanjong&apos;</strong>, <strong>Mr. Jared Dishon Omwandasi</strong>, and <strong>Ms. Mary Wacuka Kinyua</strong>.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {primaryLeaders.map((leader, idx) => (
                <div key={idx} className="bg-surface" style={{ 
                  padding: '24px', 
                  borderRadius: '14px', 
                  border: '1px solid rgba(255, 255, 255, 0.3)',
                  textAlign: 'center',
                  background: 'rgba(0, 0, 0, 0.35)',
                  boxShadow: '0 8px 24px rgba(0, 0, 0, 0.25)'
                }}>
                  <div style={{ position: 'relative', width: '220px', height: '220px', margin: '0 auto 20px', overflow: 'hidden', borderRadius: '50%', border: '4px solid #ff1493' }}>
                    <Image 
                      src={leader.image} 
                      alt={leader.name} 
                      fill 
                      style={{ objectFit: 'cover' }} 
                      priority 
                    />
                  </div>
                  <h3 style={{ fontSize: '1.35rem', color: '#ffffff', marginBottom: '6px' }}>{leader.name}</h3>
                  <p style={{ color: '#3bd8f7', fontWeight: 700, fontSize: '1.05rem', marginBottom: '14px' }}>
                    {leader.designation}
                  </p>
                  <p style={{ fontSize: '0.92rem', color: 'rgba(255, 255, 255, 0.88)', marginBottom: '18px', lineHeight: '1.5' }}>
                    {leader.roleDescription}
                  </p>
                  <div style={{ borderTop: '1px solid rgba(255, 255, 255, 0.2)', paddingTop: '12px', fontSize: '0.88rem' }}>
                    <p style={{ color: '#ffffff', marginBottom: '4px' }}><strong>📞 Phone:</strong> {leader.phone}</p>
                    <p style={{ color: '#ffffff' }}><strong>✉ Email:</strong> {leader.email}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* ARTICLE 10.1 FULL STATUTORY OFFICIALS STRUCTURE */}
          <div className="bg-surface" style={{ padding: '40px', borderRadius: '16px', marginBottom: '40px' }}>
            <h2 className="text-white text-center" style={{ marginBottom: '8px' }}>
              Article 10.1 - National Officials of the Party
            </h2>
            <p className="lead text-center" style={{ marginBottom: '30px', color: 'rgba(255, 255, 255, 0.9)' }}>
              In accordance with the SDP Constitution filed with the Registrar of Political Parties (ORPP), the Party shall have the following elected National Officials:
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {nationalOfficials.map((off, idx) => (
                <div key={idx} style={{
                  background: 'rgba(0, 0, 0, 0.35)',
                  padding: '16px',
                  borderRadius: '10px',
                  border: '1px solid rgba(255, 255, 255, 0.2)',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between'
                }}>
                  <div>
                    <span style={{ background: '#ff1493', color: '#ffffff', fontSize: '0.75rem', fontWeight: 'bold', padding: '2px 8px', borderRadius: '4px' }}>
                      Clause {off.clause}
                    </span>
                    <h4 style={{ color: '#ffffff', fontSize: '1.05rem', marginTop: '8px', marginBottom: '4px' }}>{off.title}</h4>
                  </div>
                  <p style={{ fontSize: '0.85rem', color: '#3bd8f7', fontWeight: 600 }}>{off.holder}</p>
                </div>
              ))}
            </div>
          </div>

          {/* HEAD OFFICE & ORPP STATUTORY INFORMATION */}
          <div className="bg-surface" style={{ padding: '36px', borderRadius: '16px', background: 'rgba(0, 0, 0, 0.4)' }}>
            <h3 style={{ color: '#ffffff', fontSize: '1.5rem', marginBottom: '16px' }}>🏛️ National Head Office &amp; Statutory Credentials</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6" style={{ fontSize: '1rem', color: 'rgba(255, 255, 255, 0.95)' }}>
              <div>
                <p><strong>Head Office Location:</strong> Kakamega, Kenya</p>
                <p><strong>Official Postal Address:</strong> P.O. Box 1559-50100 Kakamega</p>
                <p><strong>Official Email:</strong> sdpkenya@gmail.com</p>
                <p><strong>Official Helpline:</strong> 0725 382 047 / 0724 484 592</p>
              </div>
              <div>
                <p><strong>ORPP Submission Ref:</strong> SDP/C&amp;N/Vol.1/11/06</p>
                <p><strong>Filing Date:</strong> 27th November 2024</p>
                <p><strong>Regulatory Body:</strong> Office of the Registrar of Political Parties (ORPP)</p>
                <p className="mt-3">
                  <a href="https://orpp.or.ke/" target="_blank" rel="noopener noreferrer" className="cta-button" style={{ fontSize: '0.9rem', padding: '8px 16px', display: 'inline-block' }}>
                    Verify on ORPP Portal (orpp.or.ke)
                  </a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
