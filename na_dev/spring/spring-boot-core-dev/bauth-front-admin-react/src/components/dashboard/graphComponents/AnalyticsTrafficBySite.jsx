import PropTypes from 'prop-types';
// @mui
import { Box, Card, Paper, Typography, CardHeader, CardContent } from '@mui/material';
// utils
import { fShortenNumber } from '@utils/formatNumber';
// components
import Iconify from '@components/iconify';

// ----------------------------------------------------------------------

AnalyticsTrafficBySite.propTypes = {
  list: PropTypes.array,
  title: PropTypes.string,
  subheader: PropTypes.string,
};

export default function AnalyticsTrafficBySite({ title, subheader, list, ...other }) {
  return (
    <Card {...other}>
      <CardHeader title={title} subheader={subheader} />

      <CardContent>
        <Box display="grid" gap={2} gridTemplateColumns="repeat(2, 1fr)">
          {list.map((site) => (
            <Paper key={site.label} variant="outlined" sx={{ py: 2.5, textAlign: 'center' }}>
              {(site.value === 'naver' && (
                <><img src={`${import.meta.env.VITE_PUBLIC_BASE_URL}/assets/icons/login/naver-icon.svg`} style={{width:32, display:'inline-block'}}/></>
              )) ||
                (site.value === 'google' && (
                  <><img src={`${import.meta.env.VITE_PUBLIC_BASE_URL}/assets/icons/login/google-icon.svg`} style={{width:32, display:'inline-block'}}/></>
                  // <Iconify icon="eva:google-fill" color="#DF3E30" width={32} />
                )) ||
                (site.value === 'kakao' && (
                  <><img src={`${import.meta.env.VITE_PUBLIC_BASE_URL}/assets/icons/login/kakao-icon.svg`} style={{width:32, display:'inline-block'}}/></>
                )) || 
                <><img src={`${import.meta.env.VITE_PUBLIC_BASE_URL}/assets/icons/login/email-icon.svg`} style={{width:32, display:'inline-block'}}/></>
                // <Iconify icon="eva:email-outline" color="#1C9CEA" width={32} />
              }

              <Typography variant="h6" sx={{ mt: 0.5 }}>
                {(site.total > 0) ? fShortenNumber(site.total) : 0}
              </Typography>

              <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                {site.label}
              </Typography>
            </Paper>
          ))}
        </Box>
      </CardContent>
    </Card>
  );
}
