import { createContext, useEffect, useReducer, useCallback, useMemo } from 'react';
import { AuthService } from '@auth/AuthService';

interface AuthContextType {
  isInitialized: boolean;
  isAuthenticated: boolean;
  user: any | null;
  login: (email: string, password: string) => void;
  logout: () => void;
}

const reducer = (state: any, action: any) => {
  if (action.type === 'INITIAL') {
    return {
      isInitialized: true,
      isAuthenticated: action.payload.isAuthenticated,
      user: action.payload.user,
    };
  }
  if (action.type === 'LOGIN') {
    return {
      ...state,
      isAuthenticated: true,
      user: action.payload.user,
    };
  }
  if (action.type === 'LOGOUT') {
    return {
      ...state,
      isAuthenticated: false,
      user: null,
    };
  }

  return state;
};

// ----------------------------------------------------------------------

export const AuthContext = createContext<AuthContextType>(
  {
    isInitialized: false,
    isAuthenticated: false,
    user: null,
    login: () => {},
    logout: () => {},
  }
);

// ----------------------------------------------------------------------

export function AuthProvider({ children }: any) {
  
  const [state, dispatch] = useReducer(reducer, {
    isInitialized: false,
    isAuthenticated: false,
    user: null,
  });

  const initialize = useCallback(async () => {
    
    try {
      const {isAuthenticated, userName, authorities} = await AuthService.isLogin();
      
      if (isAuthenticated) {
        const user = {
          userName: userName,
        }

        dispatch({
          type: 'INITIAL',
          payload: {
            isAuthenticated,
            user: {
              ...user,
              authorities: authorities,
            },
          },
        });
      } else {
        dispatch({
          type: 'INITIAL',
          payload: {
            isAuthenticated,
            user: null,
          },
        });
      }
    } catch (error) {
      console.error(error);
      dispatch({
        type: 'INITIAL',
        payload: {
          isAuthenticated: false,
          user: null,
        },
      });
    }
  }, []);

  useEffect(() => {
    initialize();
  }, [initialize]);

  // LOGIN
  const login = useCallback(async (email: string, password: string) => {
    const data = await AuthService.login(email, password);
    
    if (data.isAuthenticated) {
      const user = {
        userName: data.userName,
      }

    dispatch({
      type: 'LOGIN',
      payload: {
        user: {
          ...user,
          authorities: data.authorities,
        },
      },
    });
    }

    location.href = data.targetUrl;
  }, []);

  // LOGOUT
  const logout = useCallback(() => {
    AuthService.logout();
    dispatch({
      type: 'LOGOUT',
    });
  }, []);
  
  const memoizedValue: AuthContextType = useMemo (
    () => ({
      isInitialized: state.isInitialized,
      isAuthenticated: state.isAuthenticated,
      user: state.user,
      login,
      logout,
      method: 'auth0',
    }),
    [state.isAuthenticated, state.isInitialized, state.user, login, logout]
  );

  return <AuthContext.Provider value={memoizedValue}> {children} </AuthContext.Provider>;
}
