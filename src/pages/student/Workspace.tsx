import React from 'react';
import '../../assets/css/student/dashboard.css';
import TopBar from '../../components/layout/TopBar';

const Workspace: React.FC = () => {
    return (
        <div>
            <TopBar title="Code Editor" />
            <div style={{ padding: '2rem', textAlign: 'center', color: '#64748b', marginTop: '2rem' }}>
                <i className="fas fa-laptop-code" style={{ fontSize: '3rem', marginBottom: '1rem', opacity: 0.5 }}></i>
                <h2>Code Editor</h2>
                <p>Online IDE for coding assignments</p>
            </div>
        </div>
    );
};

export default Workspace;
