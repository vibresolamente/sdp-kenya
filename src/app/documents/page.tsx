import Link from 'next/link';

export default function Documents() {
  return (
    <section id="documents" className="documents-section content-padding">
        <div className="container bg-surface" style={{ padding: '40px', borderRadius: '8px' }}>
            <h1>Foundational Documents of the Social Democratic Party of Kenya (SDP)</h1>

            <p className="lead">The Social Democratic Party of Kenya (SDP) is committed to absolute transparency and compliance with the **Political Parties Act, 2011**. Our official filings were submitted on **November 27, 2024**.</p>

            <div className="document-link-container">
                <Link href="/constitution" className="document-link cta-button">
                    <i className="fas fa-book"></i> SDP Constitution
                </Link>
                <Link href="/elections-rules" className="document-link cta-button">
                    <i className="fas fa-gavel"></i> Elections & Nominations Rules
                </Link>
            </div>

            <h2 className="mt-5">Official Administrative Record Details</h2>
            <div className="official-record">
                <p><strong>Reference Number:</strong> <span className="animated-accent">SDP/C&N/Vol.1/11/06</span></p>
                <p><strong>Submission Date:</strong> 27th November, 2024</p>
                <p><strong>Correspondent:</strong> Nyumbah Nyanjong&apos; Duncan (Mr.), Founder and Correspondent</p>
                <p><strong>Contact:</strong> Phone: 0724484592, Email: nyumbah@gmail.com</p>
            </div>
        </div>
    </section>
  );
}
