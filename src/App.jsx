import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { AuthProvider, useAuth } from './context/AuthContext'
import LoginPage from './components/auth/LoginPage'
import DashboardLayout from './components/layout/DashboardLayout'
import QuestionPapers from './components/features/QuestionPapers'
import Attendance from './components/features/Attendance'
import Library from './components/features/Library'
import Analysis from './components/features/Analysis'
import Notes from './components/features/Notes'
import GroupStudy from './components/features/GroupStudy'
import PeerTutoring from './components/features/PeerTutoring'
import DoubtSolving from './components/features/DoubtSolving'
import StudyMarathons from './components/features/StudyMarathons'
import Results from './components/features/Results'
import Alumni from './components/features/Alumni'
import './App.css'

// Protected Route Component
const ProtectedRoute = ({ children }) => {
    const { user, loading } = useAuth();
    if (loading) return <div>Loading...</div>;
    if (!user) return <Navigate to="/login" />;
    return children;
};

// Placeholder for Dashboard Home
const DashboardHome = () => (
    <div className="dashboard-home">
        <div className="welcome-banner">
            <h2>Welcome back to Connect & Prep!</h2>
            <p>Your centralized hub for academic excellence.</p>
        </div>

        <div className="grid-container">
            <div className="card stat-card">
                <h3>Study Streak</h3>
                <p className="big-number">12 Days</p>
            </div>
            <div className="card stat-card">
                <h3>Tasks Pending</h3>
                <p className="big-number">5</p>
            </div>
            <div className="card stat-card">
                <h3>Next Event</h3>
                <p>Mathematics Marathon - 2 PM</p>
            </div>
        </div>
    </div>
);

function App() {
    return (
        <AuthProvider>
            <BrowserRouter>
                <Routes>
                    <Route path="/login" element={<LoginPage />} />
                    <Route path="/" element={<Navigate to="/dashboard" />} />

                    <Route path="/dashboard" element={
                        <ProtectedRoute>
                            <DashboardLayout />
                        </ProtectedRoute>
                    }>
                        <Route index element={<DashboardHome />} />
                        <Route path="papers" element={<QuestionPapers />} />
                        <Route path="analysis" element={<Analysis />} />
                        <Route path="notes" element={<Notes />} />
                        <Route path="groups" element={<GroupStudy />} />
                        <Route path="p2p" element={<PeerTutoring />} />
                        <Route path="marathons" element={<StudyMarathons />} />
                        <Route path="doubts" element={<DoubtSolving />} />
                        <Route path="results" element={<Results />} />
                        <Route path="library" element={<Library />} />
                        <Route path="attendance" element={<Attendance />} />
                    </Route>
                </Routes>
            </BrowserRouter>
        </AuthProvider>
    )
}

export default App
