import { NextResponse } from 'next/server';
import { getMembers } from '@/lib/db';

export async function POST(request: Request) {
  try {
    const { id_number, password } = await request.json();

    if (!id_number || !password) {
      return NextResponse.json({ error: 'ID Number and Password are required' }, { status: 400 });
    }

    const members = getMembers();
    const member = members.find((m: any) => m.id_number === id_number && m.password === password);

    if (member) {
      const response = NextResponse.json({ success: true, message: 'Logged in successfully', memberId: member.id });
      
      // Set secure HTTP-only cookie for the member session
      response.cookies.set('sdp_member_session', member.id.toString(), {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        path: '/',
        maxAge: 60 * 60 * 24 // 1 day
      });
      return response;
    } else {
      return NextResponse.json({ error: 'Invalid ID Number or Password' }, { status: 401 });
    }
  } catch (error) {
    console.error('Member Login Error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
