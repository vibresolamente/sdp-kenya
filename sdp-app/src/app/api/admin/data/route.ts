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

    // Fetch volunteers data
    const { data: volunteers, error: volunteersError } = await supabaseServer
      .from('volunteers')
      .select('*');
    if (volunteersError && volunteersError.code !== '42P01') {
      console.warn('Volunteers table fetch error:', volunteersError);
    }

    // Fetch media data
    const { data: media, error: mediaError } = await supabaseServer
      .from('media')
      .select('*')
      .order('created_at', { ascending: false });
    if (mediaError && mediaError.code !== '42P01') {
      console.warn('Media table fetch error:', mediaError);
    }

    return NextResponse.json({ members, contacts, volunteers: volunteers || [], media: media || [] });
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
    const { action, table, data } = payload;

    // Handle clear actions
    if (action) {
      const tableMap: Record<string, string> = {
        clear_members:    'members',
        clear_contacts:   'contacts',
        clear_volunteers: 'volunteers',
      };
      const targetTable = tableMap[action];
      if (!targetTable) {
        return NextResponse.json({ error: 'Unknown action' }, { status: 400 });
      }
      const { error } = await supabaseServer.from(targetTable).delete().neq('id', 0);
      if (error) throw error;
      return NextResponse.json({ success: true }, { status: 200 });
    }

    // Handle direct insert
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
