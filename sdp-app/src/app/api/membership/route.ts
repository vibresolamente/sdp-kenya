import { NextResponse } from 'next/server';
import { addMember } from '@/lib/db';

export async function POST(request: Request) {
  try {
    const data = await request.json();

    const {
      category, name, id_number, dob, sex, ethnicity,
      disability_status, religion, phone, email,
      physical_address, county, constituency, ward,
      password, consent_agreed, message,
    } = data;

    // Validate all required fields
    if (!name)          return NextResponse.json({ error: 'Full name is required.' },           { status: 400 });
    if (!id_number)     return NextResponse.json({ error: 'National ID / Passport is required.' }, { status: 400 });
    if (!phone)         return NextResponse.json({ error: 'Phone number is required.' },         { status: 400 });
    if (!county)        return NextResponse.json({ error: 'County is required.' },               { status: 400 });
    if (!constituency)  return NextResponse.json({ error: 'Constituency is required.' },         { status: 400 });
    if (!ward)          return NextResponse.json({ error: 'Electoral ward is required.' },       { status: 400 });
    if (!password)      return NextResponse.json({ error: 'Password is required.' },             { status: 400 });
    if (password.length < 6) return NextResponse.json({ error: 'Password must be at least 6 characters.' }, { status: 400 });
    if (!consent_agreed) return NextResponse.json({ error: 'You must agree to the statutory declaration.' }, { status: 400 });

    await addMember({
      category:          category || 'Ordinary Membership',
      name,
      id_number,
      dob:               dob   || null,
      sex:               sex   || null,
      ethnicity:         ethnicity         || null,
      disability_status: disability_status || null,
      religion:          religion          || null,
      phone,
      email:             email            || null,
      physical_address:  physical_address || null,
      county,
      constituency,
      ward,
      password,        // stored as plain-text; hash in production with bcrypt
      consent_agreed:  true,
      message:         message || '',
    });

    return NextResponse.json(
      { success: true, message: 'Membership application received successfully.' },
      { status: 201 }
    );
  } catch (error: any) {
    console.error('Membership POST Error:', error);

    // Supabase unique violation (duplicate ID number)
    if (error?.code === '23505') {
      return NextResponse.json(
        { error: 'This National ID / Passport number is already registered. Please log in instead.' },
        { status: 409 }
      );
    }

    return NextResponse.json({ error: 'Internal Server Error. Please try again.' }, { status: 500 });
  }
}
