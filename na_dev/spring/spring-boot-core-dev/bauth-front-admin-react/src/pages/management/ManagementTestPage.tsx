import GridFrame from "@/layouts/grid/GridFrame";
import { ErrorIcon } from "@/theme/overrides/CustomIcons";
import { SvgIcon, Tooltip } from "@mui/material";
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import date from 'date-and-time';
import { SetStateAction, useState } from "react";
import { GridSortModel } from "@mui/x-data-grid";
import useSWR, { SWRHook } from "swr";

const ManagementTestPage = () => {

	const [startDate, setStartDate] = useState("");
	const [endDate, setEndDate] = useState("");

	const [sortModel, setSortModel] = useState<GridSortModel>([
    {
      field: '',
      sort: 'desc',
    },
  ]);

  const searchParam = {
			searchCriteriaList: [
				{filterKey : 'createdDate', value : startDate + '00:00:00', operation : 'ge'},
				{filterKey : 'createdDate', value : endDate + '23:59:59', operation : 'le'}
			],
			dataOption: "all"
  }

  const pagenation = {
    page: 0, 	/* 페이지 번호 초기값 (0부터 시작) */
	  pageSize: 10 /* 출력 데이터 row 수 초기값 */
  }

  const startDateProps = {
		label:"시작일",
		variant:"outlined",
		size: 'small',
		type: "date",
		value: startDate,
		onChange: (e: { target: { value: SetStateAction<string>; }; }) => {setStartDate(e.target.value)},
		focused: true,
		fullWidth: true
	}

	const endDateProps = {
		label: "종료일",
		variant: "outlined",
		size: 'small',
		type: "date",
		value: endDate,
		onChange: (e: { target: { value: SetStateAction<string>; }; }) => {setEndDate(e.target.value)},
		focused: true,
		fullWidth: true
	}

  const fieldList = [startDateProps, endDateProps];

  const columns = [
		{ headerName: 'SEQ', field: 'id', width: 80, align:'center', headerAlign:'center' },
		{
			headerName: '로그인시간',
			field: 'createdDate',
			width: 250,
			valueFormatter: ( params: { value: string | number | Date; }) => date.format(new Date(params.value), 'YYYY-MM-DD HH:mm:ss'),
			align:'center',
			headerAlign:'center'
		},
		{ headerName: '사용자 이메일', 	field: 'email', width: 200, align:'center', headerAlign:'center'},
		{ headerName: '로그인 경로', 	field: 'loginChannel', width: 90, align:'center', headerAlign:'center', renderCell: (params: { value: any; }) => <img src={`${import.meta.env.VITE_PUBLIC_BASE_URL}/assets/icons/login/${params.value}-icon.svg`} />,},
		{ headerName: '로그인 성공여부', field: 'type', align:'center', headerAlign:'center', renderCell: (params: { value: string; }) => params.value === 'S' ? <Tooltip title="성공"><SvgIcon component={CheckCircleIcon} color="success" /></Tooltip> : <Tooltip title="실패"><SvgIcon component={ErrorIcon} color="disabled" /></Tooltip>},
		{ headerName: '응답코드', field: 'statusNum', align:'center', headerAlign:'center' },
		{ headerName: '에러메시지', field: 'errMsg', width: 400 },
	];

  return (
    <>
      <GridFrame 
        searchParam={searchParam}
        pagenation={pagenation}
        fieldList={fieldList}
        columns={columns}
        footer={<></>}
        rowData={[]}
        title={""}
        children={undefined}
        searchStart={undefined}
        searchInit={undefined}	
			/>
    </>
  )

}

export default ManagementTestPage;

function setStartDate(value: any) {
	throw new Error("Function not implemented.");
}
 