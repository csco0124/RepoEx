import PropTypes from 'prop-types';
import { useState } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
// components
import LoadingScreen from '../components/loading-screen';
//
import Login from '../pages/LoginPage';
import { useAuthContext } from './useAuthContext';
import { AuthService } from './AuthService';
import { $axios } from '@/configs/axios/axiosConfig';

// ----------------------------------------------------------------------

AuthGuard.propTypes = {
  children: PropTypes.node,
};

export default function AuthGuard({ children }) {
  const { isAuthenticated, isInitialized , user } = useAuthContext();

  const { pathname } = useLocation();

  const [requestedLocation, setRequestedLocation] = useState(null);

  if (!isInitialized) {
    return <LoadingScreen />;
  }

  if (!isAuthenticated) {
    if (pathname !== requestedLocation) {
      setRequestedLocation(pathname);
    }
    return AuthService.loginPage();
  }

  // todo : 403 페이지 redirect로 변경 예정
  if (!!!user.authorities.some(authority => authority == 'ROLE_ADMIN')) {
    return location.href = `${import.meta.env.VITE_AUTHORIZE_SERVER_URL}/public/view/auth/identifier`;
    // return location.href = `${import.meta.env.VITE_AUTHORIZE_SERVER_URL}/user/auth/identifier`;
  }
  
  if (requestedLocation && pathname !== requestedLocation) {
    setRequestedLocation(null);
    return <Navigate to={requestedLocation} />;
  }

  return <> {children} </>;
}
