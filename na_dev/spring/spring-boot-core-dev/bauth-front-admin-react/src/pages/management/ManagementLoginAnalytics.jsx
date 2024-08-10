import React from 'react';
import { useMemo, useState, useEffect } from 'react';
import { $axios } from '@/configs/axios/axiosConfig';
import EcommerceYearlySales from '@/components/dashboard/graphComponents/EcommerceYearlySales';
import AppCurrentDownload from '@/components/dashboard/graphComponents/AppCurrentDownload';
import AnalyticsCurrentVisits from '@/components/dashboard/graphComponents/AnalyticsCurrentVisits';
import CommonGridSearchFrame from '@components/common/CommonGridSearchFrame';

import TotalUserWidgetSummarys from '@/components/dashboard/TotalUserWidgetSummarys';
import TotalUserLogHistoryGraph from '@/components/dashboard/TotalUserLogHistoryGraph';
import TotalLoginTrafficSummarys from '@/components/dashboard/TotalLoginTrafficSummarys';
import TotalUserLogHistoryPieSummarys from '@/components/dashboard/TotalUserLogHistoryPieSummarys';
import Iconify from '@/components/iconify';

import ManagementLoginAnalyticsChart from './ManagementLoginAnalyticsChart';

// @mui
import { useTheme } from '@mui/material/styles';
import { Box, Container, FormControl, InputLabel, MenuItem, Select, TextField, Typography } from '@mui/material';
import Grid from "@mui/material/Grid";
import Button from '@mui/material/Button';
import { LoadingButton } from '@mui/lab';

export default function ManagementLoginAnalytics() {

    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");
    const [searchLoading, setSearchLoading] = useState(false);
    const [startDateHelperText, setStartDateHelperText] = useState("");
    const [endDateHelperText, setEndDateHelperText] = useState("");
    const [totalUserCntData, setTotalUserCntData] = useState([]);
    const [totalAnalyticData, setTotalAnalyticData] = useState([]);
    const [currency, setCurrency] = useState('m');

    useEffect(() => {
      searchInit();
      getDataList();
      return () => {
      };
    }, []);

    useEffect(() => {
      dateInit();
    }, [currency])

    const dateInit = () => {
      let today = new Date();
      let year = today.getFullYear();
      let month = ('0' + (today.getMonth() + 1)).slice(-2);
      let todayFormat = year + '-' + month  + '-01';
      let thisMonth = year + '-' + month;
      let lastDayFormat = year + '-' + month  + '-' + ('0' + (new Date(year,(today.getMonth()+1),0)).getDate()).slice(-2);
      
      setStartDate(thisMonth);
      // setStartDate(todayFormat);
      setEndDate(lastDayFormat);
    }

    const searchInit = () => {
      setStartDate("");
      setEndDate("");
      dateInit();
      setStartDateHelperText("");
      setEndDateHelperText("");
      getDataList();
    }

    const getDataList = async () => {
      setSearchLoading(true);
      try {
        let res = await $axios.post('/private/api/loginLog/getLoginLogCountList', {
          startDate :  `${startDate}-01 00:00:00`,
          // startDate :  `${startDate} 00:00:00`,
          endDate : `${endDate} 23:59:59`,
        });
  
        const data = res.data;
        setTotalUserCntData(data.loginAnalyticsData.totalUserCnt);
        setTotalAnalyticData(data.loginAnalyticsData);
      } catch(error) {
        alert("error : " + error);
      } finally {
        setSearchLoading(false);
      }
    }

    const CURRENCIES = [
      { value: 'm', label: 'month' },
      { value: 'y', label: 'year' },
      ];
      
      const handleChangeCurrency = (event) => {
        setCurrency(event.target.value);
      };

  return (
    <>
      <CommonGridSearchFrame>
        <TextField 
          sx={{ m: 1 }} 
          helperText={startDateHelperText} 
          id="outlined-basic" 
          label="시작일" 
          size='small'
          variant="outlined" 
          type={`${(currency === 'm') ? 'month' : 'number'}`} 
          value={startDate} 
          onChange={(e) => {setStartDate(e.target.value)}} focused fullWidth />
        
        {/* <TextField style={{ width: 200 }} sx={{ m: 1 }} helperText={startDateHelperText} id="outlined-basic" label="시작일" variant="outlined" type="date" value={startDate} onChange={(e) => {setStartDate(e.target.value)}} focused fullWidth />
        <TextField style={{ width: 200 }} sx={{ m: 1 }} helperText={endDateHelperText} id="outlined-basic" label="종료일" variant="outlined" type="date" value={endDate} onChange={(e) => {setEndDate(e.target.value)}} focused  fullWidth /> */}
        <TextField 
          select 
          fullWidth 
          size="small" 
          value={currency} 
          label="검색조건" 
          SelectProps={{ native: true }} 
          onChange={handleChangeCurrency}>
					{CURRENCIES.map((option) => (
						<option key={option.value} value={option.value}>{option.label}</option>
					))}
				</TextField>
        <LoadingButton loading={searchLoading} variant="contained" onClick={getDataList}>검색</LoadingButton>
        <Button variant="outlined" onClick={searchInit}>
          <Iconify icon="carbon:reset-alt" width="24px" color="white" />
        </Button>
      </CommonGridSearchFrame>

      <Grid container spacing={3}>

        {/* <TotalUserWidgetSummarys data={totalAnalyticData} />

        <TotalLoginTrafficSummarys data={totalAnalyticData} />

        <TotalUserLogHistoryPieSummarys data={totalAnalyticData} />

        <TotalUserLogHistoryGraph data={totalAnalyticData} /> */}

        <ManagementLoginAnalyticsChart data={totalAnalyticData} />
      </Grid>
    </>
  )
};