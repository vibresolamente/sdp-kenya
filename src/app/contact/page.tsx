"use client";

import { useState } from 'react';

export default function Contact() {
  const [status, setStatus] = useState('');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus('Sending...');
    
    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries());

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        setStatus('Message sent successfully!');
        (e.target as HTMLFormElement).reset();
      } else {
        setStatus('Failed to send message. Please try again.');
      }
    } catch (error) {
      setStatus('An error occurred. Please try again later.');
    }
  };

  return (
    <section id="contact" className="content-padding">
        <div className="container">
            <h1>Connect with the Social Democratic Party of Kenya (SDP)</h1>

            <div className="contact-grid">
                
                <div className="contact-info">
                    <h2>Official Correspondence</h2>
                    <p>For all formal government, media, and legal inquiries, please use the official contact details below, referencing our official filing number.</p>
                    <table className="official-contact-table">
                        <tbody>
                            <tr><td><strong>Reference No:</strong></td><td>SDP/C&N/Vol.1/11/06</td></tr>
                            <tr><td><strong>Correspondent:</strong></td><td>Nyumbah Nyanjong&apos; Duncan (Mr.)</td></tr>
                            <tr><td><strong>Official Email:</strong></td><td><a href="mailto:sdpkenya@gmail.com">sdpkenya@gmail.com</a></td></tr>
                            <tr><td><strong>Official Phone:</strong></td><td>0725382047 / 0724484592</td></tr>
                            <tr><td><strong>Website:</strong></td><td><a href="https://www.sdpkenya.co.ke" target="_blank" rel="noopener noreferrer">www.sdpkenya.co.ke</a></td></tr>
                            <tr><td><strong>Mailing Address:</strong></td><td>P.O.Box 1131-00606, NAIROBI.</td></tr>
                        </tbody>
                    </table>

                    <h3 className="mt-5">Follow Our Progress</h3>
                    <div className="social-links" style={{ fontSize: '1.1rem', display: 'flex', flexDirection: 'column', gap: '10px', marginTop: '12px' }}>
                        <a href="https://x.com/grielishaqj" target="_blank" rel="noopener noreferrer">𝕏 / Twitter (@grielishaqj)</a>
                        <a href="https://www.facebook.com/profile.php?id=61591480964798" target="_blank" rel="noopener noreferrer">📘 Facebook (SDP Kenya)</a>
                    </div>
                </div>

                <div className="contact-form-container">
                    <h2>General Inquiries</h2>
                    <form className="contact-form" onSubmit={handleSubmit}> 
                        <input type="text" name="name" placeholder="Your Full Name" required />
                        <input type="email" name="email" placeholder="Your Email Address" required />
                        <input type="text" name="subject" placeholder="Subject of Inquiry" required />
                        <textarea name="message" placeholder="Your Message for CHANGE..." rows={6} required></textarea>
                        
                        <button type="submit" className="cta-button">Send Inquiry</button>
                        
                        {status && <p className="mt-5 font-bold" style={{ color: 'var(--color-teal)' }}>{status}</p>}
                    </form>
                </div>
            </div>
        </div>
    </section>
  );
}
