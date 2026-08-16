import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const { password } = await request.json();
    const adminPassword = process.env.ADMIN_PASSWORD || 'SDPAdmin2026!';

    if (password === adminPassword) {
        console.log('Password matched admin credentials');
      const response = NextResponse.json({ success: true, message: 'Authentication successful' });
      // Set a simple session cookie (valid for 2 hours)
      response.cookies.set('sdp_admin_session', 'authenticated_token_2026', {
  httpOnly: true,
  secure: process.env.NODE_ENV === 'production',
  sameSite: 'strict',
  maxAge: 7200, // 2 hours
  path: '/'
});

      return response;
    }

    return NextResponse.json({ error: 'Invalid admin credentials' }, { status: 401 });
  } catch (error) {
    console.error('Admin Login Error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
