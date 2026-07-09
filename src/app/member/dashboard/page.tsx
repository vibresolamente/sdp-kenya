import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { getMemberById } from '@/lib/db';
import Link from 'next/link';

export default async function MemberDashboard() {
  const cookieStore = cookies();
  const session = cookieStore.get('sdp_member_session');

  if (!session || !session.value) {
    redirect('/member/login');
  }

  const memberId = parseInt(session.value, 10);
  const memberData = await getMemberById(memberId);

  if (!memberData) {
    redirect('/member/login');
  }

  return (
    <section className="content-padding">
      <div className="container" style={{ maxWidth: '800px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px' }}>
          <h1>Welcome, <span className="animated-accent">{memberData.name}</span></h1>
          <form action="/api/member/logout" method="POST" style={{ display: 'inline' }}>
             <button type="submit" className="read-more-link" style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: '1rem', marginTop: 0 }}>Logout</button>
          </form>
        </div>

        <div className="bg-surface" style={{ padding: '30px', borderRadius: '12px', border: '1px solid var(--glass-border)' }}>
          <h2 style={{ fontSize: '1.4rem', borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: '10px', marginBottom: '20px' }}>
            Your Membership Details (Form PPM1)
          </h2>
          
          <table className="official-contact-table">
            <tbody>
              <tr><td>Full Name</td><td>{memberData.name}</td></tr>
              <tr><td>ID / Passport No.</td><td>{memberData.id_number}</td></tr>
              <tr><td>Date of Birth</td><td>{memberData.dob}</td></tr>
              <tr><td>Gender</td><td>{memberData.sex}</td></tr>
              <tr><td>Ethnicity</td><td>{memberData.ethnicity || 'Not Provided'}</td></tr>
              <tr><td>Religion</td><td>{memberData.religion || 'Not Provided'}</td></tr>
              <tr><td>Disability Status</td><td>{memberData.disability_status}</td></tr>
              <tr><td>Phone Number</td><td>{memberData.phone}</td></tr>
              <tr><td>Email Address</td><td>{memberData.email}</td></tr>
              <tr><td>Physical Address</td><td>{memberData.physical_address}</td></tr>
              <tr><td>County</td><td>{memberData.county}</td></tr>
              <tr><td>Constituency</td><td>{memberData.constituency}</td></tr>
              <tr><td>Ward</td><td>{memberData.ward}</td></tr>
              <tr><td>Registration Date</td><td>{new Date(memberData.created_at).toLocaleString()}</td></tr>
            </tbody>
          </table>

          <div className="official-record mt-5" style={{ background: 'rgba(0, 191, 255, 0.05)' }}>
            <p><strong>Status:</strong> Active</p>
            <p style={{ fontSize: '0.9rem', marginTop: '10px' }}>Your data has been securely recorded and is ready for IPPMS transmission in compliance with the Political Parties (Membership) Regulations, 2021.</p>
          </div>
        </div>
      </div>
    </section>
  );
}
