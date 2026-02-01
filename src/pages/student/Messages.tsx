import React from 'react';
import '../../assets/css/student/dashboard.css';
import TopBar from '../../components/layout/TopBar';

const Messages: React.FC = () => {
    return (
        <div>
            <TopBar title="Messages" />
            <div style={{ padding: '2rem', textAlign: 'center', color: '#64748b', marginTop: '2rem' }}>
                <i className="fas fa-envelope" style={{ fontSize: '3rem', marginBottom: '1rem', opacity: 0.5 }}></i>
                <h2>Messages</h2>
                <p>Communication with faculty and peers</p>
            </div>
        </div>
    );
};

export default Messages;
