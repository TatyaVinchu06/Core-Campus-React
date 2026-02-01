import React, { useEffect, useRef, useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import '../../assets/css/shared/style.css'; // Import the login styles

const Login: React.FC = () => {
    const { login, user } = useAuth();
    const navigate = useNavigate();

    // Refs for mascot animation
    const pupilsRef = useRef<SVGGElement>(null);
    const eyeWhiteRef = useRef<SVGCircleElement>(null);
    const wrapperRef = useRef<HTMLDivElement>(null);

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState('');
    const [isPasswordFocused, setIsPasswordFocused] = useState(false);

    useEffect(() => {
        if (user) {
            if (user.role === 'student') navigate('/student/dashboard');
            else if (user.role === 'teacher') navigate('/teacher/dashboard');
        }
    }, [user, navigate]);

    // Mascot Animation Logic
    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            if (!pupilsRef.current || !eyeWhiteRef.current || isPasswordFocused) return;

            const rect = eyeWhiteRef.current.getBoundingClientRect();
            const eyeCenterX = rect.left + rect.width / 2;
            const eyeCenterY = rect.top + rect.height / 2;

            const angle = Math.atan2(e.clientY - eyeCenterY, e.clientX - eyeCenterX);
            const maxMove = 10;
            const dist = Math.min(maxMove, Math.hypot(e.clientX - eyeCenterX, e.clientY - eyeCenterY) / 15);

            const x = Math.cos(angle) * dist;
            const y = Math.sin(angle) * dist;

            pupilsRef.current.style.transform = `translate(${x}px, ${y}px)`;
        };

        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, [isPasswordFocused]);

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        try {
            await login(email, password);
        } catch (err: any) {
            setError(err.message || 'Login failed');
        }
    };

    return (
        <div className="main-container">
            {/* Branding Section */}
            <div className="brand-section">
                <div className="brand-content">
                    <h1 className="brand-title">CORE<br />Campus</h1>
                    <p className="brand-subtitle">The Operating System for College Engineering</p>
                    <div className="static-quote">
                        "Manage assignments, debug logic, and collaborate faster."
                    </div>
                </div>
                {/* Badge */}
                <div className="env-badge">v1.0 Beta</div>
            </div>

            {/* Form Section */}
            <div className="form-section">
                <div
                    className={`form-wrapper ${isPasswordFocused ? 'password-mode' : ''}`}
                    ref={wrapperRef}
                >
                    {/* Mascot */}
                    <div className="mascot-container">
                        <svg id="owl-mascot" viewBox="0 0 120 100" width="140" height="110">
                            {/* Body */}
                            <path d="M60,100 C90,100 110,80 110,50 C110,20 90,0 60,0 C30,0 10,20 10,50 C10,80 30,100 60,100 Z" fill="#fff" />
                            {/* Eyes Container */}
                            <g id="eyes">
                                <circle className="eye-white" cx="40" cy="45" r="12" fill="#e2e8f0" stroke="#cbd5e1" strokeWidth="1" ref={eyeWhiteRef} />
                                <circle className="eye-white" cx="80" cy="45" r="12" fill="#e2e8f0" stroke="#cbd5e1" strokeWidth="1" />
                                <g id="pupils" ref={pupilsRef}>
                                    <circle cx="40" cy="45" r="5" fill="#0f172a" />
                                    <circle cx="80" cy="45" r="5" fill="#0f172a" />
                                </g>
                            </g>
                            {/* Beak */}
                            <path d="M55,55 L65,55 L60,65 Z" fill="#f59e0b" />
                            {/* Arms */}
                            <path id="arm-left" className="owl-arm" d="M10,60 Q5,40 25,60" stroke="#cbd5e1" strokeWidth="8" fill="none" strokeLinecap="round" />
                            <path id="arm-right" className="owl-arm" d="M110,60 Q115,40 95,60" stroke="#cbd5e1" strokeWidth="8" fill="none" strokeLinecap="round" />
                        </svg>
                    </div>

                    <div className="login-card">
                        <div className="header">
                            <h2>Welcome Back</h2>
                            <p>Enter your credentials to access the workspace.</p>
                        </div>

                        <form onSubmit={handleLogin}>
                            <div className="input-group">
                                <label htmlFor="email">Student ID / Email</label>
                                <input
                                    type="text"
                                    id="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="e.g. student123"
                                    required
                                />
                            </div>

                            <div className="input-group">
                                <label htmlFor="password">Password</label>
                                <div className="password-wrapper">
                                    <input
                                        type={showPassword ? 'text' : 'password'}
                                        id="password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        onFocus={() => setIsPasswordFocused(true)}
                                        onBlur={() => setIsPasswordFocused(false)}
                                        required
                                    />
                                    <i
                                        className={`fas ${showPassword ? 'fa-eye-slash' : 'fa-eye'}`}
                                        id="togglePassword"
                                        onClick={() => setShowPassword(!showPassword)}
                                    ></i>
                                </div>
                            </div>

                            <div className="actions">
                                <label className="remember-me">
                                    <input type="checkbox" /> Remember me
                                </label>
                                <a href="#" className="forgot-pass">Forgot Password?</a>
                            </div>

                            <button type="submit" id="loginBtn">Log In</button>

                            {error && (
                                <div id="error-msg" style={{ display: 'block' }}>
                                    {error}
                                </div>
                            )}
                        </form>

                        <div className="card-footer">
                            New to campus?
                            <a href="#" className="signup-link">Create Account</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
