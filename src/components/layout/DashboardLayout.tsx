import Sidebar from './Sidebar';
import { useAuth } from '../../context/AuthContext';
import { Navigate, Outlet } from 'react-router-dom';

interface DashboardLayoutProps {
    role: 'student' | 'teacher';
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({ role }) => {
    const { user } = useAuth();

    // Safety check: if user role doesn't match layout role
    if (user && user.role !== role) {
        return <Navigate to="/" />;
    }

    return (
        <div className="app-container">
            <Sidebar role={role} />
            <div className="main-content">
                <Outlet context={{ role }} />
                {/* Pages will be rendered here */}
            </div>
        </div>
    );
};

export default DashboardLayout;
