import type { FormControlLabelProps } from '@/ui/v2/FormControlLabel';
import FormControlLabel from '@/ui/v2/FormControlLabel';
import CheckIcon from '@/ui/v2/icons/CheckIcon';
import MinusIcon from '@/ui/v2/icons/MinusIcon';
import { alpha, lighten, styled } from '@mui/material';
import type { CheckboxProps as MaterialCheckboxProps } from '@mui/material/Checkbox';
import MaterialCheckbox, {
  checkboxClasses as materialCheckboxClasses,
} from '@mui/material/Checkbox';
import { svgIconClasses as materialSvgIconClasses } from '@mui/material/SvgIcon';
import type { ForwardedRef, PropsWithoutRef } from 'react';
import { forwardRef } from 'react';

export interface CheckboxProps extends MaterialCheckboxProps {
  /**
   * Label to be displayed next to the checkbox.
   */
  label?: FormControlLabelProps['label'];
  /**
   * Props to be passed to the internal components.
   */
  componentsProps?: {
    root?: Partial<MaterialCheckboxProps>;
    formControlLabel?: Partial<PropsWithoutRef<FormControlLabelProps>>;
  };
}

const StyledFormControlLabel = styled(FormControlLabel)(({ theme }) => ({
  display: 'grid',
  gridAutoFlow: 'column',
  gap: theme.spacing(1.25),
  justifyContent: 'start',
}));

const StyledCheckbox = styled(MaterialCheckbox)(({ theme }) => ({
  padding: 0,
  width: 16,
  height: 16,
  backgroundColor: 'transparent',
  borderRadius: 3,
  color: theme.palette.grey[400],
  [`&.${materialCheckboxClasses.disabled}`]: {
    backgroundColor: lighten(theme.palette.grey[200], 0.1),
  },
  [`&.${materialCheckboxClasses.checked}, &.${materialCheckboxClasses.indeterminate}`]:
    {
      color: theme.palette.common.white,
      backgroundColor: theme.palette.primary.main,
    },
  [`&.${materialCheckboxClasses.checked}.${materialCheckboxClasses.disabled}, &.${materialCheckboxClasses.indeterminate}.${materialCheckboxClasses.disabled}`]:
    {
      color: alpha(theme.palette.common.white, 0.4),
      backgroundColor: theme.palette.text.disabled,
    },
  [`&.${materialCheckboxClasses.checked}:focus-within, &.${materialCheckboxClasses.indeterminate}:focus-within`]:
    {
      backgroundColor: theme.palette.primary.dark,
    },
  [`&.${materialCheckboxClasses.checked} .${materialSvgIconClasses.root}, &.${materialCheckboxClasses.indeterminate} .${materialSvgIconClasses.root}`]:
    {
      width: 14,
      height: 14,
    },
  [`&:not(.${materialCheckboxClasses.checked}, .${materialCheckboxClasses.indeterminate})`]:
    {
      boxShadow: `inset 0 0 0 1px ${theme.palette.grey[400]}`,
    },
  [`&:not(.${materialCheckboxClasses.checked}, .${materialCheckboxClasses.indeterminate}):focus-within`]:
    {
      boxShadow: `inset 0 0 0 1px ${theme.palette.grey[700]}`,
    },
  [`&:not(.${materialCheckboxClasses.checked}, .${materialCheckboxClasses.indeterminate}) .${materialSvgIconClasses.root}`]:
    {
      display: 'none',
    },
}));

function Checkbox(
  {
    className,
    label,
    componentsProps = {},
    'aria-label': ariaLabel,
    ...props
  }: CheckboxProps,
  ref: ForwardedRef<HTMLInputElement>,
) {
  if (!label) {
    return (
      <StyledCheckbox
        className={className}
        ref={ref}
        disableRipple
        checkedIcon={<CheckIcon />}
        indeterminateIcon={<MinusIcon />}
        {...componentsProps.root}
        {...props}
        inputProps={{ ...props.inputProps, 'aria-label': ariaLabel }}
      />
    );
  }

  return (
    <StyledFormControlLabel
      className={className}
      label={label}
      control={
        <StyledCheckbox
          ref={ref}
          disableRipple
          checkedIcon={<CheckIcon />}
          indeterminateIcon={<MinusIcon />}
          {...componentsProps.root}
          {...props}
          inputProps={{ ...props.inputProps, 'aria-label': ariaLabel }}
        />
      }
      {...componentsProps.formControlLabel}
    />
  );
}

Checkbox.displayName = 'NhostCheckbox';

export default forwardRef(Checkbox);
