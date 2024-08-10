import React, { useEffect, useState } from 'react';
import useSWR from 'swr';

import * as Icons from '@mui/icons-material';
import { $axios } from '@/configs/axios/axiosConfig';
import { Card, Button, Box, TextField, IconButton, Popover, MenuItem, Grid } from '@mui/material';
import CommonDataGrid from '@/components/common/CommonDataGrid';
import CommonGridSearchFrame from '@/components/common/CommonGridSearchFrame';
import { useModal } from '@hooks/useModal';
import { UserModal } from '@components/modal/UserModal';
import { LoadingButton } from '@mui/lab';
import RestartAltIcon from '@mui/icons-material/RestartAlt';

import { COMMON_GRID_INIT_PAGINATION_INFO } from '@/utils/pageCommonUtil';

export default function ManagementUser() {
  const { openModal } = useModal();
  const [rowData, setRowData] = useState([]);
  const [clientData, setClientData] = useState([]);
  const [searchNickname, setSearchNickname] = useState('');
  const [searchPhone, setSearchPhone] = useState('');
  const [searchEmail, setSearchEmail] = useState('');
  const [totalRowCount, setTotalRowCount] = useState(0);
  const [anchorEl, setAnchorEl] = useState(null);
  const [allAuthorities, setAllAuthorities] = useState([]);
  const [userClientAuthorities, setUserClientAuthorities] = useState([]);

  const [condition, setCondition] = useState({
    searchParam: {
      size: COMMON_GRID_INIT_PAGINATION_INFO.pageSize,
      page: COMMON_GRID_INIT_PAGINATION_INFO.page,
      sort: 'id',
      direction: 'DESC',
      searchCriteriaList: [],
      dataOption: 'all',
    },
    pagination: COMMON_GRID_INIT_PAGINATION_INFO,
  });

  // SWR 사용하여 사용자 데이터가 변경될 때마다 자동으로 재요청
  const { data, mutate } = useSWR(['user', condition], () => fetchData(condition), {});

  const fetchData = async ({ searchParam, pagination }) => {
    const response = await $axios.post('/private/api/admin/user-management', searchParam);
    return response.data.data;
  };

  // 컴포넌트가 마운트될 때 클라이언트 데이터와 권한 리스트
  useEffect(() => {
    fetchClientData();
    fetchAllAuthorities(); //권한 리스트
  }, []);

  // data 변경 시 rowData 업데이트
  useEffect(() => {
    if (data && data.content) {
      setRowData(data.content);
    }
  }, [data]);

  const handleOpenMenu = (event, params) => {
    setAnchorEl({ element: event.currentTarget, params });
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  // 검색 버튼 클릭 핸들러
  const handleSearch = () => {
    newSearchParam();
  };

  // 초기화
  const searchInit = () => {
    setSearchNickname('');
    setSearchPhone('');
    setSearchEmail('');

    // 초기 검색 조건 및 페이지네이션 정보 설정
    const initialCondition = {
      searchParam: {
        size: COMMON_GRID_INIT_PAGINATION_INFO.pageSize,
        page: COMMON_GRID_INIT_PAGINATION_INFO.page,
        sort: 'id',
        direction: 'DESC',
        searchCriteriaList: [],
        dataOption: 'all',
      },
      pagination: COMMON_GRID_INIT_PAGINATION_INFO,
    };

    setCondition(initialCondition); // 상태를 초기값으로 업데이트
    mutate(['user', initialCondition]); // 초기 조건으로 데이터 패칭
  };

  //클라이언트 전체리스트
  const fetchClientData = async () => {
    try {
      const response = await $axios.get('/private/api/registered-client/all-list');
      setClientData(response.data.data);
    } catch (error) {
      console.error('클라이언트 데이터 가져오기 실패:', error);
    }
  };

  // role권한 리스트
  const fetchAllAuthorities = async () => {
    try {
      const response = await $axios.get('/private/api/role/list');
      setAllAuthorities(response.data.data);
    } catch (error) {
      console.error('Failed to fetch authorities:', error);
    }
  };

  // 검색조건 설정 및 상태 업데이트
  const newSearchParam = () => {
    const searchCriteriaList = [];
    searchNickname && searchCriteriaList.push({ filterKey: 'nickname', value: searchNickname, operation: 'cn' });
    searchPhone && searchCriteriaList.push({ filterKey: 'phone', value: searchPhone, operation: 'cn' });
    searchEmail && searchCriteriaList.push({ filterKey: 'email', value: searchEmail, operation: 'cn' });
    setCondition({
      searchParam: {
        size: COMMON_GRID_INIT_PAGINATION_INFO.pageSize,
        page: COMMON_GRID_INIT_PAGINATION_INFO.page,
        sort: 'id',
        direction: 'asc',
        searchCriteriaList: searchCriteriaList,
        dataOption: 'all',
      },
      pagination: COMMON_GRID_INIT_PAGINATION_INFO,
    });
  };

  // Authority권한 편집
  const handleEdit = id => {
    const user = rowData.find(row => row.id === id);
    if (!user) {
      return;
    }
    // 사용자의 'authorities' 값을 가져오거나, 값이 없거나 undefined일 경우 빈 배열([])을 대신 할당
    const authorities = user.authorities || [];

    openModal(
      UserModal,
      {
        title: 'Authority Edit',
        nickname: user.nickname,
        userId: id,
        authorities: authorities, // user 현재 권한
        allAuthorities: allAuthorities, // 전체 권한 리스트
        clientAuthorities: user.clientAuthorities || [],
        clientData: clientData,
        message: `Editing user with ID: ${id}`,
        mutate,
      },
      { outsideClose: true },
    );
  };

  const columnDefs = [
    { field: 'id', align: 'center', headerAlign: 'center' },
    { field: 'nickname', headerName: 'nickname', headerAlign: 'center', align: 'center' },
    { field: 'phone', headerName: 'phone', headerAlign: 'center', align: 'center' },
    { field: 'email', headerName: 'email', headerAlign: 'center', align: 'center' },
  ];

  // columnDefs 배열의 각 컬럼에 'flex: 1' 속성을 추가하여 새로운 배열생성
  const addColumnOperationBtn = columnDefs.map(column => ({
    ...column,
    flex: 1,
  }));

  addColumnOperationBtn.push({
    field: 'Edit',
    sortable: false,
    renderCell: params => (
      // 추후 Edit기능 추가되면 메뉴바 사용
      // <div>
      //   <IconButton onClick={event => handleOpenMenu(event, params)}>
      //     <Iconify icon={'eva:more-vertical-fill'} />
      //   </IconButton>
      //   {renderPopover(params)}
      // </div>

      <div>
        <IconButton onClick={() => handleEdit(params.id)}>
          {/* <Iconify icon={'eva:edit-fill'} /> */}
          {<Icons.Edit />}
        </IconButton>
      </div>
    ),
  });
  // 추후 Edit기능 추가되면 메뉴바 사용
  // const renderPopover = () => {
  //   const currentParams = anchorEl?.params;
  //   if (!currentParams) return null;

  //   return (
  //     <Popover
  //       open={Boolean(anchorEl)}
  //       anchorEl={anchorEl.element}
  //       onClose={handleCloseMenu}
  //       anchorOrigin={{ vertical: 'top', horizontal: 'left' }}
  //       transformOrigin={{ vertical: 'top', horizontal: 'right' }}>
  //       <MenuItem
  //         onClick={() => {
  //           handleCloseMenu();
  //           handleEdit(currentParams.id);
  //         }}>
  //         <Iconify icon={'eva:edit-fill'} sx={{ mr: 2 }} />
  //         Edit
  //       </MenuItem>
  //     </Popover>
  //   );
  // };

  return (
    <>
      <Card sx={{ mx: 2, height: 'calc( 100vh - 160px )', minHeight: '610px' }}>
        <CommonGridSearchFrame>
          <TextField
            label="Nickname"
            value={searchNickname}
            onChange={e => setSearchNickname(e.target.value)}
            variant="outlined"
            size="small"
            focused
            fullWidth
          />
          <TextField
            label="Phone"
            variant="outlined"
            size="small"
            value={searchPhone}
            onChange={e => setSearchPhone(e.target.value)}
            focused
            fullWidth
          />
          <TextField
            label="Email"
            variant="outlined"
            size="small"
            value={searchEmail}
            onChange={e => setSearchEmail(e.target.value)}
            focused
            fullWidth
          />
          <LoadingButton variant="contained" size="medium" onClick={handleSearch}>
            검색
          </LoadingButton>
          <Button variant="contained" size="medium" onClick={searchInit}>
            <RestartAltIcon width="24px" color="white" />
          </Button>
        </CommonGridSearchFrame>
        <CommonDataGrid
          columns={addColumnOperationBtn}
          getRowId={row => row.id}
          rows={data?.content}
          totalRowCount={data?.totalElements}
          condition={condition}
          setCondition={setCondition}
        />
      </Card>
    </>
  );
}
