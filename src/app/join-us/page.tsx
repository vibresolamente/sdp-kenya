"use client";

import { useState } from 'react';
import Link from 'next/link';

export default function JoinUs() {
  const [status, setStatus] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus('Submitting...');
    setError('');
    
    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries());

    // Check consent
    if (data.consent_agreed !== 'on') {
        setError('You must agree to the declaration to proceed.');
        setStatus('');
        return;
    }
    
    // Transform checkbox value to boolean
    const payload = { ...data, consent_agreed: true };

    try {
      const response = await fetch('/api/membership', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        setStatus('Application submitted successfully!');
        (e.target as HTMLFormElement).reset();
      } else {
        const resData = await response.json();
        setError(resData.error || 'Failed to submit application. Please try again.');
        setStatus('');
      }
    } catch (error) {
      setError('An error occurred. Please try again later.');
      setStatus('');
    }
  };

  return (
    <section id="join-us" className="content-padding">
        <div className="container">
            <h1>Join the Movement for <span className="animated-accent">CHANGE - MAGEUZI</span></h1>

            <div className="contact-grid">
                
                <div className="contact-info">
                    <h2>Form PPM1 - Membership Registration</h2>
                    <p>The <strong>Social Democratic Party of Kenya (SDP)</strong> is built on integrity, equity, and sustainable progress. By joining us, you are taking a stand for a better, more accountable Kenya.</p>
                    
                    <h3 className="mt-5">Membership Benefits</h3>
                    <ul className="action-points">
                        <li>Participate in grassroots policy development.</li>
                        <li>Vote in internal party nominations and elections.</li>
                        <li>Join a network of dedicated reformists and leaders.</li>
                    </ul>

                    <div className="official-record mt-5">
                        <p><strong>Compliance:</strong> This portal securely collects the required particulars as per Form PPM1 under the Political Parties (Membership) Regulations, 2021.</p>
                        <p className="mt-3"><Link href="/member/login" className="read-more-link" style={{marginTop: '0'}}>Already a member? Login here</Link></p>
                    </div>
                </div>

                <div className="contact-form-container">
                    <h2>Member Details</h2>
                    <form className="contact-form" onSubmit={handleSubmit}> 
                        <h3 style={{fontSize: '1rem', marginBottom: '10px', color: 'var(--color-teal)'}}>Personal Information</h3>
                        <input type="text" name="name" placeholder="Full Legal Name" required />
                        <div className="flex flex-col md:flex-row gap-4">
                            <input type="text" name="id_number" placeholder="National ID / Passport No." required className="w-full md:w-1/2" />
                            <input type="date" name="dob" placeholder="Date of Birth" required className="w-full md:w-1/2" title="Date of Birth" />
                        </div>
                        
                        <div className="flex flex-col md:flex-row gap-4">
                            <select name="sex" required className="w-full md:w-1/2">
                                <option value="">Select Gender</option>
                                <option value="Male">Male</option>
                                <option value="Female">Female</option>
                                <option value="Other">Other</option>
                            </select>
                            <input type="text" name="ethnicity" placeholder="Ethnicity (Optional)" className="w-full md:w-1/2" />
                        </div>

                        <div className="flex flex-col md:flex-row gap-4">
                            <select name="disability_status" required className="w-full md:w-1/2">
                                <option value="">Disability Status</option>
                                <option value="None">None</option>
                                <option value="Physical">Physical</option>
                                <option value="Visual">Visual</option>
                                <option value="Hearing">Hearing</option>
                                <option value="Other">Other</option>
                            </select>
                            <input type="text" name="religion" placeholder="Religion (Optional)" className="w-full md:w-1/2" />
                        </div>

                        <h3 style={{fontSize: '1rem', marginBottom: '10px', color: 'var(--color-teal)'}}>Contact & Location</h3>
                        <div className="flex flex-col md:flex-row gap-4">
                            <input type="tel" name="phone" placeholder="Phone Number" required className="w-full md:w-1/2" />
                            <input type="email" name="email" placeholder="Email Address" required className="w-full md:w-1/2" />
                        </div>
                        <input type="text" name="physical_address" placeholder="Physical/Postal Address" required />
                        
                        <div className="flex flex-col md:flex-row gap-4">
                            <input type="text" name="county" placeholder="County" required className="w-full md:w-1/2" />
                            <input type="text" name="constituency" placeholder="Constituency" required className="w-full md:w-1/2" />
                        </div>
                        <input type="text" name="ward" placeholder="Ward" required />

                        <h3 style={{fontSize: '1rem', marginBottom: '10px', color: 'var(--color-teal)'}}>Account Security</h3>
                        <input type="password" name="password" placeholder="Create a Password for Member Portal" required />

                        <h3 style={{fontSize: '1rem', marginBottom: '10px', color: 'var(--color-teal)'}}>Declaration & Consent</h3>
                        <div style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', marginBottom: '20px' }}>
                            <input type="checkbox" name="consent_agreed" id="consent" style={{ width: 'auto', marginTop: '6px' }} required />
                            <label htmlFor="consent" style={{ fontSize: '0.9rem', color: 'var(--color-text-muted)' }}>
                                I declare that I am a citizen of Kenya, over 18 years old, and <strong>I am not a registered member of any other political party</strong>. I consent to the processing of my data as per the <Link href="/privacy" style={{ color: 'var(--color-magenta)' }}>Privacy Policy</Link>.
                            </label>
                        </div>
                        
                        <button type="submit" className="cta-button" style={{ width: '100%' }}>Register as Member</button>
                        
                        {status && <p className="mt-5 text-center font-bold" style={{ color: 'var(--color-teal)' }}>{status}</p>}
                        {error && <p className="mt-5 text-center font-bold" style={{ color: 'var(--color-magenta)' }}>{error}</p>}
                    </form>
                </div>
            </div>
        </div>
    </section>
  );
}
