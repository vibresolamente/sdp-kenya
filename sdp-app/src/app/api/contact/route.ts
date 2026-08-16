import { NextResponse } from 'next/server';
import { addContact } from '@/lib/db';
import { sendContactEmail } from '@/lib/email';

export async function POST(request: Request) {
  try {
    const data = await request.json();
    const { name, email, subject, message } = data;

    if (!name || !email || !subject || !message) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    await addContact({ name, email, subject, message });
    // Send email notification
    await sendContactEmail(name, email, subject, message);

    return NextResponse.json({ success: true, message: 'Contact inquiry received.' }, { status: 201 });
  } catch (error) {
    console.error('Contact POST Error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
