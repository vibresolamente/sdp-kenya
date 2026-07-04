export const metadata = {
  title: 'Privacy Policy - SDP Kenya',
  description: 'Privacy Policy and Data Protection Statement for the Social Democratic Party of Kenya (SDP).',
};

export default function PrivacyPolicy() {
  return (
    <>
      <section className="hero-section" style={{ minHeight: '40vh', backgroundImage: "url('/images/hero.png')" }}>
        <div className="hero-overlay"></div>
        <div className="hero-content">
          <h1>Privacy <span className="highlight-magenta animated-accent">Policy</span></h1>
          <p>Data Protection Statement in compliance with the Data Protection Act.</p>
        </div>
      </section>

      <section className="content-padding">
        <div className="container bg-surface" style={{ padding: '50px', borderRadius: '12px' }}>
          <h2>Introduction</h2>
          <p className="mb-4">
            The <strong>Social Democratic Party of Kenya (SDP)</strong> is committed to protecting the privacy and security of your personal information. This Privacy Policy outlines how we collect, use, and protect the data you provide when applying for membership via the Form PPM1 online portal, in accordance with the Data Protection Act of Kenya and the Political Parties Act.
          </p>

          <h2 className="mt-5">Information We Collect</h2>
          <p className="mb-4">
            To register you as a member, we collect personal information as mandated by the Office of the Registrar of Political Parties (ORPP) in Form PPM1. This includes:
          </p>
          <ul className="action-points mb-4">
            <li>Full Name and Identification/Passport Number</li>
            <li>Date of Birth and Gender</li>
            <li>Contact Details (Phone Number, Email, Postal/Physical Address)</li>
            <li>Voter Registration Details (County, Constituency, Ward)</li>
            <li>Demographic Data (Ethnicity, Religion, Disability Status)</li>
          </ul>

          <h2 className="mt-5">How We Use Your Information</h2>
          <p className="mb-4">
            Your personal data is strictly used for the following purposes:
          </p>
          <ul className="action-points mb-4">
            <li>Processing your membership application to the SDP.</li>
            <li>Transmitting required membership data to the Registrar of Political Parties via the Integrated Political Parties Information Management System (IPPMS) for verification and inclusion in the national register.</li>
            <li>Communicating with you regarding party activities, elections, and updates.</li>
            <li>Maintaining an accurate and up-to-date party membership register as required by law.</li>
          </ul>

          <h2 className="mt-5">Data Sharing and Disclosure</h2>
          <p className="mb-4">
            We do not sell, rent, or trade your personal information. Your data is only shared with:
          </p>
          <ul className="action-points mb-4">
            <li><strong>The Office of the Registrar of Political Parties (ORPP):</strong> As legally required for membership verification.</li>
            <li><strong>Authorized Party Officials:</strong> Who require access to manage the membership register securely.</li>
          </ul>

          <h2 className="mt-5">Your Consent</h2>
          <p className="mb-4">
            By submitting the membership registration form, you expressly consent to the collection, processing, and sharing of your data as outlined in this statement. You also declare that you are not a registered member of any other political party in Kenya.
          </p>

          <h2 className="mt-5">Your Rights</h2>
          <p className="mb-4">
            Under the Data Protection Act, you have the right to access, correct, or request the deletion of your personal data. You also have the right to withdraw your consent (which may affect your membership status). To exercise these rights, please contact our secretariat.
          </p>
        </div>
      </section>
    </>
  );
}
