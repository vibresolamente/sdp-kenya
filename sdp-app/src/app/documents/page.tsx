import Link from 'next/link';

export const metadata = {
  title: 'Core Party Documents - SDP Kenya',
  description: 'Foundational documents for provisional registration submitted to the Office of the Registrar of Political Parties (ORPP).',
};

export default function Documents() {
  const coreDocs = [
    {
      title: "1. Constitution",
      file: "/documents/SDP_Constitution_2025.docx",
      format: "DOCX",
      desc: "Governing framework defining party principles, membership rights, national executive council hierarchy, financial oversight, and dispute resolution mechanisms as required under the Political Parties Act, 2011."
    },
    {
      title: "2. Elections & Nomination Rules",
      file: "/documents/Elections_and_Nomination_Rules_2025.doc",
      format: "DOC",
      desc: "Statutory rules governing internal party democratic elections, candidate nomination criteria, dispute resolution tribunal processes, and electoral integrity standards."
    },
    {
      title: "3. Ideology Statement",
      file: "/documents/Ideology_Statement.docx",
      format: "DOCX",
      desc: "Foundational manifesto outlining Social Democracy, Economic Inclusion, Civic Solidarity, Universal Rights, and Progressive Governance principles."
    },
    {
      title: "4. Manifesto and Policies",
      file: "/documents/Manifesto.docx",
      format: "DOCX",
      desc: "Comprehensive policy pillars covering economic restructuring, universal healthcare, technical skills education, agricultural revitalization, and accountable governance."
    },
    {
      title: "5. Symbol and Slogan",
      file: "/documents/Symbol_and_Slogan.docx",
      format: "DOCX",
      desc: "Official party emblem (Fist holding a torch & rose in hot pink, cyan, and white), party colors, and official slogan: 'CHANGE – MAGEUZI' | Motto: 'TIME HAS COME – WAKATI UMEFIKA'."
    }
  ];

  return (
    <>
      {/* HERO */}
      <section className="hero-section" style={{ minHeight: '35vh', backgroundImage: "url('/images/hero.png')" }}>
        <div className="hero-overlay"></div>
        <div className="hero-content">
          <h1>Core Party <span className="highlight-magenta animated-accent">Documents</span></h1>
          <p>Official Foundational Documents submitted to the Office of the Registrar of Political Parties (ORPP).</p>
        </div>
      </section>

      {/* CORE DOCUMENTS LIST */}
      <section className="documents-section content-padding">
        <div className="container bg-surface" style={{ padding: '40px', borderRadius: '16px' }}>
          <h2 className="text-white text-center" style={{ marginBottom: '12px' }}>
            ORPP Provisional Registration Filings
          </h2>
          <p className="lead text-center" style={{ marginBottom: '35px' }}>
            According to ORPP guidelines, the Social Democratic Party of Kenya (SDP) presents its foundational statutory documents and membership recruitment plan for public verification.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6" style={{ marginBottom: '40px' }}>
            {coreDocs.map((doc, idx) => (
              <div key={idx} className="bg-surface" style={{
                padding: '24px',
                borderRadius: '12px',
                border: '1px solid rgba(255, 255, 255, 0.3)',
                background: 'rgba(0, 0, 0, 0.35)',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between'
              }}>
                <div>
                  <h3 style={{ color: '#ffeb3b', fontSize: '1.25rem', marginBottom: '10px' }}>{doc.title}</h3>
                  <p style={{ fontSize: '0.95rem', color: 'rgba(255, 255, 255, 0.92)', lineHeight: '1.6', marginBottom: '16px' }}>
                    {doc.desc}
                  </p>
                </div>
                <a href={doc.file} className="cta-button" target="_blank" download style={{ textAlign: 'center', display: 'inline-block', width: '100%', fontSize: '0.95rem' }}>
                  📥 Download {doc.title.split('. ')[1]} ({doc.format})
                </a>
              </div>
            ))}
          </div>

          {/* OFFICIAL RECORD DETAILS */}
          <div className="official-record" style={{ background: 'rgba(0, 0, 0, 0.4)', padding: '28px', borderRadius: '12px', border: '1px solid rgba(255, 255, 255, 0.25)' }}>
            <h3 style={{ color: '#ffffff', marginBottom: '16px', fontSize: '1.3rem' }}>📜 Official Administrative Filing Record</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4" style={{ fontSize: '0.95rem', color: 'rgba(255, 255, 255, 0.95)' }}>
              <p><strong>Reference Number:</strong> <span className="animated-accent">SDP/C&amp;N/Vol.1/11/06</span></p>
              <p><strong>Submission Date:</strong> 27th November, 2024</p>
              <p><strong>Correspondent:</strong> Mr. Nyumbah Nyanjong&apos; Duncan (Founder &amp; President)</p>
              <p><strong>Head Office Location:</strong> P.O. Box 1559-50100 Kakamega, Kenya</p>
              <p><strong>Contact Helpline:</strong> 0725382047 / 0724484592</p>
              <p><strong>Official Email:</strong> sdpkenya@gmail.com</p>
            </div>
            <div className="mt-5" style={{ textAlign: 'center' }}>
              <a href="https://orpp.or.ke/" target="_blank" rel="noopener noreferrer" className="cta-button" style={{ background: '#ffffff', color: '#d8006f', fontWeight: 'bold' }}>
                🏛️ Cross Reference on ORPP Official Portal (https://orpp.or.ke/)
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
