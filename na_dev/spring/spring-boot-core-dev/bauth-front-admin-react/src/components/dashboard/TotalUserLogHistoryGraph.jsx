import React from 'react';
import { useMemo, useState, useEffect } from 'react';
import Grid from "@mui/material/Grid";
import { useTheme } from '@mui/material/styles';
import BankingWidgetSummary from '@/components/dashboard/graphComponents/BankingWidgetSummary'
import EcommerceWidgetSummary from '@/components/dashboard/graphComponents/EcommerceWidgetSummary';
import EcommerceYearlySales from '@/components/dashboard/graphComponents/EcommerceYearlySales';
import AppWidgetSummary from '@/components/dashboard/chartComponents/AppWidgetSummary';
import BookingCheckInWidgets from '@/components/dashboard/chartComponents/BookingCheckInWidgets';


const TotalUserLogHistoryGraph = ({ data }) => {
  const theme = useTheme();

  const [totalCnt, setTotalCnt] = useState(0);
  const [diffPercentage, setDiffPercentage] = useState(0);
  const [totalLoginCnt, setTotalLoginCnt] = useState([]);
  const [googleLoginCnt, setGoogleLoginCnt] = useState([]);
  const [naverLoginCnt, setNaverLoginCnt] = useState([]);
  const [kakaoLoginCnt, setKakaoLoginCnt] = useState([]);
  const [emailLoginCnt, setEmailLoginCnt] = useState([]);
  const [totalLoginCntSelected, setTotalLoginCntSelected] = useState(0);
  const [googleLoginCntSelected, setGoogleLoginCntSelected] = useState(0);
  const [naverLoginCntSelected, setNaverLoginCntSelected] = useState(0);
  const [kakaoLoginCntSelected, setKakaoLoginCntSelected] = useState(0);
  const [emailLoginCntSelected, setEmailLoginCntSelected] = useState(0);
  const [googleLoginCntSelectedPer, setGoogleLoginCntSelectedPer] = useState(0);
  const [naverLoginCntSelectedPer, setNaverLoginCntSelectedPer] = useState(0);
  const [kakaoLoginCntSelectedPer, setKakaoLoginCntSelectedPer] = useState(0);
  const [emailLoginCntSelectedPer, setEmailLoginCntSelectedPer] = useState(0);
  const [categoryData, setCategoryData] = useState([]);
  const [totalLoginCntByDate, setTotalLoginCntByDate] = useState([]);

  useEffect(() => {
    if(Object.keys(data).length === 0) {

    } else {
      initGraphData(data);
    }
  },[data]);

  useEffect(() => {
    if(isNaN(totalLoginCntSelected)) {
      initGraphDataModified();
    }
  },[totalLoginCntSelected]);

  const pushDataToArray = (objArray, field) => {
    let resultArray = [];
    resultArray = objArray.map((item) => item[field]);
    return resultArray;
  };

  const percntageDiffCalc = (oldVal, newVal) => {
    return ((newVal - oldVal) / oldVal * 100).toFixed(2);
  };

  const percntageCalc = (total, potion) => {
    return ((potion/total) * 100).toFixed(2);
  };

  const initGraphData = (data) => {
    setTotalLoginCnt(pushDataToArray(data.monthlyLogintypeCnt, "total_cnt"));
    setGoogleLoginCnt(pushDataToArray(data.monthlyLogintypeCnt, "google_cnt"));
    setNaverLoginCnt(pushDataToArray(data.monthlyLogintypeCnt, "naver_cnt"));
    setKakaoLoginCnt(pushDataToArray(data.monthlyLogintypeCnt, "kakao_cnt"));
    setEmailLoginCnt(pushDataToArray(data.monthlyLogintypeCnt, "email_cnt"));
    setTotalLoginCntSelected((totalLoginCnt.length > 1) ? totalLoginCnt[totalLoginCnt.length-1] : totalLoginCnt[0]);
    setGoogleLoginCntSelected((googleLoginCnt.length > 1) ? googleLoginCnt[googleLoginCnt.length-1] : googleLoginCnt[0]);
    setNaverLoginCntSelected((naverLoginCnt.length > 1) ? naverLoginCnt[naverLoginCnt.length-1] : naverLoginCnt[0]);
    setKakaoLoginCntSelected((kakaoLoginCnt.length > 1) ? kakaoLoginCnt[kakaoLoginCnt.length-1] : kakaoLoginCnt[0]);
    setEmailLoginCntSelected((emailLoginCnt.length > 1) ? emailLoginCnt[emailLoginCnt.length-1] : emailLoginCnt[0]);
    setTotalLoginCntByDate(data.loginLogCountByDateList);
    setCategoryData(pushDataToArray(totalLoginCntByDate, "standard_date_key")); 
    setTotalCnt(totalLoginCnt[totalLoginCnt.length - 1]);
  };

  const initGraphDataModified = () => {
    setDiffPercentage(
      (totalLoginCnt.length > 1) ? Number(percntageDiffCalc(totalLoginCnt[0],totalLoginCnt[1])) : 0
    );
    setGoogleLoginCntSelectedPer((isNaN(totalLoginCntSelected)) ? pushDataToArray(data.monthlyLogintypeCnt, "google_per")[totalLoginCnt.length-1] : 0);
    setNaverLoginCntSelectedPer((isNaN(totalLoginCntSelected)) ? pushDataToArray(data.monthlyLogintypeCnt, "naver_per")[totalLoginCnt.length-1] : 0);
    setKakaoLoginCntSelectedPer((isNaN(totalLoginCntSelected)) ? pushDataToArray(data.monthlyLogintypeCnt, "kakao_per")[totalLoginCnt.length-1] : 0);
    setEmailLoginCntSelectedPer((isNaN(totalLoginCntSelected)) ? pushDataToArray(data.monthlyLogintypeCnt, "email_per")[totalLoginCnt.length-1] : 0);
  };

  return (
    <>
        <Grid item xs={12} md={12}>
          <h3>Total number of Logins by Day&#40;for Month&#41;</h3>
        </Grid>
        {/* 날짜별 login history 총합 그래프 */}
        <Grid item xs={12} md={12}>
          {/* {loginLogCountByDateList && loginLogCountByDateList[0]} */}
          <BankingWidgetSummary
            title="Total"
            icon={(diffPercentage > 0) ? "eva:diagonal-arrow-left-down-fill" : "eva:diagonal-arrow-left-down-fill"}
            color={(diffPercentage > 0) ? "primary" : "error"}
            percent={diffPercentage}
            total={totalLoginCntSelected}
            chart={{
              series: pushDataToArray(totalLoginCntByDate, "total"),
              categoryData: categoryData,
            }}
            bgOption={true}
          />
        </Grid>

        {/* 날짜별 login history 총합 그래프 AuthType으로 분류 */}
        <Grid item xs={12} md={12}>
          <h5>Option 1</h5>
        </Grid>
        <Grid item xs={12} md={3}>
          <EcommerceWidgetSummary
            title="Google"
            color="error"
            percent={(googleLoginCnt.length > 1) ? Number(percntageDiffCalc(googleLoginCnt[0],googleLoginCnt[1])) : 0}
            total={googleLoginCntSelected}
            chart={{
              colors: [theme.palette.error.main],
              series: pushDataToArray(totalLoginCntByDate, "google"),
              categoryData: categoryData,
            }}
          />
        </Grid>
        <Grid item xs={12} md={3}>
          <EcommerceWidgetSummary
            title="Naver"
            color="primary"
            percent={(naverLoginCnt.length > 1) ? Number(percntageDiffCalc(naverLoginCnt[0],naverLoginCnt[1])) : 0}
            total={naverLoginCntSelected}
            chart={{
              colors: [theme.palette.primary.main],
              series: pushDataToArray(totalLoginCntByDate, "naver"),
              categoryData: categoryData,
            }}
          />
        </Grid>
        <Grid item xs={12} md={3}>
          <EcommerceWidgetSummary
            title="Kakao"
            color="warning"
            percent={(kakaoLoginCnt.length > 1) ? Number(percntageDiffCalc(kakaoLoginCnt[0],kakaoLoginCnt[1])) : 0}
            total={kakaoLoginCntSelected}
            chart={{
              colors: [theme.palette.warning.main],
              series: pushDataToArray(totalLoginCntByDate, "kakao"),
              categoryData: categoryData,
            }}
          />
        </Grid>
        <Grid item xs={12} md={3}>
          <EcommerceWidgetSummary
            title="Email"
            percent={(kakaoLoginCnt.length > 1) ? Number(percntageDiffCalc(emailLoginCnt[0],emailLoginCnt[1])) : 0}
            total={emailLoginCntSelected}
            chart={{
              colors: [theme.palette.secondary.main],
              series: pushDataToArray(totalLoginCntByDate, "email"),
              categoryData: categoryData,
            }}
          />
        </Grid>
        <Grid item xs={12} md={12}>
          <h5>Option 2</h5>
        </Grid>
        <Grid item xs={12} md={3}>
          <AppWidgetSummary
            title="Google"
            color="error"
            percent={(googleLoginCnt.length > 1) ? Number(percntageDiffCalc(googleLoginCnt[0],googleLoginCnt[1])) : 0}
            total={googleLoginCntSelected}
            chart={{
              colors: [theme.palette.error.main],
              series: pushDataToArray(totalLoginCntByDate, "google"),
              categoryData: categoryData,
            }}
          />
        </Grid>
        <Grid item xs={12} md={3}>
          <AppWidgetSummary
            title="Naver"
            color="primary"
            percent={(naverLoginCnt.length > 1) ? Number(percntageDiffCalc(naverLoginCnt[0],naverLoginCnt[1])) : 0}
            total={naverLoginCntSelected}
            chart={{
              colors: [theme.palette.primary.main],
              series: pushDataToArray(totalLoginCntByDate, "naver"),
              categoryData: categoryData,
            }}
          />
        </Grid>
        <Grid item xs={12} md={3}>
          <AppWidgetSummary
            title="Kakao"
            color="warning"
            percent={(kakaoLoginCnt.length > 1) ? Number(percntageDiffCalc(kakaoLoginCnt[0],kakaoLoginCnt[1])) : 0}
            total={kakaoLoginCntSelected}
            chart={{
              colors: [theme.palette.warning.main],
              series: pushDataToArray(totalLoginCntByDate, "kakao"),
              categoryData: categoryData,
            }}
          />
        </Grid>
        <Grid item xs={12} md={3}>
          <AppWidgetSummary
            title="Email"
            percent={(kakaoLoginCnt.length > 1) ? Number(percntageDiffCalc(emailLoginCnt[0],emailLoginCnt[1])) : 0}
            total={emailLoginCntSelected}
            chart={{
              colors: [theme.palette.secondary.main],
              series: pushDataToArray(totalLoginCntByDate, "email"),
              categoryData: categoryData,
            }}
          />
        </Grid>

        {/** 퍼센티지 도넛 */}
        <Grid item xs={12} md={12}>
          <BookingCheckInWidgets
            chart={{
              colors: [theme.palette.error.main],
              series: [
                { label: 'Google', percent: googleLoginCntSelectedPer, total: googleLoginCntSelected },
                { label: 'Naver', percent: naverLoginCntSelectedPer, total: naverLoginCntSelected },
                { label: 'Kakao', percent: kakaoLoginCntSelectedPer, total: kakaoLoginCntSelected },
                { label: 'Email', percent: emailLoginCntSelectedPer, total: emailLoginCntSelected },
              ],
            }}
          />
        </Grid>


        {/** 전체 일별 그래프 */}
        <Grid item xs={12} md={6} lg={12}>
          {
            totalLoginCntByDate && 
            <EcommerceYearlySales
            title="Monthly Login History"
            subheader={`(${diffPercentage}%) than last month`}
            first="key"
            chart={{
              categories: categoryData,
              series: [
                {
                  year: 'key',
                  data: [
                    { name: 'Naver', data: pushDataToArray(totalLoginCntByDate, "naver")},
                    { name: 'Kakao', data: pushDataToArray(totalLoginCntByDate, "kakao")},
                    { name: 'Email', data: pushDataToArray(totalLoginCntByDate, "email")},
                    { name: 'Google', data: pushDataToArray(totalLoginCntByDate, "google")},
                  ],
                },
                /** year 데이터를 기준으로 컴포넌트 소스 내의 year 값으로 selectbox를 보여주던 부분 */
                // {
                //   year: '9',
                //   data: [
                //     { name: 'Naver', data: [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2,0,0,0,0,0,0,0,0,0,0] },
                //     { name: 'Kakao', data: [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,3,23,5,0,0,0,13,9,2,0,0,0] },
                //     { name: 'Google', data: [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,1,0,0,1,6,0,0,0,0] },
                //     { name: 'Email', data: [0,0,0,0,0,0,0,0,0,0,0,1,5,2,4,0,0,15,35,29,39,33,0,4,68,47,13,0,0,0] },
                //   ],
                // },
              ],
            }}
          />
          }
        </Grid>
    </>
  );
};

export default TotalUserLogHistoryGraph;