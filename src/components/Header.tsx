"use client";

import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';

export default function Header() {
    const pathname = usePathname();
    const [navOpen, setNavOpen] = useState(false);
    const [highContrast, setHighContrast] = useState(false);

    // Initial check for high contrast mode
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
        <header className="main-header">
            <Link href="/" className="logo" onClick={closeNav}>
                <Image
                    src="/images/sdp-logo.png"
                    alt="SDP Kenya Logo"
                    width={45}
                    height={45}
                    className="logo-image"
                    priority
                />
                <span className="logo-text">SDP KENYA</span>
            </Link>
            <nav className={`desktop-nav ${navOpen ? 'nav-open' : ''}`}>
                <ul>
                    <li><Link href="/" className={isActive('/')} onClick={closeNav}>Home</Link></li>
                    <li><Link href="/ideology" className={isActive('/ideology')} onClick={closeNav}>Ideology</Link></li>
                    <li><Link href="/manifesto" className={isActive('/manifesto')} onClick={closeNav}>Our Plan</Link></li>
                    <li><Link href="/documents" className={isActive('/documents')} onClick={closeNav}>Documents</Link></li>
                    <li><Link href="/pictures" className={isActive('/pictures')} onClick={closeNav}>Pictures</Link></li>
                    <li><Link href="/forms" className={isActive('/forms')} onClick={closeNav}>Forms</Link></li>
                    <li><Link href="/contact" className={isActive('/contact')} onClick={closeNav}>Contact</Link></li>
                    <li><Link href="/privacy" className={isActive('/privacy')} onClick={closeNav}>Privacy Policy</Link></li>
                    <li><Link href="/join-us" className={`cta-nav-button ${isActive('/join-us')}`} onClick={closeNav}>Join Us</Link></li>
                </ul>
            </nav>
            <div className="header-controls">
                <button 
                    id="contrast-toggle" 
                    className="contrast-toggle-btn" 
                    onClick={toggleHighContrast} 
                    aria-label="Toggle High Contrast Mode"
                    style={{
                        cursor: 'pointer',
                        fontSize: '20px',
                        padding: '8px',
                        background: 'none',
                        border: 'none',
                        color: 'var(--color-text-light)',
                        borderRadius: '8px',
                        transition: 'background var(--transition-speed)',
                        display: 'block'
                    }}
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
        </header>
    );
}

