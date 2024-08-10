import React from 'react';
import { useMemo, useState, useEffect } from 'react';
import Grid from "@mui/material/Grid";
import AnalyticsTrafficBySite from '@/components/dashboard/graphComponents/AnalyticsTrafficBySite';


const TotalLoginTrafficSummarys = ({ data }) => {
  const [todayTrafficData, setTodayTrafficData] = useState({});
  const [googleCnt, setGoogleCnt] = useState(0);
  const [naverCnt, setNaverCnt] = useState(0);
  const [kakaoCnt, setKakaoCnt] = useState(0);
  const [emailCnt, setEmailCnt] = useState(0);
  const [today, setToday] = useState("");

  useEffect(() => {
    if(Object.keys(data).length === 0) {
      /** 데이터 없음 */
    } else {
      initData(data);
    }
  },[data]);

  const initData = (data) => {
    setTodayTrafficData(data.todayLogintypeCnt);
    setGoogleCnt(todayTrafficData.google_cnt);
    setNaverCnt(todayTrafficData.naver_cnt);
    setKakaoCnt(todayTrafficData.kakao_cnt);
    setEmailCnt(todayTrafficData.email_cnt);
    setToday(todayTrafficData.today);
  };

  return (
    <>
        {/* Auth 타입에 따른 트래픽 */}
        <Grid item xs={12} md={6} lg={4}>
          <AnalyticsTrafficBySite title={`Traffic by Auth type(${today})`} list={
            [{
              value: 'google',
              label: 'Google',
              total: googleCnt,
            },
            {
              value: 'naver',
              label: 'Naver',
              total: naverCnt,
            },
            {
              value: 'kakao',
              label: 'Kakao',
              total: kakaoCnt,
            },
            {
              value: 'email',
              label: 'Email',
              total: emailCnt,
            }]
          } />
        </Grid>
    </>
  );
};

export default TotalLoginTrafficSummarys;