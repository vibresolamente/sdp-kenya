import Link from 'next/link';

export default function Forms() {
  return (
    <section id="forms" className="content-padding">
      <div className="container" style={{ padding: '40px', borderRadius: '8px' }}>
        <h1>Available Forms</h1>
        <p className="lead">Download the party&apos;s recruitment and membership forms.</p>
        <ul className="list-disc pl-6 space-y-2">
          <li>
            <Link href="/forms/membership_form.docx" target="_blank" className="cta-button" download>
              Membership Recruitment Form (DOCX)
            </Link>
          </li>
        </ul>
      </div>
    </section>
  );
}
