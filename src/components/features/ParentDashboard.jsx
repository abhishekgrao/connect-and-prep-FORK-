import React from 'react';
import { mockBackend } from '../../services/mockBackend';
import { 
    Users, Activity, Wallet, Bell, 
    TrendingUp, User, Home, BookOpen, 
    Calendar, CheckCircle2, AlertTriangle, 
    ShieldAlert, Award
} from 'lucide-react';
import './FeatureStyles.css';

const ParentDashboard = () => {
    const parent = mockBackend.parentData || {};
    const child = parent.childPerformance || {};
    const fees = parent.fees || [];
    const notices = parent.notices || [];

    return (
        <div className="parent-dashboard-container">
            <header className="parent-welcome">
                <h1>Welcome Back, Parent! 👋</h1>
                <p>Track your child's progress and stay updated with school notices.</p>
            </header>

            <div className="summary-cards">
                <div className="summary-card attendance">
                    <div className="card-icon"><Activity size={24} color="#00ffcc" /></div>
                    <div className="card-info">
                        <h3>{child.attendance}%</h3>
                        <p>Total Attendance</p>
                    </div>
                </div>
                <div className="summary-card homework">
                    <div className="card-icon"><CheckCircle2 size={24} color="#a78bfa" /></div>
                    <div className="card-info">
                        <h3>{child.homeworkCompletion}%</h3>
                        <p>Homework Compliance</p>
                    </div>
                </div>
                <div className="summary-card behavior">
                    <div className="card-icon"><TrendingUp size={24} color="#f472b6" /></div>
                    <div className="card-info">
                        <h3>{child.behavior}</h3>
                        <p>Weekly Behavior Status</p>
                    </div>
                </div>
                <div className="summary-card safety">
                    <div className="card-icon"><ShieldAlert size={24} color="#fbbf24" /></div>
                    <div className="card-info">
                        <h3>Safe</h3>
                        <p>Online Presence</p>
                    </div>
                </div>
                <div className="summary-card cgpa">
                    <div className="card-icon"><Award size={24} color="#a78bfa" /></div>
                    <div className="card-info">
                        <h3>{child.cgpa}</h3>
                        <p>Cumulative CGPA</p>
                    </div>
                </div>
            </div>

            <div className="parent-layout-grid">
                {/* Recent Grades Section */}
                <div className="parent-section grades">
                    <div className="section-header">
                        <h3>Recent Grades</h3>
                        <TrendingUp size={20} />
                    </div>
                    <div className="grade-list">
                        {(child.recentGrades || []).map((g, idx) => (
                            <div key={idx} className="grade-row">
                                <div className="subject-icon"><BookOpen size={16} /></div>
                                <div className="subject-name">{g.subject}</div>
                                <div className="grade-value">{g.grade}</div>
                                <div className="grade-date">{g.date}</div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Fees and Dues Section */}
                <div className="parent-section fees">
                    <div className="section-header">
                        <h3>Fees & Dues</h3>
                        <Wallet size={20} />
                    </div>
                    <div className="fee-list">
                        {(fees || []).map(fee => (
                            <div key={fee.id} className={`fee-row ${fee.status.toLowerCase()}`}>
                                <div className="fee-info">
                                    <span className="fee-title">{fee.title}</span>
                                    <span className="fee-amount">{fee.amount}</span>
                                </div>
                                <button className={`pay-btn ${fee.status.toLowerCase()}`}>
                                    {fee.status === 'Paid' ? 'Paid' : 'Pay Now'}
                                </button>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Teacher Remarks */}
                <div className="parent-section remarks">
                    <div className="section-header">
                        <h3>Teacher Remarks</h3>
                        <Bell size={20} />
                    </div>
                    <div className="remark-box">
                        <User size={20} className="teacher-avatar" />
                        <p>"{child.teacherRemarks}"</p>
                        <span className="teacher-name">- Class Teacher</span>
                    </div>
                </div>

                {/* School Notices */}
                <div className="parent-section notices">
                    <div className="section-header">
                        <h3>School Notices</h3>
                        <Calendar size={20} />
                    </div>
                    <div className="notice-list">
                        {(notices || []).map(notice => (
                            <div key={notice.id} className="notice-item">
                                <div className="notice-top">
                                    <span className="notice-title">{notice.title}</span>
                                    <span className="notice-date">{notice.date}</span>
                                </div>
                                <p className="notice-msg">{notice.message}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ParentDashboard;
