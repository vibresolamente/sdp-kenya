import Link from 'next/link';
import Image from 'next/image';

export default function Footer() {
    return (
        <footer className="main-footer">
            <div className="container footer-grid">
                <div className="footer-logo">
                    <Image
                        src="/images/sdp-logo.png"
                        alt="SDP Kenya Logo"
                        width={40}
                        height={40}
                        className="footer-logo-image"
                    />
                    <span>SDP KENYA</span>
                </div>
                <div className="footer-links">
                    <p>Email: <a href="mailto:sdpkenya@gmail.com" style={{ color: 'inherit' }}>sdpkenya@gmail.com</a></p>
                    <p>Phone: 0725382047 / 0724484592</p>
                    <p>Website: <a href="https://www.sdpkenya.co.ke" style={{ color: 'inherit' }}>www.sdpkenya.co.ke</a></p>
                    <p>Official Address: P.O. Box 1559-50100 Kakamega</p>
                    <p style={{ marginTop: '10px' }}><Link href="/privacy" style={{ color: 'rgba(255, 255, 255, 0.8)', textDecoration: 'none' }}>Privacy Policy</Link></p>
                </div>
                <div className="social-links" style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', justifyContent: 'center' }}>
                    <a href="https://facebook.com/SDPKenya" target="_blank" rel="noopener noreferrer"><i className="fab fa-facebook-f"></i> Facebook (SDPKenya)</a> |
                    <a href="https://x.com/SDPKenya" target="_blank" rel="noopener noreferrer"><i className="fab fa-twitter"></i> X (SDPKenya)</a> |
                    <a href="https://instagram.com/SDPKenya" target="_blank" rel="noopener noreferrer"><i className="fab fa-instagram"></i> Instagram (SDPKenya)</a> |
                    <a href="https://linkedin.com/company/SDPKenya" target="_blank" rel="noopener noreferrer"><i className="fab fa-linkedin-in"></i> LinkedIn (SDPKenya)</a> |
                    <a href="https://tiktok.com/@SDPKenya" target="_blank" rel="noopener noreferrer"><i className="fab fa-tiktok"></i> TikTok (SDPKenya)</a>
                </div>
            </div>
            <p className="copyright">
                <Link href="/admin" style={{ color: 'inherit', textDecoration: 'none', cursor: 'default' }}>&copy;</Link> {new Date().getFullYear()} Social Democratic Party of Kenya. All Rights Reserved.
            </p>
        </footer>
    );
}
