import { NextResponse } from 'next/server';
import { promises as fs } from 'fs';
import path from 'path';

export async function POST(request: Request) {
  try {
    const form = await request.formData();
    const files: string[] = [];
    const uploadDir = path.join(process.cwd(), 'public', 'uploads');
    await fs.mkdir(uploadDir, { recursive: true });

    // Iterate over all file entries in the form data and save them
    for (const [key, value] of form.entries()) {
      // Only process File objects (skip other fields)
      if (value instanceof File && value.size > 0) {
        const filePath = path.join(uploadDir, value.name);
        const buffer = Buffer.from(await value.arrayBuffer());
        await fs.writeFile(filePath, buffer);
        files.push(`/uploads/${encodeURIComponent(value.name)}`);
      }
    }

    return NextResponse.json({ success: true, files }, { status: 200 });
  } catch (error) {
    console.error('Upload error:', error);
    return NextResponse.json({ success: false, error: (error as any).message }, { status: 500 });
  }
}
