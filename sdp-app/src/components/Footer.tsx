"use client";

import Link from 'next/link';
import Image from 'next/image';
import { useLanguage } from '@/lib/LanguageContext';

export default function Footer() {
    const { t } = useLanguage();

    return (
        <footer className="main-footer">
            <div className="container footer-grid">
                {/* Column 1: Brand & Slogan */}
                <div className="footer-col footer-brand">
                    <div className="footer-logo">
                        <Image
                            src="/images/sdp-logo.png"
                            alt="SDP Kenya Logo"
                            width={45}
                            height={45}
                            className="footer-logo-image"
                        />
                        <span>SDP KENYA</span>
                    </div>
                    <p style={{ marginTop: '14px', fontSize: '0.95rem', color: 'rgba(255, 255, 255, 0.9)', lineHeight: '1.6' }}>
                        {t('party_name')}.<br />
                        <strong style={{ color: '#ffeb3b' }}>{t('footer_slogan')}</strong>
                    </p>
                    <div style={{ marginTop: '12px' }}>
                        <a 
                            href="https://orpp.or.ke/" 
                            target="_blank" 
                            rel="noopener noreferrer" 
                            style={{ 
                                display: 'inline-block',
                                background: '#000000', 
                                color: '#ffffff', 
                                border: '1px solid #ffffff',
                                padding: '6px 12px', 
                                borderRadius: '6px', 
                                fontWeight: 'bold', 
                                fontSize: '0.85rem', 
                                textDecoration: 'none' 
                            }}
                        >
                            {t('footer_visit_orpp')}
                        </a>
                    </div>
                </div>

                {/* Column 2: Official Contact Details */}
                <div className="footer-col">
                    <h4 className="footer-title">{t('footer_headoffice_title')}</h4>
                    <ul className="footer-list">
                        <li><strong>Head Office:</strong> Kakamega, Kenya</li>
                        <li><strong>Mailing Address:</strong> P.O. Box 1559-50100 Kakamega</li>
                        <li><strong>Email:</strong> <a href="mailto:sdpkenya@gmail.com">sdpkenya@gmail.com</a></li>
                        <li><strong>Phone:</strong> 0725382047 / 0724484592</li>
                        <li><strong>ORPP Ref:</strong> SDP/C&amp;N/Vol.1/11/06</li>
                    </ul>
                </div>

                {/* Column 3: Quick Navigation */}
                <div className="footer-col">
                    <h4 className="footer-title">{t('footer_quicklinks_title')}</h4>
                    <ul className="footer-list">
                        <li><Link href="/">{t('nav_home')}</Link></li>
                        <li><Link href="/our-plan">{t('nav_our_plan')}</Link></li>
                        <li><Link href="/documents">{t('nav_documents')}</Link></li>
                        <li><Link href="/leadership">{t('nav_leadership')}</Link></li>
                        <li><Link href="/forms">{t('nav_forms')}</Link></li>
                        <li><Link href="/contact">{t('nav_contact')}</Link></li>
                        <li><Link href="/privacy">{t('nav_privacy')}</Link></li>
                        <li><Link href="/join-us">{t('nav_join_us')}</Link></li>
                        <li><Link href="/membership">{t('nav_membership')}</Link></li>
                        <li><Link href="/volunteer">{t('nav_volunteer')}</Link></li>
                    </ul>
                </div>

                {/* Column 4: Official Handles */}
                <div className="footer-col">
                    <h4 className="footer-title">{t('footer_follow_title')}</h4>
                    <ul className="footer-list social-list">
                        <li><a href="https://facebook.com/SDPKenya" target="_blank" rel="noopener noreferrer"><i className="fab fa-facebook-f"></i> Facebook (SDPKenya)</a></li>
                        <li><a href="https://x.com/SDPKenya" target="_blank" rel="noopener noreferrer"><i className="fab fa-twitter"></i> X / Twitter (SDPKenya)</a></li>
                        <li><a href="https://instagram.com/SDPKenya" target="_blank" rel="noopener noreferrer"><i className="fab fa-instagram"></i> Instagram (SDPKenya)</a></li>
                        <li><a href="https://linkedin.com/company/SDPKenya" target="_blank" rel="noopener noreferrer"><i className="fab fa-linkedin-in"></i> LinkedIn (SDPKenya)</a></li>
                        <li><a href="https://tiktok.com/@SDPKenya" target="_blank" rel="noopener noreferrer"><i className="fab fa-tiktok"></i> TikTok (SDPKenya)</a></li>
                    </ul>
                </div>
            </div>
            <p className="copyright">
                <Link href="/admin" style={{ color: 'inherit', textDecoration: 'none', cursor: 'default' }}>&copy;</Link> {new Date().getFullYear()} Social Democratic Party of Kenya. All Rights Reserved.
            </p>
        </footer>
    );
}
