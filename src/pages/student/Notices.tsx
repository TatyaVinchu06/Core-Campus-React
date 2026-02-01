import React from 'react';
import '../../assets/css/student/dashboard.css';
import TopBar from '../../components/layout/TopBar';

const Notices: React.FC = () => {
    return (
        <div>
            <TopBar title="Notices" />
            <div style={{ padding: '2rem', textAlign: 'center', color: '#64748b', marginTop: '2rem' }}>
                <i className="fas fa-bullhorn" style={{ fontSize: '3rem', marginBottom: '1rem', opacity: 0.5 }}></i>
                <h2>Notices</h2>
                <p>Campus announcements and updates</p>
            </div>
        </div>
    );
};

export default Notices;
