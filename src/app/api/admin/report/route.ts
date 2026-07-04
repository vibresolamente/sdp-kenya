import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { getMembers } from '@/lib/db';

export async function GET() {
  const cookieStore = cookies();
  const session = cookieStore.get('sdp_admin_session');

  if (!session || session.value !== 'authenticated_token_2026') {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const members = getMembers();
  
  if (members.length === 0) {
    return new NextResponse('No members found', { status: 404 });
  }

  // Create CSV header
  const header = [
    'ID Number', 'Full Name', 'Date of Birth', 'Gender', 'Ethnicity', 
    'Disability Status', 'Religion', 'Phone Number', 'Email', 
    'Physical Address', 'County', 'Constituency', 'Ward', 'Registered At'
  ].join(',');

  // Create CSV rows
  const rows = members.map((m: any) => {
    return [
      `"${m.id_number || ''}"`,
      `"${m.name || ''}"`,
      `"${m.dob || ''}"`,
      `"${m.sex || ''}"`,
      `"${m.ethnicity || ''}"`,
      `"${m.disability_status || ''}"`,
      `"${m.religion || ''}"`,
      `"${m.phone || ''}"`,
      `"${m.email || ''}"`,
      `"${m.physical_address || ''}"`,
      `"${m.county || ''}"`,
      `"${m.constituency || ''}"`,
      `"${m.ward || ''}"`,
      `"${m.created_at || ''}"`
    ].join(',');
  });

  const csv = [header, ...rows].join('\n');

  return new NextResponse(csv, {
    headers: {
      'Content-Type': 'text/csv',
      'Content-Disposition': 'attachment; filename="SDP_Members_Register.csv"',
    },
  });
}
