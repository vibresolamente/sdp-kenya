"use client";

import Link from 'next/link';
import { useLanguage } from '@/lib/LanguageContext';

export default function Home() {
  const { t } = useLanguage();

  return (
    <>
        {/* SECTION 1: HERO */}
        <section id="home" className="hero-section" style={{ backgroundImage: "url('/images/hero.png')" }}>
            <div className="hero-overlay"></div>
            <div className="hero-content">
                <h1><span className="animated-accent">{t('hero_title')}</span></h1>
                <p>{t('hero_desc')}</p>
                <div style={{ display: 'flex', gap: '14px', justifyContent: 'center', flexWrap: 'wrap', marginTop: '20px' }}>
                  <Link href="/join-us" className="cta-button">{t('btn_join_today')}</Link>
                  {/* Documents button with PINK background and BLACK writing as requested */}
                  <Link href="/documents" className="cta-button" style={{ background: '#ff1493', color: '#000000', fontWeight: 'bold' }}>
                    {t('btn_orpp_docs')}
                  </Link>
                </div>
            </div>
        </section>

        {/* SECTION: JOIN SDP SPACE */}
        <section className="join-sdp-banner content-padding" style={{ background: 'rgba(0, 0, 0, 0.4)', borderTop: '2px solid #ff1493', borderBottom: '2px solid #ff1493', textAlign: 'center' }}>
            <div className="container">
                <h2 style={{ fontSize: '2.8rem', marginBottom: '16px', color: '#ffffff', fontWeight: 800 }}>{t('join_banner_title')}</h2>
                <p style={{ fontSize: '1.35rem', maxWidth: '800px', margin: '0 auto 28px', color: '#ffffff', fontWeight: 600, lineHeight: 1.6 }}>
                    {t('join_banner_quote')}
                </p>
                <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}>
                  <Link href="/join-us" className="cta-button" style={{ fontSize: '1.1rem', padding: '14px 32px' }}>
                    {t('btn_active_signup')}
                  </Link>
                  <Link href="/membership" className="cta-button" style={{ background: 'transparent', border: '2px solid #ffffff', color: '#ffffff', fontSize: '1.1rem', padding: '14px 28px' }}>
                    {t('btn_membership_portal')}
                  </Link>
                </div>
            </div>
        </section>

        {/* SECTION 2: ABOUT US / MISSION & ORPP STATUTORY FILINGS */}
        <section id="about" className="about-section content-padding">
            <div className="container bg-surface" style={{ padding: '40px', borderRadius: '16px' }}>
                <h2 className="text-white text-center">{t('about_title')}</h2>
                <p className="lead text-center" style={{ marginBottom: '30px' }}>
                  {t('about_desc')}
                </p>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6" style={{ marginTop: '24px' }}>
                  <div className="bg-surface p-6 rounded-xl border border-white/20 text-center">
                    <h3 style={{ color: '#ffeb3b', marginBottom: '10px' }}>{t('card_leadership_title')}</h3>
                    <p style={{ fontSize: '0.92rem', color: 'rgba(255,255,255,0.9)', marginBottom: '16px' }}>
                      {t('card_leadership_desc')}
                    </p>
                    <Link href="/leadership" className="cta-button" style={{ fontSize: '0.85rem', padding: '8px 16px' }}>
                      {t('btn_meet_leadership')}
                    </Link>
                  </div>

                  <div className="bg-surface p-6 rounded-xl border border-white/20 text-center">
                    <h3 style={{ color: '#3bd8f7', marginBottom: '10px' }}>{t('card_docs_title')}</h3>
                    <p style={{ fontSize: '0.92rem', color: 'rgba(255,255,255,0.9)', marginBottom: '16px' }}>
                      {t('card_docs_desc')}
                    </p>
                    <Link href="/documents" className="cta-button" style={{ fontSize: '0.85rem', padding: '8px 16px', background: '#ff1493', color: '#000000', fontWeight: 'bold' }}>
                      {t('btn_view_docs')}
                    </Link>
                  </div>

                  <div className="bg-surface p-6 rounded-xl border border-white/20 text-center">
                    <h3 style={{ color: '#ffffff', marginBottom: '10px' }}>{t('card_orpp_title')}</h3>
                    <p style={{ fontSize: '0.92rem', color: 'rgba(255,255,255,0.9)', marginBottom: '16px' }}>
                      {t('card_orpp_desc')}
                    </p>
                    {/* ORPP Portal button in BLACK writing & background for high visibility */}
                    <a href="https://orpp.or.ke/" target="_blank" rel="noopener noreferrer" className="cta-button" style={{ background: '#000000', color: '#ffffff', fontWeight: '900', fontSize: '0.88rem', padding: '10px 20px', border: '1px solid #ffffff' }}>
                      {t('btn_visit_orpp')}
                    </a>
                  </div>
                </div>
            </div>
        </section>

        {/* SECTION 3: POLICY PILLARS */}
        <section className="pillars-section content-padding">
            <div className="container">
                <h2 className="text-white text-center">{t('pillars_title')}</h2>
                <div className="pillars-grid mt-8">
                    <div className="pillar-card">
                        <i className="fas fa-handshake icon-large"></i>
                        <h3>Economic Justice &amp; Opportunity</h3>
                        <p>Restructure the economy to ensure fair wages and sustainable growth for all.</p>
                        <Link href="/our-plan" className="read-more-link">Learn More</Link>
                    </div>
                    <div className="pillar-card">
                        <i className="fas fa-gavel icon-large"></i>
                        <h3>Accountable Governance</h3>
                        <p>Zero tolerance for corruption. We will strengthen independent institutions.</p>
                        <Link href="/our-plan" className="read-more-link">Learn More</Link>
                    </div>
                    <div className="pillar-card">
                        <i className="fas fa-heartbeat icon-large"></i>
                        <h3>Universal Quality Healthcare</h3>
                        <p>Guarantee equitable access to comprehensive, high-quality medical services.</p>
                        <Link href="/our-plan" className="read-more-link">Learn More</Link>
                    </div>
                    <div className="pillar-card">
                        <i className="fas fa-graduation-cap icon-large"></i>
                        <h3>Future-Ready Education &amp; Skills</h3>
                        <p>Investing heavily in digital literacy and TVET to equip the youth for the global economy.</p>
                        <Link href="/our-plan" className="read-more-link">Learn More</Link>
                    </div>
                    <div className="pillar-card">
                        <i className="fas fa-leaf icon-large"></i>
                        <h3>Sustainable Development &amp; Climate Action</h3>
                        <p>Championing environmental stewardship and securing a healthy planet for future generations.</p>
                        <Link href="/our-plan" className="read-more-link">Learn More</Link>
                    </div>
                </div>
            </div>
        </section>
    </>
  );
}
