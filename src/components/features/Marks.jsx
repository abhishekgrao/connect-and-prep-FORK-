import React from 'react';
import { mockBackend } from '../../services/mockBackend';
import { Award, BookOpen, CheckCircle, HelpCircle } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import './FeatureStyles.css';

const Marks = () => {
    const { user } = useAuth();
    const marks = mockBackend.studentMarks || [];
    const isParent = user?.role === 'parent';

    const getStatus = (total) => {
        if (total >= 90) return { label: 'S+', color: '#4ade80' };
        if (total >= 80) return { label: 'A', color: '#22c55e' };
        if (total >= 70) return { label: 'B', color: '#fbbf24' };
        if (total >= 60) return { label: 'C', color: '#f59e0b' };
        return { label: 'D', color: '#f87171' };
    };

    return (
        <div className="feature-container animate-enter">
            <div className="feature-header">
                <div className="header-text">
                    <h3>{isParent ? "Your Child's Marks" : "Internal & Semester Marks"} <Award size={20} className="sparkle-icon" /></h3>
                    <p>{isParent ? "Comprehensive breakdown of your child's academic performance." : "Comprehensive breakdown of your academic performances across all assessments."}</p>
                </div>
            </div>

            <div className="summary-section" style={{ marginTop: '2rem' }}>
                <table className="data-table marks-table">
                    <thead>
                        <tr>
                            <th style={{ width: '40%' }}>Course / Subject</th>
                            <th>IA-1 (20)</th>
                            <th>IA-2 (20)</th>
                            <th>IA-3 (20)</th>
                            <th>SEE (100)</th>
                            <th>Grade</th>
                        </tr>
                    </thead>
                    <tbody>
                        {marks.map((item, idx) => {
                            const status = getStatus(item.total);
                            return (
                                <tr key={idx}>
                                    <td className="subject-cell">
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                            <div className="icon-bg"><BookOpen size={16} /></div>
                                            <span>{item.subject}</span>
                                        </div>
                                    </td>
                                    <td>{item.ia1}</td>
                                    <td>{item.ia2}</td>
                                    <td>{item.ia3}</td>
                                    <td>{item.see}</td>
                                    <td>
                                        <span 
                                            className="status-badge" 
                                            style={{ 
                                                background: status.color, 
                                                color: '#000',
                                                fontWeight: 'bold',
                                                minWidth: '40px',
                                                textAlign: 'center'
                                            }}
                                        >
                                            {status.label}
                                        </span>
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>

            <div className="info-box" style={{ 
                marginTop: '2rem', 
                background: '#1a1a1a', 
                border: '1px solid #333', 
                padding: '1.5rem', 
                borderRadius: '8px',
                display: 'flex',
                gap: '1rem',
                alignItems: 'flex-start'
            }}>
                <HelpCircle size={24} color="var(--accent-primary)" />
                <div className="info-content">
                    <h4 style={{ color: '#fff', marginBottom: '0.5rem' }}>Understanding the Grading System</h4>
                    <ul style={{ color: '#aaa', fontSize: '0.9rem', lineHeight: '1.6' }}>
                        <li><strong>IA:</strong> Internal Assessment (Average of top two or as per scheme).</li>
                        <li><strong>SEE:</strong> Semester End Examination (Scaled to weightage).</li>
                        <li><strong>CIE + SEE:</strong> Continuous Internal Evaluation + Semester End Exam results.</li>
                        <li>Minimum passing marks: 40% combined score and 35% in SEE.</li>
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default Marks;
