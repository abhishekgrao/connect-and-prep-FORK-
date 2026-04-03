import React, { useState, useEffect } from 'react';
import { mockBackend } from '../../services/mockBackend';
import { AlertTriangle, Calendar, Clock } from 'lucide-react';
import './FeatureStyles.css';

// Subject → color mapping (matching screenshot vibes)
const subjectColors = {
    'COM SKILLS': '#ff8c00',
    'PHY LAB': '#00d4ff',
    'INUNITY': '#ffe600',
    'EC': '#4d7cff',
    'CONS': '#a855f7',
    'C': '#ef4444',
    'MAT': '#22c55e',
    'CADE-LAB': '#00d4ff',
    'PHY': '#94a3b8',
    'MATLAB': '#4ade80',
    'C-LAB': '#06b6d4',
    'CADE-T': '#84cc16',
};

// BREAK and LUNCH letters
const breakLetters = ['B', 'R', 'E', 'A', 'K'];
const lunchLetters = ['L', 'U', 'N', 'C', 'H'];

const Timetable = () => {
    const { timetable } = mockBackend;
    const [currentTime, setCurrentTime] = useState(new Date());

    useEffect(() => {
        const timer = setInterval(() => setCurrentTime(new Date()), 60000);
        return () => clearInterval(timer);
    }, []);

    // Get current day
    const dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const todayName = dayNames[new Date().getDay()];

    // Build lookup for each day: period → slot
    const dayLookup = {};
    timetable.schedule.forEach(dayObj => {
        const map = {};
        dayObj.slots.forEach(slot => {
            map[slot.period] = slot;
        });
        dayLookup[dayObj.day] = map;
    });

    // Determine which periods are "consumed" by a spanning slot
    const getConsumedPeriods = (dayObj) => {
        const consumed = new Set();
        dayObj.slots.forEach(slot => {
            for (let p = slot.period + 1; p < slot.period + slot.span; p++) {
                consumed.add(p);
            }
        });
        return consumed;
    };

    return (
        <div className="timetable-container animate-enter" style={{ padding: '2rem' }}>
            <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '1rem' }}>
                <div className="current-time" style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    background: 'var(--bg-card)',
                    padding: '8px 16px',
                    borderRadius: '20px',
                    border: '1px solid var(--border-color)',
                    fontSize: '0.9rem',
                    fontWeight: '600'
                }}>
                    <Clock size={16} color="var(--accent-primary)" />
                    <span>{currentTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                </div>
            </div>

            {/* Excel-like Table */}
            <div className="tt-table-wrapper">
                <table className="tt-excel-table">
                    <thead>
                        <tr>
                            {/* Corner */}
                            <th className="tt-corner-header">DAY</th>
                            {/* Period 1, 2 */}
                            <th className="tt-period-header">1</th>
                            <th className="tt-period-header">2</th>
                            {/* Break */}
                            <th className="tt-separator-header"></th>
                            {/* Period 3, 4 */}
                            <th className="tt-period-header">3</th>
                            <th className="tt-period-header">4</th>
                            {/* Lunch */}
                            <th className="tt-separator-header"></th>
                            {/* Period 5, 6 */}
                            <th className="tt-period-header">5</th>
                            <th className="tt-period-header">6</th>
                        </tr>
                    </thead>
                    <tbody>
                        {timetable.schedule.map((dayObj, rowIdx) => {
                            const isToday = dayObj.day === todayName;
                            const consumed = getConsumedPeriods(dayObj);
                            const lookup = dayLookup[dayObj.day];

                            const renderPeriodCells = (periodList) => {
                                const cells = [];
                                for (const p of periodList) {
                                    if (consumed.has(p)) continue; // skip, already merged
                                    const slot = lookup[p];
                                    if (!slot) {
                                        cells.push(
                                            <td key={p} className="tt-cell tt-empty">
                                                <span className="tt-empty-dash">—</span>
                                            </td>
                                        );
                                    } else {
                                        const bgColor = subjectColors[slot.subject] || '#666';
                                        const textColor = ['#ffe600', '#4ade80', '#84cc16', '#22c55e', '#fbbf24'].includes(bgColor) ? '#000' : '#fff';
                                        cells.push(
                                            <td
                                                key={p}
                                                className="tt-cell tt-filled"
                                                colSpan={slot.span}
                                            >
                                                <div
                                                    className="tt-subject-cell"
                                                    style={{
                                                        background: bgColor,
                                                        color: textColor,
                                                    }}
                                                >
                                                    <span className="tt-subject-name">{slot.subject}</span>
                                                    <span className="tt-subject-type">{slot.type}</span>
                                                </div>
                                            </td>
                                        );
                                    }
                                }
                                return cells;
                            };

                            return (
                                <tr key={dayObj.day} className={`tt-row ${isToday ? 'tt-today-row' : ''}`} style={{ animationDelay: `${rowIdx * 80}ms` }}>
                                    {/* Day label */}
                                    <td className={`tt-day-cell ${isToday ? 'tt-today' : ''}`}>
                                        <span className="tt-day-label">{dayObj.day.toUpperCase()}</span>
                                        {isToday && <span className="tt-today-badge">TODAY</span>}
                                    </td>

                                    {/* Periods 1-2 */}
                                    {renderPeriodCells([1, 2])}

                                    {/* BREAK separator */}
                                    <td className="tt-separator-cell tt-break">
                                        <span>{breakLetters[rowIdx] || ''}</span>
                                    </td>

                                    {/* Periods 3-4 */}
                                    {renderPeriodCells([3, 4])}

                                    {/* LUNCH separator */}
                                    <td className="tt-separator-cell tt-lunch">
                                        <span>{lunchLetters[rowIdx] || ''}</span>
                                    </td>

                                    {/* Periods 5-6 */}
                                    {renderPeriodCells([5, 6])}
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>

            {/* Legend */}
            <div className="tt-legend">
                {Object.entries(subjectColors).map(([subject, color]) => (
                    <div key={subject} className="tt-legend-item">
                        <span className="tt-legend-dot" style={{ background: color }}></span>
                        <span>{subject}</span>
                    </div>
                ))}
            </div>

            {/* Upcoming Exams */}
            <div className="exams-section" style={{ marginTop: '3rem' }}>
                <h2 style={{ marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <AlertTriangle size={24} color="var(--error)" /> Upcoming Exams
                </h2>
                <div className="exams-grid">
                    {timetable.exams.map((exam, i) => (
                        <div key={i} className="exam-card">
                            <Calendar size={20} />
                            <div>
                                <h4>{exam.subject}</h4>
                                <p>{exam.type} — {exam.date}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Timetable;
