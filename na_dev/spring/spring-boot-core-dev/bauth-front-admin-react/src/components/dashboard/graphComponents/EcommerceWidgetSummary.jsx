import PropTypes from 'prop-types';
// @mui
import { alpha } from '@mui/material/styles';
import { useTheme } from '@mui/material/styles';
import { Box, Card, Typography, Stack } from '@mui/material';
// utils
import { fNumber, fPercent } from '@utils/formatNumber';
// components
import Iconify from '@components/iconify';
import Chart, { useChart } from '@components/chart';

// ----------------------------------------------------------------------

EcommerceWidgetSummary.propTypes = {
  sx: PropTypes.object,
  chart: PropTypes.object,
  title: PropTypes.string,
  total: PropTypes.number,
  percent: PropTypes.number,
};

export default function EcommerceWidgetSummary({
   title, 
   percent,
   color = 'info',
   total, 
   chart, 
   sx, 
   ...other 
}) {
  const theme = useTheme();
  const { series, options, categoryData } = chart;

  const chartOptions = useChart({
    colors: [theme.palette[color].main],
    chart: {
      animations: {
        enabled: true,
      },
      sparkline: {
        enabled: true,
      },
      sx: {
        color: theme.palette[color].darker
      },
    },
    xaxis: {
      // type: 'date',
      categories: categoryData,
      labels: { show: true },
    },
    stroke: {
      width: 2,
    },
    tooltip: {
      marker: { show: true },
      x: {
        show: true,
      },
      y: {
        formatter: (value) => fNumber(value),
        title: {
          formatter: () => '',
        },
      },
    },
    fill: {
      gradient: {
        opacityFrom: 0.56,
        opacityTo: 0.56,
      },
    },
    ...options,
  });

  return (
    <Card 
      sx={{ 
        display: 'flex', 
        alignItems: 'center', 
        p: 3, 
        // color: theme.palette[color].darker,
        // bgcolor: theme.palette[color].lighter,
        ...sx 
      }} 
      {...other}
    >
      <Box sx={{ flexGrow: 1 }}>
        <Typography variant="subtitle2" paragraph>
          {title}
        </Typography>

        <Typography variant="h3" gutterBottom>
          {fNumber(total)}
        </Typography>

        <TrendingInfo percent={percent} />
      </Box>

      <Chart
        type="line"
        series={[{ data: series }]}
        options={chartOptions}
        width={120}
        height={80}
      />
    </Card>
  );
}

// ----------------------------------------------------------------------

TrendingInfo.propTypes = {
  percent: PropTypes.number,
};

function TrendingInfo({ percent }) {
  return (
    <Stack direction="row" alignItems="center" sx={{ mt: 2, mb: 1 }}>
      <Iconify
        icon={percent < 0 ? 'eva:trending-down-fill' : 'eva:trending-up-fill'}
        sx={{
          mr: 1,
          p: 0.5,
          width: 24,
          height: 24,
          borderRadius: '50%',
          color: 'success.main',
          bgcolor: (theme) => alpha(theme.palette.success.main, 0.16),
          ...(percent < 0 && {
            color: 'error.main',
            bgcolor: (theme) => alpha(theme.palette.error.main, 0.16),
          }),
        }}
      />

      <Typography variant="subtitle2" component="div" noWrap>
        {percent > 0 && '+'}

        {fPercent(percent)}

        <Box component="span" sx={{ color: 'text.secondary', typography: 'body2' }}>
          {' than last month'}
        </Box>
      </Typography>
    </Stack>
  );
}
