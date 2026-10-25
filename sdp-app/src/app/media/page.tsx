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
  const [uploadStatus, setUploadStatus] = useState<string>('');

  const handleMediaUpload = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);
    setUploadStatus('Uploading...');
    try {
      const res = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });
      if (res.ok) {
        setUploadStatus('✅ Upload successful!');
        // Refresh media list
        const refreshed = await fetch('/api/media');
        if (refreshed.ok) {
          const data = await refreshed.json();
          setMedia(data.media || []);
        }
        form.reset();
      } else {
        const err = await res.text();
        setUploadStatus(`❌ Error: ${err}`);
      }
    } catch {
      setUploadStatus('❌ Upload failed. Please try again.');
    }
  };

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
          {/* Upload Form */}
          <div style={{
            marginBottom: '24px',
            background: 'rgba(0,200,83,0.05)',
            border: '1px solid rgba(0,200,83,0.2)',
            borderRadius: '12px',
            padding: '24px',
          }}>
            <h2 style={{ fontSize: '1.2rem', marginBottom: '16px', color: '#00c853' }}>📤 Upload Media</h2>
            <form onSubmit={handleMediaUpload} className="contact-form" style={{
              background: 'rgba(0,200,83,0.05)',
              border: '1px solid rgba(0,200,83,0.2)',
              borderRadius: '12px',
              padding: '24px',
            }}>
              <div style={{ marginBottom: '20px' }}>
                <label style={{
                  display: 'block',
                  fontWeight: 600,
                  marginBottom: '8px',
                  color: '#ffffff',
                  fontSize: '0.95rem',
                }}>Select Media Files to Upload</label>
                <input
                  type="file"
                  name="files"
                  accept=".png,.jpg,.jpeg,.webp,.svg,.mp4,.webm,.pdf"
                  multiple
                  required
                  style={{
                    width: '100%',
                    padding: '14px',
                    background: '#ffffff',
                    border: '2px solid #cbd5e0',
                    borderRadius: '8px',
                    color: '#000000',
                    fontSize: '0.95rem',
                    cursor: 'pointer',
                  }}
                />
                <p style={{ fontSize: '0.8rem', color: 'rgba(255,255,255,0.5)', marginTop: '6px' }}>
                  You can select multiple files at once. Max 10MB per file.
                </p>
              </div>
              <button type="submit" className="cta-button" style={{ background: 'linear-gradient(135deg, #00c853, #00a040)', boxShadow: 'none' }}>
                📤 Upload Now
              </button>
            </form>
            {uploadStatus && (
              <p style={{
                marginTop: '16px',
                fontWeight: 600,
                fontSize: '1rem',
                color: uploadStatus.startsWith('✅') ? '#00c853' : '#ff1744',
              }}>{uploadStatus}</p>
            )}
          </div>
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
                      background: item.media_type === 'merchandise' ? '#9c27b0' : item.media_type === 'advertisement' ? '#00bfff' : item.media_type === 'newspaper' ? '#ff9800' : '#ff1493',
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
