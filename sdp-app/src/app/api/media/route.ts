import { NextResponse } from 'next/server';
import { supabaseServer } from '@/lib/db';

export async function GET() {
  try {
    const { data: media, error } = await supabaseServer
      .from('media')
      .select('*')
      .order('created_at', { ascending: false });

    if (error && error.code !== '42P01') {
      throw error;
    }

    return NextResponse.json({ media: media || [] });
  } catch (error) {
    console.error('Fetch Media Error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
