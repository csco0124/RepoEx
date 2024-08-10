import { useMemo, useState, useEffect } from 'react';
import useSWR from 'swr';
import axios from 'axios';
import date from 'date-and-time';
import { Card, Box, Container, Stack, FormControl, InputLabel, MenuItem, Select, TextField, Tooltip, Typography, Icon, SvgIcon } from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ErrorIcon from '@mui/icons-material/Error';
import Grid from "@mui/material/Grid";
import Button from '@mui/material/Button';
import { LoadingButton } from '@mui/lab';
import CommonGridSearchFrame from '@components/common/CommonGridSearchFrame';
import CommonDataGrid from '@components/common/CommonDataGrid';
import SearchItem from '@/components/search-item'
import Iconify from '@/components/iconify';
import { produce } from 'immer';
import { COMMON_GRID_INIT_PAGINATION_INFO } from '@/utils/pageCommonUtil';

export default function ManagementLoginHistory() {
	const [condition, setCondition] = useState({
		searchParam : {
			size: COMMON_GRID_INIT_PAGINATION_INFO.pageSize,
			page: COMMON_GRID_INIT_PAGINATION_INFO.page,
			sort: "createdDate",
			direction: "DESC",
			searchCriteriaList: [],
			dataOption: "all"
		},
		pagination : COMMON_GRID_INIT_PAGINATION_INFO
	});
	
	const { data, mutate } = useSWR(['login_history', condition], () => getData(condition), {});

	const [email, setEmail] = useState("");
	const [statusNum, setStatusNum] = useState("");
	const [type, setType] = useState("A");
	const [startDate, setStartDate] = useState("");
	
	const CURRENCIES = [
		{ value: 'email', label: 'e-mail' },
		{ value: 'statusNum', label: '응답코드' },
	];
	const [currency, setCurrency] = useState('email');
	const [currencyLabel, setCurrencyLabel] = useState(CURRENCIES[0].label);
	const [currencyValue, setCurrencyValue] = useState('');
	
	const [endDate, setEndDate] = useState("");
	const [searchLoading, setSearchLoading] = useState(false);
	const [startDateHelperText, setStartDateHelperText] = useState("");
	const [endDateHelperText, setEndDateHelperText] = useState("");
	const [currencyHelperText, setCurrencyHelperText] = useState("");
	
	const gridStyle = useMemo(() => ({ height: 500, width: '100%' }), []);

  useEffect(() => {

  }, []);

	const columnDefs = [
		{ headerName: 'SEQ', 	field: 'id', width: 80, align:'center', headerAlign:'center'},
		{ headerName: '로그인시간', field: 'createdDate', width: 250, valueFormatter: params => date.format(new Date(params.value), 'YYYY-MM-DD HH:mm:ss'), align:'center', headerAlign:'center' },
		{ headerName: '사용자 이메일', 	field: 'email', width: 200, align:'center', headerAlign:'center'},
		{ headerName: '로그인 경로', 	field: 'loginChannel', width: 90, align:'center', headerAlign:'center', renderCell: (params) => <img src={`${import.meta.env.VITE_PUBLIC_BASE_URL}/assets/icons/login/${params.value}-icon.svg`} />,},
		{ headerName: '로그인 성공여부', field: 'type', align:'center', headerAlign:'center', renderCell: (params) => params.value === 'S' ? <Tooltip title="성공"><SvgIcon component={CheckCircleIcon} color="success" /></Tooltip> : <Tooltip title="실패"><SvgIcon component={ErrorIcon} color="disabled" /></Tooltip>},
		{ headerName: '응답코드', field: 'statusNum', align:'center', headerAlign:'center' },
		{ headerName: '에러메시지', field: 'errMsg', width: 400 },
	];

	const handleChangeCurrency = (event) => {
		setCurrency(event.target.value);
		setCurrencyLabel(CURRENCIES[event.target.selectedIndex].label);
	};
	
	const searchInit = () => {
		setEmail("");
		setStatusNum("");
		setType("A");
		setStartDate("");
		setEndDate("");
		setStartDateHelperText("");
		setEndDateHelperText("");
		setCurrency(CURRENCIES[0].value);
		setCurrencyLabel(CURRENCIES[0].label);
		setCurrencyValue('');
		setCurrencyHelperText('');
	}

	const searchValidate = () => {
		setStartDateHelperText("");
		setEndDateHelperText("");
		setCurrencyHelperText("");
		if((startDate === "" && endDate !== "") || (startDate !== "" && endDate === "")){
			setStartDateHelperText("시작일 종료일 모두 입력");
			setEndDateHelperText("시작일 종료일 모두 입력");
			return false;
		}
		if(currency === 'statusNum' && isNaN(currencyValue)){
			setCurrencyHelperText("숫자만 입력");
			return false;
		}
		return true;
	}

	const getData = async ({searchParam, pagination}) => {
		// console.log('getData searchCondition, pagination', searchParam, pagination);
		setSearchLoading(true);
		debugger
		const res = await axios.post('/private/api/loginLog/getLoginLogList', searchParam);
		setSearchLoading(false);
		
		
		return res.data.data;
	}

	const newSearchParam = () => {
		let searchCriteriaList = [];
		startDate && searchCriteriaList.push({filterKey : 'createdDate', value : `${startDate} 00:00:00`, operation : 'ge'});
		endDate && searchCriteriaList.push({filterKey : 'createdDate', value : `${endDate} 23:59:59`, operation : 'le'});
		type !== 'A' && searchCriteriaList.push({filterKey : 'type', value : type, operation : 'eq'});
		
		if(currencyValue){
			switch(currency){
				case 'email' : 
					searchCriteriaList.push({filterKey : 'email', value : currencyValue, operation : 'cn'});
				break;
				case 'statusNum' : 
					searchCriteriaList.push({filterKey : 'statusNum', value : currencyValue, operation : 'eq'});
				break;
				default :
					
				break;
			}
		}
		setCondition({
			searchParam : {
				size: COMMON_GRID_INIT_PAGINATION_INFO.pageSize,
				page: COMMON_GRID_INIT_PAGINATION_INFO.page,
				sort: "createdDate",
				direction: "DESC",
				searchCriteriaList: searchCriteriaList,
				dataOption: "all"
			},
			pagination : COMMON_GRID_INIT_PAGINATION_INFO
		})
	}

	const searchStart = () => {
		if(!searchValidate()){
		 	return;
		}
		
		newSearchParam();
		//mutate(getData(), false);
	}

	const startDateProps = {
		helperText: startDateHelperText,
		label:"시작일",
		variant:"outlined",
		size: 'small',
		type: "date",
		value: startDate,
		onChange: (e) => {setStartDate(e.target.value)},
		focused: true,
		fullWidth: true
	}

	const endDateProps = {
		helperText: endDateHelperText,
		label: "종료일",
		variant: "outlined",
		size: 'small',
		type: "date",
		value: endDate,
		onChange: (e) => {setEndDate(e.target.value)},
		focused: true,
		fullWidth: true
	}

	const selectOptions = 
		<>
			<option key='A' value='A'>전체</option>
			<option key='S' value='S'>성공</option>
			<option key='E' value='E'>실패</option>
		</>
	

	const SuccessOrFailureProps = {
		select: true,
		fullWidth: true,
		size: "small",
		value: type,
		label: "성공여부",
		SelectProps: { native: true },
		onChange: (e) => {setStartDate(e.target.value)},
	}

	const SearchCondition = {
		select: true,
		fullWidth: true,
		size: "small",
		value: currency,
		label: "검색조건",
		SelectProps: { native: true },
		onChange: handleChangeCurrency
	}

  return (
    <>
			<Card sx={{mx:2, height: 'calc( 100vh - 160px )', minHeight: '610px',}}>
				<CommonGridSearchFrame>
					<TextField {...startDateProps} />
					<TextField {...endDateProps} />
					<TextField {...SuccessOrFailureProps}> {selectOptions} </TextField> 
					<TextField {...SearchCondition }>
						{CURRENCIES.map((option) => (
							<option key={option.value} value={option.value}>{option.label}</option>
						))}
					</TextField>
					<TextField helperText={currencyHelperText} label={currencyLabel} variant="outlined" size='small' value={currencyValue} onChange={(e) => {setCurrencyValue(e.target.value)}}  focused fullWidth  />
					
					<LoadingButton loading={searchLoading} variant="contained" size="medium" onClick={searchStart} children="검색"/>
					<Button variant="contained" size="medium" onClick={searchInit}>
						<Iconify icon="carbon:reset-alt" width="24px"/>
					</Button>
				</CommonGridSearchFrame>
				<CommonDataGrid columns={columnDefs} getRowId={row => row.id} rows={data?.content} totalRowCount={data?.totalElements} condition={condition} setCondition={setCondition} />
			</Card>
		</>
  );
}
