import { NextResponse } from 'next/server';
import { supabaseServer } from '@/lib/db';
import { Buffer } from 'node:buffer';

export async function POST(request: Request) {
  try {
    const form = await request.formData();
    const files: string[] = [];

    // Iterate over all file entries in the form data and save them
    for (const [key, value] of form.entries()) {
      // Only process File objects (skip other fields)
      if (value instanceof File && value.size > 0) {
        // Upload file to Supabase Storage bucket "pictures"
        const fileBuffer = Buffer.from(await value.arrayBuffer());
        const fileExt = value.name.split('.').pop();
        const fileName = `${Date.now()}_${Math.random().toString(36).substring(2)}.${fileExt}`;
        const { data: uploadData, error: uploadError } = await supabaseServer.storage
          .from('pictures')
          .upload(fileName, fileBuffer, {
            contentType: value.type,
          });
        if (uploadError) throw uploadError;
        // Construct public URL using the returned storage path
        if (!uploadData?.path) throw new Error('Upload succeeded but no path returned');
        const publicUrl = `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/pictures/${uploadData.path}`;
        files.push(publicUrl);
        // Determine media type from MIME
        const mediaType = value.type.startsWith('video/') ? 'video' : value.type === 'application/pdf' ? 'newspaper' : 'image';
        // Media type determined; insertion will be handled by admin form
        // No database operation performed here
      }
    }

    return NextResponse.json({ url: files[0] }, { status: 200 });
  } catch (error) {
    console.error('Upload error:', error);
    return NextResponse.json({ success: false, error: (error as any).message }, { status: 500 });
  }
}
