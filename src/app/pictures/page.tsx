import Image from 'next/image';
import Link from 'next/link';

export default function Pictures() {
  return (
    <section id="pictures" className="content-padding">
      <div className="container" style={{ padding: '40px', borderRadius: '8px' }}>
        <h1>Party Leadership Pictures</h1>
        <p className="lead">Click an image to view it full‑size.</p>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          <figure>
            <Link href="/pictures/jared%20omwandasi.png" target="_blank" legacyBehavior>
              <a>
                <Image src="/pictures/jared%20omwandasi.png" alt="Mr. Jared Dishon Omwandasi – Founder and Secretary‑General" width={300} height={300} className="rounded-lg shadow-lg" />
              </a>
            </Link>
            <figcaption className="text-center mt-2">Mr. Jared Dishon Omwandasi – Founder and Secretary‑General</figcaption>
          </figure>
          <figure>
            <Link href="/pictures/ken%20mwanymba.png" target="_blank" legacyBehavior>
              <a>
                <Image src="/pictures/ken%20mwanymba.png" alt="Mr. Nyumbah Nyanjong – Founder and Party President" width={300} height={300} className="rounded-lg shadow-lg" />
              </a>
            </Link>
            <figcaption className="text-center mt-2">Mr. Nyumbah Nyanjong – Founder and Party President</figcaption>
          </figure>
          <figure>
            <Link href="/pictures/treasue.png" target="_blank" legacyBehavior>
              <a>
                <Image src="/pictures/treasue.png" alt="Mrs. Mary Wacuka Kinyua – Founder and National Treasurer" width={300} height={300} className="rounded-lg shadow-lg" />
              </a>
            </Link>
            <figcaption className="text-center mt-2">Mrs. Mary Wacuka Kinyua – Founder and National Treasurer</figcaption>
          </figure>
        </div>
      </div>
    </section>
  );
}
