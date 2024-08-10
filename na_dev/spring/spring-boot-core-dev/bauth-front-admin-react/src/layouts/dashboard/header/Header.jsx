import PropTypes from 'prop-types';
// @mui
import { useTheme } from '@mui/material/styles';
import { Stack, AppBar, Toolbar, IconButton, MenuItem, Link } from '@mui/material';
// utils
import { bgBlur } from '../../../utils/cssStyles';
// hooks
import useOffSetTop from '../../../hooks/useOffSetTop';
import useResponsive from '../../../hooks/useResponsive';
// config
import { HEADER, NAV } from '../../../configs/globalConfig';
// components
import Logo from '../../../components/logo';
import Iconify from '../../../components/iconify';
import { useSettingsContext } from '../../../components/settings';
//
import Searchbar from './Searchbar';
import SettingsDrawer from '../../../components/settings/drawer/SettingsDrawer';
import LogoutIcon from '@mui/icons-material/Logout';

// ----------------------------------------------------------------------

Header.propTypes = {
  onOpenNav: PropTypes.func,
};

export default function Header({ onOpenNav }) {
  const theme = useTheme();

  const { themeLayout } = useSettingsContext();

  const isNavHorizontal = themeLayout === 'horizontal';

  const isNavMini = themeLayout === 'mini';

  const isDesktop = useResponsive('up', 'lg');

  const isOffset = useOffSetTop(HEADER.H_DASHBOARD_DESKTOP) && !isNavHorizontal;

  const renderContent = (
    <>
      {isDesktop && isNavHorizontal && <Logo sx={{ mr: 2.5 }} />}

      {!isDesktop && (
        <IconButton onClick={onOpenNav} sx={{ mr: 1, color: 'text.primary' }}>
          <Iconify icon="eva:menu-2-fill" />
        </IconButton>
      )}

      <Searchbar />

      <Stack flexGrow={1} direction="row" alignItems="center" justifyContent="flex-end" spacing={{ xs: 0.5, sm: 1.5 }}>
        {/*
          <ContactsPopover /> => 사용자 목록 및 사용자 로그인 상태 등 예시 컴포넌트
          <NotificationsPopover /> => 메일 , 메시지 도착 알림 등 로그 예시 컴포넌트
          <AccountPopover /> => 사용자 설정 , 프로필 확인 마이페이지 예시 컴포넌트
          <LanguagePopover/> => 국가 별 언어 변경 예시 컴포넌트
          사용하지 않음으로 삭제 처리. react-framework 에 있음
        */}
        <Link href={'/oauth2/logout'} target="_blank" rel="noopener" underline="none">
          <LogoutIcon>Logout</LogoutIcon>
        </Link>
        <SettingsDrawer />
      </Stack>
    </>
  );

  return (
    <AppBar
      sx={{
        boxShadow: 'none',
        height: HEADER.H_MOBILE,
        zIndex: theme.zIndex.appBar + 1,
        ...bgBlur({
          color: theme.palette.background.default,
        }),
        transition: theme.transitions.create(['height'], {
          duration: theme.transitions.duration.shorter,
        }),
        ...(isDesktop
          ? {
              width: `calc(100% - ${NAV.W_DASHBOARD + 1}px)`,
              height: HEADER.H_DASHBOARD_DESKTOP,
              ...(isOffset ? { height: HEADER.H_DASHBOARD_DESKTOP_OFFSET } : {}),
              ...(isNavHorizontal
                ? {
                    width: 1,
                    bgcolor: 'background.default',
                    height: HEADER.H_DASHBOARD_DESKTOP_OFFSET,
                    borderBottom: `dashed 1px ${theme.palette.divider}`,
                  }
                : {}),
              ...(isNavMini ? { width: `calc(100% - ${NAV.W_DASHBOARD_MINI + 1}px)` } : {}),
            }
          : {}),
      }}>
      <Toolbar
        sx={{
          height: 1,
          px: { lg: 5 },
        }}>
        {renderContent}
      </Toolbar>
    </AppBar>
  );
}
