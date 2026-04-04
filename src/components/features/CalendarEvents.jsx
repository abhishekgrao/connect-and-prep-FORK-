import React from 'react';
import { Calendar, Clock, MapPin, Tag, Award, Bell } from 'lucide-react';
import { mockBackend } from '../../services/mockBackend';
import './FeatureStyles.css';

const CalendarEvents = () => {
    const events = mockBackend.calendarEvents || [];

    const getStatusColor = (status) => {
        switch(status.toLowerCase()) {
            case 'upcoming': return 'var(--accent-primary)';
            case 'important': return 'var(--error)';
            case 'completed': return 'var(--success)';
            default: return 'var(--text-secondary)';
        }
    };

    const getTypeIcon = (type) => {
        switch(type.toLowerCase()) {
            case 'fest': return <Award size={18} />;
            case 'exam': return <Clock size={18} />;
            case 'holiday': return <Bell size={18} />;
            default: return <Tag size={18} />;
        }
    };

    return (
        <div className="feature-container animate-enter">
            <div className="feature-header">
                <div className="header-text">
                    <h3>Calendar of Events <Calendar size={20} className="sparkle-icon" /></h3>
                    <p>Stay updated with all upcoming school activities, exams, and holidays.</p>
                </div>
            </div>

            <div className="events-grid" style={{ 
                display: 'grid', 
                gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', 
                gap: '1.5rem',
                marginTop: '2rem'
            }}>
                {events.map(event => (
                    <div key={event.id} className="event-card" style={{
                        background: 'var(--bg-card)',
                        border: '2px solid var(--border-color)',
                        padding: '1.5rem',
                        boxShadow: '6px 6px 0px rgba(255,255,255,0.05)',
                        position: 'relative',
                        overflow: 'hidden'
                    }}>
                        <div className="event-status-strip" style={{
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            width: '100%',
                            height: '4px',
                            background: getStatusColor(event.status)
                        }} />
                        
                        <div className="event-type-badge" style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '8px',
                            fontSize: '0.7rem',
                            fontWeight: '800',
                            textTransform: 'uppercase',
                            color: getStatusColor(event.status),
                            marginBottom: '1rem'
                        }}>
                            {getTypeIcon(event.type)}
                            {event.type}
                        </div>

                        <h4 style={{ fontSize: '1.25rem', fontWeight: '900', marginBottom: '0.5rem' }}>{event.title}</h4>
                        <p style={{ fontSize: '0.85rem', color: '#888', marginBottom: '1.5rem', lineHeight: '1.6' }}>{event.description}</p>

                        <div className="event-meta" style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            borderTop: '1px solid rgba(255,255,255,0.05)',
                            paddingTop: '1rem'
                        }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.8rem', fontWeight: '700' }}>
                                <Calendar size={14} color="var(--accent-action)" />
                                {event.date}
                            </div>
                            <div style={{ 
                                fontSize: '0.7rem', 
                                padding: '4px 8px', 
                                background: 'rgba(255,255,255,0.05)', 
                                border: '1px solid #333',
                                borderRadius: '4px',
                                textTransform: 'uppercase',
                                fontWeight: '800'
                            }}>
                                {event.status}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default CalendarEvents;
