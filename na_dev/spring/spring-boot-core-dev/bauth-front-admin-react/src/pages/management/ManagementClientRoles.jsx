import { Helmet } from 'react-helmet-async';
import { useModal } from '@hooks/useModal';
import { useConfirm } from '@hooks/useConfirm';
import { useAlert } from '@/hooks/useAlert';
import React, { useEffect, useState } from 'react';
import { $axios } from '@/configs/axios/axiosConfig';
import useSWR from 'swr';
import { IconButton, Card, Stack, Button, Grid, TextField, Box, InputLabel, Select, MenuItem, FormControl } from '@mui/material';
import Iconify from '@/components/iconify';
import { DataGrid } from '@mui/x-data-grid';
import { ManagementRoleModal } from "@/components/modals/ManagementRoleModal";
import { LoadingButton } from '@mui/lab';
import CommonGridSearchFrame from '@/components/common/CommonGridSearchFrame';
import CommonDataGrid from '@/components/common/CommonDataGrid';
import { COMMON_GRID_INIT_PAGINATION_INFO } from '@/utils/pageCommonUtil';

const ManagementClientRoles = () => {
  //공통 컴포넌트
  const { Alert } = useAlert();
  const { openModal } = useModal();
  const { Confirm } = useConfirm();
  
  //전체목록 조회를 위한 초기값 세팅
  const [condition, setCondition] = useState({
    searchParam : {
      size: COMMON_GRID_INIT_PAGINATION_INFO.pageSize,
			page: COMMON_GRID_INIT_PAGINATION_INFO.page,
			sort: "clientEntity.clientName",
			direction: "asc",
      //검색조건 list
      searchCriteriaList: [],
			dataOption: "all"
		},
		pagination : COMMON_GRID_INIT_PAGINATION_INFO
	});
  const { data, mutate } = useSWR(['client_role', condition], () => getClientRoleList(condition), {});

  //등록 및 삭제 이후 현재 검색조건으로 재조회
  const refreshData = () => {
    mutate(getClientRoleList(condition), false);
  }

  //검색조건 
  const [clientName, setClientName] = useState("");
  const [authority, setAuthority] = useState("");
  const [defaultYn, setDefaultYn] = useState("A");

  //로딩 onoff
	const [searchLoading, setSearchLoading] = useState(false);

  // 등록/수정 여부 (reg-등록 , edit-수정)
  const [modalType, setModalType] = useState("reg");
  
	const searchStart = () => {
    let searchCriteriaList = [];
    authority && searchCriteriaList.push({filterKey : 'authority', value : authority, operation : 'cn'});
    clientName && searchCriteriaList.push({filterKey : 'clientName', value : clientName, operation : 'cn'});
    (defaultYn !== "A") && searchCriteriaList.push({filterKey : 'defaultYn', value : defaultYn, operation : 'cn'});

    setCondition({
			searchParam : {
        size: COMMON_GRID_INIT_PAGINATION_INFO.pageSize,
        page: COMMON_GRID_INIT_PAGINATION_INFO.page,
        sort: "clientEntity.clientName",
        direction: "DESC",
				searchCriteriaList: searchCriteriaList,
        dataOption: "all"
			},
			pagination : COMMON_GRID_INIT_PAGINATION_INFO
		})
	}

  const searchInit = () => {
		setClientName("");
    setAuthority("");
    setDefaultYn("A");
	}

  //목록 조회
	const getClientRoleList = async ({searchParam, pagination}) => {
    setSearchLoading(true);
		const res = await $axios.post('/private/api/admin/client-role/getClientRoleList', searchParam);
    let roleData = res.data.data;
    if(roleData.content.length !== 0){
			const processedData = roleData.content.map(role => {
				return {
					id: role.authority,
					orgRoleName: role.authority,
					clientName: role.clientName,
					clientId: role.oauth2RegisteredClientClientId,
					defaultYn: role.defaultYn,
				};
			});
      roleData.content = processedData;
      setSearchLoading(false);
      return roleData;
		}else{
      setSearchLoading(false);
      return null;
    }
	}

  //column 설정
  const columnDefs = [
    { field: 'id', headerName: 'Role Name', width:300},
    { field: 'clientName', headerName: 'Client Name', width:300},
    { field: 'clientId', headerName: 'Client ID', width:500},
    { field: 'defaultYn', headerName: 'DefaultYn',headerAlign: "center" , align: "center", width:150},
    {
      field: 'Delete',
      headerName: 'Delete',
      align: "center",
      headerAlign: "center",
      renderCell: (params) => (
        <IconButton
          onClick={() => {
            delRole(params.row.orgRoleName);
          }}>
          <Iconify icon={'eva:trash-2-outline'} />
        </IconButton>
      ),
      sortable: false,
      width:150
    },
  ];

  //삭제버튼 클릭 이벤트
  const delRole = async (key) => {
    Confirm(
      {
        message: '삭제?', 
        onConfirm: async () => {
          $axios.delete('/private/api/admin/client-role/'+key)
          .then((res)=>{
            if (res.data.error === 'ERR') {
              Alert(res.data.message);
              return;
            }
            refreshData();
          })  
          .catch((err) => {
            console.log("error!", err);
          })
          
        }, 
        onCancel: () => {
        }

      }
    );
  }

  //등록 modal
  const openRole = (type, target) => {
    openModal(ManagementRoleModal,  /** @routes/Modals에 등록한 모달 */
    {message : '모달 샘플 props', title:type=="reg"?'Role 등록':'Role 수정', mode:type, roleName:target, callback:refreshData}, /** modal에 전달할 props<any> close 함수의 경우 자동 전달*/
      {outsideClose:false}); /*모달 밖 클릭시 창 닫기 옵션*/
  }

  return (
    <>
      <Card sx={{ mx: 2}}>
        <CommonGridSearchFrame>
          <TextField label="Role Name" variant="outlined" size='small' value={authority} onChange={(e) => {setAuthority(e.target.value)}}  focused fullWidth  />
          <TextField id="outlined-basic" label="Client Name" variant="outlined" size='small' value={clientName} onChange={(e) => {setClientName(e.target.value)}}  focused fullWidth  />
          <TextField select fullWidth size="small" value={defaultYn} label="DefaultYn" SelectProps={{ native: true }} onChange={(e) => {setDefaultYn(e.target.value)}}>
            <option value="A">전체</option>
            <option value="Y">Y</option>
            <option value="N">N</option>
					</TextField>
          <LoadingButton loading={searchLoading} variant="contained" size="medium" onClick={searchStart}>검색</LoadingButton>
          <Button variant="outlined" size="medium" onClick={searchInit}>
						<Iconify icon="carbon:reset-alt" width="24px" color="white" />
					</Button>
        </CommonGridSearchFrame>

        <CommonDataGrid columns={columnDefs} getRowId={row => row.id} rows={data?.content} totalRowCount={data?.totalElements} condition={condition} setCondition={setCondition} >
          <Button variant="contained" onClick={() => openRole("reg", "")}>등록</Button>
        </CommonDataGrid>
      </Card>
      
    </>
  );
}

export default ManagementClientRoles;