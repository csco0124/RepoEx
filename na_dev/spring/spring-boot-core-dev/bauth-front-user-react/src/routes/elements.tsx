import { lazy } from 'react';
import { WithLoadingScreen } from '@routes/WithLoadingScreen';

export const Identifier = WithLoadingScreen(lazy(() => import('@/pages/auth/Identifier')));
export const IdentifierByEmail = WithLoadingScreen(lazy(() => import('@pages/auth/IdentifierByEmail')));
export const ChallengePwd = WithLoadingScreen(lazy(() => import('@pages/auth/ChallengePwd')));
export const WebCreateAccount = WithLoadingScreen(lazy(() => import('@pages/auth/WebCreateAccount')));
export const WebGradSidvPhone = WithLoadingScreen(lazy(() => import('@pages/auth/WebGradSidvPhone')));
export const WebGradSidvVerify = WithLoadingScreen(lazy(() => import('@pages/auth/WebGradSidvVerify')));
export const WebGradSidvPhoneSocial = WithLoadingScreen(lazy(() => import('@pages/auth/WebGradSidvPhoneSocial')));
export const WebCreateAccountSocial = WithLoadingScreen(lazy(() => import('@pages/auth/WebCreateAccountSocial')));
export const FindPassword = WithLoadingScreen(lazy(() => import('@pages/auth/FindPassword')));
export const SamplePage = WithLoadingScreen(lazy(() => import('@pages/sample/Sample')));

export const Page404 = WithLoadingScreen(lazy(() => import('@pages/Page404')));

export const AuthenticatedHome = WithLoadingScreen(lazy(() => import('@pages/auth/AuthenticatedHome')));
export const GuideForPasswordReset = WithLoadingScreen(lazy(() => import('@pages/auth/GuideForPasswordReset')));
export const ResetPassword = WithLoadingScreen(lazy(() => import('@pages/auth/ResetPassword')));

export const SocialList = WithLoadingScreen(lazy(() => import('@pages/social/SocialList')));