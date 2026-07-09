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
                    <p>Official Address: P.O.Box 1131-00606, NAIROBI.</p>
                    <p style={{ marginTop: '10px' }}><Link href="/privacy" style={{ color: 'var(--color-text-muted)', textDecoration: 'none' }}>Privacy Policy</Link></p>
                </div>
                <div className="social-links">
                    <a href="https://x.com/grielishaqj" target="_blank" rel="noopener noreferrer"><i className="fab fa-twitter"></i> X</a> |
                    <a href="https://www.facebook.com/profile.php?id=61591480964798" target="_blank" rel="noopener noreferrer"><i className="fab fa-facebook-f"></i> Facebook</a>
                </div>
            </div>
            <p className="copyright">
                <Link href="/admin" style={{ color: 'inherit', textDecoration: 'none', cursor: 'default' }}>&copy;</Link> {new Date().getFullYear()} Social Democratic Party of Kenya. All Rights Reserved.
            </p>
        </footer>
    );
}
