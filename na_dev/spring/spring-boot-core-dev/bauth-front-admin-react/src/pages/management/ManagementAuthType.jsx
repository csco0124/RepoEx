// react
import { useMemo, useState, useEffect } from 'react';
import useSWR from 'swr';

// component
import { $axios } from '@/configs/axios/axiosConfig';
import Label from '@/components/label/Lable';
import Iconify from '@/components/iconify';
import CommonDataGrid from '@/components/common/CommonDataGrid';
import CommonGridSearchFrame from '@/components/common/CommonGridSearchFrame';

// library
import Button from '@mui/material/Button';
import { MenuItem, TextField, Typography, Checkbox, Card } from '@mui/material';
import { COMMON_GRID_INIT_PAGINATION_INFO } from '@/utils/pageCommonUtil';

const ManagementAuthType = () => {
  const columnDefs = [
    { field: 'id', label: 'id', headerAlign: 'center', align: 'center' },
    { field: 'nickname', label: 'name', sort: 'asc', headerAlign: 'center', align: 'center' },
    { field: 'authType', label: 'authType', headerAlign: 'center', align: 'center' },
  ]; // 컬럼 정의
  const [condition, setCondition] = useState({
    searchParam: {
      size: COMMON_GRID_INIT_PAGINATION_INFO.pageSize,
      page: COMMON_GRID_INIT_PAGINATION_INFO.page,
      sort: 'id',
      direction: 'ASC',
      searchCriteriaList: [],
      dataOption: 'all',
    },
    pagination: COMMON_GRID_INIT_PAGINATION_INFO,
  }); // 검색조건

  const { data } = useSWR(['auth_type', condition], () => getData(condition), {}); // swr 사용 검색조건을 파라미터로 getData 조회 결과 데이터.
  const [nameSearchVal, setNameSearchVal] = useState(''); // 이름 검색 필드
  const options = ['google', 'kakao', 'naver', 'webauthn']; // 검색 조건 체크박스 옵션
  const [selectedOptions, setSelectedOptions] = useState([]); // 체크된 검색 조건

  /**
   * 체크박스를 클릭했을 때 값 셋팅
   */
  const clickChkbox = option => {
    if (selectedOptions.includes(option)) {
      setSelectedOptions(selectedOptions.filter(item => item != option));
    } else {
      setSelectedOptions([...selectedOptions, option]);
    }
  };

  useEffect(() => {
    console.log(' nameSearchVal 값 변경 ');
  }, [nameSearchVal]);

  useEffect(()=> {
    console.log(' 컴포넌트 재랜더링 ');
  })

  /**
   * 검색 버튼
   */
  const searchStart = () => newSearchParam();

  /**
   * 검색 초기화
   */
  const searchInit = () => {
    setNameSearchVal('');
    setSelectedOptions([]);
  };

  /**
   * 생체인증 사용자 , 소셜인증 사용자 데이터 추출 및 정제
   * 검색조건 처리설정으로 post 데이터 조회.
   */
  const getData = async ({ searchParam, pagination }) => {
    const res = await $axios.post('/private/api/webauthn/grid', searchParam);
		let result = res.data.data;
		result.content = result.content.map(item => {
      let authTypes = [];
      if (item.googleKey) authTypes.push('google');
      if (item.kakaoKey) authTypes.push('kakao');
      if (item.naverKey) authTypes.push('naver');
      if (item.authenticators && item.authenticators.length > 0) authTypes.push('webauthn');
      return {
        ...item,
        authType: authTypes.join(', '),
      };
    });
    return result;
  };

  /**
   * 검색 값 설정.
   * refineSelectedOptions : useState set은 비동기로 이뤄짐으로 변수로 직접 접근
   */
  const newSearchParam = () => {
    // 체크된 조건 값들에 Key 를 붙여줌으로써 front/back 요소명 동일화
    let refineSelectedOptions = selectedOptions.map(obj => (obj !== 'webauthn' ? obj + 'Key' : obj));
    let searchCriteriaList = [];
    let optionList = [];
    searchCriteriaList.push({ filterKey: 'nickname', value: nameSearchVal, operation: 'cn' });
    refineSelectedOptions.forEach(item => {
      if (item == 'googleKey') searchCriteriaList.push({ filterKey: 'googleKey', value: item, operation: 'nn' });
      if (item == 'naverKey') searchCriteriaList.push({ filterKey: 'naverKey', value: item, operation: 'nn' });
      if (item == 'kakaoKey') searchCriteriaList.push({ filterKey: 'kakaoKey', value: item, operation: 'nn' });
      if (item == 'webauthn') searchCriteriaList.push({ filterKey: 'id', value: '', operation: 'nn' });
    });
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

  return (
    <>
      <Card sx={{ mx: 2, height: 'calc( 100vh - 160px )', minHeight: '610px' }}>
        <CommonGridSearchFrame>
          {/* 이름 검색 */}
          <TextField
            label="이름"
            variant="outlined"
            value={nameSearchVal}
            style={{ width: 200 }}
            onChange={e => {
              setNameSearchVal(e.target.value);
            }}
            size="small"
            focused
            fullWidth
          />
          {/* 드롭다운 영역 버튼 */}
          <TextField
            style={{ width: 200 }}
            select
            label={selectedOptions.length > 0 ? selectedOptions.join(' , ') : '인증수단'}
            size="small"
            >
            <span> {/* 여백 체크의 경우에도 체크박스가 체크되게끔 span 삽입 */}
            {options.map(option => (
            <MenuItem 
                key={option}
                onClick={event => {
                  event.stopPropagation();
                clickChkbox(option);
              }}
            >
              <Checkbox
              checked={selectedOptions.includes(option)}
              onClick={event => {
                event.stopPropagation();
                clickChkbox(option);
              }}
              />
              <Typography
              onClick={event => {
                event.stopPropagation();
                clickChkbox(option);
              }}
              >{option}
              </Typography>
            </MenuItem>
            ))}
            </span>
          </TextField>
          {/* search 버튼 */}
          <Button variant="contained" color="primary" onClick={searchStart} size="medium">
            검색
          </Button>
          {/* search init 버튼 */}
          <Button variant="contained" size="medium" onClick={searchInit}>
            <Iconify icon="carbon:reset-alt" width="24px" color="white" />
          </Button>
        </CommonGridSearchFrame>

        <CommonDataGrid
          columns={columnDefs}
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

export default ManagementAuthType;
