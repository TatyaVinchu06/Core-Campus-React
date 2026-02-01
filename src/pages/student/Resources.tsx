import React, { useState } from 'react';
import '../../assets/css/student/dashboard.css';
import '../../assets/css/student/resources.css';
import TopBar from '../../components/layout/TopBar';

const Resources: React.FC = () => {
    const [activeType, setActiveType] = useState('all');
    const [viewMode, setViewMode] = useState('grid');

    const resources = [
        { id: 1, title: 'Unit 1 - Introduction to DBMS', type: 'pdf', unit: 'Unit 1', subject: 'CS204', size: '2.4 MB', uploadedBy: 'Prof. Gupta' },
        { id: 2, title: 'Normalization Tutorial', type: 'video', unit: 'Unit 2', subject: 'CS204', url: 'https://youtube.com', uploadedBy: 'Dr. Sharma' },
        { id: 3, title: 'SQL Practice Questions', type: 'pdf', unit: 'Unit 3', subject: 'CS204', size: '1.8 MB', uploadedBy: 'Prof. Gupta' },
        { id: 4, title: 'ER Diagram Tool', type: 'link', unit: 'Unit 1', subject: 'CS204', url: 'https://erdplus.com', uploadedBy: 'Student' }
    ];

    const filteredResources = activeType === 'all' ? resources : resources.filter(r => r.type === activeType);

    const groupedByUnit = filteredResources.reduce((acc: any, resource) => {
        if (!acc[resource.unit]) acc[resource.unit] = [];
        acc[resource.unit].push(resource);
        return acc;
    }, {});

    const getIcon = (type: string) => {
        switch (type) {
            case 'pdf': return 'fa-file-pdf';
            case 'video': return 'fa-play-circle';
            case 'link': return 'fa-link';
            default: return 'fa-file';
        }
    };

    const getColor = (type: string) => {
        switch (type) {
            case 'pdf': return '#ef4444';
            case 'video': return '#8b5cf6';
            case 'link': return '#3b82f6';
            default: return '#64748b';
        }
    };

    return (
        <div>
            <TopBar title="Resources" />

            <div className="controls-section" style={{ padding: '1rem 1.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div className="filter-group" style={{ display: 'flex', gap: '0.5rem' }}>
                    <button className={`filter-pill ${activeType === 'all' ? 'active' : ''}`} onClick={() => setActiveType('all')}>All</button>
                    <button className={`filter-pill ${activeType === 'pdf' ? 'active' : ''}`} onClick={() => setActiveType('pdf')}><i className="far fa-file-pdf"></i> PDF</button>
                    <button className={`filter-pill ${activeType === 'video' ? 'active' : ''}`} onClick={() => setActiveType('video')}><i className="far fa-play-circle"></i> Video</button>
                    <button className={`filter-pill ${activeType === 'link' ? 'active' : ''}`} onClick={() => setActiveType('link')}><i className="fas fa-link"></i> Links</button>
                </div>

                <div className="layout-toggle" style={{ display: 'flex', gap: '0.5rem' }}>
                    <button className={`toggle-btn ${viewMode === 'grid' ? 'active' : ''}`} onClick={() => setViewMode('grid')} title="Grid View">
                        <i className="fas fa-th-large"></i>
                    </button>
                    <button className={`toggle-btn ${viewMode === 'list' ? 'active' : ''}`} onClick={() => setViewMode('list')} title="List View">
                        <i className="fas fa-list"></i>
                    </button>
                </div>
            </div>

            <div className="resources-container" style={{ padding: '0 1.5rem 1.5rem' }}>
                {Object.entries(groupedByUnit).map(([unit, items]: [string, any]) => (
                    <div key={unit} className="unit-section" style={{ marginBottom: '2rem' }}>
                        <div className="section-header" style={{ padding: '1rem', background: '#f8fafc', borderBottom: '2px solid #e2e8f0', fontWeight: 600 }}>
                            <h3>{unit}</h3>
                            <span className="count-badge">{items.length}</span>
                        </div>
                        <div className={viewMode === 'grid' ? 'resource-grid' : 'resource-list'} style={{
                            display: 'grid',
                            gridTemplateColumns: viewMode === 'grid' ? 'repeat(auto-fill, minmax(250px, 1fr))' : '1fr',
                            gap: '1rem',
                            padding: '1rem'
                        }}>
                            {items.map((resource: any) => (
                                <div key={resource.id} className="resource-card" style={{
                                    background: 'white',
                                    border: '1px solid #e2e8f0',
                                    borderRadius: '12px',
                                    padding: '1.25rem',
                                    cursor: 'pointer',
                                    transition: 'all 0.2s'
                                }}>
                                    <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem' }}>
                                        <div style={{
                                            width: '48px',
                                            height: '48px',
                                            borderRadius: '12px',
                                            background: `${getColor(resource.type)}15`,
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            color: getColor(resource.type),
                                            fontSize: '1.5rem'
                                        }}>
                                            <i className={`fas ${getIcon(resource.type)}`}></i>
                                        </div>
                                        <div style={{ flex: 1 }}>
                                            <h4 style={{ fontSize: '0.95rem', fontWeight: 600, marginBottom: '0.25rem' }}>{resource.title}</h4>
                                            <p style={{ fontSize: '0.8rem', color: '#64748b' }}>
                                                {resource.size || resource.url} • {resource.uploadedBy}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Resources;
