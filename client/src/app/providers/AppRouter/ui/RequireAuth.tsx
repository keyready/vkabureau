import { Navigate, useLocation } from 'react-router-dom';

import { RoutePath } from '@/shared/config/routeConfig';
import { USER_LOCALSTORAGE_KEY } from '@/shared/const';

interface RequireAuthProps {
    children: JSX.Element;
}
export function RequireAuth({ children }: RequireAuthProps) {
    const auth = localStorage.getItem(USER_LOCALSTORAGE_KEY);
    const location = useLocation();

    if (!auth) {
        return <Navigate to={RoutePath.main} state={{ from: location }} replace />;
    }

    return children;
}
