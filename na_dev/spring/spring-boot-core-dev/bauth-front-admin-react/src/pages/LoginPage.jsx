import { Helmet } from 'react-helmet-async';
import Login from '@sections/auth/Login';
import { AuthService } from '@/auth/AuthService';

export default function LoginPage() {
  return (
    <>
      <Helmet>
        <title>bauth Admin</title>
      </Helmet>

      <Login />
    </>
  );
}
