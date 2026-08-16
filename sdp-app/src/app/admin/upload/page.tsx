"use client";
import { useState } from "react";

export default function AdminUploadPage() {
  const [status, setStatus] = useState<string>("");
  const [files, setFiles] = useState<string[]>([]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);
    setStatus("Uploading...");
    const res = await fetch("/api/upload", {
      method: "POST",
      body: formData,
    });
    if (res.ok) {
      const data = await res.json();
      setFiles(data.files);
      setStatus("Upload successful");
    } else {
      const err = await res.text();
      setStatus(`Error: ${err}`);
    }
  };

  return (
    <section className="content-padding">
      <div className="container mx-auto py-8">
        <h1 className="text-3xl font-bold mb-6">Admin Upload</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block font-medium mb-1">Party Logo</label>
            <input
              type="file"
              name="logo"
              accept=".png,.jpg,.jpeg,.svg"
              className="border rounded p-2 w-full"
              required
            />
          </div>
          <div>
            <label className="block font-medium mb-1">Supporting Documents</label>
            <input
              type="file"
              name="documents"
              accept=".doc,.docx"
              multiple
              className="border rounded p-2 w-full"
            />
          </div>
          <button
            type="submit"
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Upload
          </button>
        </form>
        {status && <p className="mt-4">{status}</p>}
        {files.length > 0 && (
          <div className="mt-6">
            <h2 className="text-2xl font-semibold mb-3">Uploaded Files</h2>
            <ul className="list-disc pl-6">
              {files.map((url) => (
                <li key={url}>
                  <a href={url} target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">
                    {url.split("/").pop()}
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
