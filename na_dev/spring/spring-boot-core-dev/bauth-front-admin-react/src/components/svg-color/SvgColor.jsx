import PropTypes from 'prop-types';
import { forwardRef } from 'react';
// @mui
import { Box } from '@mui/material';
import { PUBLIC_URL } from '@routes/paths';
// ----------------------------------------------------------------------


const SvgColor = forwardRef(({ src, sx, ...other }, ref) => (
   
  <Box
    component="span"
    className="svg-color"
    ref={ref}
    sx={{
      width: 24,
      height: 24,
      display: 'inline-block',
      bgcolor: 'currentColor',
      mask: `url(${PUBLIC_URL}${src}) no-repeat center / contain`,
      WebkitMask: `url(${PUBLIC_URL}${src}) no-repeat center / contain`,
      ...sx,
    }}
    {...other}
  />
));

SvgColor.propTypes = {
  src: PropTypes.string,
  sx: PropTypes.object,
};

export default SvgColor;
