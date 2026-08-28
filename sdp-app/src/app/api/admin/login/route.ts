import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const { password } = await request.json();
    const adminPassword = process.env.ADMIN_PASSWORD || "SDPAdmin2026!";

    // Debug: log the value of ADMIN_PASSWORD (will appear in Vercel logs)
    console.log('DEBUG: ADMIN_PASSWORD =', adminPassword);
    if (!adminPassword) {
      // If the env var is missing, return a server error to make the problem obvious
      return NextResponse.json({ error: 'Server misconfiguration: ADMIN_PASSWORD not set' }, { status: 500 });
    }

    if (password === adminPassword) {


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
