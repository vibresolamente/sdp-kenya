import { NextResponse } from 'next/server';
import { addMember } from '@/lib/db';

export async function POST(request: Request) {
  try {
    const data = await request.json();
    const {
      name, id_number, dob, sex, ethnicity, disability_status, religion,
      phone, email, physical_address, county, constituency, ward,
      password, consent_agreed, message
    } = data;

    if (!name || !id_number || !phone || !county || !constituency || !ward || !password || !consent_agreed) {
      return NextResponse.json({ error: 'Missing required fields or consent not agreed.' }, { status: 400 });
    }

    addMember({
      name, id_number, dob, sex, ethnicity, disability_status, religion,
      phone, email, physical_address, county, constituency, ward,
      password, consent_agreed, message: message || ''
    });

    return NextResponse.json({ success: true, message: 'Membership application received.' }, { status: 201 });
  } catch (error) {
    console.error('Membership POST Error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
