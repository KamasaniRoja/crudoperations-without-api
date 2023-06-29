/* eslint-disable import/no-unresolved */
import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';
// next
import { useLocation, useNavigate,} from 'react-router-dom';
import Login from '../../pages/auth/Login';
import { useAuthContext } from './useAuthContext';

// ----------------------------------------------------------------------

AuthGuard.propTypes = {
  children: PropTypes.node,
};

export default function AuthGuard({ children }) {
  const { isAuthenticated} = useAuthContext();
  const { pathname } = useLocation();
  const navigate = useNavigate();
  

  const [requestedLocation, setRequestedLocation] = useState(null);

  useEffect(() => {
    if (requestedLocation && pathname !== requestedLocation) {
      navigate(requestedLocation);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAuthenticated, pathname, navigate, requestedLocation,]);

 

  if (!isAuthenticated) {
    if (pathname !== requestedLocation) {
      setRequestedLocation(pathname);
    }
    return <Login />;
  }

  return <>{children}</>;
}
