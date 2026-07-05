import { createClient } from '@supabase/supabase-js';


// Initialize Supabase client using public anon key (client‑side)
if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
  throw new Error('Supabase environment variables are missing. Please set NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY.');
}

export const supabase: any = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

// Initialize Supabase client using service role key (server‑side)
if (!process.env.SUPABASE_SERVICE_ROLE_KEY) {
  throw new Error('Supabase service role key missing. Set SUPABASE_SERVICE_ROLE_KEY in env.');
}

export const supabaseServer: any = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

/**
 * Add a new member record to Supabase.
 */
export async function addMember(member: any) {
  const { data, error } = await supabase.from('members').insert(member).select();
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
  const { data, error } = await supabase.from('contacts').insert(contact).select();
  if (error) {
    console.error('Supabase addContact error:', error);
    throw error;
  }
  return data?.[0];
}

/** Retrieve all members (optional helper). */
export async function getMembers() {
  const { data, error } = await supabase.from('members').select('*');
  if (error) {
    console.error('Supabase getMembers error:', error);
    throw error;
  }
  return data;
}

/** Retrieve all contacts (optional helper). */
export async function getContacts() {
  const { data, error } = await supabase.from('contacts').select('*');
  if (error) {
    console.error('Supabase getContacts error:', error);
    throw error;
  }
  return data;
}
