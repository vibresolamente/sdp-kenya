import { createClient } from '@supabase/supabase-js';

// -----------------------------------------------------------------------------
// Load Supabase configuration from environment variables.
// These values are injected at build/deployment time and must be present.
// -----------------------------------------------------------------------------
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
let supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

// -----------------------------------------------------------------------------
// Validate configuration – provide helpful warnings during development.
// -----------------------------------------------------------------------------
if (!supabaseUrl || !supabaseAnonKey) {
  console.warn(
    '⚠️ Supabase URL or anon key is missing. The app will start with empty strings, but any request to Supabase will fail.'
  );
}

if (!supabaseServiceKey) {
  console.error(
    '⚠️ SUPABASE_SERVICE_ROLE_KEY is not set. Admin‑level writes (volunteers, deletions, media uploads) will be blocked.'
  );
}

// -----------------------------------------------------------------------------
// Public client – read‑only, used in the browser.
// -----------------------------------------------------------------------------
export const supabase = createClient(supabaseUrl ?? '', supabaseAnonKey ?? '');

// -----------------------------------------------------------------------------
// Server‑side client – prefers the service‑role key for full CRUD.
// -----------------------------------------------------------------------------
export const supabaseServer = createClient(
  supabaseUrl ?? '',
  supabaseServiceKey ?? supabaseAnonKey ?? ''
);

/** Add a new member record. */
export async function addMember(member: any) {
  const { data, error } = await supabaseServer.from('members').insert(member).select();
  if (error) {
    console.error('Supabase addMember error:', error);
    throw error;
  }
  return data?.[0];
}

/** Add a new contact inquiry. */
export async function addContact(contact: any) {
  const { data, error } = await supabaseServer.from('contacts').insert(contact).select();
  if (error) {
    console.error('Supabase addContact error:', error);
    throw error;
  }
  return data?.[0];
}

/** Retrieve all members. */
export async function getMembers() {
  const { data, error } = await supabaseServer.from('members').select('*');
  if (error) {
    console.error('Supabase getMembers error:', error);
    throw error;
  }
  return data;
}

/** Retrieve all contacts. */
export async function getContacts() {
  const { data, error } = await supabaseServer.from('contacts').select('*');
  if (error) {
    console.error('Supabase getContacts error:', error);
    throw error;
  }
  return data;
}

/** Retrieve a single member by ID. */
export async function getMemberById(id: number) {
  const { data, error } = await supabaseServer
    .from('members')
    .select('*')
    .eq('id', id)
    .maybeSingle();
  if (error) {
    console.error('Supabase getMemberById error:', error);
    throw error;
  }
  return data;
}
