import { Navigate, useRoutes } from 'react-router-dom';
// auth
import AuthGuard from '@/auth/AuthGuard';
import { AuthService } from '@/auth/AuthService';
//import GuestGuard from '@/auth/GuestGuard';
// layouts
import CompactLayout from '@/layouts/compact';
import DashboardLayout from '@/layouts/dashboard';
// elements
import {
  SampleModal,
  ManagementClient,
  ManagementClientEdit,
  ManagementClientRoles,
  ManagementUser,
  ManagementSocial,
  ManagementAuthType,
	ManagementLoginHistory,
  ManagementLoginAnalytics,
  ManagementRoles,
  Page404,
} from './elements';
//LoginPage,
import LoginConfig from '@/pages/config/loginConfig';
//import { element } from 'prop-types';

export default function Router() {
  return useRoutes([
    {
      path: '/private/view/admin',
      element: (
        <AuthGuard>
          <DashboardLayout />
        </AuthGuard>
      ),
      
      children: [
        { 
          path:'management',
          children: [
            { path: 'client', element: <ManagementClient /> },
            { path: 'clientEdit', element: <ManagementClientEdit /> },
            { path: 'roles', element: <ManagementClientRoles /> },
            { path: 'user', element: <ManagementUser /> },
            { path: 'social', element: <ManagementSocial /> },
            { path: 'authType', element: <ManagementAuthType /> },
						{ path: 'loginHistory', element: <ManagementLoginHistory /> },
						{ path: 'loginAnalytics', element: <ManagementLoginAnalytics /> },
						{ path: 'role', element: <ManagementRoles /> },
          ]
        },
        {
          path:'sample',
          children: [
            { path: 'modal', element: <SampleModal /> },
          ]
        },
         {
          path:'config',
          children: [
            { path: 'loginConfig', element: <LoginConfig /> },
          ]
        }
      ]
    },
    {
      element: <CompactLayout />,
      children: [{ path: '404', element: <Page404 /> }],
    },
    { path: '*', element: <Navigate to="/404" replace /> },
  ]);
}
