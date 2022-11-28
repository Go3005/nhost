import Backdrop from '@/ui/v2/Backdrop';
import { DialogTitle } from '@/ui/v2/Dialog';
import { styled } from '@mui/material';
import type { DrawerProps as MaterialDrawerProps } from '@mui/material/Drawer';
import MaterialDrawer, { drawerClasses } from '@mui/material/Drawer';
import type { ReactNode } from 'react';

export interface DrawerProps extends Omit<MaterialDrawerProps, 'title'> {
  /**
   * Title of the drawer.
   */
  title?: ReactNode;
  /**
   * Determines whether or not a close button is hidden in the drawer.
   *
   * @default false
   */
  hideCloseButton?: boolean;
}

const StyledDrawer = styled(MaterialDrawer)({
  [`& .${drawerClasses.paper}`]: {
    display: 'flex',
    boxShadow:
      '0px 1px 4px rgba(14, 24, 39, 0.1), 0px 8px 24px rgba(14, 24, 39, 0.1)',
  },
});

function Drawer({
  hideCloseButton,
  children,
  onClose,
  title,
  ...props
}: DrawerProps) {
  return (
    <StyledDrawer components={{ Backdrop }} onClose={onClose} {...props}>
      {onClose && !hideCloseButton && (
        <DialogTitle
          sx={{ padding: (theme) => theme.spacing(2.5, 3) }}
          onClose={(event) => onClose(event, 'escapeKeyDown')}
        >
          {title}
        </DialogTitle>
      )}

      {children}
    </StyledDrawer>
  );
}

Drawer.displayName = 'NhostDrawer';

export default Drawer;
