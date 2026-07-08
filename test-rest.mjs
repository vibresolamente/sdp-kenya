const supabaseUrl = 'https://qoojebetenzsgiyobvxs.supabase.co';
const supabaseServiceKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFvb2plYmV0ZW56c2dpeW9idnhzIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc4MzIzMjAzNSwiZXhwIjoyMDk4ODA4MDM1fQ.1o6z_ksEe7Bv_zttbfTLwfXuqCyOJW-WgSYXJNnG-3I';

async function testInsert() {
  const member = {
    name: 'Test',
    id_number: '123',
    dob: '1990',
    sex: 'M',
    ethnicity: 'X',
    disability_status: 'None',
    religion: 'none',
    phone: '123',
    email: 'x@x.com',
    physical_address: 'x',
    county: 'x',
    constituency: 'x',
    ward: 'x',
    password: 'x',
    consent_agreed: true,
    message: 'x'
  };

  const response = await fetch(`${supabaseUrl}/rest/v1/members`, {
    method: 'POST',
    headers: {
      'apikey': supabaseServiceKey,
      'Authorization': `Bearer ${supabaseServiceKey}`,
      'Content-Type': 'application/json',
      'Prefer': 'return=representation'
    },
    body: JSON.stringify(member)
  });

  const text = await response.text();
  console.log('Status:', response.status);
  console.log('Response:', text);
}

testInsert();
