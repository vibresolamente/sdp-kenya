import React from 'react';

/**
 * BrandInfo – displays the party's ideology, symbol, slogan, motto, and salute.
 * Uses CSS variables defined in design.css for colours.
 */
export const BrandInfo: React.FC = () => (
  <section className="brand-info" style={{ padding: '2rem', textAlign: 'center' }}>
    <h1 style={{ color: 'var(--color-primary)' }}>SDP Kenya</h1>
    <p><strong>Ideology:</strong> Democratic Socialism</p>
    <p><strong>Symbol:</strong> SDP (incised in a circle)</p>
    <p><strong>Slogan:</strong> Change – Mageuzi</p>
    <p><strong>Motto:</strong> Time Has Come – Wakati Umefika</p>
    <p><strong>Salute:</strong> Open Hand and Palm Raised</p>
    <p><strong>Colours:</strong> <span style={{ color: '#ff69b4' }}>Pink</span>, <span style={{ color: '#ffffff' }}>White</span>, <span style={{ color: '#00bfff' }}>Bold Sky‑Blue</span></p>
  </section>
);
