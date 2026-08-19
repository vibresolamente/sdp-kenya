"use client";

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { useLanguage } from '@/lib/LanguageContext';

export default function Home() {
  const { t } = useLanguage();
  const [activeSlide, setActiveSlide] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % 6);
    }, 4500);
    return () => clearInterval(interval);
  }, []);

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

        {/* SECTION: OFFICIAL PARTY IDENTITY & STATUTORY SYMBOLS */}
        <section id="party-identity" className="content-padding fade-in-up" style={{ background: 'linear-gradient(180deg, rgba(0,0,0,0.6) 0%, rgba(100,0,50,0.4) 100%)', borderTop: '3px solid #ff0090', borderBottom: '3px solid #00bfff', animationDelay: '0.5s' }}>
            <div className="container fade-in-up">
                <div className="text-center" style={{ marginBottom: '36px' }}>
                    <span style={{ background: 'rgba(255,255,255,0.15)', color: '#ffeb3b', padding: '4px 14px', borderRadius: '20px', fontSize: '0.85rem', fontWeight: 800, letterSpacing: '1px', textTransform: 'uppercase' }}>
                      Official Party Identity
                    </span>
                    <h2 style={{ fontSize: '2.5rem', marginTop: '12px', marginBottom: '8px', color: '#ffffff', fontWeight: 900 }}>
                      SDP Kenya Statutory <span className="animated-accent">Identity &amp; Symbols</span>
                    </h2>
                    <p className="lead" style={{ maxWidth: '750px', margin: '0 auto', color: 'rgba(255,255,255,0.9)' }}>
                      Registered under the Political Parties Act, 2011 &amp; ORPP statutory regulatory guidelines.
                    </p>
                </div>

                <div className="fade-in-up" style={{ position: 'relative', width: '100%', overflow: 'hidden', padding: '20px 0' }}>
                    <div style={{
                        display: 'flex',
                        transition: 'transform 1000ms cubic-bezier(0.4, 0, 0.2, 1)',
                        transform: `translateX(-${activeSlide * 100}%)`,
                        width: '100%'
                    }}>
                        
                        {/* Slide 1: Ideology */}
                        <div style={{ flex: '0 0 100%', width: '100%', display: 'flex', justifyContent: 'center', padding: '0 15px' }}>
                            <div className="bg-surface p-8 rounded-2xl border border-white/20 text-center" style={{ maxWidth: '600px', width: '100%', boxShadow: '0 8px 24px rgba(0,0,0,0.3)', backdropFilter: 'blur(10px)', animation: 'slideInLeft 1s ease-out forwards', animationDelay: '0s' }}>
                                <div style={{ fontSize: '3rem', marginBottom: '12px' }}>⚖️</div>
                                <span style={{ fontSize: '0.85rem', color: '#ffeb3b', fontWeight: 700, letterSpacing: '1.5px', textTransform: 'uppercase' }}>1. Party Ideology</span>
                                <h3 style={{ fontSize: '1.6rem', color: '#ffffff', marginTop: '8px', marginBottom: '12px', fontWeight: 800 }}>Democratic Socialism</h3>
                                <p style={{ fontSize: '1.05rem', color: 'rgba(255,255,255,0.85)', lineHeight: '1.7' }}>
                                  Committed to social justice, freedom, equality, people-centered economic democracy, and national solidarity.
                                </p>
                            </div>
                        </div>

                        {/* Slide 2: Symbol */}
                        <div style={{ flex: '0 0 100%', width: '100%', display: 'flex', justifyContent: 'center', padding: '0 15px' }}>
                            <div className="bg-surface p-8 rounded-2xl border border-white/20 text-center" style={{ maxWidth: '600px', width: '100%', boxShadow: '0 8px 24px rgba(0,0,0,0.3)', backdropFilter: 'blur(10px)', animation: 'slideInLeft 1s ease-out forwards', animationDelay: '0.2s' }}>
                                <div style={{
                                    width: '72px',
                                    height: '72px',
                                    borderRadius: '50%',
                                    border: '3px solid #ff0090',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    margin: '0 auto 12px',
                                    fontWeight: 900,
                                    fontSize: '1.3rem',
                                    color: '#ffffff',
                                    background: 'rgba(255,0,144,0.15)'
                                }}>
                                    SDP
                                </div>
                                <span style={{ fontSize: '0.85rem', color: '#3bd8f7', fontWeight: 700, letterSpacing: '1.5px', textTransform: 'uppercase' }}>2. Official Symbol</span>
                                <h3 style={{ fontSize: '1.6rem', color: '#ffffff', marginTop: '8px', marginBottom: '12px', fontWeight: 800 }}>SDP (Inside a Circle)</h3>
                                <p style={{ fontSize: '1.05rem', color: 'rgba(255,255,255,0.85)', lineHeight: '1.7' }}>
                                  The acronym <strong>SDP</strong> enclosed inside a circular crest, representing unity, integrity, and collective power.
                                </p>
                            </div>
                        </div>

                        {/* Slide 3: Slogan */}
                        <div style={{ flex: '0 0 100%', width: '100%', display: 'flex', justifyContent: 'center', padding: '0 15px' }}>
                            <div className="bg-surface p-8 rounded-2xl border border-white/20 text-center" style={{ maxWidth: '600px', width: '100%', boxShadow: '0 8px 24px rgba(0,0,0,0.3)', backdropFilter: 'blur(10px)', animation: 'slideInLeft 1s ease-out forwards', animationDelay: '0.4s' }}>
                                <div style={{ fontSize: '3rem', marginBottom: '12px' }}>📢</div>
                                <span style={{ fontSize: '0.85rem', color: '#ff69b4', fontWeight: 700, letterSpacing: '1.5px', textTransform: 'uppercase' }}>3. Official Slogan</span>
                                <h3 style={{ fontSize: '1.6rem', color: '#ff0090', marginTop: '8px', marginBottom: '12px', fontWeight: 900 }}>Change – Mageuzi</h3>
                                <p style={{ fontSize: '1.05rem', color: 'rgba(255,255,255,0.85)', lineHeight: '1.7' }}>
                                  The clarion call for structural transformation and progressive political renewal across Kenya.
                                </p>
                            </div>
                        </div>

                        {/* Slide 4: Motto */}
                        <div style={{ flex: '0 0 100%', width: '100%', display: 'flex', justifyContent: 'center', padding: '0 15px' }}>
                            <div className="bg-surface p-8 rounded-2xl border border-white/20 text-center" style={{ maxWidth: '600px', width: '100%', boxShadow: '0 8px 24px rgba(0,0,0,0.3)', backdropFilter: 'blur(10px)', animation: 'slideInLeft 1s ease-out forwards', animationDelay: '0.6s' }}>
                                <div style={{ fontSize: '3rem', marginBottom: '12px' }}>⏳</div>
                                <span style={{ fontSize: '0.85rem', color: '#3cd070', fontWeight: 700, letterSpacing: '1.5px', textTransform: 'uppercase' }}>4. Official Motto</span>
                                <h3 style={{ fontSize: '1.6rem', color: '#3cd070', marginTop: '8px', marginBottom: '12px', fontWeight: 800 }}>Time Has Come – Wakati Umefika</h3>
                                <p style={{ fontSize: '1.05rem', color: 'rgba(255,255,255,0.85)', lineHeight: '1.7' }}>
                                  The moment for revolutionary democratic advancement and righteous citizen governance is now.
                                </p>
                            </div>
                        </div>

                        {/* Slide 5: Salute */}
                        <div style={{ flex: '0 0 100%', width: '100%', display: 'flex', justifyContent: 'center', padding: '0 15px' }}>
                            <div className="bg-surface p-8 rounded-2xl border border-white/20 text-center" style={{ maxWidth: '600px', width: '100%', boxShadow: '0 8px 24px rgba(0,0,0,0.3)', backdropFilter: 'blur(10px)', animation: 'slideInLeft 1s ease-out forwards', animationDelay: '0.8s' }}>
                                <div style={{ fontSize: '3rem', marginBottom: '12px' }}>✋</div>
                                <span style={{ fontSize: '0.85rem', color: '#3bd8f7', fontWeight: 700, letterSpacing: '1.5px', textTransform: 'uppercase' }}>5. Official Salute</span>
                                <h3 style={{ fontSize: '1.6rem', color: '#ffffff', marginTop: '8px', marginBottom: '12px', fontWeight: 800 }}>Open Hand and Palm Raised</h3>
                                <p style={{ fontSize: '1.05rem', color: 'rgba(255,255,255,0.85)', lineHeight: '1.7' }}>
                                  Raised open palm symbolising peace, transparency, brotherhood, honesty, and openness to all people.
                                </p>
                            </div>
                        </div>

                        {/* Slide 6: Colours */}
                        <div style={{ flex: '0 0 100%', width: '100%', display: 'flex', justifyContent: 'center', padding: '0 15px' }}>
                            <div className="bg-surface p-8 rounded-2xl border border-white/20 text-center" style={{ maxWidth: '600px', width: '100%', boxShadow: '0 8px 24px rgba(0,0,0,0.3)', backdropFilter: 'blur(10px)', animation: 'slideInLeft 1s ease-out forwards', animationDelay: '1s' }}>
                                <div style={{ display: 'flex', justifyContent: 'center', gap: '10px', marginBottom: '12px' }}>
                                    <span style={{ width: '26px', height: '26px', borderRadius: '50%', background: '#ff0090', border: '2px solid #ffffff' }} title="Pink"></span>
                                    <span style={{ width: '26px', height: '26px', borderRadius: '50%', background: '#ffffff', border: '2px solid #cbd5e0' }} title="White"></span>
                                    <span style={{ width: '26px', height: '26px', borderRadius: '50%', background: '#00bfff', border: '2px solid #ffffff' }} title="Bold Skyblue"></span>
                                </div>
                                <span style={{ fontSize: '0.85rem', color: '#ffeb3b', fontWeight: 700, letterSpacing: '1.5px', textTransform: 'uppercase' }}>6. Official Colours</span>
                                <h3 style={{ fontSize: '1.6rem', color: '#ffffff', marginTop: '8px', marginBottom: '12px', fontWeight: 800 }}>
                                  <span style={{ color: '#ff0090' }}>Pink</span>, <span style={{ color: '#ffffff' }}>White</span> &amp; <span style={{ color: '#00bfff' }}>Bold Skyblue</span>
                                </h3>
                                <div style={{ display: 'flex', justifyContent: 'center', gap: '8px', flexWrap: 'wrap', marginTop: '12px' }}>
                                    <span style={{ background: '#ff0090', color: '#ffffff', padding: '4px 12px', borderRadius: '12px', fontSize: '0.8rem', fontWeight: 700 }}>Pink</span>
                                    <span style={{ background: '#ffffff', color: '#000000', padding: '4px 12px', borderRadius: '12px', fontSize: '0.8rem', fontWeight: 800 }}>White</span>
                                    <span style={{ background: '#00bfff', color: '#000000', padding: '4px 12px', borderRadius: '12px', fontSize: '0.8rem', fontWeight: 800 }}>Bold Skyblue</span>
                                </div>
                            </div>
                        </div>

                    </div>

                    {/* Navigation controls */}
                    <button 
                        onClick={() => setActiveSlide((prev) => (prev - 1 + 6) % 6)}
                        style={{
                            position: 'absolute',
                            left: '5px',
                            top: '50%',
                            transform: 'translateY(-50%)',
                            background: 'rgba(0,0,0,0.5)',
                            color: '#fff',
                            border: '1px solid rgba(255,255,255,0.25)',
                            width: '40px',
                            height: '40px',
                            borderRadius: '50%',
                            cursor: 'pointer',
                            fontSize: '1.2rem',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            zIndex: 10,
                            transition: 'background 0.2s'
                        }}
                        onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(255,0,144,0.6)'}
                        onMouseLeave={(e) => e.currentTarget.style.background = 'rgba(0,0,0,0.5)'}
                    >
                        ⟨
                    </button>
                    <button 
                        onClick={() => setActiveSlide((prev) => (prev + 1) % 6)}
                        style={{
                            position: 'absolute',
                            right: '5px',
                            top: '50%',
                            transform: 'translateY(-50%)',
                            background: 'rgba(0,0,0,0.5)',
                            color: '#fff',
                            border: '1px solid rgba(255,255,255,0.25)',
                            width: '40px',
                            height: '40px',
                            borderRadius: '50%',
                            cursor: 'pointer',
                            fontSize: '1.2rem',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            zIndex: 10,
                            transition: 'background 0.2s'
                        }}
                        onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(255,0,144,0.6)'}
                        onMouseLeave={(e) => e.currentTarget.style.background = 'rgba(0,0,0,0.5)'}
                    >
                        ⟩
                    </button>

                    {/* Pagination indicators */}
                    <div style={{ display: 'flex', justifyContent: 'center', gap: '8px', marginTop: '24px' }}>
                        {[0, 1, 2, 3, 4, 5].map((index) => (
                            <button
                                key={index}
                                onClick={() => setActiveSlide(index)}
                                style={{
                                    width: activeSlide === index ? '28px' : '8px',
                                    height: '8px',
                                    borderRadius: '4px',
                                    background: activeSlide === index ? '#ff0090' : 'rgba(255,255,255,0.3)',
                                    border: 'none',
                                    cursor: 'pointer',
                                    transition: 'all 0.3s ease'
                                }}
                            />
                        ))}
                    </div>
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
