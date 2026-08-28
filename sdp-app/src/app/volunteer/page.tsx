"use client";

import { useState } from 'react';
import Link from 'next/link';

export default function VolunteerPage() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg('');

    const form = e.currentTarget;
    const formData = new FormData(form);

    const payload = {
      name:         formData.get('name') as string,
      email:        formData.get('email') as string,
      phone:        formData.get('phone') as string,
      county:       formData.get('county') as string,
      constituency: formData.get('constituency') as string,
      role:         formData.get('role') as string,
      skills:       formData.get('skills') as string,
    };

    try {
      const res = await fetch('/api/volunteer', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        setSubmitted(true);
        form.reset();
      } else {
        const data = await res.json();
        setErrorMsg(data.error || 'Submission failed. Please try again.');
      }
    } catch {
      setErrorMsg('Network error. Please check your connection and try again.');
    } finally {
      setLoading(false);
    }
  };


  return (
    <>
      <section className="hero-section" style={{ minHeight: '35vh', backgroundImage: "url('/images/hero.png')" }}>
        <div className="hero-overlay"></div>
        <div className="hero-content">
          <h1>Volunteer <span className="highlight-magenta animated-accent">With SDP</span></h1>
          <p>Be part of the movement for CHANGE – MAGEUZI in your community.</p>
        </div>
      </section>

      <section className="content-padding">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Info Column */}
            <div className="bg-surface" style={{ padding: '32px', borderRadius: '16px' }}>
              <h2 style={{ color: '#ffeb3b', fontSize: '1.6rem', marginBottom: '14px' }}>Why Volunteer?</h2>
              <p style={{ fontSize: '1.05rem', color: '#ffffff', lineHeight: '1.6', marginBottom: '20px' }}>
                Every great movement is built on the passion and dedication of volunteers. As a volunteer with the Social Democratic Party of Kenya (SDP), you will drive grassroots mobilization, host civic awareness forums, and help shape our national policies.
              </p>

              <h3 style={{ color: '#3bd8f7', marginTop: '20px', marginBottom: '10px' }}>Volunteer Roles</h3>
              <ul className="action-points" style={{ lineHeight: '1.8' }}>
                <li><strong>Grassroots Mobilizer:</strong> Organize constituency and ward meetings.</li>
                <li><strong>Digital Campaigner:</strong> Drive SDP campaigns across Facebook, X, Instagram, TikTok.</li>
                <li><strong>Polling Agent:</strong> Ensure electoral integrity and transparency.</li>
                <li><strong>Civic Educator:</strong> Share SDP manifesto and policy pillars with citizens.</li>
              </ul>
            </div>

            {/* Form Column */}
            <div className="bg-surface" style={{ padding: '32px', borderRadius: '16px' }}>
              {submitted ? (
                <div className="text-center" style={{ padding: '30px', background: 'rgba(0,0,0,0.4)', borderRadius: '12px', border: '1px solid #3cd070' }}>
                  <h3 style={{ color: '#3cd070', fontSize: '1.5rem', marginBottom: '10px' }}>🎉 Volunteer Application Received!</h3>
                  <p style={{ color: '#ffffff', marginBottom: '20px' }}>
                    Thank you for volunteering with SDP Kenya. Our National Secretariat and County Coordinators will get in touch with you shortly.
                  </p>
                  <button onClick={() => setSubmitted(false)} className="cta-button" style={{ fontSize: '0.9rem' }}>
                    Submit Another Volunteer Form
                  </button>
                </div>
              ) : (
                <>
                  <h2 style={{ color: '#ffffff', marginBottom: '16px' }}>Volunteer Registration</h2>
                  <form onSubmit={handleSubmit} className="contact-form">
                    <input type="text" name="name" placeholder="Full Name" required />
                    <input type="email" name="email" placeholder="Email Address" required />
                    <input type="tel" name="phone" placeholder="Phone Number" required />
                    
                    <div className="flex flex-col md:flex-row gap-4">
                      <input type="text" name="county" placeholder="County" required className="w-full md:w-1/2" />
                      <input type="text" name="constituency" placeholder="Constituency" required className="w-full md:w-1/2" />
                    </div>

                    <select name="role" required style={{ color: '#000', margin: '12px 0' }}>
                      <option value="">Select Primary Volunteer Role</option>
                      <option value="Grassroots Mobilization">Grassroots Mobilization</option>
                      <option value="Digital Media & Content">Digital Media &amp; Content</option>
                      <option value="Polling Agent / Election Monitoring">Polling Agent / Election Monitoring</option>
                      <option value="Policy & Civic Education">Policy &amp; Civic Education</option>
                      <option value="Event Organization">Event Organization</option>
                    </select>

                    <textarea name="skills" placeholder="Tell us briefly about your skills and availability..." rows={4}></textarea>

                    {errorMsg && (
                      <div style={{ background: 'rgba(255,235,59,0.15)', border: '1px solid rgba(255,235,59,0.4)', borderRadius: '8px', padding: '10px', marginBottom: '12px' }}>
                        <p style={{ color: '#ffeb3b', fontSize: '0.9rem', margin: 0, fontWeight: 600 }}>⚠️ {errorMsg}</p>
                      </div>
                    )}

                    <button
                      type="submit"
                      className="cta-button"
                      style={{ width: '100%', marginTop: '14px', opacity: loading ? 0.7 : 1, cursor: loading ? 'not-allowed' : 'pointer' }}
                      disabled={loading}
                    >
                      {loading ? '⏳ Submitting...' : '✅ Submit Volunteer Registration'}
                    </button>
                  </form>
                </>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
