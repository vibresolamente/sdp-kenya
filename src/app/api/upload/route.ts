import { NextResponse } from 'next/server';
import { promises as fs } from 'fs';
import path from 'path';

export async function POST(request: Request) {
  try {
    const form = await request.formData();
    const files: string[] = [];
    const uploadDir = path.join(process.cwd(), 'public', 'uploads');
    await fs.mkdir(uploadDir, { recursive: true });

    // Handle logo (single file)
    const logo = form.get('logo') as File | null;
    if (logo) {
      const logoPath = path.join(uploadDir, logo.name);
      const buffer = Buffer.from(await logo.arrayBuffer());
      await fs.writeFile(logoPath, buffer);
      files.push(`/uploads/${encodeURIComponent(logo.name)}`);
    }

    // Handle supporting documents (multiple files)
    const docs = form.getAll('documents') as File[];
    for (const doc of docs) {
      if (doc && doc.size > 0) {
        const docPath = path.join(uploadDir, doc.name);
        const buffer = Buffer.from(await doc.arrayBuffer());
        await fs.writeFile(docPath, buffer);
        files.push(`/uploads/${encodeURIComponent(doc.name)}`);
      }
    }

    return NextResponse.json({ success: true, files }, { status: 200 });
  } catch (error) {
    console.error('Upload error:', error);
    return NextResponse.json({ success: false, error: (error as any).message }, { status: 500 });
  }
}
