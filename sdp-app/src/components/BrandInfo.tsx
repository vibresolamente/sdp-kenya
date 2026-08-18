import React from 'react';

/**
 * BrandInfo – displays the party's official identity, symbol, slogan, motto, salute, and colours.
 */
export const BrandInfo: React.FC = () => (
  <section className="brand-info bg-surface" style={{ padding: '2.5rem 2rem', borderRadius: '16px', textAlign: 'center', margin: '20px auto', maxWidth: '900px' }}>
    <h2 style={{ color: '#ff0090', fontSize: '1.8rem', marginBottom: '16px', fontWeight: 900 }}>SDP Kenya Statutory Identity</h2>
    
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '16px', textAlign: 'left', marginTop: '20px' }}>
      <div style={{ background: 'rgba(0,0,0,0.3)', padding: '16px', borderRadius: '10px', border: '1px solid rgba(255,255,255,0.15)' }}>
        <p style={{ margin: 0, fontSize: '0.75rem', color: '#ffeb3b', fontWeight: 700, textTransform: 'uppercase' }}>1. Ideology</p>
        <p style={{ margin: '4px 0 0', fontWeight: 800, fontSize: '1.1rem', color: '#ffffff' }}>Democratic Socialism</p>
      </div>

      <div style={{ background: 'rgba(0,0,0,0.3)', padding: '16px', borderRadius: '10px', border: '1px solid rgba(255,255,255,0.15)' }}>
        <p style={{ margin: 0, fontSize: '0.75rem', color: '#3bd8f7', fontWeight: 700, textTransform: 'uppercase' }}>2. Symbol</p>
        <p style={{ margin: '4px 0 0', fontWeight: 800, fontSize: '1.1rem', color: '#ffffff' }}>SDP (Inside a Circle)</p>
      </div>

      <div style={{ background: 'rgba(0,0,0,0.3)', padding: '16px', borderRadius: '10px', border: '1px solid rgba(255,255,255,0.15)' }}>
        <p style={{ margin: 0, fontSize: '0.75rem', color: '#ff69b4', fontWeight: 700, textTransform: 'uppercase' }}>3. Slogan</p>
        <p style={{ margin: '4px 0 0', fontWeight: 800, fontSize: '1.1rem', color: '#ff0090' }}>Change – Mageuzi</p>
      </div>

      <div style={{ background: 'rgba(0,0,0,0.3)', padding: '16px', borderRadius: '10px', border: '1px solid rgba(255,255,255,0.15)' }}>
        <p style={{ margin: 0, fontSize: '0.75rem', color: '#3cd070', fontWeight: 700, textTransform: 'uppercase' }}>4. Motto</p>
        <p style={{ margin: '4px 0 0', fontWeight: 800, fontSize: '1.1rem', color: '#3cd070' }}>Time Has Come – Wakati Umefika</p>
      </div>

      <div style={{ background: 'rgba(0,0,0,0.3)', padding: '16px', borderRadius: '10px', border: '1px solid rgba(255,255,255,0.15)' }}>
        <p style={{ margin: 0, fontSize: '0.75rem', color: '#3bd8f7', fontWeight: 700, textTransform: 'uppercase' }}>5. Salute</p>
        <p style={{ margin: '4px 0 0', fontWeight: 800, fontSize: '1.1rem', color: '#ffffff' }}>Open Hand and Palm Raised</p>
      </div>

      <div style={{ background: 'rgba(0,0,0,0.3)', padding: '16px', borderRadius: '10px', border: '1px solid rgba(255,255,255,0.15)' }}>
        <p style={{ margin: 0, fontSize: '0.75rem', color: '#ffeb3b', fontWeight: 700, textTransform: 'uppercase' }}>6. Colours</p>
        <p style={{ margin: '4px 0 0', fontWeight: 800, fontSize: '1.1rem' }}>
          <span style={{ color: '#ff0090' }}>Pink</span>, <span style={{ color: '#ffffff' }}>White</span> &amp; <span style={{ color: '#00bfff' }}>Bold Skyblue</span>
        </p>
      </div>
    </div>
  </section>
);
