import useSWR from 'swr';
import EditIcon from '@mui/icons-material/Edit';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import RestartAltIcon from '@mui/icons-material/RestartAlt';
import DeleteIcon from '@mui/icons-material/DeleteOutlined';
import CommonDataGrid from '@/components/common/CommonDataGrid';
import CreateRoleModal from '@/components/modals/CreateRoleModal';
import CommonGridSearchFrame from '@/components/common/CommonGridSearchFrame';
import { $axios } from '@/configs/axios/axiosConfig';
import { useModal } from '@hooks/useModal';
import { useAlert } from '@/hooks/useAlert';
import { DataGrid } from '@mui/x-data-grid';
import { useConfirm } from '@hooks/useConfirm';
import { LoadingButton } from '@mui/lab';
import { useEffect, useState } from 'react';
import { COMMON_GRID_INIT_PAGINATION_INFO } from '@/utils/pageCommonUtil';
import { Button, TextField, Box, Card, MenuItem, Popover, IconButton } from '@mui/material';

const ManagementRoles = () => {
  const { AlertWarn } = useAlert();
  const { Confirm } = useConfirm();
  const { openModal } = useModal();

  const [authority, setAuthority] = useState('');
  const [defaultYn, setDefaultYn] = useState('전체');
  const [searchLoading, setSearchLoading] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedAuthority, setSelectedAuthority] = useState('');

  // defaultYn 검색 selectBox option
  const searchDefaultArr = [
    { value: '전체', label: '전체' },
    { value: 'Y', label: 'Y' },
    { value: 'N', label: 'N' },
  ];

  const [condition, setCondition] = useState({
    searchParam: {
      size: COMMON_GRID_INIT_PAGINATION_INFO.pageSize,
      page: COMMON_GRID_INIT_PAGINATION_INFO.page,
      sort: 'authority',
      direction: 'ASC',
      searchCriteriaList: [],
      dataOption: 'all',
    },
    pagination: COMMON_GRID_INIT_PAGINATION_INFO,
  });

  const { data, mutate } = useSWR(['Role', condition], () => getRoleList(condition), {});

  // Grid column 정의
  const columnDefs = [
    { field: 'id', headerName: 'Role Name', headerAlign: 'center', align: 'center' },
    { field: 'defaultYn', headerName: 'DefaultYn', headerAlign: 'center', align: 'center' },
    {
      field: 'Operation button',
      align: 'center',
      headerAlign: 'center',
      headerName: 'Operation button',
      renderCell: params => (
        <>
          <IconButton onClick={e => openPopover(e, params.id)}>
            <MoreVertIcon />
          </IconButton>
          <Popover
            open={Boolean(anchorEl)}
            anchorEl={anchorEl}
            onClose={closePopover}
            anchorOrigin={{ vertical: 'top', horizontal: 'left' }}
            transformOrigin={{ vertical: 'top', horizontal: 'right' }}>
            <MenuItem onClick={setDefaultRole}>
              <EditIcon sx={{ mr: 2 }} />
              Set as default
            </MenuItem>
            <MenuItem onClick={deleteRole}>
              <DeleteIcon sx={{ mr: 2 }} />
              Delete
            </MenuItem>
          </Popover>
        </>
      ),
    },
  ];

  /**
   * Operation Button 클릭 시 popover 표시 (set as default, delete 메뉴)
   * @param {Event} e - 이벤트 객체
   * @param {String} id - 선택한 row id (authority)
   */
  const openPopover = (e, id) => {
    setAnchorEl(e.currentTarget);
    setSelectedAuthority(id);
  };

  /**
   * popover 닫힐 시 관련 state 초기화
   */
  const closePopover = () => {
    setAnchorEl(null);
    setSelectedAuthority('');
  };

  /**
   * Role 등록 modal open
   */
  const openCreateRoleModal = () => {
    openModal(
      CreateRoleModal,
      {
        title: 'Role 등록',
        callback: () => {
          mutate(getRoleList(condition), false);
        },
      },
      { outsideClose: false },
    );
  };

  /**
   * 검색조건 초기화, 재조회
   */
  const searchInit = () => {
    setAuthority('');
    setDefaultYn('전체');
    startSearch('Y');
  };

  /**
   * 검색 조건 condition 변경, SWR: getRoleList 호출
   * @param {String} isInit - 초기화 여부 (Y: 초기화, N: 일반 검색)
   */
  const startSearch = (isInit = 'N') => {
    const searchCriteriaList = [
      { filterKey: 'authority', value: authority, operation: 'cn' },
      { filterKey: 'defaultYn', value: defaultYn === '전체' ? '' : defaultYn, operation: 'cn' },
    ];

    setCondition({
      searchParam: {
        size: COMMON_GRID_INIT_PAGINATION_INFO.pageSize,
        page: COMMON_GRID_INIT_PAGINATION_INFO.page,
        sort: 'authority',
        direction: 'ASC',
        searchCriteriaList: isInit === 'Y' ? [] : searchCriteriaList,
        dataOption: 'all',
      },
      pagination: COMMON_GRID_INIT_PAGINATION_INFO,
    });
  };

  /**
   * Operation Button으로 선택한 row의 Role 기본 권한 여부
   * @returns {Boolean} true: 기본 권한, false: 일반 권한
   */
  const isDefaultRole = () => {
    return !!data.content.find(x => x.id === selectedAuthority && x.defaultYn === 'Y');
  };

  /**
   * Role 기본 권한 설정 validation
   */
  const validateSetDefault = () => {
    if (!!isDefaultRole()) {
      AlertWarn('현재 기본 권한입니다.');
      return false;
    }

    return true;
  };

  /**
   * Operation Button으로 선택한 row의 Role을 기본 권한으로 설정
   */
  const setDefaultRole = async () => {
    if (!!!validateSetDefault()) return;

    Confirm({
      message: `[${selectedAuthority}] 권한을 기본 권한으로 변경하시겠습니까?`,
      onConfirm: async () => {
        await $axios.put(`/private/api/role/setDefault/${selectedAuthority}`);
        closePopover();
        mutate(getRoleList(condition), false);
      },
    });
  };

  /**
   * Role 삭제 validation
   */
  const validateDelete = () => {
    if (!!isDefaultRole()) {
      AlertWarn('기본 권한은 삭제할 수 없습니다.');
      return false;
    }

    return true;
  };

  /**
   * Operation Button으로 선택한 row의 Role 삭제
   */
  const deleteRole = async () => {
    if (!!!validateDelete()) return;

    Confirm({
      message: `[${selectedAuthority}] 권한을 삭제하시겠습니까?`,
      onConfirm: async () => {
        await $axios.delete(`/private/api/role/${selectedAuthority}`);
        closePopover();
        mutate(getRoleList(condition), false);
      },
    });
  };

  /**
   * Role 검색
   * @param {Object} condition - SWR 사용, setCondition 실행 시 api 호출
   */
  const getRoleList = async ({ searchParam, pagination } = condition) => {
    setSearchLoading(true);
    const res = (await $axios.post('/private/api/role/list', searchParam)).data.data;
    res.content = res.content.map(role => {
      return {
        id: role.authority,
        defaultYn: role.defaultYn,
      };
    });
    await setSearchLoading(false);
    return res;
  };

  return (
    <>
      <Card sx={{ mx: 2, height: 'calc( 100vh - 160px )', minHeight: '610px' }}>
        <CommonGridSearchFrame>
          <TextField
            id="outlined-basic"
            label="Role Name"
            variant="outlined"
            size="small"
            value={authority}
            onChange={e => {
              setAuthority(e.target.value);
            }}
            focused
            fullWidth
          />
          <TextField
            select
            fullWidth
            size="small"
            value={defaultYn}
            label="DefaultYn"
            SelectProps={{ native: true }}
            onChange={e => {
              setDefaultYn(e.target.value);
            }}>
            {searchDefaultArr.map(x => (
              <option key={x.value} value={x.value}>
                {x.label}
              </option>
            ))}
          </TextField>
          <LoadingButton
            loading={searchLoading}
            variant="contained"
            size="medium"
            onClick={() => {
              startSearch();
            }}>
            검색
          </LoadingButton>
          <Button variant="contained" size="medium" onClick={searchInit}>
            <RestartAltIcon width="24px" color="white" />
          </Button>
        </CommonGridSearchFrame>
        <CommonDataGrid
          columns={columnDefs}
          rows={data?.content}
          getRowId={row => row.id}
          totalRowCount={data?.totalElements}
          condition={condition}
          setCondition={setCondition}>
          <Button variant="contained" onClick={openCreateRoleModal}>
            등록
          </Button>
        </CommonDataGrid>
      </Card>
    </>
  );
};

export default ManagementRoles;
