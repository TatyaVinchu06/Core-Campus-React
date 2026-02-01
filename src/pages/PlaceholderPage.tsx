import React from 'react';
import TopBar from '../components/layout/TopBar';

interface PlaceholderProps {
    title: string;
}

const PlaceholderPage: React.FC<PlaceholderProps> = ({ title }) => {
    return (
        <div>
            <TopBar title={title} />
            <div style={{ padding: '2rem', textAlign: 'center', color: '#64748b', marginTop: '2rem' }}>
                <i className="fas fa-tools" style={{ fontSize: '3rem', marginBottom: '1rem', opacity: 0.5 }}></i>
                <h2>{title} Under Construction</h2>
                <p>This page is being ported to React.</p>
            </div>
        </div>
    );
};

export default PlaceholderPage;
