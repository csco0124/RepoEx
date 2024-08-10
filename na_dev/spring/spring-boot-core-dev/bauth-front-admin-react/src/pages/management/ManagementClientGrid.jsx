import { useEffect, useState, useMemo, useCallback } from 'react';
import useSWR from 'swr';
import axios from 'axios';
import Iconify from '../../components/iconify';
import CommonDataGrid from '../../components/common/CommonDataGrid';
import CommonGridSearchFrame from '../../components/common/CommonGridSearchFrame';
import { produce } from 'immer';
import { debounce } from 'lodash';
import { setDate } from 'date-fns';
import { Link } from 'react-router-dom'
import { LoadingButton } from '@mui/lab';
import { $axios } from '@/configs/axios/axiosConfig';
import { createRoot } from 'react-dom/client';
import { COMMON_GRID_INIT_PAGINATION_INFO } from '@/utils/pageCommonUtil';
import { Box, Button, Grid, IconButton, MenuItem, Popover, TextField, Card } from '@mui/material';
import { registerButtonCellRender, editButtonCellClicked, deleteButtonClicked } from '@/pages/management/ManagementClientGridRenderer';

export default function ManagementClientGrid(props) {

	const [condition, setCondition] = useState({
		searchParam : {
			size: COMMON_GRID_INIT_PAGINATION_INFO.pageSize,
			page: COMMON_GRID_INIT_PAGINATION_INFO.page,
			sort: "id",
			direction: "asc",
			searchCriteriaList: [],
			dataOption: "all"
		},
		pagination : COMMON_GRID_INIT_PAGINATION_INFO
	});
	const { data, mutate } = useSWR(['client_grid', condition], () => getData(condition), {});

  const [searchLoading, setSearchLoading] = useState(false);
	const [propsData, setPropsData] = useState([]);
  const [totalRowCount, setTotalRowCount] = useState(0);
  const [searchClientName, setSearchClientName] = useState('');
  const [open, setOpen] = useState(null); // snackbar open/close 조작
  const [currentData, setCurrentData] = useState({});

  const columnDefs = [
    { headerName: 'ClientName', field: 'clientName', headerAlign:'center', align: "center" },
    { headerName: 'HomeUri', field: 'homeUri', headerAlign:'center', align: "center", renderCell: params => (<Link onClick={()=> onClickHomeUri(params)}>{params.row.homeUri}</Link>) },
    { headerName: 'BaseUrl', field: 'baseUrl', headerAlign:'center', align: "center", renderCell: params => (<Link onClick={()=> onClickBaseUrl(params)}>{params.row.baseUrl}</Link>) },
  ];

  // ---------------------------------------------------------------------

  // 검색조건 초기화
  const searchInit = () => {
    setSearchClientName("");
  }

  const searchStart = () => {
    newSearchParam();
  };

  const refreshData = () => {
    mutate(getData(condition), false);
  }

	const onChangeSearch = () => {
		//debounceOnChange();
	}
	const debounceOnChange = useCallback(
		debounce(async params => {
			searchStart();
		}, 500),
		[],
	);

  /**
   * clientList 조회
   */
	const getData = async ({searchParam, pagination}) => {
		setSearchLoading(true);
		const res = await axios.post('/private/api/registered-client/listsPageSearch', searchParam);
		setSearchLoading(false);
		return res.data.data;
	}

	const newSearchParam = () => {
		let searchCriteriaList = [];
		!!searchClientName && searchCriteriaList.push({filterKey: 'clientName', operation: 'cn', value: searchClientName});
		setCondition({
			searchParam : {
				size: COMMON_GRID_INIT_PAGINATION_INFO.pageSize,
				page: COMMON_GRID_INIT_PAGINATION_INFO.page,
				sort: "id",
				direction: "asc",
				searchCriteriaList: searchCriteriaList,
				dataOption: "all"
			},
			pagination : COMMON_GRID_INIT_PAGINATION_INFO
		})
	}

  /**
   * edit / delete button
   * @param {*} params 
   * @returns 
   */
  const renderPopover = params => (
    <Popover
      open={Boolean(open)}
      anchorEl={open}
      onClose={handleCloseMenu}
      anchorOrigin={{ vertical: 'top', horizontal: 'left' }}
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}>
      
			<MenuItem onClick={()=>{editButtonCellClicked(currentData)}}>
        <Iconify icon={'eva:edit-fill'} sx={{ mr: 2 }} /> Edit
      </MenuItem>
			<MenuItem onClick={() => deleteButtonClicked(currentData, refreshData , setOpen)}>
        <Iconify icon={'eva:trash-2-outline'} sx={{ mr: 2 }} /> Delete
      </MenuItem>
    </Popover>
  );

  const handleCloseMenu = () => {
    setOpen(null);
    setCurrentData({});
  };

  const handleOpenMenu = (event, params) => {
    setOpen(event.currentTarget);
    setCurrentData(params);
  };

  /**
   * edit / delete button push
   */
  columnDefs.push({
    field: 'Operation button',
    sortable: false,
    align:'center', 
    headerAlign:'center',
    renderCell: params => (
      <div>
        <IconButton onClick={e => handleOpenMenu(e, params)}>
          <Iconify icon={'eva:more-vertical-fill'} />
        </IconButton>
        {renderPopover(params)}
      </div>
    ),
  });

  /**
   * baseUrl 이동
   * @param {*} params 
   */
  const onClickBaseUrl = (params) => {
    window.open(params.row.baseUrl);
  }

  /**
   * homeUri 이동
   * homeUri : 인증서버가 클라이언트에게 리디렉션 시키거나 연결해야할때 이동하는 기본 URL
   * @param {*} params 
   */
  const onClickHomeUri = (params) => {
    let homeUri = "";
    if(params.value.startsWith('/')) {
      homeUri = params.row.homeUri;
    }else {
      homeUri = "/" + params.row.homeUri;
    }
    window.open(window.location.protocol + "//" + window.location.host + homeUri);
  }

  return (
    <>
      <Card sx={{mx:2}}>
        <CommonGridSearchFrame>
					<TextField label="클라이언트 이름" variant="outlined" size='small' onChange={e => { setSearchClientName(e.target.value); }} value={searchClientName} focused fullWidth  />
          <LoadingButton loading={searchLoading} variant="contained" size="medium" onClick={searchStart}>검색</LoadingButton>
          <Button variant="contained" size="medium" onClick={searchInit}>
						<Iconify icon="carbon:reset-alt" width="24px"/>
					</Button>
        </CommonGridSearchFrame>
				<CommonDataGrid columns={columnDefs} getRowId={row => row.id} rows={data?.content} totalRowCount={data?.totalElements} condition={condition} setCondition={setCondition} >
        	{registerButtonCellRender()}
        </CommonDataGrid>
      </Card>
    </>
  );
}
