import { darken, styled } from '@mui/material';

const OptionBase = styled('li')(({ theme }) => ({
  listStyle: 'none',
  padding: theme.spacing(1, 1.5),
  backgroundColor: theme.palette.background.paper,
  width: '100%',
  minHeight: 36,
  display: 'grid',
  alignItems: 'center',
  justifyContent: 'start',
  cursor: 'default',
  fontSize: '0.9375rem',
  lineHeight: '1.375rem',
  transition: theme.transitions.create(['background-color'], { duration: 100 }),
  '&.Mui-focused, &:hover': {
    backgroundColor: darken(theme.palette.action.active, 0.025),
  },
  '&.Mui-focusVisible:hover': {
    backgroundColor: darken(theme.palette.action.hover, 0.1),
  },
  '&:disabled': {
    color: theme.palette.text.disabled,
  },
}));

OptionBase.displayName = 'NhostOptionBase';

export default OptionBase;
