import React, { useState } from 'react';
import '../../assets/css/student/dashboard.css';
import TopBar from '../../components/layout/TopBar';

interface Contact {
    id: number;
    name: string;
    avatar: string;
    lastMessage: string;
    time: string;
    online: boolean;
}

interface Message {
    id: number;
    text: string;
    sent: boolean;
    time: string;
}

const Messages: React.FC = () => {
    const [activeContact, setActiveContact] = useState(1);
    const [messageText, setMessageText] = useState('');

    const contacts: Contact[] = [
        { id: 1, name: 'Dr. Sharma', avatar: 'DS', lastMessage: 'You: Sir, can I get an extension?', time: '10:45 AM', online: true },
        { id: 2, name: 'Prof. Rahul Patil', avatar: 'RP', lastMessage: 'The lab report format is attached.', time: 'Yesterday', online: false },
        { id: 3, name: 'HOD (CS Dept)', avatar: 'HOD', lastMessage: 'Meeting scheduled for Friday at 3 PM.', time: 'Jan 18', online: false }
    ];

    const [messages, setMessages] = useState<Message[]>([
        { id: 1, text: 'Good morning students. Please submit your assignments by tomorrow.', sent: false, time: '09:00 AM' },
        { id: 2, text: 'Good morning Sir.', sent: true, time: '10:30 AM' },
        { id: 3, text: 'Can I get an extension on the assignment submission? Just for 1 day.', sent: true, time: '10:42 AM' },
        { id: 4, text: 'I was facing some issues with my laptop.', sent: true, time: '10:43 AM' }
    ]);

    const activeContactData = contacts.find(c => c.id === activeContact)!;

    const sendMessage = () => {
        if (messageText.trim()) {
            setMessages([...messages, { id: messages.length + 1, text: messageText, sent: true, time: 'Now' }]);
            setMessageText('');
        }
    };

    return (
        <div>
            <TopBar title="Messages" />

            <div style={{ padding: '1rem 1.5rem' }}>
                <div className="messenger-container" style={{
                    display: 'flex',
                    height: 'calc(100vh - 180px)',
                    background: 'white',
                    borderRadius: '16px',
                    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.05)',
                    border: '1px solid #e2e8f0',
                    overflow: 'hidden'
                }}>
                    {/* Contacts Sidebar */}
                    <aside style={{
                        width: '320px',
                        borderRight: '1px solid #e2e8f0',
                        display: 'flex',
                        flexDirection: 'column',
                        background: '#f8fafc'
                    }}>
                        <div style={{ padding: '1.5rem', borderBottom: '1px solid #e2e8f0' }}>
                            <h3 style={{ margin: 0, fontSize: '1.1rem', color: '#0f172a' }}>Contacts</h3>
                            <div style={{ position: 'relative', marginTop: '10px' }}>
                                <i className="fas fa-search" style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: '#94a3b8' }}></i>
                                <input type="text" placeholder="Search teachers..." style={{
                                    width: '100%',
                                    padding: '10px 10px 10px 35px',
                                    borderRadius: '8px',
                                    border: '1px solid #cbd5e1',
                                    outline: 'none'
                                }} />
                            </div>
                        </div>
                        <div style={{ flex: 1, overflowY: 'auto' }}>
                            {contacts.map(contact => (
                                <div
                                    key={contact.id}
                                    onClick={() => setActiveContact(contact.id)}
                                    style={{
                                        display: 'flex',
                                        gap: '12px',
                                        padding: '1rem',
                                        cursor: 'pointer',
                                        transition: '0.2s',
                                        borderBottom: '1px solid #f1f5f9',
                                        background: contact.id === activeContact ? '#e0e7ff' : 'transparent',
                                        borderLeft: contact.id === activeContact ? '4px solid #003366' : '4px solid transparent'
                                    }}
                                >
                                    <div style={{
                                        width: '40px',
                                        height: '40px',
                                        background: contact.id === activeContact ? '#003366' : '#cbd5e1',
                                        borderRadius: '50%',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        fontWeight: 700,
                                        color: contact.id === activeContact ? 'white' : '#475569',
                                        flexShrink: 0
                                    }}>
                                        {contact.avatar}
                                    </div>
                                    <div style={{ flex: 1, overflow: 'hidden' }}>
                                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '4px' }}>
                                            <span style={{ fontWeight: 600, color: '#0f172a', fontSize: '0.95rem' }}>{contact.name}</span>
                                            <span style={{ fontSize: '0.75rem', color: '#64748b' }}>{contact.time}</span>
                                        </div>
                                        <div style={{
                                            fontSize: '0.85rem',
                                            color: contact.id === activeContact ? '#334155' : '#64748b',
                                            whiteSpace: 'nowrap',
                                            overflow: 'hidden',
                                            textOverflow: 'ellipsis'
                                        }}>
                                            {contact.lastMessage}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </aside>

                    {/* Chat Area */}
                    <section style={{ flex: 1, display: 'flex', flexDirection: 'column', background: 'white' }}>
                        {/* Chat Header */}
                        <div style={{
                            padding: '1rem 1.5rem',
                            borderBottom: '1px solid #e2e8f0',
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center'
                        }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                                <div style={{ width: '40px', height: '40px', background: '#003366', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, color: 'white' }}>
                                    {activeContactData.avatar}
                                </div>
                                <div>
                                    <h3 style={{ margin: 0, fontSize: '1rem', color: '#0f172a' }}>{activeContactData.name}</h3>
                                    <div style={{ fontSize: '0.75rem', color: activeContactData.online ? '#16a34a' : '#64748b', fontWeight: 600 }}>
                                        {activeContactData.online ? 'Online' : 'Offline'}
                                    </div>
                                </div>
                            </div>
                            <div style={{ display: 'flex', gap: '15px', color: '#64748b', fontSize: '1.1rem' }}>
                                <i className="fas fa-phone-alt" style={{ cursor: 'pointer' }}></i>
                                <i className="fas fa-video" style={{ cursor: 'pointer' }}></i>
                                <i className="fas fa-info-circle" style={{ cursor: 'pointer' }}></i>
                            </div>
                        </div>

                        {/* Messages */}
                        <div style={{
                            flex: 1,
                            padding: '1.5rem',
                            overflowY: 'auto',
                            display: 'flex',
                            flexDirection: 'column',
                            gap: '1rem',
                            background: '#fdfdfd'
                        }}>
                            <div style={{ textAlign: 'center', margin: '1rem 0', color: '#94a3b8', fontSize: '0.8rem' }}>Today</div>
                            {messages.map(msg => (
                                <div key={msg.id} style={{
                                    maxWidth: '70%',
                                    padding: '10px 15px',
                                    borderRadius: '12px',
                                    fontSize: '0.95rem',
                                    lineHeight: 1.5,
                                    alignSelf: msg.sent ? 'flex-end' : 'flex-start',
                                    background: msg.sent ? '#003366' : '#f1f5f9',
                                    color: msg.sent ? 'white' : '#334155',
                                    borderBottomLeftRadius: msg.sent ? '12px' : '2px',
                                    borderBottomRightRadius: msg.sent ? '2px' : '12px'
                                }}>
                                    {msg.text}
                                    <span style={{ fontSize: '0.7rem', opacity: 0.7, marginTop: '4px', textAlign: 'right', display: 'block' }}>
                                        {msg.time}
                                    </span>
                                </div>
                            ))}
                        </div>

                        {/* Input Area */}
                        <div style={{
                            padding: '1.5rem',
                            borderTop: '1px solid #e2e8f0',
                            display: 'flex',
                            gap: '12px',
                            alignItems: 'center'
                        }}>
                            <button style={{ background: 'none', border: 'none', color: '#64748b', fontSize: '1.2rem', cursor: 'pointer' }}>
                                <i className="fas fa-paperclip"></i>
                            </button>
                            <input
                                type="text"
                                value={messageText}
                                onChange={(e) => setMessageText(e.target.value)}
                                onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
                                placeholder="Type a message..."
                                style={{
                                    flex: 1,
                                    padding: '12px',
                                    border: '1px solid #cbd5e1',
                                    borderRadius: '25px',
                                    outline: 'none',
                                    fontFamily: 'inherit'
                                }}
                            />
                            <button style={{ background: 'none', border: 'none', color: '#64748b', fontSize: '1.2rem', cursor: 'pointer' }}>
                                <i className="far fa-smile"></i>
                            </button>
                            <button
                                onClick={sendMessage}
                                style={{
                                    background: '#003366',
                                    color: 'white',
                                    border: 'none',
                                    width: '40px',
                                    height: '40px',
                                    borderRadius: '50%',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    cursor: 'pointer',
                                    transition: '0.2s'
                                }}
                            >
                                <i className="fas fa-paper-plane"></i>
                            </button>
                        </div>
                    </section>
                </div>
            </div>
        </div>
    );
};

export default Messages;
