import React from 'react';
import { useMemo, useState, useEffect } from 'react';
import Grid from "@mui/material/Grid";

import TotalUserWidgetSummarys from '@/components/dashboard/TotalUserWidgetSummarys';
import TotalUserLogHistoryGraph from '@/components/dashboard/TotalUserLogHistoryGraph';
import TotalLoginTrafficSummarys from '@/components/dashboard/TotalLoginTrafficSummarys';
import TotalUserLogHistoryPieSummarys from '@/components/dashboard/TotalUserLogHistoryPieSummarys';


const ManagementLoginAnalyticsChart = ({ data }) => {
  const [totalAnalyticData, setTotalAnalyticData] = useState([]);
  const [totalUserCntData, setTotalUserCntData] = useState({});

  useEffect(() => {
    if(Object.keys(data).length === 0) {
      /** 데이터 없음 */
    } else {
      initData(data);
    }
  },[data]);

  const initData = (data) => {
    setTotalAnalyticData(data);
    setTotalUserCntData(totalAnalyticData.totalUserCnt);
  };

  return (
    <>
        <TotalUserWidgetSummarys data={totalAnalyticData} />

        <TotalLoginTrafficSummarys data={totalAnalyticData} />

        <TotalUserLogHistoryPieSummarys data={totalAnalyticData} />

        <TotalUserLogHistoryGraph data={totalAnalyticData} />
    </>
  );
};

export default ManagementLoginAnalyticsChart;