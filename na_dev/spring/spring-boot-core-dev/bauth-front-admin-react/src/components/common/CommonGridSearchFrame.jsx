import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';

// component
import SearchItem from '../search-item/SearchItem';
import CommonDataGrid from './CommonDataGrid';
import CustomBreadcrumbs from '../custom-breadcrumbs/CustomBreadcrumbs';

// library
import { Card, Stack , Box } from '@mui/material';

const CommonGridSearchFrame = props => {
  const location = useLocation();
  let data = location.pathname;
  let pathName = data.split('/').pop();

  let pageData = {
    authType: { title: 'AuthType' },
    client: { title: 'Client' },
    roles: { title: 'Client Roles' },
    user: { title: 'User' },
    loginHistory: { title: 'LoginHistory' },
    loginAnalytics: { title: 'LoginAnalytics' },
    role: { title: 'Role' },
  };

  let { title } = pageData[pathName];


  return (
    <>
      {/* title 영역 */}
      <Stack direction="row" justifyContent="space-between" alignItems="center">
        <Box>
          <Helmet>
            <title> {title} | Bauth </title>
          </Helmet>
          <Box sx={{ mx: 2 }}>
            <CustomBreadcrumbs heading={title} links={[{}]} sx={{ m: 0 , '.MuiTypography-root': { m: 0 }}} />
          </Box>
        </Box>
        
        {/* 검색조건 영역 */}
        <SearchItem>
          <Stack>{props.children}</Stack>
        </SearchItem>
      </Stack>
    </>
  );
};

export default CommonGridSearchFrame;
