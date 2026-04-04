import React from 'react';
import { Users, BookOpen, Clock, Calendar, CheckSquare, BarChart, Bell, PlusCircle } from 'lucide-react';
import { mockBackend } from '../../services/mockBackend';
import './FeatureStyles.css';

const TeacherDashboard = () => {
    const data = mockBackend.teacherData;
    const stats = data.stats;

    return (
        <div className="feature-container animate-enter">
            <div className="feature-header">
                <div className="header-text">
                    <h3>Teacher Dashboard <BookOpen size={24} className="sparkle-icon" /></h3>
                    <p>Welcome back! Here's an overview of your active classes and pending tasks.</p>
                </div>
                <button className="add-task-btn">
                    <PlusCircle size={18} /> New Remark
                </button>
            </div>

            <div className="stats-grid">
                <div className="stat-card accent-blue">
                    <div className="stat-icon"><Users /></div>
                    <div className="stat-info">
                        <span className="stat-value">{stats.activeStudents}</span>
                        <span className="stat-label">Total Students</span>
                    </div>
                </div>
                <div className="stat-card accent-purple">
                    <div className="stat-icon"><Clock /></div>
                    <div className="stat-info">
                        <span className="stat-value">{stats.upcomingClasses}</span>
                        <span className="stat-label">Classes Today</span>
                    </div>
                </div>
                <div className="stat-card accent-orange">
                    <div className="stat-icon"><CheckSquare /></div>
                    <div className="stat-info">
                        <span className="stat-value">{stats.pendingGrading}</span>
                        <span className="stat-label">Pending Lab/IA</span>
                    </div>
                </div>
                <div className="stat-card accent-green">
                    <div className="stat-icon"><BarChart /></div>
                    <div className="stat-info">
                        <span className="stat-value">{stats.avergeClassGPA}</span>
                        <span className="stat-label">Avg. Class GPA</span>
                    </div>
                </div>
            </div>

            <div className="dashboard-content-grid" style={{ 
                display: 'grid', 
                gridTemplateColumns: '2fr 1fr', 
                gap: '2rem', 
                marginTop: '2rem' 
            }}>
                {/* Left Column: My Classes */}
                <div className="dashboard-section" style={{
                    background: 'var(--bg-card)',
                    padding: '2rem',
                    border: '2px solid var(--border-color)',
                    boxShadow: 'var(--neo-shadow)'
                }}>
                    <h4 style={{ marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <Calendar size={20} color="var(--accent-primary)" /> Today's Schedule
                    </h4>
                    <div className="classes-list">
                        {data.classes.map(cls => (
                            <div key={cls.id} className="class-item" style={{
                                display: 'flex',
                                justifyContent: 'space-between',
                                alignItems: 'center',
                                padding: '1rem',
                                borderBottom: '1px solid rgba(255,255,255,0.05)',
                                transition: 'all 0.2s ease'
                            }}>
                                <div>
                                    <h5 style={{ fontSize: '1rem', fontWeight: '800' }}>{cls.name}</h5>
                                    <p style={{ fontSize: '0.8rem', color: '#888' }}>
                                        Section {cls.section} • {cls.venue}
                                    </p>
                                </div>
                                <div style={{ textAlign: 'right' }}>
                                    <span style={{ 
                                        fontSize: '0.8rem', 
                                        fontWeight: '700', 
                                        color: 'var(--accent-primary)',
                                        background: 'rgba(255,255,255,0.05)',
                                        padding: '4px 10px',
                                        borderRadius: '4px'
                                    }}>
                                        {cls.time}
                                    </span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Right Column: Recent Submissions */}
                <div className="dashboard-section" style={{
                    background: 'var(--bg-card)',
                    padding: '2rem',
                    border: '2px solid var(--border-color)',
                    boxShadow: 'var(--neo-shadow)'
                }}>
                    <h4 style={{ marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <Bell size={20} color="var(--accent-action)" /> Recent Submissions
                    </h4>
                    <div className="submissions-list">
                        {data.recentSubmissions.map(sub => (
                            <div key={sub.id} style={{ marginBottom: '1.25rem' }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                                    <p style={{ fontSize: '0.85rem', fontWeight: '800' }}>{sub.student}</p>
                                    <span style={{ fontSize: '0.7rem', color: '#666' }}>{sub.time}</span>
                                </div>
                                <p style={{ fontSize: '0.75rem', color: '#888' }}>{sub.subject}: {sub.title}</p>
                                <button style={{ 
                                    marginTop: '8px',
                                    fontSize: '0.7rem',
                                    background: 'transparent',
                                    border: '1px solid #444',
                                    color: '#aaa',
                                    padding: '2px 8px',
                                    cursor: 'pointer'
                                }}>
                                    Review
                                </button>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TeacherDashboard;
