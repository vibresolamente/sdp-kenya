import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { supabaseServer } from '@/lib/db';

export async function GET() {
  const cookieStore = cookies();
  const session = cookieStore.get('sdp_admin_session');

  if (!session || session.value !== 'authenticated_token_2026') {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    // Fetch members data
    const { data: members, error: membersError } = await supabaseServer
      .from('members')
      .select('*');
    if (membersError) throw membersError;

    // Fetch contacts data
    const { data: contacts, error: contactsError } = await supabaseServer
      .from('contacts')
      .select('*');
    if (contactsError) throw contactsError;

    return NextResponse.json({ members, contacts });
  } catch (error) {
    console.error('Fetch Admin Data Error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

// POST not implemented in Supabase version
export async function POST() {
  return NextResponse.json({ error: 'Not Implemented' }, { status: 501 });
}
