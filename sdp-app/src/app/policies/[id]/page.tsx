// src/app/policies/[id]/page.tsx
import { supabase } from '@/lib/supabase';
import Image from 'next/image';

export const dynamic = 'force-dynamic'; // server‑side render each request

export default async function PolicyDetail({ params }: { params: { id: string } }) {
  const { data: policy, error } = await supabase
    .from('policies')
    .select('*')
    .eq('id', params.id)
    .single();

  if (error || !policy) {
    return (
      <section className="content-padding" style={{ margin: '2rem auto', maxWidth: '800px' }}>
        <h1 className="text-2xl font-bold" style={{ color: 'var(--color-primary-pink)' }}>Policy not found</h1>
        <p style={{ color: 'var(--color-text-muted)' }}>The requested policy could not be retrieved.</p>
      </section>
    );
  }

  const imageUrl = policy.image_url || '/placeholder-policy.jpg';

  return (
    <section className="content-padding" style={{ margin: '2rem auto', maxWidth: '800px' }}>
      <h1 className="text-3xl font-bold mb-4" style={{ color: 'var(--color-primary-pink)' }}>{policy.title}</h1>
      <Image
        src={imageUrl}
        alt={policy.title}
        width={800}
        height={400}
        className="object-cover rounded mb-6"
      />
      <p className="text-lg" style={{ color: 'var(--color-text-muted)' }}>{policy.description}</p>
    </section>
  );
}
