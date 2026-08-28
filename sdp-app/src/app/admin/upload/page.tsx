"use client";
import { useState } from "react";

export default function AdminUploadPage() {
  const [status, setStatus] = useState<string>("");
  const [uploadedFiles, setUploadedFiles] = useState<string[]>([]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);
    setStatus("Uploading...");
    try {
      const res = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });
      if (res.ok) {
        const data = await res.json();
        setUploadedFiles(data.files || []);
        setStatus("✅ Upload successful!");
        form.reset();
      } else {
        const err = await res.text();
        setStatus(`❌ Error: ${err}`);
      }
    } catch {
      setStatus("❌ Upload failed. Please try again.");
    }
  };

  return (
    <div>
      <h2 style={{ fontSize: "1.2rem", marginBottom: "20px", color: "#00c853" }}>
        📤 Upload Pictures to Website
      </h2>
      <p style={{ color: "rgba(255,255,255,0.75)", marginBottom: "24px", fontSize: "0.95rem" }}>
        Upload images directly from your local computer. Supported formats: PNG, JPG, JPEG, WebP, SVG.
      </p>

      <form
        onSubmit={handleSubmit}
        className="contact-form"
        style={{
          background: "rgba(0,200,83,0.05)",
          border: "1px solid rgba(0,200,83,0.2)",
          borderRadius: "12px",
          padding: "24px",
          marginBottom: "24px",
        }}
      >
        <div style={{ marginBottom: "20px" }}>
          <label
            style={{
              display: "block",
              fontWeight: 600,
              marginBottom: "8px",
              color: "#ffffff",
              fontSize: "0.95rem",
            }}
          >
            Select Image(s) to Upload
          </label>
          <input
            type="file"
            name="files"
            accept=".png,.jpg,.jpeg,.webp,.svg"
            multiple
            required
            style={{
              width: "100%",
              padding: "14px",
              background: "#ffffff",
              border: "2px solid #cbd5e0",
              borderRadius: "8px",
              color: "#000000",
              fontSize: "0.95rem",
              cursor: "pointer",
            }}
          />
          <p style={{ fontSize: "0.8rem", color: "rgba(255,255,255,0.5)", marginTop: "6px" }}>
            You can select multiple files at once. Max 10MB per file.
          </p>
        </div>

        <button
          type="submit"
          className="cta-button"
          style={{ background: "linear-gradient(135deg, #00c853, #00a040)", boxShadow: "none" }}
        >
          📤 Upload Now
        </button>
      </form>

      {status && (
        <p
          style={{
            fontWeight: 600,
            fontSize: "1rem",
            color: status.startsWith("✅") ? "#00c853" : "#ff1744",
            marginBottom: "16px",
          }}
        >
          {status}
        </p>
      )}

      {uploadedFiles.length > 0 && (
        <div
          style={{
            background: "rgba(0,0,0,0.3)",
            borderRadius: "12px",
            padding: "20px",
            border: "1px solid rgba(255,255,255,0.1)",
          }}
        >
          <h3 style={{ fontSize: "1rem", marginBottom: "14px", color: "#ffffff" }}>
            Uploaded Files ({uploadedFiles.length})
          </h3>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(160px, 1fr))",
              gap: "12px",
            }}
          >
            {uploadedFiles.map((url) => (
              <div
                key={url}
                style={{
                  borderRadius: "8px",
                  overflow: "hidden",
                  border: "1px solid rgba(255,255,255,0.15)",
                  background: "rgba(0,0,0,0.4)",
                }}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={url}
                  alt={url.split("/").pop()}
                  style={{ width: "100%", height: "120px", objectFit: "cover", display: "block" }}
                />
                <div style={{ padding: "8px", fontSize: "0.75rem", color: "rgba(255,255,255,0.6)" }}>
                  {url.split("/").pop()}
                </div>
                <div style={{ padding: "0 8px 8px" }}>
                  <a
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ fontSize: "0.8rem", color: "#00c853" }}
                  >
                    View / Copy URL
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
