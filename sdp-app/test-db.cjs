const { createClient } = require('@supabase/supabase-js');
const url = 'https://qoojebetenzsgiyobvxs.supabase.co';
const key = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFvb2plYmV0ZW56c2dpeW9idnhzIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc4MzIzMjAzNSwiZXhwIjoyMDk4ODA4MDM1fQ.1o6z_ksEe7Bv_zttbfTLwfXuqCyOJW-WgSYXJNnG-3I';

const supabase = createClient(url, key);

async function test() {
  const { data, error } = await supabase.from('members').select('*').limit(1);
  if (error) {
    console.error('Error:', error);
  } else {
    console.log('Success:', data);
  }
}
test();
