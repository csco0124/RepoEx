import React from 'react';
import { useMemo, useState, useEffect } from 'react';
import Grid from "@mui/material/Grid";
import BookingWidgetSummary from "@/components/dashboard/chartComponents/BookingWidgetSummary";
import AnalyticsWidgetSummary from '@/components/dashboard/chartComponents/AnalyticsWidgetSummary';


const TotalUserWidgetSummarys = ({ data }) => {
  const [email_user_cnt, setEmail_user_cnt] = useState(0);
  const [google_user_cnt, setGoogle_user_cnt] = useState(0);
  const [kakao_user_cnt, setKakao_user_cnt] = useState(0);
  const [naver_user_cnt, setNaver_user_cnt] = useState(0);
  const [total_user_cnt, setTotal_user_cnt] = useState(0);

  useEffect(() => {
    if(Object.keys(data).length === 0) {
      /** 데이터 없음 */
    } else {
      initData(data);
    }
  },[data]);

  const initData = (data) => {
    setEmail_user_cnt(data.totalUserCnt.email_user_cnt);
    setGoogle_user_cnt(data.totalUserCnt.google_user_cnt);
    setKakao_user_cnt(data.totalUserCnt.kakao_user_cnt);
    setNaver_user_cnt(data.totalUserCnt.naver_user_cnt);
    setTotal_user_cnt(data.totalUserCnt.total_user_cnt);
  };

  return (
    <>
        <Grid item xs={12} md={12}>
          <h3>Total number of Auth types</h3>
        </Grid>
        <Grid item xs={12} md={12}>
          <h5>Option 1</h5>
        </Grid>
        <Grid item xs={12} md={3}>
            <BookingWidgetSummary
                title="Google"
                total={google_user_cnt}
                icon="google"
                color="error" />
        </Grid>
        <Grid item xs={12} md={3}>
            <BookingWidgetSummary
                  title="Naver"
                  total={naver_user_cnt}
                  icon="naver" />
        </Grid>
        <Grid item xs={12} md={3}>
            <BookingWidgetSummary
                title="Kakao"
                total={kakao_user_cnt}
                icon="kakao" />
        </Grid>
        <Grid item xs={12} md={3}>
            <BookingWidgetSummary
                title="Email"
                total={email_user_cnt}
                icon="email" />
        </Grid>
        <Grid item xs={12} md={12}>
          <h5>Option 2</h5>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <AnalyticsWidgetSummary
            title="Google"
            total={google_user_cnt}
            imgSrc="google"
            color="error"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <AnalyticsWidgetSummary
            title="Naver"
            total={naver_user_cnt}
            imgSrc="naver"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <AnalyticsWidgetSummary
            title="Kakao"
            total={kakao_user_cnt}
            imgSrc="kakao"
            color="warning"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <AnalyticsWidgetSummary
            title="Email"
            total={email_user_cnt}
            imgSrc="email"
            color="info"
          />
        </Grid>
    </>
  );
};

export default TotalUserWidgetSummarys;