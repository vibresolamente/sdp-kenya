import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { getMembers, getContacts, saveDb, getDb } from '@/lib/db';

export async function GET() {
  const cookieStore = cookies();
  const session = cookieStore.get('sdp_admin_session');

  if (!session || session.value !== 'authenticated_token_2026') {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const members = getMembers();
    const contacts = getContacts();
    return NextResponse.json({ members, contacts });
  } catch (error) {
    console.error('Fetch Admin Data Error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

// Add a DELETE/POST method for resetting database entries securely
export async function POST(request: Request) {
  const cookieStore = cookies();
  const session = cookieStore.get('sdp_admin_session');

  if (!session || session.value !== 'authenticated_token_2026') {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const { action } = await request.json();
    if (action === 'clear_contacts') {
      const db = getDb();
      db.contacts = [];
      saveDb(db);
      return NextResponse.json({ success: true, message: 'Contact inquiries cleared successfully.' });
    } else if (action === 'clear_members') {
      const db = getDb();
      db.members = [];
      saveDb(db);
      return NextResponse.json({ success: true, message: 'Membership applications cleared successfully.' });
    }
    return NextResponse.json({ error: 'Invalid action' }, { status: 400 });
  } catch (error) {
    console.error('Admin Post Action Error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
