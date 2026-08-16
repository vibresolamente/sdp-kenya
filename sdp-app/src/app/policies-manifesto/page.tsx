// src/app/policies-manifesto/page.tsx
import { supabase } from '@/lib/supabase';
import PolicyCard from '@/components/PolicyCard';

export const dynamic = 'force-dynamic';

export default async function PoliciesManifestoPage() {
  const { data: policies, error } = await supabase
    .from('policies')
    .select('id, title, description, image_url')
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching policies:', error);
    return <p className="text-red-500">Failed to load policies.</p>;
  }

  return (
    <section className="mx-auto max-w-5xl p-4">
      <h1 className="text-4xl font-bold text-center mb-8" style={{ color: 'var(--color-primary-pink)' }}>
        SDP Policies Manifesto
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {policies?.map((policy) => (
          <PolicyCard
            key={policy.id}
            id={policy.id}
            title={policy.title}
            description={policy.description}
            imageUrl={policy.image_url}
          />
        ))}
      </div>
    </section>
  );
}
