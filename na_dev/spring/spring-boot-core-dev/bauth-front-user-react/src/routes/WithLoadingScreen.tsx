import { Suspense } from 'react';
import { LoadingScreen } from '@components/LoadingScreen';

export const WithLoadingScreen = (Component: any ) => (props: any) =>{
  return (
    <Suspense fallback={<LoadingScreen />}>
      <Component {...props} />
    </Suspense>
  );
}
