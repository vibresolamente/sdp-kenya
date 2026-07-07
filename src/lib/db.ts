import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
let supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (supabaseServiceKey === 'YOUR_SUPABASE_SERVICE_ROLE_KEY') {
  supabaseServiceKey = undefined;
}

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error(
    'Supabase environment variables are missing. Please set NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY.'
  );
}

// Client-side (anon key) Supabase client
export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Server-side Supabase client — uses service role key if available, falls back to anon
if (!supabaseServiceKey) {
  console.warn(
    'SUPABASE_SERVICE_ROLE_KEY is missing or invalid; admin routes will use the public anon client (limited permissions).'
  );
}

export const supabaseServer = createClient(
  supabaseUrl,
  supabaseServiceKey ?? supabaseAnonKey
);

/**
 * Add a new member record to Supabase.
 */
export async function addMember(member: any) {
  const { data, error } = await supabaseServer.from('members').insert(member).select();
  if (error) {
    console.error('Supabase addMember error:', error);
    throw error;
  }
  return data?.[0];
}

/**
 * Add a new contact inquiry to Supabase.
 */
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
  const { data, error } = await supabase.from('members').select('*');
  if (error) {
    console.error('Supabase getMembers error:', error);
    throw error;
  }
  return data;
}

/** Retrieve all contacts. */
export async function getContacts() {
  const { data, error } = await supabase.from('contacts').select('*');
  if (error) {
    console.error('Supabase getContacts error:', error);
    throw error;
  }
  return data;
}
