import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import API_URL from "../config";
import {
  Building2,
  Users,
  Activity,
  Heart,
  TrendingUp,
  MapPin,
  LogOut,
  Settings,
  Bell,
  Menu,
  X,
  Eye,
  UserPlus,
  UserMinus,
  ClipboardList,
  Calendar,
  Home,
  BookOpen,
  MessageSquare
} from "lucide-react";

function Dashboard() {
  const navigate = useNavigate();
  const [hoveredBranch, setHoveredBranch] = useState(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [adminName, setAdminName] = useState("Admin");
  const [contactMessages, setContactMessages] = useState([]);
  const [loadingMessages, setLoadingMessages] = useState(true);
  const [branchStats, setBranchStats] = useState({});
  const [recentActivity, setRecentActivity] = useState([]);
  const [loadingActivity, setLoadingActivity] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("adminToken");
    if (!token) {
      navigate("/signup");
    }
    const name = localStorage.getItem("adminName");
    if (name) setAdminName(name);

    fetchContactMessages();
    fetchBranchStats();
    fetchRecentActivity();
  }, [navigate]);

  const fetchRecentActivity = async () => {
    try {
      const response = await fetch(`${API_URL}/api/admissions?limit=5`);
      const data = await response.json();
      setRecentActivity(data);
    } catch (error) {
      console.error("Error fetching recent activity:", error);
    } finally {
      setLoadingActivity(false);
    }
  };

  const fetchBranchStats = async () => {
    try {
      const response = await fetch(`${API_URL}/api/admissions/stats`);
      if (!response.ok) throw new Error("Server error");
      const data = await response.json();
      
      if (Array.isArray(data)) {
        const statsMap = {};
        data.forEach(stat => {
          statsMap[stat._id] = stat;
        });
        setBranchStats(statsMap);
      }
    } catch (error) {
      console.error("Error fetching branch stats:", error);
    }
  };

  const fetchContactMessages = async () => {
    try {
      const response = await fetch(`${API_URL}/api/contact`);
      const data = await response.json();
      setContactMessages(data);
    } catch (error) {
      console.error("Error fetching contact messages:", error);
    } finally {
      setLoadingMessages(false);
    }
  };

  const branchNames = {
    1: "Savali Nivara - Pimpri",
    2: "Savali Nivara - Rajguru Nagar",
    3: "Savali Nivara - YCM Hospital"
  };

  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    localStorage.removeItem("adminRole");
    localStorage.removeItem("adminName");
    navigate("/signup");
  };

  const branches = [
    {
      id: 1,
      name: "Savali Nivara - Pimpri",
      location: "Pimpri-Chinchwad, Pune",
      totalFamilies: branchStats[1]?.total || 0,
      activeMembers: branchStats[1]?.active || 0,
      children: Math.floor((branchStats[1]?.active || 0) * 0.3), // Simulated for UI
      elderly: Math.floor((branchStats[1]?.active || 0) * 0.1), // Simulated for UI
      todayAdmissions: branchStats[1]?.todayAdmissions || 0,
      todayDischarges: branchStats[1]?.todayDischarges || 0
    },
    {
      id: 2,
      name: "Savali Nivara - Rajguru Nagar",
      location: "Rajguru Nagar, Pune",
      totalFamilies: branchStats[2]?.total || 0,
      activeMembers: branchStats[2]?.active || 0,
      children: Math.floor((branchStats[2]?.active || 0) * 0.3),
      elderly: Math.floor((branchStats[2]?.active || 0) * 0.1),
      todayAdmissions: branchStats[2]?.todayAdmissions || 0,
      todayDischarges: branchStats[2]?.todayDischarges || 0
    },
    {
      id: 3,
      name: "Savali Nivara - YCM Hospital",
      location: "YCM Hospital, Pimpri",
      totalFamilies: branchStats[3]?.total || 0,
      activeMembers: branchStats[3]?.active || 0,
      children: Math.floor((branchStats[3]?.active || 0) * 0.3),
      elderly: Math.floor((branchStats[3]?.active || 0) * 0.1),
      todayAdmissions: branchStats[3]?.todayAdmissions || 0,
      todayDischarges: branchStats[3]?.todayDischarges || 0
    }
  ];

  const quickStats = [
    {
      icon: Users,
      label: "Total Beneficiaries",
      value: "862",
      change: "+9 today",
      color: "text-emerald-600",
      bgColor: "bg-emerald-100"
    },
    {
      icon: Building2,
      label: "Active Centers",
      value: "3",
      change: "All operational",
      color: "text-emerald-600",
      bgColor: "bg-emerald-100"
    },
    {
      icon: Heart,
      label: "Families Supported",
      value: "465",
      change: "+7 this month",
      color: "text-emerald-600",
      bgColor: "bg-emerald-100"
    },
    {
      icon: TrendingUp,
      label: "Today's Activity",
      value: "9",
      change: "5 enrollments, 4 completions",
      color: "text-emerald-600",
      bgColor: "bg-emerald-100"
    }
  ];

  const handleShowRecords = (branchId) => {
    navigate(`/branch/${branchId}/records`);
  };

  const handleNewAdmission = (branchId) => {
    navigate(`/branch/${branchId}/admission`);
  };

  const handleDischarge = (branchId) => {
    navigate(`/branch/${branchId}/discharge`);
  };

  return (
    <div className="admin-dashboard">
      {/* Header */}
      <header className="admin-header">
        <div className="header-container">
          <div className="logo-section">
            <Building2 size={28} className="logo-icon" />
            <div>
              <h1 className="logo-text">Savali Nivara</h1>
              <p className="logo-subtext">Admin Portal</p>
            </div>
          </div>

          <button className="mobile-menu-btn" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>

          <div className={`header-actions ${mobileMenuOpen ? 'mobile-open' : ''}`}>
            <button className="icon-btn">
              <Bell size={20} />
            </button>
            <button className="icon-btn">
              <Settings size={20} />
            </button>
            <div className="admin-info">
              <div className="admin-avatar">
                <span>{adminName.charAt(0).toUpperCase()}</span>
              </div>
              <div className="admin-details">
                <span className="admin-name">{adminName}</span>
                <span className="admin-role">Administrator</span>
              </div>
            </div>
            <button onClick={handleLogout} className="logout-btn">
              <LogOut size={18} />
              <span>Logout</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="main-content">
        {/* Welcome Banner */}
        <div className="welcome-banner">
          <div className="welcome-text">
            <h2>Welcome back, {adminName}!</h2>
            <p>Manage your centers, beneficiaries, and programs</p>
          </div>
          <div className="date-badge">
            <Calendar size={14} />
            <span>{new Date().toLocaleDateString('en-US', {
              weekday: 'long',
              year: 'numeric',
              month: 'long',
              day: 'numeric'
            })}</span>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="stats-grid">
          {quickStats.map((stat, idx) => (
            <div key={idx} className="stat-card">
              <div className={`stat-icon-wrapper ${stat.bgColor}`}>
                <stat.icon size={24} className={stat.color} />
              </div>
              <div className="stat-info">
                <p className="stat-label">{stat.label}</p>
                <h3 className="stat-value">{stat.value}</h3>
                <span className="stat-change">{stat.change}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Centers Section */}
        <div className="centers-section">
          <div className="section-header">
            <h2>Center Management</h2>
            <p>Manage admissions, discharges, and view records</p>
          </div>

          <div className="centers-grid">
            {branches.map((branch) => (
              <div
                key={branch.id}
                className={`center-card ${hoveredBranch === branch.id ? 'hovered' : ''}`}
                onMouseEnter={() => setHoveredBranch(branch.id)}
                onMouseLeave={() => setHoveredBranch(null)}
              >
                <div className="center-header">
                  <div className="center-header-content">
                    <Home size={24} className="text-white" />
                    <span className="center-id">Center #{branch.id}</span>
                  </div>
                </div>

                <div className="center-content">
                  <h3 className="center-name">{branch.name}</h3>
                  <div className="center-location">
                    <MapPin size={14} />
                    <span>{branch.location}</span>
                  </div>

                  <div className="center-stats-grid">
                    <div className="center-stat">
                      <span className="stat-number">{branch.totalFamilies}</span>
                      <span className="stat-label-sm">Families</span>
                    </div>
                    <div className="center-stat">
                      <span className="stat-number text-green-600">{branch.activeMembers}</span>
                      <span className="stat-label-sm">Active Members</span>
                    </div>
                    <div className="center-stat">
                      <span className="stat-number">{branch.children}</span>
                      <span className="stat-label-sm">Children</span>
                    </div>
                    <div className="center-stat">
                      <span className="stat-number">{branch.elderly}</span>
                      <span className="stat-label-sm">Elderly</span>
                    </div>
                  </div>

                  <div className="today-activity">
                    <div className="activity-badge enrollment">
                      <UserPlus size={12} />
                      <span>+{branch.todayAdmissions} New Admissions</span>
                    </div>
                    <div className="activity-badge discharge">
                      <UserMinus size={12} />
                      <span>-{branch.todayDischarges} Discharges</span>
                    </div>
                  </div>

                  <div className="center-actions">
                    <button
                      onClick={() => handleNewAdmission(branch.id)}
                      className="action-btn admission-btn"
                    >
                      <UserPlus size={16} />
                      <span>New Admission</span>
                    </button>
                    <button
                      onClick={() => handleDischarge(branch.id)}
                      className="action-btn discharge-btn"
                    >
                      <UserMinus size={16} />
                      <span>Discharge</span>
                    </button>
                    <button
                      onClick={() => handleShowRecords(branch.id)}
                      className="action-btn records-btn"
                    >
                      <Eye size={16} />
                      <span>Show Records</span>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Activity Section */}
        <div className="recent-activity-section">
          <div className="section-header">
            <h2>Recent Activity</h2>
            <p>Latest admissions and discharges across centers</p>
            <button className="view-all-btn">
              <ClipboardList size={16} />
              <span>View All Records</span>
            </button>
          </div>

          <div className="activity-table-container">
            <table className="activity-table">
              <thead>
                <tr>
                  <th>Time</th>
                  <th>Center</th>
                  <th>Beneficiary Name</th>
                  <th>Program Type</th>
                  <th>Activity</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {loadingActivity ? (
                  <tr><td colSpan="6" className="text-center p-8 text-slate-400">Loading activity...</td></tr>
                ) : recentActivity.length === 0 ? (
                  <tr><td colSpan="6" className="text-center p-8 text-slate-400">No recent activity.</td></tr>
                ) : (
                  recentActivity.map((activity) => (
                    <tr key={activity._id}>
                      <td>{new Date(activity.updatedAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</td>
                      <td>{branchNames[activity.branchId]}</td>
                      <td>{activity.name}</td>
                      <td>{activity.occupation || "N/A"}</td>
                      <td>
                        <span className={`type-badge ${activity.status}-badge`}>
                          {activity.status === 'admitted' ? 'Admission' : 'Discharge'}
                        </span>
                      </td>
                      <td><span className="status-badge success">Completed</span></td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Quick Links Section */}
        <div className="quick-links-section">
          <div className="section-header">
            <h2>Quick Access</h2>
            <p>Frequently used administrative functions</p>
          </div>

          <div className="quick-links-grid">
            <Link to="/beneficiaries" className="quick-link-card">
              <div className="quick-link-icon">
                <Users size={24} />
              </div>
              <h3>All Beneficiaries</h3>
              <p>View complete beneficiary database</p>
              <span className="quick-link-arrow">→</span>
            </Link>

            <Link to="/programs" className="quick-link-card">
              <div className="quick-link-icon">
                <BookOpen size={24} />
              </div>
              <h3>Programs Overview</h3>
              <p>Track program progress and impact</p>
              <span className="quick-link-arrow">→</span>
            </Link>

            <Link to="/reports" className="quick-link-card">
              <div className="quick-link-icon">
                <ClipboardList size={24} />
              </div>
              <h3>Generate Reports</h3>
              <p>Monthly and annual impact reports</p>
              <span className="quick-link-arrow">→</span>
            </Link>

            <Link to="/admin/donations" className="quick-link-card border-emerald-100 hover:border-emerald-300">
              <div className="quick-link-icon bg-emerald-100 text-emerald-600">
                <Heart size={24} />
              </div>
              <h3 className="text-emerald-900">Manage Donations</h3>
              <p>Review and update donation statuses</p>
              <span className="quick-link-arrow">→</span>
            </Link>
          </div>
        </div>

        {/* Contact Messages Section */}
        <div className="recent-activity-section" style={{ marginTop: '48px' }}>
          <div className="section-header">
            <div className="flex items-center gap-3">
              <MessageSquare className="text-emerald-600" />
              <h2>User Inquiries</h2>
            </div>
            <p>Messages received from the Contact Us page</p>
          </div>

          <div className="activity-table-container">
            {loadingMessages ? (
              <div className="p-8 text-center text-slate-500">Loading messages...</div>
            ) : contactMessages.length === 0 ? (
              <div className="p-8 text-center text-slate-500">No messages received yet.</div>
            ) : (
              <table className="activity-table">
                <thead>
                  <tr>
                    <th>Date</th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Phone</th>
                    <th>Message Snippet</th>
                  </tr>
                </thead>
                <tbody>
                  {contactMessages.map((msg) => (
                    <tr key={msg._id}>
                      <td>{new Date(msg.createdAt).toLocaleDateString()}</td>
                      <td>{msg.firstName} {msg.lastName}</td>
                      <td>{msg.email}</td>
                      <td>{msg.telephone}</td>
                      <td title={msg.message}>
                        <span className="truncate block max-w-xs">{msg.message}</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>
      </main>

      <style jsx>{`
        .admin-dashboard {
          min-height: 100vh;
          background: #f8fafc;
        }

        /* Header Styles */
        .admin-header {
          background: white;
          border-bottom: 1px solid #e2e8f0;
          position: sticky;
          top: 0;
          z-index: 50;
          box-shadow: 0 1px 3px rgba(0,0,0,0.1);
        }

        .header-container {
          max-width: 1400px;
          margin: 0 auto;
          padding: 16px 24px;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .logo-section {
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .logo-icon {
          color: #10b981;
        }

        .logo-text {
          font-size: 20px;
          font-weight: 700;
          color: #0f172a;
          margin: 0;
        }

        .logo-subtext {
          font-size: 12px;
          color: #64748b;
          margin: 0;
        }

        .header-actions {
          display: flex;
          align-items: center;
          gap: 20px;
        }

        .icon-btn {
          background: none;
          border: none;
          cursor: pointer;
          padding: 8px;
          border-radius: 8px;
          color: #64748b;
          transition: all 0.2s;
        }

        .icon-btn:hover {
          background: #f1f5f9;
          color: #0f172a;
        }

        .admin-info {
          display: flex;
          align-items: center;
          gap: 12px;
          padding-left: 16px;
          border-left: 1px solid #e2e8f0;
        }

        .admin-avatar {
          width: 36px;
          height: 36px;
          background: linear-gradient(135deg, #10b981, #059669);
          border-radius: 10px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          font-weight: 600;
        }

        .admin-details {
          display: flex;
          flex-direction: column;
        }

        .admin-name {
          font-size: 14px;
          font-weight: 600;
          color: #0f172a;
        }

        .admin-role {
          font-size: 11px;
          color: #64748b;
        }

        .logout-btn {
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 8px 16px;
          background: #ef4444;
          color: white;
          border: none;
          border-radius: 8px;
          cursor: pointer;
          font-weight: 500;
          transition: all 0.2s;
        }

        .logout-btn:hover {
          background: #dc2626;
          transform: translateY(-1px);
        }

        .mobile-menu-btn {
          display: none;
          background: none;
          border: none;
          cursor: pointer;
          color: #0f172a;
        }

        /* Main Content */
        .main-content {
          max-width: 1400px;
          margin: 0 auto;
          padding: 32px 24px;
        }

        /* Welcome Banner */
        .welcome-banner {
          background: linear-gradient(135deg, #0f766e, #0d9488);
          border-radius: 24px;
          padding: 32px;
          margin-bottom: 32px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          color: white;
        }

        .welcome-text h2 {
          font-size: 28px;
          font-weight: 700;
          margin: 0 0 8px;
        }

        .welcome-text p {
          margin: 0;
          opacity: 0.9;
        }

        .date-badge {
          display: flex;
          align-items: center;
          gap: 8px;
          background: rgba(255,255,255,0.2);
          padding: 8px 16px;
          border-radius: 12px;
          font-size: 14px;
        }

        /* Stats Grid */
        .stats-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
          gap: 20px;
          margin-bottom: 48px;
        }

        .stat-card {
          background: white;
          border-radius: 20px;
          padding: 20px;
          display: flex;
          align-items: center;
          gap: 16px;
          box-shadow: 0 1px 3px rgba(0,0,0,0.1);
          transition: all 0.3s;
        }

        .stat-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 10px 25px -5px rgba(0,0,0,0.1);
        }

        .stat-icon-wrapper {
          width: 56px;
          height: 56px;
          border-radius: 16px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .stat-info {
          flex: 1;
        }

        .stat-label {
          font-size: 13px;
          color: #64748b;
          margin: 0 0 4px;
        }

        .stat-value {
          font-size: 28px;
          font-weight: 700;
          color: #0f172a;
          margin: 0 0 4px;
        }

        .stat-change {
          font-size: 11px;
          color: #10b981;
        }

        /* Centers Section */
        .section-header {
          margin-bottom: 32px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          flex-wrap: wrap;
          gap: 16px;
        }

        .section-header h2 {
          font-size: 24px;
          font-weight: 700;
          color: #0f172a;
          margin: 0;
        }

        .section-header p {
          color: #64748b;
          margin: 4px 0 0;
          flex: 1;
        }

        .view-all-btn {
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 8px 16px;
          background: white;
          border: 1px solid #e2e8f0;
          border-radius: 10px;
          color: #10b981;
          cursor: pointer;
          font-weight: 500;
          transition: all 0.2s;
        }

        .view-all-btn:hover {
          background: #f0fdf4;
          border-color: #10b981;
        }

        .centers-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
          gap: 24px;
          margin-bottom: 48px;
        }

        .center-card {
          background: white;
          border-radius: 20px;
          overflow: hidden;
          box-shadow: 0 1px 3px rgba(0,0,0,0.1);
          transition: all 0.3s;
        }

        .center-card.hovered {
          transform: translateY(-4px);
          box-shadow: 0 20px 25px -5px rgba(0,0,0,0.1);
        }

        .center-header {
          background: linear-gradient(135deg, #0f766e, #0d9488);
          padding: 16px 20px;
        }

        .center-header-content {
          display: flex;
          justify-content: space-between;
          align-items: center;
          color: white;
        }

        .center-id {
          font-size: 12px;
          opacity: 0.9;
        }

        .center-content {
          padding: 20px;
        }

        .center-name {
          font-size: 18px;
          font-weight: 700;
          color: #0f172a;
          margin: 0 0 8px;
        }

        .center-location {
          display: flex;
          align-items: center;
          gap: 6px;
          color: #64748b;
          font-size: 13px;
          margin-bottom: 20px;
        }

        .center-stats-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 12px;
          padding: 16px 0;
          border-top: 1px solid #e2e8f0;
          border-bottom: 1px solid #e2e8f0;
          margin-bottom: 16px;
        }

        .center-stat {
          text-align: center;
        }

        .stat-number {
          display: block;
          font-size: 18px;
          font-weight: 700;
          color: #0f172a;
        }

        .stat-label-sm {
          font-size: 10px;
          color: #64748b;
        }

        .today-activity {
          display: flex;
          gap: 12px;
          margin-bottom: 20px;
        }

        .activity-badge {
          flex: 1;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 6px;
          padding: 8px;
          border-radius: 8px;
          font-size: 11px;
          font-weight: 500;
        }

        .activity-badge.enrollment {
          background: #d1fae5;
          color: #065f46;
        }

        .activity-badge.discharge {
          background: #fee2e2;
          color: #991b1b;
        }

        .center-actions {
          display: flex;
          gap: 10px;
        }

        .action-btn {
          flex: 1;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 6px;
          padding: 10px;
          border-radius: 10px;
          font-weight: 600;
          font-size: 12px;
          transition: all 0.2s;
          text-decoration: none;
          cursor: pointer;
          border: none;
        }

        .admission-btn {
          background: #10b981;
          color: white;
        }

        .admission-btn:hover {
          background: #059669;
          transform: translateY(-2px);
        }

        .discharge-btn {
          background: #f1f5f9;
          color: #ef4444;
          border: 1px solid #fee2e2;
        }

        .discharge-btn:hover {
          background: #fee2e2;
          transform: translateY(-2px);
        }

        .records-btn {
          background: #f1f5f9;
          color: #8b5cf6;
          border: 1px solid #ede9fe;
        }

        .records-btn:hover {
          background: #ede9fe;
          transform: translateY(-2px);
        }

        /* Activity Table */
        .recent-activity-section {
          background: white;
          border-radius: 20px;
          padding: 24px;
          box-shadow: 0 1px 3px rgba(0,0,0,0.1);
          margin-bottom: 48px;
        }

        .activity-table-container {
          overflow-x: auto;
        }

        .activity-table {
          width: 100%;
          border-collapse: collapse;
        }

        .activity-table th {
          text-align: left;
          padding: 12px;
          background: #f8fafc;
          color: #475569;
          font-weight: 600;
          font-size: 13px;
        }

        .activity-table td {
          padding: 12px;
          border-bottom: 1px solid #e2e8f0;
          color: #0f172a;
          font-size: 14px;
        }

        .type-badge {
          padding: 4px 8px;
          border-radius: 6px;
          font-size: 11px;
          font-weight: 500;
        }

        .admission-badge {
          background: #d1fae5;
          color: #065f46;
        }

        .discharge-badge {
          background: #fee2e2;
          color: #991b1b;
        }

        .status-badge {
          padding: 4px 8px;
          border-radius: 6px;
          font-size: 11px;
          font-weight: 500;
        }

        .status-badge.success {
          background: #d1fae5;
          color: #065f46;
        }

        .status-badge.pending {
          background: #fef3c7;
          color: #92400e;
        }

        .text-green-600 {
          color: #10b981;
        }

        /* Quick Links Section */
        .quick-links-section {
          margin-top: 24px;
        }

        .quick-links-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
          gap: 20px;
        }

        .quick-link-card {
          background: white;
          border-radius: 20px;
          padding: 24px;
          text-decoration: none;
          transition: all 0.3s;
          box-shadow: 0 1px 3px rgba(0,0,0,0.1);
          position: relative;
          display: block;
        }

        .quick-link-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 10px 25px -5px rgba(0,0,0,0.1);
        }

        .quick-link-icon {
          width: 56px;
          height: 56px;
          background: #f1f5f9;
          border-radius: 16px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #10b981;
          margin-bottom: 16px;
        }

        .quick-link-card h3 {
          font-size: 18px;
          font-weight: 600;
          color: #0f172a;
          margin: 0 0 8px;
        }

        .quick-link-card p {
          font-size: 13px;
          color: #64748b;
          margin: 0;
        }

        .quick-link-arrow {
          position: absolute;
          bottom: 20px;
          right: 20px;
          font-size: 20px;
          color: #cbd5e1;
          transition: all 0.3s;
        }

        .quick-link-card:hover .quick-link-arrow {
          color: #10b981;
          transform: translateX(4px);
        }

        /* Responsive */
        @media (max-width: 768px) {
          .mobile-menu-btn {
            display: block;
          }
          
          .header-actions {
            display: none;
            position: absolute;
            top: 100%;
            left: 0;
            right: 0;
            background: white;
            flex-direction: column;
            padding: 20px;
            border-bottom: 1px solid #e2e8f0;
            box-shadow: 0 4px 6px -1px rgba(0,0,0,0.1);
          }
          
          .header-actions.mobile-open {
            display: flex;
          }
          
          .admin-info {
            border-left: none;
            padding-left: 0;
            width: 100%;
          }
          
          .logout-btn {
            width: 100%;
            justify-content: center;
          }
          
          .welcome-banner {
            flex-direction: column;
            text-align: center;
            gap: 16px;
          }
          
          .centers-grid {
            grid-template-columns: 1fr;
          }
          
          .stats-grid {
            grid-template-columns: 1fr;
          }
          
          .main-content {
            padding: 20px;
          }
          
          .center-stats-grid {
            grid-template-columns: repeat(2, 1fr);
          }
          
          .center-actions {
            flex-direction: column;
          }
        }
      `}</style>
    </div>
  );
}

export default Dashboard;