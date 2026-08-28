import { NextResponse } from 'next/server';
import { supabaseServer } from '@/lib/db';

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
        // Construct public URL
        const publicUrl = `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/pictures/${fileName}`;
        files.push(publicUrl);
      }
    }

    return NextResponse.json({ success: true, files }, { status: 200 });
  } catch (error) {
    console.error('Upload error:', error);
    return NextResponse.json({ success: false, error: (error as any).message }, { status: 500 });
  }
}
