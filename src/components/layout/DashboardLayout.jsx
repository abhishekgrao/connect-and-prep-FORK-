import React, { useState } from 'react';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import {
    BookOpen,
    BarChart2,
    FileText,
    Users,
    MessageSquare,
    Award,
    LogOut,
    Menu,
    X,
    Layout,
    Library,
    GraduationCap,
    Calendar,
    UserCheck,
    Timer,
    Bell
} from 'lucide-react';
import './DashboardLayout.css';

const DashboardLayout = () => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    const navItems = [
        { label: 'Dashboard', icon: <Layout size={20} />, path: '/dashboard' },
        { label: 'Question Papers', icon: <FileText size={20} />, path: '/dashboard/papers' },
        { label: 'Answer Analysis', icon: <BarChart2 size={20} />, path: '/dashboard/analysis' },
        { label: 'Notes & PYQs', icon: <BookOpen size={20} />, path: '/dashboard/notes' },
        { label: 'Group Study', icon: <Users size={20} />, path: '/dashboard/groups' },
        { label: 'P2P Tutoring', icon: <UserCheck size={20} />, path: '/dashboard/p2p' },
        { label: 'Study Marathons', icon: <Timer size={20} />, path: '/dashboard/marathons' },
        { label: 'Doubt Solving', icon: <MessageSquare size={20} />, path: '/dashboard/doubts' },
        { label: 'Results & AI', icon: <Award size={20} />, path: '/dashboard/results' },
        { label: 'Library', icon: <Library size={20} />, path: '/dashboard/library' },
        { label: 'Attendance', icon: <Calendar size={20} />, path: '/dashboard/attendance' },
    ];

    return (
        <div className="dashboard-container">
            {/* Sidebar */}
            <aside className="sidebar">
                <div className="sidebar-header">
                    <div className="logo-area">
                        <GraduationCap size={32} color="#646cff" />
                        <span className="sidebar-text">Connect & Prep</span>
                    </div>
                </div>

                <nav className="sidebar-nav">
                    {navItems.map((item) => (
                        <div
                            key={item.path}
                            className={`nav-item ${location.pathname === item.path ? 'active' : ''}`}
                            onClick={() => navigate(item.path)}
                        >
                            <div className="icon-container">{item.icon}</div>
                            <span className="sidebar-text">{item.label}</span>
                        </div>
                    ))}
                </nav>
            </aside>

            {/* Main Content */}
            <main className="main-content">
                <header className="top-bar">
                    <h2>{navItems.find(i => i.path === location.pathname)?.label || 'Dashboard'}</h2>

                    <div className="header-right-section" style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
                        <button className="notification-btn-header">
                            <Bell size={24} />
                            <span className="notif-badge">3</span>
                        </button>
                        <div className="profile-dropdown-container">
                            <ProfileMenu user={user} logout={handleLogout} />
                        </div>
                    </div>
                </header>

                <div className="content-area">
                    <Outlet />
                </div>
            </main>
        </div>
    );
};

// Sub-component for Profile Menu
const ProfileMenu = ({ user, logout }) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="profile-menu-wrapper">
            <button className="profile-btn" onClick={() => setIsOpen(!isOpen)}>
                <div className="avatar-circle">
                    {user?.name?.charAt(0) || 'U'}
                </div>
                <div className="user-text">
                    <span className="name">{user?.name || 'User'}</span>
                    <span className="role">{user?.role || 'Student'}</span>
                </div>
            </button>

            {isOpen && (
                <div className="dropdown-menu">
                    <div className="dropdown-header">
                        <p className="d-name">Name: {user?.name}</p>
                        <p className="d-usn">USN: 4VV25EC032</p>
                    </div>
                    <div className="dropdown-item">Profile</div>
                    <div className="dropdown-item">Change Password</div>
                    <div className="dropdown-item logout" onClick={logout}>
                        <LogOut size={16} /> Logout
                    </div>
                </div>
            )}
            {isOpen && <div className="backdrop" onClick={() => setIsOpen(false)} />}
        </div>
    );
};

export default DashboardLayout;
