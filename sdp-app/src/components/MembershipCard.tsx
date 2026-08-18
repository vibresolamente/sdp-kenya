"use client";

import React, { useRef } from 'react';
import Image from 'next/image';

export interface MembershipCardProps {
  name: string;
  idNumber: string;
  memberRef?: string;
  category?: string;
  county?: string;
  constituency?: string;
  ward?: string;
  issueDate?: string;
  onPrint?: () => void;
}

export default function MembershipCard({
  name,
  idNumber,
  memberRef,
  category = 'Ordinary Membership',
  county = 'Kakamega',
  constituency = 'Lurambi',
  ward = 'Shirere',
  issueDate,
  onPrint,
}: MembershipCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);

  const formattedRef = memberRef || 'SDP-KE-' + idNumber.slice(-6).padStart(6, '0');
  const formattedDate = issueDate || new Date().toLocaleDateString('en-GB');

  // Client-side HD Card Image Generator and Downloader
  const handleDownloadImage = () => {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // High Resolution: 1000 x 620 px (standard ID ratio 1.618)
    const w = 1000;
    const h = 620;
    canvas.width = w;
    canvas.height = h;

    const drawCard = () => {
      // 1. Background Gradient (SDP Pink to Dark Plum)
      const bgGrad = ctx.createLinearGradient(0, 0, w, h);
      bgGrad.addColorStop(0, '#800040');
      bgGrad.addColorStop(0.45, '#c40062');
      bgGrad.addColorStop(0.8, '#ff0090');
      bgGrad.addColorStop(1, '#3b001f');
      ctx.fillStyle = bgGrad;
      ctx.fillRect(0, 0, w, h);

      // 2. Decorative Top Party Color Accent Bars (Pink, White, Bold Skyblue)
      ctx.fillStyle = '#ff0090';
      ctx.fillRect(0, 0, w, 8);
      ctx.fillStyle = '#ffffff';
      ctx.fillRect(0, 8, w, 6);
      ctx.fillStyle = '#00bfff';
      ctx.fillRect(0, 14, w, 8);

      // 3. Watermark in Background
      ctx.save();
      ctx.font = '900 240px sans-serif';
      ctx.fillStyle = 'rgba(255, 255, 255, 0.05)';
      ctx.textAlign = 'right';
      ctx.fillText('SDP', w - 40, h - 80);
      ctx.restore();
    };

    // 4. Load & Draw Party Logo Image
    const logo = new window.Image();
    logo.crossOrigin = 'anonymous';
    logo.src = '/images/sdp-logo.png';

    logo.onload = () => {
      drawCard();

      // Circular clip for logo
      ctx.save();
      ctx.beginPath();
      ctx.arc(90, 85, 50, 0, Math.PI * 2);
      ctx.fillStyle = '#ffffff';
      ctx.fill();
      ctx.lineWidth = 4;
      ctx.strokeStyle = '#00bfff';
      ctx.stroke();
      ctx.clip();
      ctx.drawImage(logo, 40, 35, 100, 100);
      ctx.restore();

      // 5. Header Titles
      ctx.font = '900 32px sans-serif';
      ctx.fillStyle = '#ffffff';
      ctx.textAlign = 'left';
      ctx.textBaseline = 'alphabetic';
      ctx.fillText('SDP KENYA', 155, 78);

      ctx.font = '700 16px sans-serif';
      ctx.fillStyle = '#ffeb3b';
      ctx.fillText('SOCIAL DEMOCRATIC PARTY · MAGEUZI', 155, 104);

      // 6. IPPMS Verified Badge (Top Right)
      ctx.save();
      ctx.fillStyle = '#3cd070';
      ctx.beginPath();
      ctx.roundRect(w - 240, 52, 190, 36, 18);
      ctx.fill();
      ctx.font = '800 14px sans-serif';
      ctx.fillStyle = '#000000';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText('✓ IPPMS VERIFIED', w - 145, 70);
      ctx.restore();

      // 7. Divider Line
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.25)';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(50, 148);
      ctx.lineTo(w - 50, 148);
      ctx.stroke();

      // 8. Member Full Name
      ctx.font = '700 14px sans-serif';
      ctx.fillStyle = 'rgba(255, 255, 255, 0.75)';
      ctx.textAlign = 'left';
      ctx.textBaseline = 'alphabetic';
      ctx.fillText('OFFICIAL MEMBER NAME', 55, 185);
      ctx.font = '900 38px sans-serif';
      ctx.fillStyle = '#ffffff';
      ctx.fillText(name.toUpperCase(), 55, 228);

      // 9. Member Particulars Grid (2 Columns)
      ctx.font = '700 13px sans-serif';
      ctx.fillStyle = 'rgba(255, 255, 255, 0.7)';
      ctx.fillText('NATIONAL ID / PASSPORT NO:', 55, 278);
      ctx.font = '800 22px sans-serif';
      ctx.fillStyle = '#ffffff';
      ctx.fillText(idNumber, 55, 308);

      ctx.font = '700 13px sans-serif';
      ctx.fillStyle = 'rgba(255, 255, 255, 0.7)';
      ctx.fillText('COUNTY / WARD:', 55, 358);
      ctx.font = '800 20px sans-serif';
      ctx.fillStyle = '#ffffff';
      ctx.fillText(`${county} · ${ward}`, 55, 388);

      ctx.font = '700 13px sans-serif';
      ctx.fillStyle = 'rgba(255, 255, 255, 0.7)';
      ctx.fillText('MEMBERSHIP CATEGORY:', 55, 438);
      ctx.font = '800 19px sans-serif';
      ctx.fillStyle = '#ffeb3b';
      ctx.fillText(category, 55, 468);

      ctx.font = '700 13px sans-serif';
      ctx.fillStyle = 'rgba(255, 255, 255, 0.7)';
      ctx.fillText('MEMBER REGISTRATION ID:', 530, 278);
      ctx.font = '900 24px sans-serif';
      ctx.fillStyle = '#00bfff';
      ctx.fillText(formattedRef, 530, 308);

      ctx.font = '700 13px sans-serif';
      ctx.fillStyle = 'rgba(255, 255, 255, 0.7)';
      ctx.fillText('CONSTITUENCY:', 530, 358);
      ctx.font = '800 20px sans-serif';
      ctx.fillStyle = '#ffffff';
      ctx.fillText(constituency, 530, 388);

      ctx.font = '700 13px sans-serif';
      ctx.fillStyle = 'rgba(255, 255, 255, 0.7)';
      ctx.fillText('ISSUE / REGISTRATION DATE:', 530, 438);
      ctx.font = '800 19px sans-serif';
      ctx.fillStyle = '#ffffff';
      ctx.fillText(formattedDate, 530, 468);

      // 10. Bottom Footer
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.2)';
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.moveTo(50, 510);
      ctx.lineTo(w - 50, 510);
      ctx.stroke();
      ctx.font = '600 13px sans-serif';
      ctx.fillStyle = 'rgba(255, 255, 255, 0.85)';
      ctx.textAlign = 'left';
      ctx.fillText('Statutory Compliance: Political Parties Act, 2011 · P.O. Box 1559-50100 Kakamega', 55, 545);
      ctx.fillText('Official Head Office · Kakamega, Kenya', 55, 570);
      ctx.font = '900 15px sans-serif';
      ctx.fillStyle = '#00bfff';
      ctx.textAlign = 'right';
      ctx.fillText('SDP-OFFICIAL-CREDENTIAL', w - 55, 558);

      // Bottom Color Strip
      ctx.fillStyle = '#00bfff';
      ctx.fillRect(0, h - 8, w / 3, 8);
      ctx.fillStyle = '#ffffff';
      ctx.fillRect(w / 3, h - 8, w / 3, 8);
      ctx.fillStyle = '#ff0090';
      ctx.fillRect((w / 3) * 2, h - 8, w / 3, 8);

      // Trigger download
      const imageURL = canvas.toDataURL('image/png');
      const downloadLink = document.createElement('a');
      downloadLink.href = imageURL;
      downloadLink.download = `SDP_Membership_Card_${idNumber || 'official'}.png`;
      document.body.appendChild(downloadLink);
      downloadLink.click();
      document.body.removeChild(downloadLink);
    };

    logo.onerror = () => {
      // Fallback: draw without logo if image fails
      drawCard();
      ctx.save();
      ctx.beginPath();
      ctx.arc(90, 85, 50, 0, Math.PI * 2);
      ctx.fillStyle = '#ff0090';
      ctx.fill();
      ctx.strokeStyle = '#00bfff';
      ctx.lineWidth = 4;
      ctx.stroke();
      ctx.font = '900 30px sans-serif';
      ctx.fillStyle = '#ffffff';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText('SDP', 90, 85);
      ctx.restore();
      // continue drawing rest of card text
      const imageURL = canvas.toDataURL('image/png');
      const downloadLink = document.createElement('a');
      downloadLink.href = imageURL;
      downloadLink.download = `SDP_Membership_Card_${idNumber || 'official'}.png`;
      document.body.appendChild(downloadLink);
      downloadLink.click();
      document.body.removeChild(downloadLink);
    };
  };

  const handlePrint = () => {
    if (onPrint) {
      onPrint();
    } else {
      window.print();
    }
  };

  return (
    <div className="membership-card-component" style={{ margin: '0 auto', maxWidth: '520px' }}>
      
      {/* ── CARD VISUAL ────────────────────────────────────────── */}
      <div
        id="printable-membership-card"
        ref={cardRef}
        className="membership-card-visual"
        style={{
          background:   'linear-gradient(135deg, #700038 0%, #c40062 45%, #ff0090 80%, #3b001f 100%)',
          borderRadius: '18px',
          padding:      '26px',
          color:        '#ffffff',
          textAlign:    'left',
          boxShadow:    '0 16px 40px rgba(0,0,0,0.55)',
          border:       '2px solid rgba(255,255,255,0.3)',
          position:     'relative',
          overflow:     'hidden',
          marginBottom: '20px',
        }}
      >
        {/* Top Decorative Tri-Color Strip (Pink, White, Skyblue) */}
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '6px', display: 'flex' }}>
          <div style={{ flex: 1, background: '#ff0090' }} />
          <div style={{ flex: 1, background: '#ffffff' }} />
          <div style={{ flex: 1, background: '#00bfff' }} />
        </div>

        {/* Card Watermark */}
        <div style={{
          position:      'absolute',
          right:         '-15px',
          bottom:        '-25px',
          fontSize:      '7.5rem',
          opacity:       0.07,
          fontWeight:    900,
          pointerEvents: 'none',
          color:         '#ffffff',
          lineHeight:    1,
        }}>
          SDP
        </div>

        {/* Card Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            {/* Official Party Logo in circular frame */}
            <div style={{
              width:          '58px',
              height:         '58px',
              borderRadius:   '50%',
              border:         '3px solid #00bfff',
              background:     '#ffffff',
              display:        'flex',
              alignItems:     'center',
              justifyContent: 'center',
              boxShadow:      '0 0 14px rgba(0, 191, 255, 0.5)',
              flexShrink:     0,
              overflow:       'hidden',
              padding:        '3px',
            }}>
              <Image
                src="/images/sdp-logo.png"
                alt="SDP Kenya Official Party Logo"
                width={52}
                height={52}
                style={{ objectFit: 'contain', borderRadius: '50%' }}
              />
            </div>
            <div>
              <span style={{ fontWeight: 900, fontSize: '1.25rem', letterSpacing: '1.5px', color: '#ffffff', display: 'block', lineHeight: 1.1 }}>
                SDP KENYA
              </span>
              <span style={{ fontSize: '0.68rem', color: '#ffeb3b', fontWeight: 700, letterSpacing: '1px' }}>
                SOCIAL DEMOCRATIC PARTY
              </span>
            </div>
          </div>

          <span style={{
            fontSize:     '0.7rem',
            background:   '#3cd070',
            color:        '#000000',
            padding:      '4px 10px',
            borderRadius: '12px',
            fontWeight:   800,
            letterSpacing:'0.5px',
            boxShadow:    '0 2px 6px rgba(0,0,0,0.2)',
          }}>
            ✓ IPPMS VERIFIED
          </span>
        </div>

        {/* Member Name Section */}
        <div style={{ borderTop: '1px solid rgba(255,255,255,0.2)', borderBottom: '1px solid rgba(255,255,255,0.2)', padding: '12px 0', margin: '12px 0' }}>
          <p style={{ fontSize: '0.7rem', opacity: 0.8, margin: 0, textTransform: 'uppercase', letterSpacing: '1px' }}>
            Official Member Name:
          </p>
          <p style={{ fontSize: '1.25rem', fontWeight: 900, margin: '2px 0 8px', color: '#ffffff', letterSpacing: '0.5px' }}>
            {name}
          </p>
          
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', fontSize: '0.84rem' }}>
            <div>
              <span style={{ opacity: 0.75, display: 'block', fontSize: '0.68rem', textTransform: 'uppercase' }}>National ID / Passport:</span>
              <strong style={{ fontSize: '0.95rem' }}>{idNumber}</strong>
            </div>
            <div>
              <span style={{ opacity: 0.75, display: 'block', fontSize: '0.68rem', textTransform: 'uppercase' }}>Registration Ref:</span>
              <strong style={{ color: '#00bfff', fontSize: '0.92rem' }}>{formattedRef}</strong>
            </div>
            <div>
              <span style={{ opacity: 0.75, display: 'block', fontSize: '0.68rem', textTransform: 'uppercase' }}>County / Ward:</span>
              <span>{county} · {ward}</span>
            </div>
            <div>
              <span style={{ opacity: 0.75, display: 'block', fontSize: '0.68rem', textTransform: 'uppercase' }}>Category:</span>
              <span style={{ color: '#ffeb3b', fontWeight: 700 }}>{category}</span>
            </div>
          </div>
        </div>

        {/* Card Footer & Party Colors */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', fontSize: '0.7rem', opacity: 0.9 }}>
          <div>
            <span>Statutory Compliance: Political Parties Act, 2011</span>
            <div style={{ marginTop: '2px', opacity: 0.8 }}>Head Office: P.O. Box 1559-50100 Kakamega</div>
          </div>
          <div style={{ textAlign: 'right', fontWeight: 800, color: '#00bfff' }}>
            SDP-OFFICIAL
          </div>
        </div>

        {/* Bottom Tri-Color Bar */}
        <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: '4px', display: 'flex' }}>
          <div style={{ flex: 1, background: '#00bfff' }} />
          <div style={{ flex: 1, background: '#ffffff' }} />
          <div style={{ flex: 1, background: '#ff0090' }} />
        </div>
      </div>

      {/* ── CARD ACTION BUTTONS (Download HD Image & Print) ─── */}
      <div className="no-print" style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}>
        <button
          onClick={handleDownloadImage}
          className="cta-button"
          style={{
            padding:     '11px 22px',
            fontSize:    '0.92rem',
            fontWeight:  700,
            background:  'linear-gradient(135deg, #00bfff, #0088cc)',
            boxShadow:   '0 4px 15px rgba(0, 191, 255, 0.4)',
            border:      'none',
            display:     'flex',
            alignItems:  'center',
            gap:         '8px',
          }}
          title="Download exact high-resolution card image with all colors"
        >
          <span>⬇️</span> Download Card (HD Image)
        </button>

        <button
          onClick={handlePrint}
          className="cta-button"
          style={{
            padding:     '11px 22px',
            fontSize:    '0.92rem',
            fontWeight:  700,
            background:  'linear-gradient(135deg, #ff0090, #c40062)',
            boxShadow:   '0 4px 15px rgba(255, 0, 144, 0.4)',
            border:      'none',
            display:     'flex',
            alignItems:  'center',
            gap:         '8px',
          }}
          title="Print official membership card in full color"
        >
          <span>🖨️</span> Print Membership Card
        </button>
      </div>

    </div>
  );
}
