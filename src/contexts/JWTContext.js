/* eslint-disable camelcase */
import PropTypes from 'prop-types';
import { createContext, useEffect, useReducer, useState } from 'react';
import { googleLogout } from '@react-oauth/google';
// utils
import { useDispatch } from 'react-redux';
import axiosConfig from '../utils/axios';
import { isValidToken, setSession } from '../utils/jwt';
import {
  fetchSignupService,
  fetchLoginService,
  fetchGoogleLoginService,
} from '../services/authService';

// ----------------------------------------------------------------------
/* eslint-disable no-unused-expressions */

const initialState = {
  isAuthenticated: false,
  isInitialized: false,
  user: null,
};

const handlers = {
  INITIALIZE: (state, action) => {
    const { isAuthenticated, user } = action.payload;
    return {
      ...state,
      isAuthenticated,
      isInitialized: true,
      user,
    };
  },
  LOGIN: (state, action) => {
    const { user } = action.payload;

    return {
      ...state,
      isAuthenticated: true,
      user,
    };
  },
  LOGOUT: (state) => ({
    ...state,
    isAuthenticated: false,
    user: null,
  }),
};

const reducer = (state, action) => (handlers[action.type] ? handlers[action.type](state, action) : state);

const AuthContext = createContext({
  ...initialState,
  token: '',
  method: 'jwt',
  login: () => Promise.resolve(),
  logout: () => Promise.resolve(),
  register: () => Promise.resolve(),
  googleLogin: () => Promise.resolve(),
});

// ----------------------------------------------------------------------

AuthProvider.propTypes = {
  children: PropTypes.node,
};

function AuthProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [authToken, setAuthToken] = useState('');
  const reduxdispatch = useDispatch();

  useEffect(() => {
    const initialize = async () => {
      try {
        const accessToken = localStorage.getItem('accessToken');
        if (accessToken && isValidToken(accessToken)) {
          setSession(accessToken);
          const response = await axiosConfig.get('/auth/user/profile/1');

          const { user_profile } = response.data;

          dispatch({
            type: 'INITIALIZE',
            payload: {
              isAuthenticated: true,
              user: user_profile,
            },
          });
        } else {
          dispatch({
            type: 'INITIALIZE',
            payload: {
              isAuthenticated: false,
              user: null,
            },
          });
          reduxdispatch({ type: 'DESTROY_SESSION' });
          // dispatch(logout());
        }
      } catch (err) {
        console.error(err);
        dispatch({
          type: 'INITIALIZE',
          payload: {
            isAuthenticated: false,
            user: null,
          },
        });
        dispatch(logout());
      }
    };

    initialize();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const login = async (username, password) => {
    const formData = {
      email: username,
      password,
    };
    const response = await fetchLoginService(formData);

    if (response.status) {
      if (response.challenge === 'EMAIL_OTP_VERIFY') {
        const { session_token, session_uuid } = response;
        localStorage.setItem('sessionToken', session_token);
        localStorage.setItem('sessionUuid', session_uuid);
        return response;
      }
      setAuthToken(response.data.access_token);
      setSession(response.data.access_token);
      const responsenew = await axiosConfig.get('/auth/user/profile/1');
      console.log(responsenew);
      const { user_profile } = responsenew.data;

      dispatch({
        type: 'LOGIN',
        payload: {
          user: { ...state.user, ...user_profile },
        },
      });

      return response;
    }
    return response;
  };

  const register = async (email, password, hotel_name) => {
    const response = await fetchSignupService({
      email,
      password,
      hotel_name,
    });
    if (response.status) {
      const { session_token, session_uuid } = response;
      localStorage.setItem('sessionToken', session_token);
      localStorage.setItem('sessionUuid', session_uuid);
      return response;
    }
    return response;
  };

const logout = async () => {
    dispatch({ type: 'LOGOUT' });
    setSession(null);
    googleLogout();
    reduxdispatch({ type: 'DESTROY_SESSION' });
  };

const googleLogin = async (tokenResponse) => {
    const response = await fetchGoogleLoginService(tokenResponse.access_token);
    if (response && response.status) {
      if (response.data.access_token) {
        setAuthToken(response.data.access_token);
        setSession(response.data.access_token);
        const responsenew = await axiosConfig.get('/auth/user/profile/1');

        const { user_profile } = responsenew.data;

        dispatch({
          type: 'LOGIN',
          payload: {
            user: { ...state.user, ...user_profile },
          },
        });
        return response;
      }

      if (response.data.error) {
        return response;
      }
    }

    return response;
  };

  return (
    <AuthContext.Provider
      value={{
        ...state,
        token: authToken,
        method: 'jwt',
        login,
        logout,
        register,
        googleLogin,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export { AuthContext, AuthProvider };
