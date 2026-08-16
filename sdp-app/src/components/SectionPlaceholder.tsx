import React from 'react';
import { BrandInfo } from './BrandInfo';

export default function SectionPlaceholder({ title }: { title: string }) {
  return (
    <section className="glass" style={{ margin: '2rem auto', maxWidth: '800px' }}>
      <h1 className="text-2xl font-bold" style={{ color: 'var(--color-primary)' }}>{title}</h1>
      <BrandInfo />
      <p style={{ marginTop: '1rem' }}>
        This is a placeholder for the <strong>{title}</strong> page. Content will be added soon.
      </p>
    </section>
  );
}
