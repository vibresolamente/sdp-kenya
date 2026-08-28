"use client";

import { useState, useEffect } from 'react';
import Image from 'next/image';
import AdminUploadPage from './upload/page';

interface Member {
  id: number;
  name: string;
  id_number: string;
  dob: string;
  sex: string;
  ethnicity: string;
  disability_status: string;
  religion: string;
  phone: string;
  email: string;
  physical_address: string;
  county: string;
  constituency: string;
  ward: string;
  consent_agreed: boolean;
  message: string;
  created_at: string;
}

interface Volunteer {
  id: number;
  name: string;
  email: string;
  phone: string;
  skills: string;
  availability: string;
  county: string;
  created_at: string;
}

interface MediaItem {
  id: number;
  title: string;
  image_url: string;
  description: string;
  media_type: string;
  created_at: string;
}

interface Contact {
  id: number;
  name: string;
  email: string;
  subject: string;
  message: string;
  created_at: string;
}

export default function AdminDashboard() {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [members, setMembers] = useState<Member[]>([]);
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [volunteers, setVolunteers] = useState<Volunteer[]>([]);
  const [media, setMedia] = useState<MediaItem[]>([]);
  const [activeTab, setActiveTab] = useState<'members' | 'contacts' | 'volunteers' | 'media' | 'add_member' | 'upload'>('members');

  // Search & Filter State
  const [searchTerm, setSearchTerm] = useState('');
  const [countyFilter, setCountyFilter] = useState('');

  // Add Member State
  const [addStatus, setAddStatus] = useState('');
  const [addError, setAddError] = useState('');

  const handleAddMember = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setAddStatus('Submitting...');
    setAddError('');

    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries());
    const payload = { ...data, consent_agreed: true };

    try {
      const response = await fetch('/api/membership', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        setAddStatus('Member registered successfully!');
        (e.target as HTMLFormElement).reset();
        fetchData();
      } else {
        const resData = await response.json();
        setAddError(resData.error || 'Failed to register member.');
        setAddStatus('');
      }
    } catch {
      setAddError('An error occurred.');
      setAddStatus('');
    }
  };

  // Fetch data
  const fetchData = async () => {
    try {
      const response = await fetch('/api/admin/data', { credentials: 'include' });
      if (response.ok) {
        const data = await response.json();
        setMembers(data.members || []);
        setContacts(data.contacts || []);
        setVolunteers(data.volunteers || []);
        setMedia(data.media || []);
        setIsAuthenticated(true);
      } else {
        setIsAuthenticated(false);
      }
    } catch {
      setIsAuthenticated(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password }),
        credentials: 'include',
      });

      if (response.ok) {
        window.location.reload();
        return;
      } else {
        const errData = await response.json();
        setError(errData.error || 'Invalid credentials');
      }
    } catch {
      setError('An error occurred during authentication.');
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    try {
      await fetch('/api/admin/logout', { method: 'POST', credentials: 'include' });
      setIsAuthenticated(false);
      setMembers([]);
      setContacts([]);
      setVolunteers([]);
      setMedia([]);
    } catch (err) {
      console.error('Logout error:', err);
    }
  };

  const handleDeleteSingle = async (
    table: 'members' | 'contacts' | 'volunteers' | 'media',
    id: number,
    name: string
  ) => {
    const label =
      table === 'members'
        ? 'recruit'
        : table === 'contacts'
        ? 'inquiry'
        : table === 'volunteers'
        ? 'volunteer'
        : 'media item';

    const confirmation = window.confirm(
      `Are you sure you want to delete this ${label} "${name}"? This action cannot be undone.`
    );
    if (!confirmation) return;

    try {
      const response = await fetch('/api/admin/data', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ table, id }),
        credentials: 'include',
      });

      if (response.ok) {
        fetchData();
      } else {
        alert('Failed to delete record.');
      }
    } catch {
      alert('An error occurred during deletion.');
    }
  };

  const handleClearData = async (action: 'clear_members' | 'clear_contacts' | 'clear_volunteers') => {
    const confirmation = window.confirm(
      `WARNING: Are you absolutely sure you want to delete all stored ${action.replace('clear_', '')}? This action CANNOT be undone.`
    );
    if (!confirmation) return;

    try {
      const response = await fetch('/api/admin/data', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action }),
        credentials: 'include',
      });

      if (response.ok) {
        alert('Data cleared successfully.');
        fetchData();
      } else {
        alert('Failed to clear data.');
      }
    } catch {
      alert('An error occurred.');
    }
  };

  // CSV Exporter
  const exportToCSV = (type: 'members' | 'contacts' | 'volunteers') => {
    if (type === 'members') {
      window.location.href = '/api/admin/report';
      return;
    }

    const headers = ['ID', 'Name', 'Email', 'Subject', 'Message', 'Date'];
    const rows = contacts.map((c) => [
      c.id,
      c.name,
      c.email,
      c.subject,
      c.message.replace(/"/g, '""'),
      new Date(c.created_at).toLocaleString(),
    ]);
    const filename = `sdp_kenya_contacts_${new Date().toISOString().slice(0, 10)}.csv`;

    const csvContent = [
      headers.join(','),
      ...rows.map((row) => row.map((val) => `"${val}"`).join(',')),
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', filename);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Filtering Logic
  const filteredMembers = members.filter((m) => {
    const matchesSearch =
      m.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      m.id_number.includes(searchTerm) ||
      m.phone.includes(searchTerm) ||
      m.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCounty = countyFilter
      ? m.county.toLowerCase() === countyFilter.toLowerCase()
      : true;
    return matchesSearch && matchesCounty;
  });

  const filteredContacts = contacts.filter(
    (c) =>
      c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.message.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredVolunteers = volunteers.filter(
    (v) =>
      v.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      v.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      v.skills.toLowerCase().includes(searchTerm.toLowerCase()) ||
      v.county.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const counties = Array.from(new Set(members.map((m) => m.county).filter(Boolean)));
  const totalMembers = members.length;
  const totalContacts = contacts.length;
  const totalVolunteers = volunteers.length;
  const countiesRepresented = counties.length;

  // ── Loading state ──
  if (isAuthenticated === null) {
    return (
      <div className="container content-padding text-center">
        <p className="lead">Loading security checks...</p>
      </div>
    );
  }

  // ── Login screen ──
  if (!isAuthenticated) {
    return (
      <section
        className="content-padding flex items-center justify-center"
        style={{ minHeight: '70vh' }}
      >
        <div className="container" style={{ maxWidth: '480px' }}>
          <div
            className="manifesto-details bg-surface text-center"
            style={{ padding: '40px 32px', borderRadius: '16px' }}
          >
            <h1 style={{ fontSize: '1.8rem', marginBottom: '10px' }}>
              Admin <span className="highlight-magenta animated-accent">Portal</span>
            </h1>
            <p style={{ marginBottom: '25px', color: 'rgba(255,255,255,0.9)' }}>
              Enter the administrator security PIN or Password to access the party register.
            </p>

            <form onSubmit={handleLogin} className="contact-form">
              <div style={{ position: 'relative', width: '100%', marginBottom: '16px' }}>
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  autoComplete="current-password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter Admin Password"
                  required
                  style={{
                    width: '100%',
                    padding: '14px 48px 14px 16px',
                    fontSize: '1.05rem',
                    color: '#000000',
                    backgroundColor: '#ffffff',
                    border: '2px solid #cbd5e0',
                    borderRadius: '10px',
                    outline: 'none',
                    fontWeight: 600,
                    letterSpacing: showPassword ? 'normal' : '2px',
                    textAlign: 'left',
                    boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                  }}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  style={{
                    position: 'absolute',
                    right: '12px',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer',
                    fontSize: '1.2rem',
                    color: '#4a5568',
                    padding: '4px 8px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                  title={showPassword ? 'Hide password' : 'Show password'}
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                >
                  {showPassword ? '👁️' : '🔒'}
                </button>
              </div>

              {error && (
                <div
                  style={{
                    background: 'rgba(255,235,59,0.15)',
                    border: '1px solid rgba(255,235,59,0.4)',
                    borderRadius: '8px',
                    padding: '10px',
                    marginBottom: '15px',
                  }}
                >
                  <p style={{ color: '#ffeb3b', fontSize: '0.9rem', margin: 0, fontWeight: 600 }}>
                    ⚠️ {error}
                  </p>
                </div>
              )}

              <button
                type="submit"
                className="cta-button"
                style={{ width: '100%', padding: '14px', fontSize: '1rem' }}
                disabled={loading}
              >
                {loading ? '⏳ Authenticating...' : '🔐 Access Admin Dashboard'}
              </button>
            </form>
          </div>
        </div>
      </section>
    );
  }

  // ── Authenticated Dashboard ──
  return (
    <section className="content-padding">
      <div className="container">

        {/* Header Controls */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: '20px',
          }}
        >
          <div>
            <h1>
              Admin <span className="animated-accent">Dashboard</span>
            </h1>
            <p>Official Security System | Registered Party Records</p>
          </div>
          <button
            onClick={handleLogout}
            className="cta-button"
            style={{ background: 'linear-gradient(135deg, #444, #222)', boxShadow: 'none' }}
          >
            🚪 Secure Logout
          </button>
        </div>

        {/* Stats Blocks */}
        <div className="pillars-grid" style={{ marginTop: '40px' }}>
          <div className="pillar-card text-center">
            <span className="stat-number">{totalMembers}</span>
            <span className="stat-label">Total Recruits</span>
          </div>
          <div className="pillar-card text-center">
            <span className="stat-number">{totalContacts}</span>
            <span className="stat-label">Active Inquiries</span>
          </div>
          <div className="pillar-card text-center">
            <span className="stat-number">{totalVolunteers}</span>
            <span className="stat-label">Volunteers</span>
          </div>
          <div className="pillar-card text-center">
            <span className="stat-number">{countiesRepresented}</span>
            <span className="stat-label">Counties Reached</span>
          </div>
        </div>

        {/* Search and Filters */}
        <div
          className="bg-surface"
          style={{
            padding: '24px',
            borderRadius: '12px',
            marginTop: '30px',
            border: '1px solid var(--glass-border)',
          }}
        >
          <div style={{ display: 'flex', gap: '15px', flexWrap: 'wrap' }}>
            <div style={{ flex: '1', minWidth: '250px' }}>
              <label
                style={{
                  fontSize: '0.85rem',
                  color: '#ffffff',
                  fontWeight: 600,
                  display: 'block',
                  marginBottom: '6px',
                }}
              >
                Search Records
              </label>
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search by name, ID number, phone, email..."
                style={{
                  width: '100%',
                  padding: '12px 16px',
                  borderRadius: '8px',
                  background: '#ffffff',
                  border: '1.5px solid #cbd5e0',
                  color: '#000000',
                  fontSize: '0.95rem',
                  fontWeight: 500,
                  outline: 'none',
                }}
              />
            </div>

            {activeTab === 'members' && counties.length > 0 && (
              <div style={{ width: '220px' }}>
                <label
                  style={{
                    fontSize: '0.85rem',
                    color: '#ffffff',
                    fontWeight: 600,
                    display: 'block',
                    marginBottom: '6px',
                  }}
                >
                  Filter by County
                </label>
                <select
                  value={countyFilter}
                  onChange={(e) => setCountyFilter(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '12px 14px',
                    borderRadius: '8px',
                    background: '#ffffff',
                    border: '1.5px solid #cbd5e0',
                    color: '#000000',
                    fontSize: '0.95rem',
                    fontWeight: 500,
                    height: '46px',
                    cursor: 'pointer',
                    outline: 'none',
                  }}
                >
                  <option value="">All Counties</option>
                  {counties.map((c) => (
                    <option key={c} value={c}>
                      {c}
                    </option>
                  ))}
                </select>
              </div>
            )}
          </div>
        </div>

        {/* Tab Controls */}
        <div
          style={{
            display: 'flex',
            gap: '10px',
            marginTop: '30px',
            borderBottom: '1px solid rgba(255,255,255,0.1)',
            paddingBottom: '10px',
            flexWrap: 'wrap',
          }}
        >
          <button
            onClick={() => { setActiveTab('members'); setSearchTerm(''); }}
            style={{
              padding: '10px 20px',
              borderRadius: '8px',
              fontWeight: 600,
              background: activeTab === 'members' ? 'rgba(255, 105, 180, 0.15)' : 'transparent',
              color: activeTab === 'members' ? 'var(--color-magenta)' : 'var(--color-text-muted)',
              border: 'none',
              cursor: 'pointer',
            }}
          >
            Recruits ({filteredMembers.length})
          </button>

          <button
            onClick={() => { setActiveTab('contacts'); setSearchTerm(''); }}
            style={{
              padding: '10px 20px',
              borderRadius: '8px',
              fontWeight: 600,
              background: activeTab === 'contacts' ? 'rgba(0, 191, 255, 0.15)' : 'transparent',
              color: activeTab === 'contacts' ? 'var(--color-teal)' : 'var(--color-text-muted)',
              border: 'none',
              cursor: 'pointer',
            }}
          >
            Inquiries ({filteredContacts.length})
          </button>

          <button
            onClick={() => { setActiveTab('volunteers'); setSearchTerm(''); }}
            style={{
              padding: '10px 20px',
              borderRadius: '8px',
              fontWeight: 600,
              background: activeTab === 'volunteers' ? 'rgba(255, 165, 0, 0.15)' : 'transparent',
              color: activeTab === 'volunteers' ? '#ffa500' : 'var(--color-text-muted)',
              border: 'none',
              cursor: 'pointer',
            }}
          >
            Volunteers ({filteredVolunteers.length})
          </button>

          <button
            onClick={() => { setActiveTab('media'); setSearchTerm(''); }}
            style={{
              padding: '10px 20px',
              borderRadius: '8px',
              fontWeight: 600,
              background: activeTab === 'media' ? 'rgba(156, 39, 176, 0.15)' : 'transparent',
              color: activeTab === 'media' ? '#9c27b0' : 'var(--color-text-muted)',
              border: 'none',
              cursor: 'pointer',
            }}
          >
            Media
          </button>

          <button
            onClick={() => { setActiveTab('upload'); setSearchTerm(''); }}
            style={{
              padding: '10px 20px',
              borderRadius: '8px',
              fontWeight: 600,
              background: activeTab === 'upload' ? 'rgba(0, 200, 83, 0.15)' : 'transparent',
              color: activeTab === 'upload' ? '#00c853' : 'var(--color-text-muted)',
              border: 'none',
              cursor: 'pointer',
            }}
          >
            📤 Upload Pictures
          </button>

          <button
            onClick={() => { setActiveTab('add_member'); setSearchTerm(''); }}
            style={{
              padding: '10px 20px',
              borderRadius: '8px',
              fontWeight: 600,
              background: activeTab === 'add_member' ? 'rgba(255, 20, 147, 0.15)' : 'transparent',
              color: activeTab === 'add_member' ? '#ff1493' : 'var(--color-text-muted)',
              border: 'none',
              cursor: 'pointer',
            }}
          >
            + Add Member
          </button>
        </div>

        {/* Tab Content */}
        <div style={{ marginTop: '30px' }}>

          {/* ── MEMBERS TAB ── */}
          {activeTab === 'members' && (
            <div>
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  marginBottom: '16px',
                  flexWrap: 'wrap',
                  gap: '10px',
                }}
              >
                <h2 style={{ fontSize: '1.2rem' }}>
                  Party Membership Roster — {filteredMembers.length} record(s)
                </h2>
                <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                  <button
                    onClick={() => exportToCSV('members')}
                    className="cta-button"
                    style={{ fontSize: '0.85rem', padding: '8px 16px', boxShadow: 'none' }}
                  >
                    📥 Export CSV
                  </button>
                  <button
                    onClick={() => handleClearData('clear_members')}
                    style={{
                      background: '#d9534f',
                      color: '#fff',
                      border: 'none',
                      padding: '8px 16px',
                      borderRadius: '8px',
                      cursor: 'pointer',
                      fontSize: '0.85rem',
                      fontWeight: 600,
                    }}
                  >
                    🗑️ Clear All
                  </button>
                </div>
              </div>
              <div style={{ overflowX: 'auto' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                  <thead>
                    <tr style={{ borderBottom: '2px solid var(--color-magenta)', textAlign: 'left' }}>
                      <th style={{ padding: '12px' }}>Name</th>
                      <th style={{ padding: '12px' }}>ID & Contact</th>
                      <th style={{ padding: '12px' }}>Demographics</th>
                      <th style={{ padding: '12px' }}>Location</th>
                      <th style={{ padding: '12px' }}>Date</th>
                      <th style={{ padding: '12px' }}>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredMembers.map((member) => (
                      <tr key={member.id} style={{ borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
                        <td style={{ padding: '12px', fontWeight: 600, color: 'var(--color-text-light)' }}>
                          {member.name}
                        </td>
                        <td style={{ padding: '12px', fontSize: '0.9rem' }}>
                          <div>ID: {member.id_number}</div>
                          <div>
                            <a href={`tel:${member.phone}`} style={{ color: 'var(--color-teal)' }}>
                              {member.phone}
                            </a>
                          </div>
                          <div>
                            <a href={`mailto:${member.email}`}>{member.email}</a>
                          </div>
                        </td>
                        <td style={{ padding: '12px', fontSize: '0.9rem' }}>
                          <div>{member.sex} | {member.dob}</div>
                          <div style={{ color: 'var(--color-text-muted)' }}>{member.ethnicity}</div>
                          <div style={{ color: 'var(--color-text-muted)' }}>{member.religion}</div>
                        </td>
                        <td style={{ padding: '12px', fontSize: '0.9rem' }}>
                          <div>{member.county}</div>
                          <div style={{ color: 'var(--color-text-muted)' }}>{member.constituency}</div>
                          <div style={{ color: 'var(--color-text-muted)' }}>{member.ward}</div>
                        </td>
                        <td style={{ padding: '12px', fontSize: '0.9rem', color: 'var(--color-text-muted)' }}>
                          {new Date(member.created_at).toLocaleDateString()}
                        </td>
                        <td style={{ padding: '12px' }}>
                          <button
                            onClick={() => handleDeleteSingle('members', member.id, member.name)}
                            style={{
                              background: '#d9534f',
                              color: '#fff',
                              border: 'none',
                              padding: '4px 8px',
                              borderRadius: '4px',
                              cursor: 'pointer',
                              fontSize: '0.8rem',
                              fontWeight: 'bold',
                            }}
                          >
                            🗑️ Delete
                          </button>
                        </td>
                      </tr>
                    ))}
                    {filteredMembers.length === 0 && (
                      <tr>
                        <td
                          colSpan={6}
                          style={{ padding: '40px', textAlign: 'center', color: 'var(--color-text-muted)' }}
                        >
                          No members match search filters.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* ── CONTACTS / INQUIRIES TAB ── */}
          {activeTab === 'contacts' && (
            <div>
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  marginBottom: '16px',
                  flexWrap: 'wrap',
                  gap: '10px',
                }}
              >
                <h2 style={{ fontSize: '1.2rem' }}>
                  Contact Inquiries — {filteredContacts.length} record(s)
                </h2>
                <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                  <button
                    onClick={() => exportToCSV('contacts')}
                    className="cta-button"
                    style={{ fontSize: '0.85rem', padding: '8px 16px', boxShadow: 'none' }}
                  >
                    📥 Export CSV
                  </button>
                  <button
                    onClick={() => handleClearData('clear_contacts')}
                    style={{
                      background: '#d9534f',
                      color: '#fff',
                      border: 'none',
                      padding: '8px 16px',
                      borderRadius: '8px',
                      cursor: 'pointer',
                      fontSize: '0.85rem',
                      fontWeight: 600,
                    }}
                  >
                    🗑️ Clear All
                  </button>
                </div>
              </div>
              <div style={{ overflowX: 'auto' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                  <thead>
                    <tr style={{ borderBottom: '2px solid var(--color-teal)', textAlign: 'left' }}>
                      <th style={{ padding: '12px' }}>Name</th>
                      <th style={{ padding: '12px' }}>Contact</th>
                      <th style={{ padding: '12px' }}>Subject</th>
                      <th style={{ padding: '12px' }}>Message</th>
                      <th style={{ padding: '12px' }}>Date</th>
                      <th style={{ padding: '12px' }}>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredContacts.map((contact) => (
                      <tr key={contact.id} style={{ borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
                        <td style={{ padding: '12px', fontWeight: 600, color: 'var(--color-text-light)' }}>
                          {contact.name}
                        </td>
                        <td style={{ padding: '12px', fontSize: '0.9rem' }}>
                          <a href={`mailto:${contact.email}`}>{contact.email}</a>
                        </td>
                        <td style={{ padding: '12px', fontSize: '0.9rem' }}>{contact.subject}</td>
                        <td
                          style={{
                            padding: '12px',
                            fontSize: '0.9rem',
                            color: 'var(--color-text-muted)',
                            maxWidth: '280px',
                          }}
                        >
                          {contact.message}
                        </td>
                        <td style={{ padding: '12px', fontSize: '0.9rem', color: 'var(--color-text-muted)' }}>
                          {new Date(contact.created_at).toLocaleDateString()}
                        </td>
                        <td style={{ padding: '12px' }}>
                          <button
                            onClick={() => handleDeleteSingle('contacts', contact.id, contact.name)}
                            style={{
                              background: '#d9534f',
                              color: '#fff',
                              border: 'none',
                              padding: '4px 8px',
                              borderRadius: '4px',
                              cursor: 'pointer',
                              fontSize: '0.8rem',
                              fontWeight: 'bold',
                            }}
                          >
                            🗑️ Delete
                          </button>
                        </td>
                      </tr>
                    ))}
                    {filteredContacts.length === 0 && (
                      <tr>
                        <td
                          colSpan={6}
                          style={{ padding: '40px', textAlign: 'center', color: 'var(--color-text-muted)' }}
                        >
                          No inquiries match search filters.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* ── VOLUNTEERS TAB ── */}
          {activeTab === 'volunteers' && (
            <div>
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  marginBottom: '16px',
                  flexWrap: 'wrap',
                  gap: '10px',
                }}
              >
                <h2 style={{ fontSize: '1.2rem' }}>
                  Volunteer Management — {filteredVolunteers.length} record(s)
                </h2>
                <button
                  onClick={() => handleClearData('clear_volunteers')}
                  style={{
                    background: '#d9534f',
                    color: '#fff',
                    border: 'none',
                    padding: '8px 16px',
                    borderRadius: '8px',
                    cursor: 'pointer',
                    fontSize: '0.85rem',
                    fontWeight: 600,
                  }}
                >
                  🗑️ Clear All
                </button>
              </div>
              <div style={{ overflowX: 'auto' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                  <thead>
                    <tr style={{ borderBottom: '2px solid #ffa500', textAlign: 'left' }}>
                      <th style={{ padding: '12px' }}>Name</th>
                      <th style={{ padding: '12px' }}>Contact</th>
                      <th style={{ padding: '12px' }}>Skills & Availability</th>
                      <th style={{ padding: '12px' }}>Location</th>
                      <th style={{ padding: '12px' }}>Date</th>
                      <th style={{ padding: '12px' }}>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredVolunteers.map((vol) => (
                      <tr key={vol.id} style={{ borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
                        <td style={{ padding: '12px', fontWeight: 600, color: 'var(--color-text-light)' }}>
                          {vol.name}
                        </td>
                        <td style={{ padding: '12px', fontSize: '0.9rem' }}>
                          <div>
                            <a href={`tel:${vol.phone}`} style={{ color: 'var(--color-teal)' }}>
                              {vol.phone}
                            </a>
                          </div>
                          <div>
                            <a href={`mailto:${vol.email}`}>{vol.email}</a>
                          </div>
                        </td>
                        <td style={{ padding: '12px', fontSize: '0.9rem' }}>
                          <div>
                            <strong>Skills:</strong> {vol.skills}
                          </div>
                          <div style={{ color: 'var(--color-text-muted)' }}>
                            <strong>Availability:</strong> {vol.availability}
                          </div>
                        </td>
                        <td style={{ padding: '12px' }}>{vol.county}</td>
                        <td style={{ padding: '12px', fontSize: '0.9rem', color: 'var(--color-text-muted)' }}>
                          {new Date(vol.created_at).toLocaleDateString()}
                        </td>
                        <td style={{ padding: '12px' }}>
                          <button
                            onClick={() => handleDeleteSingle('volunteers', vol.id, vol.name)}
                            style={{
                              background: '#d9534f',
                              color: '#fff',
                              border: 'none',
                              padding: '4px 8px',
                              borderRadius: '4px',
                              cursor: 'pointer',
                              fontSize: '0.8rem',
                              fontWeight: 'bold',
                            }}
                          >
                            🗑️ Delete
                          </button>
                        </td>
                      </tr>
                    ))}
                    {filteredVolunteers.length === 0 && (
                      <tr>
                        <td
                          colSpan={6}
                          style={{ padding: '40px', textAlign: 'center', color: 'var(--color-text-muted)' }}
                        >
                          No volunteers match search filters.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* ── MEDIA TAB ── */}
          {activeTab === 'media' && (
            <div>
              <form
                className="contact-form"
                style={{ marginBottom: '24px' }}
                onSubmit={async (e) => {
                  e.preventDefault();
                  const formData = new FormData(e.currentTarget);
                  const payload = Object.fromEntries(formData.entries());
                  try {
                    const res = await fetch('/api/admin/data', {
                      method: 'POST',
                      headers: { 'Content-Type': 'application/json' },
                      body: JSON.stringify({ table: 'media', data: payload }),
                    });
                    if (res.ok) {
                      alert('Media added successfully!');
                      (e.target as HTMLFormElement).reset();
                      fetchData();
                    } else {
                      alert('Failed to add media');
                    }
                  } catch {
                    alert('Error adding media');
                  }
                }}
              >
                <h3 style={{ fontSize: '1rem', marginBottom: '10px', color: '#9c27b0' }}>
                  Add New Media / Merchandise
                </h3>
                <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', marginBottom: '12px' }}>
                  <input
                    type="text"
                    name="title"
                    placeholder="Title / Name"
                    required
                    style={{ flex: 1, minWidth: '200px' }}
                  />
                  <select name="media_type" required style={{ flex: 1, minWidth: '180px' }}>
                    <option value="picture">Picture / Image</option>
                    <option value="merchandise">Merchandise</option>
                    <option value="advertisement">Advertisement</option>
                  </select>
                </div>
                <input
                  type="text"
                  name="image_url"
                  placeholder="Image URL (e.g. https://.../image.png or /images/my-pic.jpg)"
                  required
                  style={{ width: '100%', marginBottom: '12px' }}
                />
                <textarea
                  name="description"
                  placeholder="Description (Optional)"
                  rows={3}
                  style={{ width: '100%', marginBottom: '12px' }}
                />
                <button
                  type="submit"
                  className="cta-button"
                  style={{ background: '#9c27b0', boxShadow: 'none' }}
                >
                  + Add Media Item
                </button>
              </form>

              <div style={{ overflowX: 'auto' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                  <thead>
                    <tr style={{ borderBottom: '2px solid #9c27b0', textAlign: 'left' }}>
                      <th style={{ padding: '12px', width: '15%' }}>Preview</th>
                      <th style={{ padding: '12px' }}>Title & Type</th>
                      <th style={{ padding: '12px' }}>Description</th>
                      <th style={{ padding: '12px' }}>Date Added</th>
                      <th style={{ padding: '12px' }}>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {media.map((item) => (
                      <tr key={item.id} style={{ borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
                        <td style={{ padding: '12px' }}>
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img
                            src={item.image_url}
                            alt={item.title}
                            width={60}
                            height={60}
                            style={{ objectFit: 'cover', borderRadius: '4px' }}
                          />
                        </td>
                        <td style={{ padding: '12px', fontWeight: 600, color: 'var(--color-text-light)' }}>
                          <div>{item.title}</div>
                          <div style={{ fontSize: '0.8rem', color: '#9c27b0', textTransform: 'uppercase' }}>
                            {item.media_type}
                          </div>
                        </td>
                        <td style={{ padding: '12px', fontSize: '0.9rem', color: 'var(--color-text-muted)' }}>
                          {item.description || '-'}
                        </td>
                        <td style={{ padding: '12px', fontSize: '0.9rem', color: 'var(--color-text-muted)' }}>
                          {new Date(item.created_at).toLocaleDateString()}
                        </td>
                        <td style={{ padding: '12px' }}>
                          <button
                            onClick={() => handleDeleteSingle('media', item.id, item.title)}
                            style={{
                              background: '#d9534f',
                              color: '#fff',
                              border: 'none',
                              padding: '4px 8px',
                              borderRadius: '4px',
                              cursor: 'pointer',
                              fontSize: '0.8rem',
                              fontWeight: 'bold',
                            }}
                          >
                            🗑️ Delete
                          </button>
                        </td>
                      </tr>
                    ))}
                    {media.length === 0 && (
                      <tr>
                        <td
                          colSpan={5}
                          style={{ padding: '40px', textAlign: 'center', color: 'var(--color-text-muted)' }}
                        >
                          No media items found.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* ── UPLOAD PICTURES TAB ── */}
          {activeTab === 'upload' && <AdminUploadPage />}

          {/* ── ADD MEMBER TAB ── */}
          {activeTab === 'add_member' && (
            <div>
              <h2 style={{ fontSize: '1.2rem', marginBottom: '20px' }}>Register New Member</h2>
              {addStatus && (
                <p style={{ color: '#00c853', fontWeight: 600, marginBottom: '12px' }}>{addStatus}</p>
              )}
              {addError && (
                <p style={{ color: '#ff1744', fontWeight: 600, marginBottom: '12px' }}>{addError}</p>
              )}
              <form onSubmit={handleAddMember} className="contact-form">
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: '16px' }}>
                  <input name="name" placeholder="Full Name *" required />
                  <input name="id_number" placeholder="ID Number *" required />
                  <input name="dob" type="date" placeholder="Date of Birth" />
                  <select name="sex">
                    <option value="">Select Gender</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                  </select>
                  <input name="ethnicity" placeholder="Ethnicity / Community" />
                  <input name="disability_status" placeholder="Disability Status (if any)" />
                  <input name="religion" placeholder="Religion" />
                  <input name="phone" placeholder="Phone Number *" required />
                  <input name="email" type="email" placeholder="Email Address" />
                  <input name="physical_address" placeholder="Physical Address" />
                  <input name="county" placeholder="County *" required />
                  <input name="constituency" placeholder="Constituency" />
                  <input name="ward" placeholder="Ward" />
                </div>
                <textarea
                  name="message"
                  placeholder="Additional notes (Optional)"
                  rows={3}
                  style={{ marginTop: '16px', width: '100%' }}
                />
                <button
                  type="submit"
                  className="cta-button"
                  style={{ marginTop: '16px' }}
                >
                  ✅ Register Member
                </button>
              </form>
            </div>
          )}

        </div>
      </div>
    </section>
  );
}
