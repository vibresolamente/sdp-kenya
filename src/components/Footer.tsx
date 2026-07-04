import Link from 'next/link';

export default function Footer() {
    return (
        <footer className="main-footer">
            <div className="container footer-grid">
                <div className="footer-logo">SDP KENYA</div>
                <div className="footer-links">
                    <p>Official Address: P.O.Box 1131-00606, NAIROBI.</p>
                    <p style={{ marginTop: '10px' }}><Link href="/privacy" style={{ color: 'var(--color-text-muted)', textDecoration: 'none' }}>Privacy Policy</Link></p>
                </div>
                <div className="social-links">
                    <a href="#" target="_blank" rel="noopener noreferrer"><i className="fab fa-twitter"></i> X</a> |
                    <a href="#" target="_blank" rel="noopener noreferrer"><i className="fab fa-facebook-f"></i> Facebook</a>
                </div>
            </div>
            <p className="copyright">
                <Link href="/admin" style={{ color: 'inherit', textDecoration: 'none', cursor: 'default' }}>&copy;</Link> {new Date().getFullYear()} Social Democratic Party of Kenya. All Rights Reserved.
            </p>
        </footer>
    );
}
