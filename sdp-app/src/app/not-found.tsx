import Link from 'next/link';
import { BrandInfo } from '@/components/BrandInfo';

export default function NotFound() {
  return (
    <main className="glass" style={{ padding: '2rem', textAlign: 'center' }}>
      <h1 style={{ color: 'var(--color-primary)', fontSize: '2rem' }}>404 – Page Not Found</h1>
      <BrandInfo />
      <p>Sorry, the page you are looking for does not exist.</p>
      <Link href="/" className="btn" style={{ marginTop: '1rem' }}>
        Go back Home
      </Link>
    </main>
  );
}
