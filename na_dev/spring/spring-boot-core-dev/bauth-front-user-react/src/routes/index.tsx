import { Route, Routes, BrowserRouter, Navigate } from 'react-router-dom';
import {
  Identifier,
  IdentifierByEmail,
  ChallengePwd,
  WebCreateAccount,
  WebGradSidvPhone,
  WebGradSidvVerify,
  WebGradSidvPhoneSocial,
  WebCreateAccountSocial,
  FindPassword,

  Page404,
  AuthenticatedHome,
  ResetPassword,

  SocialList,
  GuideForPasswordReset
} from '@routes/elements'
import Sample from "@pages/sample/Sample"
import { authPath, socialPath } from '@routes/paths'; 
import AuthGuard from '@auth/AuthGuard';

export default function Router() {
  
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to={authPath("/identifier")} />} />
        <Route path={authPath("/")} element={<Navigate to={authPath("/identifier")} />} />
        <Route path={authPath("/identifier")} element={<Identifier />} />
        <Route path={authPath("/identifierByEmail")} element={<IdentifierByEmail />} />
        <Route path={authPath("/challengePwd")} element={<ChallengePwd />} />
        <Route path={authPath("/webcreateaccount")} element={<WebCreateAccount />} />
        <Route path={authPath("/webgradsidvphone")} element={<WebGradSidvPhone />} />
        <Route path={authPath("/webgradsidvphonesocial")} element={<WebGradSidvPhoneSocial />} />
        <Route path={authPath("/webcreateaccountsocial")} element={<WebCreateAccountSocial />} />
        <Route path={authPath("/webgradsidvverify")} element={<WebGradSidvVerify />} />
        <Route path={authPath("/findPassword")} element={<FindPassword />} />
        {/**<Route path={path("/sample")} element={<AuthGuard><Sample /></AuthGuard>} /> */ /* 인증이 필요한 페이지 예제 */}
        <Route path={authPath("/sample")} element={<Sample />} />
        <Route path="*" element={<Page404 />} />  
        <Route path={authPath("/authenticatedhome")} element={<AuthenticatedHome />} />
        <Route path={authPath("/guideForPasswordReset")} element={<GuideForPasswordReset />} />
        <Route path={authPath("/resetPassword")} element={<ResetPassword />} />
        <Route path={socialPath("/social-list")} element={<SocialList />}  />
      </Routes>
    </BrowserRouter>
  );
}