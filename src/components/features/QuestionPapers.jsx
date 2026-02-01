import React, { useState } from 'react';
import { Search, FileText, Download, Filter, Upload, Plus, Trash2 } from 'lucide-react';
import { mockBackend } from '../../services/mockBackend';
import { useAuth } from '../../context/AuthContext';
import './FeatureStyles.css';

const QuestionPapers = () => {
    const { user } = useAuth();
    const [papers, setPapers] = useState(mockBackend.questionPapers);

    // Filters
    const [year, setYear] = useState('');
    const [college, setCollege] = useState('');
    const [subject, setSubject] = useState('');
    const [examType, setExamType] = useState('');

    // Filtering Logic
    const filteredPapers = papers.filter(p => {
        return (!year || p.year === year) &&
            (!college || p.college === college) &&
            (!subject || p.subject === subject) &&
            (!examType || p.type === examType);
    });

    // Mock Upload Logic
    const handleUpload = () => {
        // Simple prompt for demo purposes
        alert("In a real app, this would open a file picker and upload to the specific folder path: " +
            `${year || 'Year'}/${college || 'College'}/${subject || 'Subject'}/${examType || 'Exam'}`);

        // Simulating a successful upload
        if (year && college && subject && examType) {
            const newPaper = {
                id: Date.now(),
                year,
                college,
                subject,
                type: examType,
                file: `uploaded_${Date.now()}.pdf`
            };
            // Check for duplicates (Simple mock check)
            const isDuplicate = papers.some(p =>
                p.year === newPaper.year &&
                p.college === newPaper.college &&
                p.subject === newPaper.subject &&
                p.type === newPaper.type
            );

            if (isDuplicate) {
                alert("Duplicate Warning: A paper with these exact details already exists!");
            } else {
                setPapers([...papers, newPaper]);
                alert("Paper uploaded successfully!");
            }
        } else {
            alert("Please select all filters (Year, College, Subject, Exam Type) to upload to the correct folder.");
        }
    };

    return (
        <div className="feature-container">
            <div className="feature-header">
                <h1>Question Papers Database</h1>
                {user.role === 'teacher' && (
                    <button className="login-btn" style={{ width: 'auto', padding: '0.5rem 1rem', fontSize: '0.9rem' }} onClick={handleUpload}>
                        <Upload size={18} style={{ marginRight: '8px' }} /> Upload Paper
                    </button>
                )}
            </div>

            {/* Filter Section */}
            <div className="filters-card grid-container" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', marginBottom: '2rem', gap: '1rem' }}>
                <select value={year} onChange={(e) => setYear(e.target.value)} className="filter-select">
                    <option value="">Select Year</option>
                    {mockBackend.years.map(y => <option key={y} value={y}>{y}</option>)}
                </select>
                <select value={college} onChange={(e) => setCollege(e.target.value)} className="filter-select">
                    <option value="">Select College</option>
                    {mockBackend.colleges.map(c => <option key={c} value={c}>{c}</option>)}
                </select>
                <select value={subject} onChange={(e) => setSubject(e.target.value)} className="filter-select">
                    <option value="">Select Subject</option>
                    {mockBackend.subjects.map(s => <option key={s} value={s}>{s}</option>)}
                </select>
                <select value={examType} onChange={(e) => setExamType(e.target.value)} className="filter-select">
                    <option value="">Select Exam Type</option>
                    {mockBackend.examTypes.map(t => <option key={t} value={t}>{t}</option>)}
                </select>
            </div>

            {/* Results Grid */}
            <div className="papers-grid">
                {filteredPapers.length > 0 ? (
                    filteredPapers.map((paper) => (
                        <div key={paper.id} className="paper-card">
                            <div className="paper-icon">
                                <FileText size={40} color="#646cff" />
                            </div>
                            <div className="paper-info">
                                <h3>{paper.subject}</h3>
                                <p className="meta">{paper.college}</p>
                                <div style={{ display: 'flex', gap: '8px', fontSize: '0.8rem', color: '#888', marginTop: '4px' }}>
                                    <span style={{ background: '#333', padding: '2px 6px', borderRadius: '4px' }}>{paper.year}</span>
                                    <span style={{ background: '#333', padding: '2px 6px', borderRadius: '4px' }}>{paper.type}</span>
                                </div>
                            </div>
                            <div style={{ display: 'flex', gap: '0.5rem', width: '100%' }}>
                                <button className="download-btn" style={{ flex: 1 }}>
                                    <Download size={18} /> View
                                </button>
                                {user.role === 'teacher' && (
                                    <button className="icon-btn" style={{ background: '#f8717120', color: '#f87171', borderColor: 'transparent' }} title="Delete">
                                        <Trash2 size={18} />
                                    </button>
                                )}
                            </div>
                        </div>
                    ))
                ) : (
                    <div style={{ gridColumn: '1/-1', textAlign: 'center', color: '#888', padding: '3rem' }}>
                        <FileText size={48} style={{ opacity: 0.2, marginBottom: '1rem' }} />
                        <p>No papers found for these filters.</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default QuestionPapers;
