// css
import './App.css';

// ----------------------------------------------------------------------

import { BrowserRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
// routes
import Router from './routes';
// theme
import ThemeProvider from './theme';
// components
import SnackbarProvider from '@components/snackbar';
import { ThemeSettings, SettingsProvider } from '@components/settings';
import { MotionLazyContainer } from '@components/animate';
import ScrollToTop from '@components/scroll-to-top';
import { LoadingScreenInterceptor } from '@/configs/axios/axiosConfig';
import { UIContextProvider } from '@routes/UiContext';
// Check our docs
// https://docs.minimals.cc/authentication/js-version

import { AuthProvider } from '@auth/AuthContext';

// ----------------------------------------------------------------------

export default function App() {
  return (
    <AuthProvider>
      <HelmetProvider>
        <SettingsProvider>
          <BrowserRouter>
            <ScrollToTop />
            <MotionLazyContainer>
              <ThemeProvider>
                <ThemeSettings>
                  <UIContextProvider>
                    <LoadingScreenInterceptor />
                    <SnackbarProvider>
                      <Router />
                    </SnackbarProvider>
                  </UIContextProvider>
                </ThemeSettings>
              </ThemeProvider>
            </MotionLazyContainer>
          </BrowserRouter>
        </SettingsProvider>
      </HelmetProvider>
    </AuthProvider>
  );
}
