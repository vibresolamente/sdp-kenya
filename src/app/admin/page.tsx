"use client";

import { useState, useEffect } from 'react';

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
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [members, setMembers] = useState<Member[]>([]);
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [activeTab, setActiveTab] = useState<'members' | 'contacts' | 'add_member'>('members');
  
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
    } catch (error) {
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
        setIsAuthenticated(true);
      } else {
        setIsAuthenticated(false);
      }
    } catch (err) {
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
          credentials: 'include'
        });

      if (response.ok) {
        // Successful login – reload to ensure the authentication cookie is sent on subsequent requests
        window.location.reload();
        return;
      } else {
        const errData = await response.json();
        setError(errData.error || 'Invalid credentials');
      }
    } catch (err) {
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
    } catch (err) {
      console.error('Logout error:', err);
    }
  };

  const handleClearData = async (action: 'clear_members' | 'clear_contacts') => {
    const confirmation = window.confirm(
      `WARNING: Are you absolutely sure you want to delete all stored ${action === 'clear_members' ? 'membership applications' : 'contact inquiries'}? This action CANNOT be undone.`
    );
    if (!confirmation) return;

    try {
      const response = await fetch('/api/admin/data', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ action }),
          credentials: 'include'
        });

      if (response.ok) {
        alert('Data cleared successfully.');
        fetchData();
      } else {
        alert('Failed to clear data.');
      }
    } catch (err) {
      alert('An error occurred.');
    }
  };

  // CSV Exporter
  const exportToCSV = (type: 'members' | 'contacts') => {
    if (type === 'members') {
      window.location.href = '/api/admin/report';
      return;
    }

    let headers: string[] = [];
    let rows: any[] = [];
    let filename = '';

    headers = ['ID', 'Name', 'Email', 'Subject', 'Message', 'Date'];
    rows = contacts.map(c => [
      c.id,
      c.name,
      c.email,
      c.subject,
      c.message.replace(/"/g, '""'), // escape quotes
      new Date(c.created_at).toLocaleString()
    ]);
    filename = `sdp_kenya_contacts_${new Date().toISOString().slice(0, 10)}.csv`;

    const csvContent = [
      headers.join(','),
      ...rows.map(row => row.map((val: any) => `"${val}"`).join(','))
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
  const filteredMembers = members.filter(m => {
    const matchesSearch = 
      m.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      m.id_number.includes(searchTerm) ||
      m.phone.includes(searchTerm) ||
      m.email.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesCounty = countyFilter ? m.county.toLowerCase() === countyFilter.toLowerCase() : true;
    return matchesSearch && matchesCounty;
  });

  const filteredContacts = contacts.filter(c => {
    return (
      c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.message.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  // Get list of unique counties for filter dropdown
  const counties = Array.from(new Set(members.map(m => m.county).filter(Boolean)));

  // Calculate statistics
  const totalMembers = members.length;
  const totalContacts = contacts.length;
  const countiesRepresented = counties.length;

  if (isAuthenticated === null) {
    return (
      <div className="container content-padding text-center">
        <p className="lead">Loading security checks...</p>
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <section className="content-padding flex items-center justify-center" style={{ minHeight: '70vh' }}>
        <div className="container" style={{ maxWidth: '450px' }}>
          <div className="manifesto-details bg-surface text-center" style={{ padding: '40px', borderRadius: '16px' }}>
            <h1 style={{ fontSize: '1.8rem', marginBottom: '10px' }}>
              Admin <span className="highlight-magenta animated-accent">Portal</span>
            </h1>
            <p style={{ marginBottom: '30px' }}>Please enter the administrator credentials to access the secure records.</p>
            
            <form onSubmit={handleLogin} className="contact-form">
              {/* Hidden username field for accessibility/password-manager compliance */}
              <input 
                type="text" 
                name="username" 
                autoComplete="username" 
                value="admin" 
                style={{ display: 'none' }} 
                readOnly 
              />
              <input 
                type="password" 
                name="password"
                autoComplete="current-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Admin PIN or Password" 
                required 
                style={{ textAlign: 'center', fontSize: '1.1rem' }}
              />
              {error && <p style={{ color: 'var(--color-magenta)', fontSize: '0.9rem', marginBottom: '15px' }}>{error}</p>}
              
              <button type="submit" className="cta-button" style={{ width: '100%' }} disabled={loading}>
                {loading ? 'Authenticating...' : 'Access Dashboard'}
              </button>
            </form>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="content-padding">
      <div className="container">
        
        {/* Header Controls */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '20px' }}>
          <div>
            <h1>Admin <span className="animated-accent">Dashboard</span></h1>
            <p>Official Security System | Registered Party Records</p>
          </div>
          <button onClick={handleLogout} className="cta-button" style={{ background: 'linear-gradient(135deg, #444, #222)', boxShadow: 'none' }}>
            Secure Logout
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
            <span className="stat-number">{countiesRepresented}</span>
            <span className="stat-label">Counties Reached</span>
          </div>
        </div>

        {/* Search and Filters */}
        <div className="bg-surface" style={{ padding: '24px', borderRadius: '12px', marginTop: '30px', border: '1px solid var(--glass-border)' }}>
          <div style={{ display: 'flex', gap: '15px', flexWrap: 'wrap' }}>
            <div style={{ flex: '1', minWidth: '250px' }}>
              <label style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)', display: 'block', marginBottom: '6px' }}>Search Records</label>
              <input 
                type="text" 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search by name, ID number, phone, email..."
                style={{
                  width: '100%',
                  padding: '10px 14px',
                  borderRadius: '8px',
                  background: 'rgba(0,0,0,0.02)',
                  border: '1px solid rgba(0,0,0,0.08)',
                  color: 'var(--color-text-light)'
                }}
              />
            </div>
            
            {activeTab === 'members' && counties.length > 0 && (
              <div style={{ width: '200px' }}>
                <label style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)', display: 'block', marginBottom: '6px' }}>Filter by County</label>
                <select
                  value={countyFilter}
                  onChange={(e) => setCountyFilter(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '10px 14px',
                    borderRadius: '8px',
                    background: 'var(--color-surface-elevated)',
                    border: '1px solid rgba(0,0,0,0.08)',
                    color: 'var(--color-text-light)',
                    height: '42px'
                  }}
                >
                  <option value="">All Counties</option>
                  {counties.map(c => (
                    <option key={c} value={c}>{c}</option>
                  ))}
                </select>
              </div>
            )}
          </div>
        </div>

        {/* Tab Controls */}
        <div style={{ display: 'flex', gap: '10px', marginTop: '30px', borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: '10px' }}>
          <button 
            onClick={() => { setActiveTab('members'); setSearchTerm(''); }}
            style={{
              padding: '10px 20px',
              borderRadius: '8px',
              fontWeight: 600,
              background: activeTab === 'members' ? 'rgba(255, 105, 180, 0.15)' : 'transparent',
              color: activeTab === 'members' ? 'var(--color-magenta)' : 'var(--color-text-muted)',
              border: 'none',
              cursor: 'pointer'
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
              cursor: 'pointer'
            }}
          >
            Inquiries ({filteredContacts.length})
          </button>
          <button 
            onClick={() => { setActiveTab('add_member'); setSearchTerm(''); }}
            style={{
              padding: '10px 20px',
              borderRadius: '8px',
              fontWeight: 600,
              background: activeTab === 'add_member' ? 'rgba(46, 204, 113, 0.15)' : 'transparent',
              color: activeTab === 'add_member' ? '#2ecc71' : 'var(--color-text-muted)',
              border: 'none',
              cursor: 'pointer'
            }}
          >
            + Register New User
          </button>
        </div>

        {/* Content Section */}
        <div className="bg-surface" style={{ padding: '30px', borderRadius: '0 0 12px 12px', border: '1px solid var(--glass-border)', borderTop: 'none' }}>
          
          {/* Action Row */}
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px', alignItems: 'center', flexWrap: 'wrap', gap: '15px' }}>
            <h2 style={{ fontSize: '1.4rem', margin: 0 }}>
              {activeTab === 'members' ? 'Party Membership Roster' : activeTab === 'contacts' ? 'Contact Inquiries Log' : 'Register New User'}
            </h2>
            <div style={{ display: 'flex', gap: '10px' }}>
              <button 
                onClick={() => exportToCSV(activeTab as any)} 
                className="cta-button" 
                style={{
                  padding: '8px 16px',
                  fontSize: '0.9rem',
                  background: 'linear-gradient(135deg, var(--color-teal), #0099cc)',
                  boxShadow: 'none',
                  display: activeTab === 'add_member' ? 'none' : 'block'
                }}
                disabled={activeTab === 'members' ? filteredMembers.length === 0 : filteredContacts.length === 0}
              >
                📥 Export CSV
              </button>
              {activeTab === 'members' && (
                <a
                  href="/api/admin/download?format=csv"
                  download="sdp_members.csv"
                  className="cta-button"
                  style={{
                    padding: '8px 16px',
                    fontSize: '0.9rem',
                    background: 'linear-gradient(135deg, var(--sdp-cyan), #00a2d9)',
                    boxShadow: 'none',
                    display: 'block',
                    textDecoration: 'none'
                  }}
                >
                  ⬇️ Download Members
                </a>
              )}
              <button 
                onClick={() => handleClearData(activeTab === 'members' ? 'clear_members' : 'clear_contacts')}
                className="cta-button"
                style={{
                  padding: '8px 16px',
                  fontSize: '0.9rem',
                  background: 'linear-gradient(135deg, #d9534f, #c9302c)',
                  boxShadow: 'none',
                  display: activeTab === 'add_member' ? 'none' : 'block'
                }}
              >
                🗑️ Clear All
              </button>
            </div>
          </div>

          {activeTab === 'add_member' ? (
            <div className="contact-form-container" style={{ maxWidth: '800px', margin: '0 auto', background: 'transparent', boxShadow: 'none' }}>
                <form className="contact-form" onSubmit={handleAddMember}> 
                    <h3 style={{fontSize: '1rem', marginBottom: '10px', color: 'var(--color-teal)'}}>Personal Information</h3>
                    <input type="text" name="name" placeholder="Full Legal Name" required />
                    <div className="flex flex-col md:flex-row gap-4">
                        <input type="text" name="id_number" placeholder="National ID / Passport No." required className="w-full md:w-1/2" />
                        <input type="date" name="dob" placeholder="Date of Birth" required className="w-full md:w-1/2" title="Date of Birth" />
                    </div>
                    
                    <div className="flex flex-col md:flex-row gap-4">
                        <select name="sex" required className="w-full md:w-1/2">
                            <option value="">Select Gender</option>
                            <option value="Male">Male</option>
                            <option value="Female">Female</option>
                            <option value="Other">Other</option>
                        </select>
                        <input type="text" name="ethnicity" placeholder="Ethnicity (Optional)" className="w-full md:w-1/2" />
                    </div>

                    <div className="flex flex-col md:flex-row gap-4">
                        <select name="disability_status" required className="w-full md:w-1/2">
                            <option value="">Disability Status</option>
                            <option value="None">None</option>
                            <option value="Physical">Physical</option>
                            <option value="Visual">Visual</option>
                            <option value="Hearing">Hearing</option>
                            <option value="Other">Other</option>
                        </select>
                        <input type="text" name="religion" placeholder="Religion (Optional)" className="w-full md:w-1/2" />
                    </div>

                    <h3 style={{fontSize: '1rem', marginBottom: '10px', color: 'var(--color-teal)'}}>Contact & Location</h3>
                    <div className="flex flex-col md:flex-row gap-4">
                        <input type="tel" name="phone" placeholder="Phone Number" required className="w-full md:w-1/2" />
                        <input type="email" name="email" placeholder="Email Address" required className="w-full md:w-1/2" />
                    </div>
                    <input type="text" name="physical_address" placeholder="Physical/Postal Address" required />
                    
                    <div className="flex flex-col md:flex-row gap-4">
                        <input type="text" name="county" placeholder="County" required className="w-full md:w-1/2" />
                        <input type="text" name="constituency" placeholder="Constituency" required className="w-full md:w-1/2" />
                    </div>
                    <input type="text" name="ward" placeholder="Ward" required />

                    <h3 style={{fontSize: '1rem', marginBottom: '10px', color: 'var(--color-teal)'}}>Account Security</h3>
                    <input type="text" name="username_fallback" autoComplete="username" style={{ display: 'none' }} value="new_member" readOnly />
                    <input type="password" name="password" autoComplete="new-password" placeholder="Create a Password for Member Portal" required />

                    <button type="submit" className="cta-button" style={{ width: '100%' }}>Register Member</button>
                    
                    {addStatus && <p className="mt-5 text-center font-bold" style={{ color: 'var(--color-teal)' }}>{addStatus}</p>}
                    {addError && <p className="mt-5 text-center font-bold" style={{ color: 'var(--color-magenta)' }}>{addError}</p>}
                </form>
            </div>
          ) : activeTab === 'members' ? (
            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                  <tr style={{ borderBottom: '2px solid var(--color-magenta)', textAlign: 'left' }}>
                    <th style={{ padding: '12px' }}>Name & Gender</th>
                    <th style={{ padding: '12px' }}>National ID</th>
                    <th style={{ padding: '12px' }}>DOB</th>
                    <th style={{ padding: '12px' }}>Contact</th>
                    <th style={{ padding: '12px' }}>Location</th>
                    <th style={{ padding: '12px' }}>Joined Date</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredMembers.map((member) => (
                    <tr key={member.id} style={{ borderBottom: '1px solid rgba(0,0,0,0.06)' }}>
                      <td style={{ padding: '12px', fontWeight: 600, color: 'var(--color-text-light)' }}>
                        <div>{member.name}</div>
                        <div style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)' }}>{member.sex || 'N/A'}</div>
                      </td>
                      <td style={{ padding: '12px', color: 'var(--color-text-muted)' }}>{member.id_number}</td>
                      <td style={{ padding: '12px', color: 'var(--color-text-muted)' }}>{member.dob || 'N/A'}</td>
                      <td style={{ padding: '12px', fontSize: '0.9rem' }}>
                        <div><a href={`tel:${member.phone}`} style={{ color: 'var(--color-teal)' }}>{member.phone}</a></div>
                        <div><a href={`mailto:${member.email}`}>{member.email}</a></div>
                      </td>
                      <td style={{ padding: '12px', fontSize: '0.9rem' }}>
                        <div><strong>{member.county}</strong></div>
                        <div style={{ color: 'var(--color-text-muted)' }}>{member.constituency} • {member.ward}</div>
                      </td>
                      <td style={{ padding: '12px', fontSize: '0.9rem', color: 'var(--color-text-muted)' }}>
                        {new Date(member.created_at).toLocaleDateString()}
                      </td>
                    </tr>
                  ))}
                  {filteredMembers.length === 0 && (
                    <tr>
                      <td colSpan={6} style={{ padding: '40px', textAlign: 'center', color: 'var(--color-text-muted)' }}>
                        No recruits match search filters.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          ) : (
            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                  <tr style={{ borderBottom: '2px solid var(--color-teal)', textAlign: 'left' }}>
                    <th style={{ padding: '12px', width: '20%' }}>Sender</th>
                    <th style={{ padding: '12px', width: '20%' }}>Email</th>
                    <th style={{ padding: '12px', width: '20%' }}>Subject</th>
                    <th style={{ padding: '12px', width: '30%' }}>Message</th>
                    <th style={{ padding: '12px', width: '10%' }}>Date</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredContacts.map((contact) => (
                    <tr key={contact.id} style={{ borderBottom: '1px solid rgba(0,0,0,0.06)' }}>
                      <td style={{ padding: '12px', fontWeight: 600, color: 'var(--color-text-light)' }}>{contact.name}</td>
                      <td style={{ padding: '12px' }}><a href={`mailto:${contact.email}`}>{contact.email}</a></td>
                      <td style={{ padding: '12px', fontWeight: 500, color: 'var(--color-teal)' }}>{contact.subject}</td>
                      <td style={{ padding: '12px', fontSize: '0.9rem', whiteSpace: 'pre-wrap', color: 'var(--color-text-light)' }}>
                        {contact.message}
                      </td>
                      <td style={{ padding: '12px', fontSize: '0.9rem', color: 'var(--color-text-muted)' }}>
                        {new Date(contact.created_at).toLocaleDateString()}
                      </td>
                    </tr>
                  ))}
                  {filteredContacts.length === 0 && (
                    <tr>
                      <td colSpan={5} style={{ padding: '40px', textAlign: 'center', color: 'var(--color-text-muted)' }}>
                        No inquiries match search filters.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          )}

        </div>

      </div>
    </section>
  );
}
