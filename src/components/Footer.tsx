import Link from 'next/link';
import Image from 'next/image';

export default function Footer() {
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
                        Social Democratic Party of Kenya.<br />
                        <strong style={{ color: 'var(--color-accent-orange)' }}>Time for Change Has Come.</strong>
                    </p>
                </div>

                {/* Column 2: Official Contact Details */}
                <div className="footer-col">
                    <h4 className="footer-title">Official Contact</h4>
                    <ul className="footer-list">
                        <li><strong>Email:</strong> <a href="mailto:sdpkenya@gmail.com">sdpkenya@gmail.com</a></li>
                        <li><strong>Phone:</strong> 0725382047 / 0724484592</li>
                        <li><strong>Website:</strong> <a href="https://www.sdpkenya.co.ke" target="_blank" rel="noopener noreferrer">www.sdpkenya.co.ke</a></li>
                        <li><strong>Mailing Address:</strong> P.O. Box 1559-50100 Kakamega</li>
                    </ul>
                </div>

                {/* Column 3: Quick Navigation */}
                <div className="footer-col">
                    <h4 className="footer-title">Quick Links</h4>
                    <ul className="footer-list">
                        <li><Link href="/">Home</Link></li>
                        <li><Link href="/manifesto">Our Plan</Link></li>
                        <li><Link href="/documents">Documents</Link></li>
                        <li><Link href="/pictures">Party National Leadership</Link></li>
                        <li><Link href="/join-us">Join SDP</Link></li>
                        <li><Link href="/privacy">Privacy Policy</Link></li>
                    </ul>
                </div>

                {/* Column 4: Official Handles */}
                <div className="footer-col">
                    <h4 className="footer-title">Follow Us</h4>
                    <ul className="footer-list social-list">
                        <li><a href="https://facebook.com/SDPKenya" target="_blank" rel="noopener noreferrer"><i className="fab fa-facebook-f"></i> Facebook (SDPKenya)</a></li>
                        <li><a href="https://x.com/SDPKenya" target="_blank" rel="noopener noreferrer"><i className="fab fa-twitter"></i> X / Twitter (@SDPKenya)</a></li>
                        <li><a href="https://instagram.com/SDPKenya" target="_blank" rel="noopener noreferrer"><i className="fab fa-instagram"></i> Instagram (SDPKenya)</a></li>
                        <li><a href="https://linkedin.com/company/SDPKenya" target="_blank" rel="noopener noreferrer"><i className="fab fa-linkedin-in"></i> LinkedIn (SDPKenya)</a></li>
                        <li><a href="https://tiktok.com/@SDPKenya" target="_blank" rel="noopener noreferrer"><i className="fab fa-tiktok"></i> TikTok (@SDPKenya)</a></li>
                    </ul>
                </div>
            </div>
            <p className="copyright">
                <Link href="/admin" style={{ color: 'inherit', textDecoration: 'none', cursor: 'default' }}>&copy;</Link> {new Date().getFullYear()} Social Democratic Party of Kenya. All Rights Reserved.
            </p>
        </footer>
    );
}
