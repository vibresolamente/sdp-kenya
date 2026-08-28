"use client";

import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';
import { useLanguage } from '@/lib/LanguageContext';
import { Language } from '@/lib/translations';

export default function Header() {
    const pathname = usePathname();
    const [navOpen, setNavOpen] = useState(false);
    const [highContrast, setHighContrast] = useState(false);
    const { lang, setLang, t } = useLanguage();

    useEffect(() => {
        const storedContrast = localStorage.getItem('contrastMode');
        if (storedContrast === 'on') {
            setHighContrast(true);
            document.body.classList.add('high-contrast');
        }
    }, []);

    const toggleHighContrast = () => {
        const nextState = !highContrast;
        setHighContrast(nextState);
        if (nextState) {
            document.body.classList.add('high-contrast');
            localStorage.setItem('contrastMode', 'on');
        } else {
            document.body.classList.remove('high-contrast');
            localStorage.setItem('contrastMode', 'off');
        }
    };

    const handleLanguageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setLang(e.target.value as Language);
    };

    const toggleNav = () => {
        setNavOpen(!navOpen);
    };

    const closeNav = () => {
        setNavOpen(false);
    };

    const isActive = (path: string) => {
        return pathname === path ? 'active-link' : '';
    };

    return (
        <header className="site-header">
            {/* TOP ACCESS UTILITY BAR (Compact minimal width, white background, black text) */}
            <div className="top-utility-bar">
                <div className="container-fluid header-container-compact">
                    <div className="top-bar-left">
                        <span className="party-name font-bold">{t('party_name')}</span>
                        <span className="party-abbr"> (SDP)</span>
                        <span className="postal-badge">{t('postal_address')}</span>
                    </div>
                    <div className="top-bar-right">
                        <span className="phone-item">☎ 0725 382 047 / 0724 484 592</span>
                        <span className="email-item">✉ sdpkenya@gmail.com</span>
                        <a 
                            href="https://orpp.or.ke/" 
                            target="_blank" 
                            rel="noopener noreferrer" 
                            className="orpp-portal-badge"
                        >
                            {t('orpp_portal')}
                        </a>
                        <select className="language-selector" value={lang} onChange={handleLanguageChange}>
                            <option value="en">English</option>
                            <option value="sw">Kiswahili</option>
                        </select>
                        <Link href="/membership" className="member-login-btn" onClick={closeNav}>{t('member_login')}</Link>
                    </div>
                </div>
            </div>

            {/* MAIN BRAND & NAVIGATION HEADER (Compact height, pushed far left) */}
            <div className="main-nav-bar">
                <div className="container-fluid header-container-compact nav-wrapper">
                    {/* Logo and Slogan Group (Pushed Far Left) */}
                    <div className="brand-group-left">
                        <Link href="/" className="header-logo" onClick={closeNav}>
                            <Image
                                src="/images/sdp-logo.png"
                                alt="SDP Kenya Logo"
                                width={44}
                                height={44}
                                className="logo-image"
                                priority
                            />
                            <div className="logo-text-group">
                                <span className="logo-title">SDP KENYA</span>
                                <span className="logo-sub">MAGEUZI</span>
                            </div>
                        </Link>

                        <div className="slogan-box">
                            <h1 className="slogan-heading">{t('slogan_title')}</h1>
                            <h2 className="slogan-subheading">{t('slogan_sub')}</h2>
                        </div>
                    </div>

                    {/* Navigation Menu - 10 Links */}
                    <nav className={`header-nav ${navOpen ? 'nav-open' : ''}`}>
                        <ul>
                            <li><Link href="/" className={isActive('/')} onClick={closeNav}>{t('nav_home')}</Link></li>
                            <li><Link href="/our-plan" className={isActive('/our-plan')} onClick={closeNav}>{t('nav_our_plan')}</Link></li>
                            <li><Link href="/documents" className={isActive('/documents')} onClick={closeNav}>{t('nav_documents')}</Link></li>
                            <li><Link href="/leadership" className={isActive('/leadership')} onClick={closeNav}>{t('nav_leadership')}</Link></li>
                            <li><Link href="/forms" className={isActive('/forms')} onClick={closeNav}>{t('nav_forms')}</Link></li>
                            <li><Link href="/contact" className={isActive('/contact')} onClick={closeNav}>{t('nav_contact')}</Link></li>
                            <li><Link href="/privacy" className={isActive('/privacy')} onClick={closeNav}>{t('nav_privacy')}</Link></li>
                            <li><Link href="/join-us" className={isActive('/join-us')} onClick={closeNav}>{t('nav_join_us')}</Link></li>
                            <li><Link href="/membership" className={isActive('/membership')} onClick={closeNav}>{t('nav_membership')}</Link></li>
                            <li><Link href="/volunteer" className={isActive('/volunteer')} onClick={closeNav}>{t('nav_volunteer')}</Link></li>
                            <li><Link href="/media" className={isActive('/media')} onClick={closeNav}>Media / Gallery</Link></li>
                        </ul>
                    </nav>

                    {/* Controls */}
                    <div className="header-controls">
                        <button 
                            id="contrast-toggle" 
                            className="contrast-toggle-btn" 
                            onClick={toggleHighContrast} 
                            aria-label="Toggle High Contrast Mode"
                        >
                            <i className="fas fa-adjust"></i> 
                        </button>
                        <button 
                            className="mobile-menu-toggle" 
                            onClick={toggleNav}
                            aria-label="Toggle navigation menu"
                        >
                            {navOpen ? '✕' : '☰'}
                        </button>
                    </div>
                </div>
            </div>
        </header>
    );
}
