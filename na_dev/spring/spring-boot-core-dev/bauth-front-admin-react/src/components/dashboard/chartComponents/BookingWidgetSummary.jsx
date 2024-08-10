import PropTypes from 'prop-types';
// @mui
import { Card, Typography, Box } from '@mui/material';
// utils
import { fShortenNumber } from '@utils/formatNumber';

// ----------------------------------------------------------------------

BookingWidgetSummary.propTypes = {
  icon: PropTypes.node,
  sx: PropTypes.object,
  title: PropTypes.string,
  total: PropTypes.number,
};

export default function BookingWidgetSummary({ title, total, icon, sx, ...other }) {
  return (
    <Card
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        p: 2,
        pl: 3,
        ...sx,
      }}
      {...other}
    >
      <div>
        <Typography variant="h3">{fShortenNumber(total)}</Typography>

        <Typography variant="subtitle2" sx={{ color: 'text.secondary' }}>
          {title}
        </Typography>
      </div>

      <Box
        sx={{
          width: 120,
          height: 120,
          lineHeight: 0,
          borderRadius: '50%',
          bgcolor: 'background.neutral',
          textAlign: 'center',
        }}
      >
        {
          (icon === 'naver' && (
            <><img src={`${import.meta.env.VITE_PUBLIC_BASE_URL}/assets/icons/login/naver-icon.svg`} 
                style={{
                  mb: 3,
                  p: 2.5,
                  width: '100%',
                  height: '100%', 
                  display:'inline-block'
                }}
              /></>
          )) ||
          (icon == 'google' && (
            <><img src={`${import.meta.env.VITE_PUBLIC_BASE_URL}/assets/icons/login/google-icon.svg`} style={{
              mb: 3,
              p: 2.5,
              width: '100%',
              height: '100%', 
              display:'inline-block'
            }}
          /></>
          )) ||
          (icon == 'kakao' && (
            <><img src={`${import.meta.env.VITE_PUBLIC_BASE_URL}/assets/icons/login/kakao-icon.svg`} style={{
              mb: 3,
              p: 2.5,
              width: '100%',
              height: '100%', 
              display:'inline-block'
            }}
          /></>
          )) ||
          (icon == 'email' && (
            <><img src={`${import.meta.env.VITE_PUBLIC_BASE_URL}/assets/icons/login/email-icon.svg`} style={{
              mb: 3,
              p: 2.5,
              width: '100%',
              height: '100%', 
              display:'inline-block'
            }}
          /></>
          ))
        }
      </Box>
    </Card>
  );
}
