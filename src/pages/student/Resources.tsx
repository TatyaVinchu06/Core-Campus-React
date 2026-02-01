import React, { useState } from 'react';
import '../../assets/css/student/dashboard.css';
import '../../assets/css/student/resources.css';
import TopBar from '../../components/layout/TopBar';

const Resources: React.FC = () => {
    const [activeSubject, setActiveSubject] = useState('cs301');
    const [activeType, setActiveType] = useState('all');

    // EXACT MOCK DATA from legacy resources.js
    const subjects = [
        { id: 'cs301', code: 'CS301', name: 'Data Structures' },
        { id: 'cs302', code: 'CS302', name: 'Web Development' },
        { id: 'cs304', code: 'CS304', name: 'Database Systems' }
    ];

    const resourcesData = [
        {
            id: 1, title: 'Unit 1: Arrays & Linked Lists', type: 'pdf', subject: 'cs301', unit: 'Unit 1',
            date: 'Jan 10', size: '2.4 MB', views: 45
        },
        {
            id: 2, title: 'Stack Implementation Tutorial', type: 'video', subject: 'cs301', unit: 'Unit 1',
            date: 'Jan 12', size: '15 Mins', views: 120
        },
        {
            id: 3, title: 'Trees and Graphs Overview', type: 'ppt', subject: 'cs301', unit: 'Unit 2',
            date: 'Jan 15', size: '4.1 MB', views: 30
        },
        {
            id: 4, title: 'Sorting Algorithms Cheat Sheet', type: 'link', subject: 'cs301', unit: 'Unit 3',
            date: 'Jan 20', size: 'External', views: 89
        }
    ];

    const filtered = resourcesData.filter(r =>
        r.subject === activeSubject &&
        (activeType === 'all' || r.type === activeType)
    );

    const groupedByUnit = filtered.reduce((acc: any, resource) => {
        if (!acc[resource.unit]) acc[resource.unit] = [];
        acc[resource.unit].push(resource);
        return acc;
    }, {});

    const getIcon = (type: string) => {
        switch (type) {
            case 'pdf': return 'fa-file-pdf';
            case 'video': return 'fa-play-circle';
            case 'ppt': return 'fa-file-powerpoint';
            case 'link': return 'fa-link';
            default: return 'fa-file';
        }
    };

    const getColor = (type: string) => {
        switch (type) {
            case 'pdf': return '#ef4444';
            case 'video': return '#8b5cf6';
            case 'ppt': return '#f59e0b';
            case 'link': return '#3b82f6';
            default: return '#64748b';
        }
    };

    return (
        <div>
            <TopBar title="Resources" />

            {/* Subject Tabs */}
            <div style={{ padding: '1rem 1.5rem', borderBottom: '1px solid #e2e8f0', background: 'white' }}>
                <div style={{ display: 'flex', gap: '1rem', overflowX: 'auto' }}>
                    {subjects.map(sub => (
                        <div
                            key={sub.id}
                            className={`subject-tab ${sub.id === activeSubject ? 'active' : ''}`}
                            onClick={() => setActiveSubject(sub.id)}
                            style={{
                                padding: '0.75rem 1.5rem',
                                borderRadius: '8px',
                                cursor: 'pointer',
                                background: sub.id === activeSubject ? '#003366' : '#f8fafc',
                                color: sub.id === activeSubject ? 'white' : '#64748b',
                                fontWeight: 600,
                                fontSize: '0.9rem',
                                whiteSpace: 'nowrap',
                                transition: 'all 0.2s'
                            }}
                        >
                            <div style={{ fontSize: '0.75rem', opacity: 0.8 }}>{sub.code}</div>
                            <div>{sub.name}</div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Filter Pills */}
            <div className="controls-section" style={{ padding: '1rem 1.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div className="filter-group" style={{ display: 'flex', gap: '0.5rem' }}>
                    <button className={`filter-pill ${activeType === 'all' ? 'active' : ''}`} onClick={() => setActiveType('all')}>All</button>
                    <button className={`filter-pill ${activeType === 'pdf' ? 'active' : ''}`} onClick={() => setActiveType('pdf')}><i className="far fa-file-pdf"></i> PDF</button>
                    <button className={`filter-pill ${activeType === 'video' ? 'active' : ''}`} onClick={() => setActiveType('video')}><i className="far fa-play-circle"></i> Video</button>
                    <button className={`filter-pill ${activeType === 'ppt' ? 'active' : ''}`} onClick={() => setActiveType('ppt')}><i className="far fa-file-powerpoint"></i> PPT</button>
                    <button className={`filter-pill ${activeType === 'link' ? 'active' : ''}`} onClick={() => setActiveType('link')}><i className="fas fa-link"></i> Links</button>
                </div>
            </div>

            {/* Resources by Unit */}
            <div className="resources-container" style={{ padding: '0 1.5rem 1.5rem' }}>
                {Object.entries(groupedByUnit).map(([unit, items]: [string, any]) => (
                    <div key={unit} className="unit-section" style={{ marginBottom: '2rem' }}>
                        <div className="unit-header" style={{
                            padding: '1rem',
                            background: '#f8fafc',
                            borderBottom: '2px solid #e2e8f0',
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            fontWeight: 600
                        }}>
                            <h3 style={{ margin: 0, fontSize: '1rem' }}><i className="fas fa-chevron-down" style={{ marginRight: '0.5rem' }}></i>{unit}</h3>
                            <span className="unit-count" style={{ background: '#e2e8f0', padding: '0.25rem 0.75rem', borderRadius: '12px', fontSize: '0.85rem' }}>{items.length} items</span>
                        </div>
                        <div className="unit-content" style={{
                            display: 'grid',
                            gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
                            gap: '1rem',
                            padding: '1rem'
                        }}>
                            {items.map((resource: any) => (
                                <div key={resource.id} className="resource-card" style={{
                                    background: 'white',
                                    border: '1px solid #e2e8f0',
                                    borderRadius: '12px',
                                    overflow: 'hidden',
                                    cursor: 'pointer',
                                    transition: 'all 0.2s'
                                }}>
                                    <div className="card-thumbnail" style={{
                                        height: '120px',
                                        background: `${getColor(resource.type)}15`,
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        color: getColor(resource.type),
                                        fontSize: '3rem',
                                        position: 'relative'
                                    }}>
                                        <i className={`fas ${getIcon(resource.type)}`}></i>
                                        <span className="type-badge" style={{
                                            position: 'absolute',
                                            top: '0.5rem',
                                            right: '0.5rem',
                                            background: 'white',
                                            padding: '0.25rem 0.75rem',
                                            borderRadius: '12px',
                                            fontSize: '0.75rem',
                                            fontWeight: 600,
                                            textTransform: 'uppercase'
                                        }}>{resource.type}</span>
                                    </div>
                                    <div className="card-body" style={{ padding: '1rem' }}>
                                        <div className="res-title" style={{ fontWeight: 600, marginBottom: '0.5rem', fontSize: '0.95rem' }}>{resource.title}</div>
                                        <div className="res-meta" style={{ fontSize: '0.8rem', color: '#64748b', display: 'flex', gap: '1rem' }}>
                                            <span>{resource.date}</span>
                                            <span>{resource.size}</span>
                                            <span><i className="fas fa-eye"></i> {resource.views}</span>
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
