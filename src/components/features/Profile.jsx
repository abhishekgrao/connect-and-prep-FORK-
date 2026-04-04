import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { User, Calendar, Mail, Phone, Upload, CreditCard } from 'lucide-react';
import './Profile.css';

const Profile = () => {
    const { user } = useAuth();
    const isParent = user?.role === 'parent';

    // Mock state for form fields - pre-filled with user data where available
    const [formData, setFormData] = useState({
        // Student's Info (shown to both, but different context)
        usn: user?.usn || '4VV25EC032',
        
        // Parent's Info
        parentName: isParent ? (user?.name || 'RAJESH KUMAR') : 'RAJESH KUMAR',
        spouseName: isParent ? 'SUSHMA KUMAR' : 'SUSHMA KUMAR',
        childName: isParent ? 'BHARATH KUMAR A' : 'BHARATH KUMAR A',
        
        // Student's basic info for student role
        firstName: user?.name?.split(' ')[0] || 'BHARATH',
        middleName: 'KUMAR',
        lastName: 'A',

        collegeEmail: isParent ? 'parent.rajesh@gmail.com' : 'VVCE25EC0135@vvce.ac.in',
        personalEmail: user?.email || (isParent ? 'parent.rajesh@gmail.com' : 'bharathece2006@gmail.com'),
        dob: isParent ? '1982-05-15' : '2006-04-20',
        contact: isParent ? '9448123456' : '7996710095',
        aadhaar: isParent ? '4521 8890 1234' : '3650 0263 1414',

        // Secondary Parent / Parent Details for student
        parent1Name: 'RAJESH KUMAR',
        parent1Relation: 'Father',
        parent1Contact: '9448123456',

        parent2Name: 'SUSHMA KUMAR',
        parent2Relation: 'Mother',
        parent2Contact: '9448654321',

        guardianName: '',
        guardianEmail: '',
        guardianGender: '',
        guardianContact: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSave = () => {
        alert('Profile details saved successfully!');
    };

    return (
        <div className="profile-container">
            <div className="profile-header-card">
                <h1>{isParent ? "Parent Profile" : "Student Profile"}</h1>
            </div>

            <div className="profile-content">

                {/* Basic Details Section */}
                <div className="section-card">
                    <h2 className="section-title">{isParent ? "Personal Details" : "Basic Details"}</h2>
                    <div className="section-body basic-details-grid">

                        <div className="form-column">
                            <div className="form-group">
                                <label>{isParent ? "Child's USN:" : "USN:"}</label>
                                <input type="text" value={formData.usn} disabled className="readonly-input" />
                            </div>

                            {isParent ? (
                                <>
                                    <div className="form-group">
                                        <label>Full Name:</label>
                                        <input type="text" name="parentName" value={formData.parentName} onChange={handleChange} />
                                    </div>
                                    <div className="form-group">
                                        <label>Spouse Name:</label>
                                        <input type="text" name="spouseName" value={formData.spouseName} onChange={handleChange} />
                                    </div>
                                    <div className="form-group">
                                        <label>Child's Name:</label>
                                        <input type="text" name="childName" value={formData.childName} onChange={handleChange} />
                                    </div>
                                </>
                            ) : (
                                <div className="form-group">
                                    <label>First / Middle / Last Name:</label>
                                    <div className="name-inputs">
                                        <input type="text" name="firstName" value={formData.firstName} onChange={handleChange} placeholder="First" />
                                        <input type="text" name="middleName" value={formData.middleName} onChange={handleChange} placeholder="Middle" />
                                        <input type="text" name="lastName" value={formData.lastName} onChange={handleChange} placeholder="Last" />
                                    </div>
                                </div>
                            )}

                            <div className="form-group">
                                <label>{isParent ? "Personal Email:" : "College Email:"} <span className="required">*</span></label>
                                <input type="email" name="collegeEmail" value={formData.collegeEmail} onChange={handleChange} />
                            </div>

                            <div className="form-group">
                                <label>{isParent ? "Alternative Email:" : "Personal Email:"} <span className="required">*</span></label>
                                <input type="email" name="personalEmail" value={formData.personalEmail} onChange={handleChange} />
                            </div>

                            <div className="form-group">
                                <label>Date of Birth:</label>
                                <input type="date" name="dob" value={formData.dob} onChange={handleChange} />
                            </div>

                            <div className="form-group">
                                <label>Contact: <span className="required">*</span></label>
                                <input type="tel" name="contact" value={formData.contact} onChange={handleChange} />
                            </div>
                        </div>

                        {/* Profile Picture Side */}
                        <div className="profile-pic-column">
                            <div className="profile-placeholder">
                                <User size={120} color="#ccc" />
                            </div>
                            <div className="photo-upload-group">
                                <label>Profile Picture:</label>
                                <div className="upload-controls">
                                    <input type="text" placeholder="No file chosen" disabled className="file-name-input" />
                                    <button className="browse-btn">Browse</button>
                                </div>
                                <small className="note">Note*: Only .jpeg, .jpg, .png file formats are allowed.<br />Note*: Maximum file size is 1MB.</small>
                            </div>
                        </div>

                        <div className="form-group full-width">
                            <label>Aadhaar:</label>
                            <input type="text" name="aadhaar" value={formData.aadhaar} onChange={handleChange} />
                        </div>

                    </div>
                </div>

                {!isParent && (
                    <div className="section-card">
                        <h2 className="section-title">Parent Details</h2>
                        <div className="section-body parent-details-grid">
                            {/* Existing Parent Details Content */}
                            <div className="grid-header">
                                <span></span>
                                <label>Full Name</label>
                                <label>Relation</label>
                                <label>Contact No <span className="required">*</span></label>
                            </div>

                            {/* Parent 1 */}
                            <div className="parent-row">
                                <label className="row-label">Parent 1:</label>
                                <input type="text" name="parent1Name" value={formData.parent1Name} onChange={handleChange} />
                                <input type="text" name="parent1Relation" value={formData.parent1Relation} onChange={handleChange} />
                                <input type="tel" name="parent1Contact" value={formData.parent1Contact} onChange={handleChange} />
                            </div>

                            {/* Parent 2 */}
                            <div className="parent-row">
                                <label className="row-label">Parent 2:</label>
                                <input type="text" name="parent2Name" value={formData.parent2Name} onChange={handleChange} />
                                <input type="text" name="parent2Relation" value={formData.parent2Relation} onChange={handleChange} />
                                <input type="tel" name="parent2Contact" value={formData.parent2Contact} onChange={handleChange} />
                            </div>
                        </div>
                    </div>
                )}

                {/* Project Showcase / Portfolio Section */}
                <div className="section-card projects-showcase animate-enter">
                    <h2 className="section-title">Project Portfolio</h2>
                    <div className="section-body">
                        <div className="projects-grid">
                            <div className="project-card-brutal">
                                <h3>AI Attendance System</h3>
                                <p className="tech">Python, OpenCV, Flutter</p>
                                <p className="desc">Real-time face recognition for classroom attendance with automated reporting.</p>
                                <div className="project-actions">
                                    <button className="text-btn">Edit</button>
                                    <button className="text-btn">View Live</button>
                                </div>
                            </div>
                            <div className="project-card-brutal add-new">
                                <div className="add-icon">+</div>
                                <span>Add New Project</span>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="action-buttons">
                    <button className="save-btn" onClick={handleSave}>Save</button>
                </div>

            </div>
        </div>
    );
};

export default Profile;
