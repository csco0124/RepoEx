import { Suspense, lazy } from 'react';
// components
import LoadingScreen from '@components/loading-screen';

// ----------------------------------------------------------------------

export const WithLoadingScreen = Component => props =>
  (
    <Suspense fallback={<LoadingScreen />}>
      <Component {...props} />
    </Suspense>
  );

// ----------------------------------------------------------------------

export const LoginPage = WithLoadingScreen(lazy(() => import('@pages/LoginPage')));

export const Page404 = WithLoadingScreen(lazy(() => import('@pages/Page404')));

// MANAGEMENT
export const ManagementClient = WithLoadingScreen(lazy(() => import('@pages/management/ManagementClient')));
export const ManagementClientEdit = WithLoadingScreen(lazy(() => import('@pages/management/ManagementClientEdit')));
export const ManagementClientRoles = WithLoadingScreen(lazy(() => import('@pages/management/ManagementClientRoles')));
export const ManagementUser = WithLoadingScreen(lazy(() => import('@/pages/management/ManagementUser')));
export const ManagementSocial = WithLoadingScreen(lazy(() => import('@pages/management/ManagementSocial')));
export const ManagementAuthType = WithLoadingScreen(lazy(() => import('@pages/management/ManagementAuthType')));
export const ManagementLoginHistory = WithLoadingScreen(lazy(() => import('@pages/management/ManagementLoginHistory')));
export const ManagementLoginAnalytics = WithLoadingScreen(lazy(() => import('@/pages/management/ManagementLoginAnalytics')));
export const ManagementRoles = WithLoadingScreen(lazy(() => import('@pages/management/ManagementRoles')));

// SAMPLE

export const SampleModal = WithLoadingScreen(lazy(() => import('@pages/sample/Sample')));

