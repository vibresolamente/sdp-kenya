import Link from 'next/link';

export default function AboutSDP() {
  return (
    <>
      <section className="hero-section" style={{ minHeight: '30vh', backgroundImage: "url('/images/hero.png')" }}>
        <div className="hero-overlay" />
        <div className="hero-content">
          <h1>About <span className="highlight-magenta animated-accent">SDP Kenya</span></h1>
          <p>Social Democratic Party of Kenya — Grounded in Social Justice, Equality &amp; Integrity.</p>
        </div>
      </section>

      <section className="content-padding">
        <div className="container" style={{ maxWidth: '950px' }}>
          <div className="bg-surface" style={{ padding: '40px 32px', borderRadius: '18px', marginBottom: '32px' }}>
            <h2 style={{ color: '#ffeb3b', fontSize: '1.8rem', marginBottom: '14px' }}>Who We Are</h2>
            <p style={{ lineHeight: '1.7', color: 'rgba(255,255,255,0.92)', marginBottom: '20px' }}>
              The <strong>Social Democratic Party of Kenya (SDP)</strong> is a national political party registered under the Political Parties Act, 2011. Founded on the bedrock principles of <strong>Democratic Socialism</strong>, the SDP is dedicated to championing the rights of everyday Kenyans, restoring economic sovereignty, and ensuring uncompromising democratic accountability.
            </p>

            <div style={{ display: 'flex', gap: '14px', justifyContent: 'center', marginTop: '30px', flexWrap: 'wrap' }}>
              <Link href="/join-us" className="cta-button">
                ✍️ Join SDP Kenya
              </Link>
              <Link href="/documents" className="cta-button" style={{ background: '#ff0090', color: '#ffffff' }}>
                📄 View Party Documents
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
