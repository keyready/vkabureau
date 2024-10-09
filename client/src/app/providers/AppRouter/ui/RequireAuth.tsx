import { Navigate, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';

import { RoutePath } from '@/shared/config/routeConfig';
import { getProfileData } from '@/entities/Profile';

interface RequireAuthProps {
    children: JSX.Element;
}
export function RequireAuth({ children }: RequireAuthProps) {
    const auth = useSelector(getProfileData);
    const location = useLocation();

    if (!auth) {
        return <Navigate to={RoutePath.main} state={{ from: location }} replace />;
    }

    return children;
}
