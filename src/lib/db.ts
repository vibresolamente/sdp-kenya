import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { Database } from '@/types/supabase'; // optional type import if you have generated types

// Initialize Supabase client using environment variables
if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
  throw new Error('Supabase environment variables are missing. Please set NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY.');
}

const supabase: SupabaseClient<Database> = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
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
