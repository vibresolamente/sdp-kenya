import { NextResponse } from 'next/server';
import { supabaseServer } from '@/lib/db';

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const { name, email, phone, county, constituency, role, skills } = body;

    if (!name || !phone) {
      return NextResponse.json(
        { error: 'Name and phone number are required.' },
        { status: 400 }
      );
    }

    const volunteerData = {
      name:         name.trim(),
      email:        email?.trim() || null,
      phone:        phone.trim(),
      county:       county?.trim() || null,
      skills:       [role, skills].filter(Boolean).join(' | ') || null,
      availability: constituency?.trim() || null,
    };

    const { data, error } = await supabaseServer
      .from('volunteers')
      .insert(volunteerData)
      .select()
      .single();

    if (error) {
      console.error('Volunteer insert error:', error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ success: true, volunteer: data }, { status: 201 });
  } catch (err) {
    console.error('Volunteer route error:', err);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
