import React from 'react';

interface TopBarProps {
    title: string;
}

const TopBar: React.FC<TopBarProps> = ({ title }) => {
    const today = new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' });

    return (
        <div className="top-bar">
            <div className="page-title">
                <h1>{title}</h1>
                <span className="date-display">{today}</span>
            </div>

            <div className="top-actions">
                <div className="search-box">
                    <i className="fas fa-search" style={{ color: '#94a3b8' }}></i>
                    <input type="text" placeholder="Search anything..." />
                </div>

                <div className="notif-badge">
                    <i className="far fa-bell"></i>
                    <div className="count-badge">3</div>
                </div>
            </div>
        </div>
    );
};

export default TopBar;
