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

export async function POST(request: Request) {
  const cookieStore = cookies();
  const session = cookieStore.get('sdp_admin_session');

  if (!session || session.value !== 'authenticated_token_2026') {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const payload = await request.json();
    const { table, data } = payload;
    if (!table || !data) {
      return NextResponse.json({ error: 'Invalid payload' }, { status: 400 });
    }
    const { data: result, error } = await supabaseServer.from(table).insert(data).select();
    if (error) throw error;
    return NextResponse.json({ success: true, inserted: result }, { status: 201 });
  } catch (error) {
    console.error('Admin Data POST Error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
export async function DELETE(request: Request) {
  const cookieStore = cookies();
  const session = cookieStore.get('sdp_admin_session');

  if (!session || session.value !== 'authenticated_token_2026') {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const { table, id } = await request.json();
    if (!table || !id) {
      return NextResponse.json({ error: 'Invalid payload' }, { status: 400 });
    }
    const { data: result, error } = await supabaseServer.from(table).delete().eq('id', id).select();
    if (error) throw error;
    return NextResponse.json({ success: true, deleted: result }, { status: 200 });
  } catch (error) {
    console.error('Admin Data DELETE Error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
