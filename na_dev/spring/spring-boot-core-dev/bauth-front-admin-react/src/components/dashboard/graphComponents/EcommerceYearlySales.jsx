import PropTypes from 'prop-types';
import { useState } from 'react';
// @mui
import { Card, CardHeader, Box } from '@mui/material';
// components
import { CustomSmallSelect } from '@components/custom-input';
import Chart, { useChart } from '@components/chart';

// ----------------------------------------------------------------------

EcommerceYearlySales.propTypes = {
  chart: PropTypes.object,
  title: PropTypes.string,
  subheader: PropTypes.string,
};

export default function EcommerceYearlySales({ 
  title, subheader, chart, first, ...other 
}) {
  const { colors, categories, series, options } = chart;

  const [seriesData, setSeriesData] = useState(first);

  const chartOptions = useChart({
    colors,
    legend: {
      position: 'top',
      horizontalAlign: 'right',
    },
    xaxis: {
      categories,
    },
    ...options,
  });

  return (
    <Card {...other}>
      <CardHeader
        title={title}
        subheader={subheader}
        /**Custom selectbox 부분 */
        // action={
        //   <CustomSmallSelect
        //     value={seriesData}
        //     onChange={(event) => setSeriesData(event.target.value)}
        //   >
        //     {series.map((option) => (
        //       <option key={option.year} value={option.year}>
        //         {option.year}
        //       </option>
        //     ))}
        //   </CustomSmallSelect>
        // }
      />
      {series.map((item) => (
        /** year가 기준 데이터를 의미 */
        <Box key={item.year} sx={{ mt: 3, mx: 3 }} dir="ltr">
          {item.year === seriesData && (
            <Chart 
              type="area"
              series={item.data} 
              options={chartOptions}
              height={364} 
            />
          )}
        </Box>
      ))}
    </Card>
  );
}
