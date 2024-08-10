import { styled } from '@mui/material/styles';
import { Stack } from '@mui/material';

const StyledSearchItem = styled(Stack) (({theme}) => ({
    padding: '28px 20px 20px',
    flexDirection: 'row',
    justifyContent: 'end',
    minWidth: '600px',
    '& > div': {
      flexDirection: 'row',
      alignItems: 'center',
      gap: '0 8px',
    },
    '&button': {
      backgroundColor: theme.palette.background.paper,
      color:theme.palette.background.paper,
      '&:hover': {
        color:'#fff',
      }
    },
    '&svg': {
      color:theme.palette.background.paper,
      '&:hover': {
        color:'#fff',
      }
    }
}));

export default StyledSearchItem;