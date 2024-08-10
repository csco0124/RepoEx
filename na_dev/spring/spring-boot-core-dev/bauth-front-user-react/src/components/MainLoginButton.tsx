import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';

export const MainLoginButton = (props: any) => {
  return <Button size="large" variant="outlined" color="warning" component={Link} {...props}>
          {props.children}
         </Button>
    
}