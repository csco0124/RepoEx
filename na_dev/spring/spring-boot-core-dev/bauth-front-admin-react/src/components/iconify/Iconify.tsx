// react
import { forwardRef, Ref, ReactNode } from 'react';
// icons
import { Icon } from '@iconify/react';
// @mui
import { Box, BoxProps } from '@mui/material';

interface IconifyProps extends BoxProps {
  icon: string | ReactNode;
  width?: number | string;
  sx : object;
}

const Iconify = forwardRef((props: IconifyProps, ref: Ref<HTMLDivElement>) => {
  
  const { icon, width = 20, sx, ...other } = props;

  return (
    <Box ref={ref} component={Icon} icon={icon} sx={{ width, height: width, ...sx }} {...other} />
  );
  
});

export default Iconify;
