"use client";
import { useState } from 'react';

export default function AdminPage() {
  const [files, setFiles] = useState<FileList | null>(null);
  const [uploaded, setUploaded] = useState<string[]>([]);
  const [message, setMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!files) return;
    const formData = new FormData();
    Array.from(files).forEach((file) => {
      formData.append('files', file);
    });
    try {
      const res = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });
      const data = await res.json();
      if (res.ok) {
        setUploaded(data.files);
        setMessage('Files uploaded successfully');
      } else {
        setMessage(data.error || 'Upload failed');
      }
    } catch (err) {
      setMessage('Upload failed');
    }
  };

  return (
    <section className="content-padding">
      <div className="container mx-auto">
        <h1 className="text-3xl font-bold mb-6">Admin – Upload Supporting Documents &amp; Party Logo</h1>
        <form onSubmit={handleSubmit} className="mb-6">
          <input
            type="file"
            multiple
            accept=".doc,.docx,.pdf,image/*"
            onChange={(e) => setFiles(e.target.files)}
            className="border p-2 mb-4"
          />
          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Upload
          </button>
        </form>
        {message && <p className="mb-4 text-green-700">{message}</p>}
        {uploaded.length > 0 && (
          <div>
            <h2 className="text-xl font-semibold mb-2">Uploaded Files</h2>
            <ul className="list-disc pl-6">
              {uploaded.map((url) => (
                <li key={url}>
                  <a href={url} target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">
                    {decodeURIComponent(url.split('/').pop() || url)}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </section>
  );
}
