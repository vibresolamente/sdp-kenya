const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = 'https://qoojebetenzsgiyobvxs.supabase.co';
const supabaseServiceKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFvb2plYmV0ZW56c2dpeW9idnhzIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc4MzIzMjAzNSwiZXhwIjoyMDk4ODA4MDM1fQ.1o6z_ksEe7Bv_zttbfTLwfXuqCyOJW-WgSYXJNnG-3I';

const supabaseServer = createClient(supabaseUrl, supabaseServiceKey);

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

  console.log('Inserting member:', member);
  const { data, error } = await supabaseServer.from('members').insert(member).select();
  if (error) {
    console.error('Supabase Error:', JSON.stringify(error, null, 2));
  } else {
    console.log('Success:', data);
  }
}

testInsert();
