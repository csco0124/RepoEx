import { Helmet } from 'react-helmet-async';
// @mui
import { Container, Typography } from '@mui/material';
// components
import { useSettingsContext } from '../../components/settings';
import ManagementClientGrid from '@pages/management/ManagementClientGrid';
// hook
import React, { useState, useEffect } from 'react';


// ----------------------------------------------------------------------



// ----------------------------------------------------------------------

export default function ManagementClient() {

  const { themeStretch } = useSettingsContext();

  return (
    <>
      <Helmet>
        <title> Client | Minimal UI</title>
      </Helmet>
      <ManagementClientGrid/>
    </>
  );
}
