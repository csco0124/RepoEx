// react
import { useState } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
// @mui
import { Box, Typography, Stack } from '@mui/material';
// hooks
import useResponsive from '@/hooks/useResponsive';
// components
import { useSettingsContext } from '@/components/settings';
import Image from '@/components/image';
// routes
import { DEFAULT_ADMIN_PATH } from '@/routes/paths';
// children
import Main from './Main';
import Header from './header';
import NavMini from './nav/NavMini';
import NavVertical from './nav/NavVertical';
import NavHorizontal from './nav/NavHorizontal';

// ----------------------------------------------------------------------

export default function DashboardLayout() {
  const location = useLocation(); // 메인 url 일 때
  
  const isLoginLayoutVisible = location.pathname == DEFAULT_ADMIN_PATH; // URL에 따른 렌더링 여부

  const { themeLayout } = useSettingsContext();

  const isDesktop = useResponsive('up', 'lg');

  const [open, setOpen] = useState(false);

  const isNavHorizontal = themeLayout === 'horizontal';

  const isNavMini = themeLayout === 'mini';

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const renderNavVertical = <NavVertical openNav={open} onCloseNav={handleClose} />;

  if (isNavHorizontal) {
    return (
      <>
        <Header onOpenNav={handleOpen} />

        {isDesktop ? <NavHorizontal /> : renderNavVertical}

        <Main>
          <Outlet />
        </Main>
      </>
    );
  }

  if (isNavMini) {
    return (
      <>
        <Header onOpenNav={handleOpen} />

        <Box
          sx={{
            display: { lg: 'flex' },
            minHeight: { lg: 1 },
          }}>
          {isDesktop ? <NavMini /> : renderNavVertical}

          <Main>
            <Outlet />
          </Main>
        </Box>
      </>
    );
  }

  return (
    <>
      <Header onOpenNav={handleOpen} />

      <Box
        sx={{
          display: { lg: 'flex' },
          minHeight: { lg: 1 },
        }}>
        {renderNavVertical}
        <Main
          style={
            isLoginLayoutVisible
              ? { display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }
              : {}
          }>
          <Outlet />
          {isLoginLayoutVisible && (
            <>
              <Typography variant="h3" sx={{ mb: 4, maxWidth: 750, textAlign: 'center', color: 'orange' }}>
                {'bauth 관리자 페이지'}
              </Typography>
              <Image src={'/assets/illustrations/illustration_dashboard.png'} sx={{ maxWidth: 800 }} />
            </>
          )}
        </Main>
      </Box>
    </>
  );
}
