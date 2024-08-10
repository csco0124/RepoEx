import PropTypes from 'prop-types';
import { forwardRef } from 'react';
import { Link as RouterLink } from 'react-router-dom';
// @mui
import { useTheme } from '@mui/material/styles';
import { Box, Link } from '@mui/material';

// ----------------------------------------------------------------------

const Logo = forwardRef(({ disabledLink = false, sx, ...other }, ref) => {
  const theme = useTheme();

  const PRIMARY_LIGHT = theme.palette.primary.light;

  const PRIMARY_MAIN = theme.palette.primary.main;

  const PRIMARY_DARK = theme.palette.primary.dark;

  // OR using local (public folder)
  // -------------------------------------------------------
  // const logo = (
  //   <Box
  //     component="img"
  //     src="/logo/logo_single.svg" => your path
  //     sx={{ width: 40, height: 40, cursor: 'pointer', ...sx }}
  //   />
  // );

  const logo = (
    <Box
      ref={ref}
      component="div"
      sx={{
        width: 120,
        height: 50,
        display: 'inline-flex',
        ...sx,
      }}
      {...other}>
      <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 526 241">
        <path fill={PRIMARY_MAIN} d="M327.27,77.13c-32.49,0-35.03,34.38-35.03,35.94s0,40.31,0,40.31h-31.63V49.09h31.63v14.97v0
          c7.3-15.11,35.03-14.97,35.03-14.97h12.38v28.04H327.27L327.27,77.13z"/>
        <path fill={PRIMARY_MAIN} d="M211.72,139.95v13.3h29.93V48.95h-29.93V61.5l0,0c-9.07-7.82-20.88-12.55-33.8-12.55
          c-28.6,0-51.78,23.18-51.78,51.78c0,28.6,23.18,51.78,51.78,51.78C190.84,152.51,202.65,147.78,211.72,139.95L211.72,139.95z
          M177.92,121.16c-11.44,0-20.71-9.27-20.71-20.71s9.27-20.71,20.71-20.71c11.44,0,20.71,9.27,20.71,20.71
          S189.36,121.16,177.92,121.16z"/>
        <path fill={PRIMARY_MAIN} d="M54.07,50.39C-1.07,51.25,0.14,86.58,0.14,86.58v14.37v52.3h29.93v-52.3V98.1c0-18.13,23.98-17.76,24-17.76
          c0.02,0,24-0.36,24,17.76v2.84v52.3H108v-52.3V86.58C108,86.58,109.21,51.25,54.07,50.39z"/>
        <path fill={PRIMARY_MAIN} d="M412.12,153.39c-55.14-0.86-53.93-36.18-53.93-36.18v-14.37v-52.3h29.93v52.3v2.84
          c0,18.13,23.98,17.76,24,17.76c0.02,0,24,0.36,24-17.76v-2.84v-52.3h29.93v52.3v14.37C466.05,117.21,467.26,152.53,412.12,153.39z
          "/>
        <g>
          <rect x="486.14" y="49.09" fill={PRIMARY_DARK} width="29.93" height="104.3"/>
          <rect x="480.89" y="17.11" transform="matrix(0.2588 -0.9659 0.9659 0.2588 343.8915 488.3927)" fill={PRIMARY_DARK} width="18.59" height="6"/>
          <rect x="486.17" y="12.69" transform="matrix(0.2588 -0.9659 0.9659 0.2588 355.7497 494.9994)" fill={PRIMARY_DARK} width="28.5" height="6"/>
          <rect x="492.87" y="21.02" transform="matrix(0.2588 -0.9659 0.9659 0.2588 352.6667 507.6388)" fill={PRIMARY_MAIN} width="28.5" height="6"/>
          <rect x="504.26" y="11.79" transform="matrix(0.2588 -0.9659 0.9659 0.2588 370.0185 511.8011)" fill={PRIMARY_DARK} width="28.5" height="6"/>
        </g>
      </svg>
    </Box>
  );

  if (disabledLink) {
    return logo;
  }

  return (
    <Link component={RouterLink} to="/private/view/admin" sx={{ display: 'contents' }}>
      {logo}
    </Link>
  );
});

Logo.propTypes = {
  sx: PropTypes.object,
  disabledLink: PropTypes.bool,
};

export default Logo;
