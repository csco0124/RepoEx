import PropTypes from 'prop-types';
import { useState } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
// components
import LoadingScreen from '@components/LoadingScreen'; // temlate loading screen은 적용안함
//
//import Login from '@pages/LoginPage';
import { useAuthContext } from '@auth/useAuthContext';
import { authPath } from '@routes/paths';
// ----------------------------------------------------------------------

AuthGuard.propTypes = {
  children: PropTypes.node,
};

export default function AuthGuard({ children }) {
  const { isAuthenticated, isInitialized } = useAuthContext();

  const { pathname } = useLocation();

  const [requestedLocation, setRequestedLocation] = useState(null);

  if (!isInitialized) {
    return <LoadingScreen />;
  }

  if (!isAuthenticated) {
    if (pathname !== requestedLocation) {
      setRequestedLocation(pathname);
    }
   // return <Login />;
    return <Navigate to={path('/identifier')} />;
  }
  if (requestedLocation && pathname !== requestedLocation) {
    setRequestedLocation(null);
    return <Navigate to={requestedLocation} />;
  }

  return <> {children} </>;
}
