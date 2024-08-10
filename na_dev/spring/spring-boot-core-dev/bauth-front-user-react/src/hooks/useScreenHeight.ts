import { useEffect } from 'react';

function useScreenHeight() {
  const setScreenHeight = () => {
    const vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--vh', `${vh}px`);
  };
  
  useEffect(() => {
    setScreenHeight();

    window.addEventListener('resize', setScreenHeight);
    return () => {
      window.removeEventListener('resize', setScreenHeight);
    };
  }, []);
}

export default useScreenHeight;