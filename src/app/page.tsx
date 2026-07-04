import Link from 'next/link';

export default function Home() {
  return (
    <>
        {/* SECTION 1: HERO */}
        <section id="home" className="hero-section" style={{ backgroundImage: "url('/images/hero.png')" }}>
            <div className="hero-overlay"></div>
            <div className="hero-content">
                <h1>A New Era of <span className="highlight-magenta animated-accent">CHANGE</span> is Here.</h1>
                <p>The Social Democratic Party of Kenya: Dedicated to integrity, opportunity, and the rule of law. **MAGEUZI** driven by principle.</p>
                <Link href="/manifesto" className="cta-button">View Our Manifesto</Link>
            </div>
        </section>

        {/* SECTION 2: ABOUT US / MISSION */}
        <section id="about" className="about-section content-padding">
            <div className="container bg-surface" style={{ padding: '40px', borderRadius: '8px' }}>
                <h2>Our Mission: Built on Policy, Not Promises</h2>
                <p>The **Social Democratic Party of Kenya (SDP)** is founded on the core tenets of social justice, inclusive economic policy, and robust democratic accountability. We believe that true progress requires a government dedicated to the prosperity of all citizens, not just a few. The SDP is committed to upholding the highest standards of governance and legal compliance, as demonstrated by the submission of our comprehensive party **Constitution and Nomination Rules** to the Registrar of Political Parties in November 2024. Our mission is simple: **CHANGE - MAGEUZI** rooted in verifiable policy and democratic integrity.</p>
            </div>
        </section>

        {/* SECTION 3: POLICY PILLARS */}
        <section className="pillars-section content-padding">
            <div className="container">
                <h2 className="text-white">Our Core Pillars of <span className="animated-accent">CHANGE</span></h2>
                <div className="pillars-grid">
                    {/* Pillar 1 */}
                    <div className="pillar-card">
                        <i className="fas fa-handshake icon-large"></i>
                        <h3>Economic Justice & Opportunity</h3>
                        <p>Restructure the economy to ensure fair wages and sustainable growth for all.</p>
                        <Link href="/manifesto" className="read-more-link">Learn More</Link>
                    </div>
                    {/* Pillar 2 */}
                    <div className="pillar-card">
                        <i className="fas fa-gavel icon-large"></i>
                        <h3>Accountable Governance</h3>
                        <p>Zero tolerance for corruption. We will strengthen independent institutions.</p>
                        <Link href="/manifesto" className="read-more-link">Learn More</Link>
                    </div>
                    {/* Pillar 3 */}
                    <div className="pillar-card">
                        <i className="fas fa-heartbeat icon-large"></i>
                        <h3>Universal Quality Healthcare</h3>
                        <p>Guarantee equitable access to comprehensive, high-quality medical services.</p>
                        <Link href="/manifesto" className="read-more-link">Learn More</Link>
                    </div>
                    {/* Pillar 4 */}
                    <div className="pillar-card">
                        <i className="fas fa-graduation-cap icon-large"></i>
                        <h3>Future-Ready Education & Skills</h3>
                        <p>Investing heavily in digital literacy and TVET to equip the youth for the global economy.</p>
                        <Link href="/manifesto" className="read-more-link">Learn More</Link>
                    </div>
                    {/* Pillar 5 */}
                    <div className="pillar-card">
                        <i className="fas fa-leaf icon-large"></i>
                        <h3>Sustainable Development & Climate Action</h3>
                        <p>Championing environmental stewardship and securing a healthy planet for future generations.</p>
                        <Link href="/manifesto" className="read-more-link">Learn More</Link>
                    </div>
                </div>
            </div>
        </section>
    </>
  );
}
