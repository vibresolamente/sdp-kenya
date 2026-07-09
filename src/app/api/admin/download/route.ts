import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { supabaseServer } from '@/lib/db';

export async function GET(request: Request) {
  const cookieStore = cookies();
  const session = cookieStore.get('sdp_admin_session');

  if (!session || session.value !== 'authenticated_token_2026') {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const { searchParams } = new URL(request.url);
    const format = searchParams.get('format') ?? 'csv'; // 'csv' or 'json'

    const { data: members, error } = await supabaseServer
      .from('members')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) throw error;

    if (format === 'json') {
      return new NextResponse(JSON.stringify(members, null, 2), {
        status: 200,
        headers: {
          'Content-Type': 'application/json',
          'Content-Disposition': 'attachment; filename="sdp_members.json"',
        },
      });
    }

    // Build CSV
    if (!members || members.length === 0) {
      return new NextResponse('No members found', { status: 204 });
    }

    const headers = Object.keys(members[0]);
    const csvRows = [
      headers.join(','),
      ...members.map((row) =>
        headers
          .map((h) => {
            const val = row[h] ?? '';
            const str = String(val).replace(/"/g, '""');
            return /[,"\n\r]/.test(str) ? `"${str}"` : str;
          })
          .join(',')
      ),
    ];
    const csv = csvRows.join('\r\n');

    return new NextResponse(csv, {
      status: 200,
      headers: {
        'Content-Type': 'text/csv; charset=utf-8',
        'Content-Disposition': 'attachment; filename="sdp_members.csv"',
      },
    });
  } catch (error) {
    console.error('Admin Download Error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
