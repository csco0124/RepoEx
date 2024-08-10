// react
import { Helmet } from 'react-helmet-async';

// component
import SearchItem from '@components/search-item/SearchItem';
import Iconify from '@components/iconify';
import CustomBreadcrumbs from '@components/custom-breadcrumbs';

// mui
import { Stack , Box } from '@mui/material';
import Button from '@mui/material/Button';

// interface
import type { SearchBarPresentationProps } from './interface';

const SearchBarPresentation = (props: SearchBarPresentationProps) => {

  return (
    <>
      {/* 필터명 */}
      <Stack direction="row" justifyContent="space-between" alignItems="center">
        <Box>
          <Helmet>
            <title> {props.title} </title>
          </Helmet>
          <Box sx={{ mx: 2 }}>
            <CustomBreadcrumbs heading={props.title} links={[{}]} sx={{ m: 0, '.MuiTypography-root': { m: 0 } }} action={undefined} moreLink={undefined} activeLast={undefined} />
          </Box>
        </Box>

        {/* 검색조건 */}
        <SearchItem>              
          <Stack>
            {/* 사용자 정의 조건 */}
            {props.children}

            {/* 검색 버튼 */}
            <Button variant="contained" size="medium" onClick={props.handleSubmit} children="검색"/>
            
            {/* 리셋버튼 */}
            <Button variant="contained" size="medium" onClick={props.reset}>
              <Iconify icon="carbon:reset-alt" width="24px" sx={{}} />
            </Button>
          </Stack>
        </SearchItem>
      </Stack>
    </>
  )
};

export default SearchBarPresentation;