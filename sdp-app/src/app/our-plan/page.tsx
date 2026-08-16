import Link from 'next/link';

export const metadata = {
  title: 'Our Plan - SDP Kenya',
  description: 'The Policy Manifesto & Strategic Roadmap of the Social Democratic Party of Kenya (SDP).',
};

export default function OurPlanPage() {
  const pillars = [
    {
      title: "1. Economic Justice & Fair Wages",
      desc: "Rebuilding Kenya's economic blueprint to empower workers, SMEs, informal sector traders, and youth entrepreneurs through equitable taxation, fair credit access, and living wage protections."
    },
    {
      title: "2. Accountable Democratic Governance",
      desc: "Zero-tolerance anti-corruption policy, independent judicial funding, devolution strengthening, and full compliance with ORPP and IPPMS statutory standards."
    },
    {
      title: "3. Universal High-Quality Healthcare",
      desc: "Establishing a national public healthcare guarantee ensuring free emergency, maternal, child, and chronic disease care for all Kenyan families."
    },
    {
      title: "4. Future-Ready Education & Skills",
      desc: "Modernizing TVET institutions, expanding digital literacy infrastructure, and guaranteeing university education loans based on merit and social equity."
    },
    {
      title: "5. Agricultural Sovereignty & Climate Action",
      desc: "Direct subsidy support to smallholder farmers, water harvesting infrastructure, climate adaptation funds, and environmental conservation."
    }
  ];

  return (
    <>
      <section className="hero-section" style={{ minHeight: '35vh', backgroundImage: "url('/images/hero.png')" }}>
        <div className="hero-overlay"></div>
        <div className="hero-content">
          <h1>Our <span className="highlight-magenta animated-accent">Plan</span></h1>
          <p>Policy Manifesto &amp; National Development Blueprint for Kenya.</p>
        </div>
      </section>

      <section className="content-padding">
        <div className="container bg-surface" style={{ padding: '40px', borderRadius: '16px' }}>
          <h2 className="text-white text-center" style={{ marginBottom: '12px' }}>
            Time for Change Has Come – Our Strategic Roadmap
          </h2>
          <p className="lead text-center" style={{ marginBottom: '35px' }}>
            The Social Democratic Party of Kenya is dedicated to systemic reform, economic empowerment, and human dignity.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6" style={{ marginBottom: '36px' }}>
            {pillars.map((p, idx) => (
              <div key={idx} className="bg-surface" style={{
                padding: '24px',
                borderRadius: '12px',
                border: '1px solid rgba(255, 255, 255, 0.3)',
                background: 'rgba(0, 0, 0, 0.35)'
              }}>
                <h3 style={{ color: '#ffeb3b', fontSize: '1.3rem', marginBottom: '10px' }}>{p.title}</h3>
                <p style={{ fontSize: '0.95rem', color: 'rgba(255, 255, 255, 0.92)', lineHeight: '1.6' }}>{p.desc}</p>
              </div>
            ))}
          </div>

          <div className="text-center">
            <Link href="/join-us" className="cta-button" style={{ fontSize: '1.1rem', padding: '12px 28px' }}>
              Join SDP &amp; Help Build This Plan
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
