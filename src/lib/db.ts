import fs from 'fs';
import path from 'path';

const dbPath = path.resolve(process.cwd(), 'sdp_kenya_db.json');

// Initialize database file
if (!fs.existsSync(dbPath)) {
  fs.writeFileSync(dbPath, JSON.stringify({ members: [], contacts: [] }, null, 2));
}

export function getDb() {
  const data = fs.readFileSync(dbPath, 'utf8');
  return JSON.parse(data);
}

export function saveDb(data: any) {
  fs.writeFileSync(dbPath, JSON.stringify(data, null, 2));
}

export function addMember(member: any) {
  const db = getDb();
  member.id = db.members.length + 1;
  member.created_at = new Date().toISOString();
  db.members.push(member);
  saveDb(db);
  return member;
}

export function addContact(contact: any) {
  const db = getDb();
  contact.id = db.contacts.length + 1;
  contact.created_at = new Date().toISOString();
  db.contacts.push(contact);
  saveDb(db);
  return contact;
}

export function getMembers() {
  return getDb().members;
}

export function getContacts() {
  return getDb().contacts;
}
