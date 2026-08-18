// src/components/TopBar.tsx
import Link from 'next/link';
import Image from 'next/image';

export default function TopBar() {
  return (
    <div className="top-bar glass" style={{ padding: '0.5rem 1rem' }}>
      <div className="flex items-center gap-4">
        <Image src="/logo.png" alt="SDP Logo" width={40} height={40} />
        <span className="font-bold" style={{ color: 'var(--color-text-light)' }}>SDP KENYA</span>
      </div>
      <div className="flex items-center gap-4">
        <a href="tel:+254700000000" style={{ color: 'var(--color-text-light)' }}>☎ +254 700 000 000</a>
        <a href="mailto:info@sdpkenya.co.ke" style={{ color: 'var(--color-text-light)' }}>✉ info@sdpkenya.co.ke</a>
        <div className="language-selector">
          <Link href="?lang=en"><span style={{ color: 'var(--color-text-light)' }}>English</span></Link> |
          <Link href="?lang=sw"><span style={{ color: 'var(--color-text-light)' }}>Kiswahili</span></Link>
        </div>
        <Link href="/member/login" className="join-btn" style={{ background: 'var(--color-primary-light-pink)', color: 'var(--color-primary-pink)', padding: '0.3rem 0.6rem', borderRadius: '4px' }}>
          Member Login
        </Link>
      </div>
    </div>
  );
}
