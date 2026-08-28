"use client";

import { useEffect, useState } from 'react';
import Image from 'next/image';

interface MediaItem {
  id: number;
  title: string;
  image_url: string;
  description: string;
  media_type: string;
  created_at: string;
}

export default function MediaGalleryPage() {
  const [media, setMedia] = useState<MediaItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMedia = async () => {
      try {
        const res = await fetch('/api/media');
        if (res.ok) {
          const data = await res.json();
          setMedia(data.media || []);
        }
      } catch (err) {
        console.error('Failed to load media', err);
      } finally {
        setLoading(false);
      }
    };
    fetchMedia();
  }, []);

  return (
    <>
      <section className="hero-section" style={{ minHeight: '35vh', backgroundImage: "url('/images/hero.png')" }}>
        <div className="hero-overlay"></div>
        <div className="hero-content">
          <h1>Party <span className="highlight-magenta animated-accent">Media & Gallery</span></h1>
          <p>Official pictures, merchandise, and advertisements of the SDP.</p>
        </div>
      </section>

      <section className="content-padding">
        <div className="container">
          {loading ? (
            <div className="text-center" style={{ padding: '60px', color: 'var(--color-text-muted)' }}>Loading gallery...</div>
          ) : media.length === 0 ? (
            <div className="text-center bg-surface" style={{ padding: '60px', borderRadius: '12px' }}>
              <p style={{ color: 'var(--color-text-muted)', fontSize: '1.2rem' }}>No media items have been uploaded yet.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
              {media.map((item) => (
                <div key={item.id} className="bg-surface" style={{ 
                  borderRadius: '16px', 
                  overflow: 'hidden', 
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  boxShadow: '0 8px 24px rgba(0, 0, 0, 0.2)'
                }}>
                  <div style={{ position: 'relative', width: '100%', height: '250px', backgroundColor: '#000' }}>
                    <Image 
                      src={item.image_url} 
                      alt={item.title} 
                      fill 
                      style={{ objectFit: 'cover' }} 
                      unoptimized={item.image_url.startsWith('http')}
                    />
                    <div style={{
                      position: 'absolute',
                      top: '12px',
                      right: '12px',
                      background: item.media_type === 'merchandise' ? '#9c27b0' : item.media_type === 'advertisement' ? '#00bfff' : '#ff1493',
                      color: '#ffffff',
                      padding: '4px 12px',
                      borderRadius: '20px',
                      fontSize: '0.75rem',
                      fontWeight: 'bold',
                      textTransform: 'uppercase'
                    }}>
                      {item.media_type}
                    </div>
                  </div>
                  <div style={{ padding: '20px' }}>
                    <h3 style={{ color: '#ffffff', fontSize: '1.25rem', marginBottom: '8px' }}>{item.title}</h3>
                    {item.description && (
                      <p style={{ color: 'rgba(255, 255, 255, 0.8)', fontSize: '0.95rem', lineHeight: '1.5' }}>
                        {item.description}
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
}
