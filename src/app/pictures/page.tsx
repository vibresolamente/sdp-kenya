import Image from 'next/image';
import Link from 'next/link';

export default function Pictures() {
  return (
    <section id="pictures" className="content-padding">
      <div className="container bg-surface" style={{ padding: '40px', borderRadius: '8px' }}>
        <h1 style={{ color: '#ffffff' }}>Party National Leadership</h1>
        <p className="lead" style={{ color: 'rgba(255, 255, 255, 0.9)', marginBottom: '30px' }}>National Leadership of the Social Democratic Party of Kenya (SDP).</p>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          <figure className="text-center">
            <a href="/pictures/ken%20mwanymba.png" target="_blank">
              <Image src="/pictures/ken%20mwanymba.png" alt="Mr. Nyumbah Nyanjong' – Party President and Founder" width={300} height={300} className="rounded-lg shadow-lg mx-auto" />
            </a>
            <figcaption className="text-center mt-3 font-bold" style={{ color: '#ffffff', fontSize: '1.1rem' }}>
              <strong>Mr. Nyumbah Nyanjong&apos;</strong><br />
              <span style={{ color: 'var(--color-teal)', fontWeight: 500 }}>Party President and Founder</span>
            </figcaption>
          </figure>
          <figure className="text-center">
            <a href="/pictures/jared%20omwandasi.png" target="_blank">
              <Image src="/pictures/jared%20omwandasi.png" alt="Mr Jared Dishon Omwandasi – Secretary-General and Founder" width={300} height={300} className="rounded-lg shadow-lg mx-auto" />
            </a>
            <figcaption className="text-center mt-3 font-bold" style={{ color: '#ffffff', fontSize: '1.1rem' }}>
              <strong>Mr Jared Dishon Omwandasi</strong><br />
              <span style={{ color: 'var(--color-teal)', fontWeight: 500 }}>Secretary-General and Founder</span>
            </figcaption>
          </figure>
          <figure className="text-center">
            <a href="/pictures/treasue.png" target="_blank">
              <Image src="/pictures/treasue.png" alt="Ms Mary Wacuka Kinyua – National Treasurer and Founder" width={300} height={300} className="rounded-lg shadow-lg mx-auto" />
            </a>
            <figcaption className="text-center mt-3 font-bold" style={{ color: '#ffffff', fontSize: '1.1rem' }}>
              <strong>Ms Mary Wacuka Kinyua</strong><br />
              <span style={{ color: 'var(--color-teal)', fontWeight: 500 }}>National Treasurer and Founder</span>
            </figcaption>
          </figure>
        </div>
      </div>
    </section>
  );
}
