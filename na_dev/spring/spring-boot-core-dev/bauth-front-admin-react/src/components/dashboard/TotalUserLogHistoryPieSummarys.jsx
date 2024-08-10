import React from 'react';
import { useMemo, useState, useEffect } from 'react';
import Grid from "@mui/material/Grid";
import { useTheme } from '@mui/material/styles';
import AppCurrentDownload from '@/components/dashboard/graphComponents/AppCurrentDownload';
import AnalyticsCurrentVisits from '@/components/dashboard/graphComponents/AnalyticsCurrentVisits';


const TotalUserLogHistoryPieSummarys = ({ data }) => {
  const theme = useTheme();

  const [totalLoginCnt, setTotalLoginCnt] = useState({});
  const [googleCnt, setGoogleCnt] = useState(0);
  const [naverCnt, setNaverCnt] = useState(0);
  const [kakaoCnt, setKakaoCnt] = useState(0);
  const [emailCnt, setEmailCnt] = useState(0);

  useEffect(() => {
    if(data.length === 0) {
      /** 데이터 없음 */
    } else {
      initData(data);
    }
  },[data]);

  useEffect(() => {
    if(Object.keys(totalLoginCnt).length === 0) {
      /** 데이터 없음 */
    } else {
      initChartData(totalLoginCnt);
    }
  }, [totalLoginCnt]);

  const initData = (data) => {
    setTotalLoginCnt(data.totalLoginTypeCntByDate);
  };

  const initChartData = (totalLoginCnt) => {
    setGoogleCnt(totalLoginCnt.google_cnt);
    setNaverCnt(totalLoginCnt.naver_cnt);
    setKakaoCnt(totalLoginCnt.kakao_cnt);
    setEmailCnt(totalLoginCnt.email_cnt);
  };

  return (
    <>
        {/* Auth 타입에 따른 로그인 히스토리 파이 */}
        <Grid item xs={12} md={6} lg={4}>
          <AppCurrentDownload
            title="Monthly Donuts"
            chart={{
              colors: [
                theme.palette.error.main,
                theme.palette.primary.main,
                theme.palette.warning.main,
                theme.palette.info.main,
              ],
              series: [
                { label: 'Google', value: googleCnt },
                { label: 'Naver', value: naverCnt },
                { label: 'Kakao', value: kakaoCnt },
                { label: 'Email', value: emailCnt },
              ],
            }}
          />
        </Grid>
        <Grid item xs={12} md={6} lg={4}>
          <AnalyticsCurrentVisits
            title="Monthly Pie"
            chart={{
              series: [
                { label: 'Google', value: googleCnt },
                { label: 'Naver', value: naverCnt },
                { label: 'Kakao', value: kakaoCnt },
                { label: 'Email', value: emailCnt },
              ],
              colors: [
                theme.palette.error.main,
                theme.palette.primary.main,
                theme.palette.warning.main,
                theme.palette.info.main,
              ],
            }}
          />
        </Grid>
    </>
  );
};

export default TotalUserLogHistoryPieSummarys;