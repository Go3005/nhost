import type { FormControlProps } from '@/ui/v2/FormControl';
import FormControl from '@/ui/v2/FormControl';
import { darken, lighten, styled } from '@mui/material';
import type { InputBaseProps as MaterialInputBaseProps } from '@mui/material/InputBase';
import MaterialInputBase, { inputBaseClasses } from '@mui/material/InputBase';
import type { DetailedHTMLProps, ForwardedRef, HTMLProps } from 'react';
import { forwardRef } from 'react';
import mergeRefs from 'react-merge-refs';

export interface InputProps
  extends Omit<MaterialInputBaseProps, 'componentsProps'>,
    Pick<
      FormControlProps,
      | 'label'
      | 'helperText'
      | 'hideEmptyHelperText'
      | 'error'
      | 'variant'
      | 'inlineInputProportion'
    > {
  /**
   * Props passed to the form control component.
   *
   * @deprecated Use `componentsProps` instead.
   */
  formControlProps?: FormControlProps;
  /**
   * Props for component slots.
   */
  componentsProps?: {
    input?: Partial<MaterialInputBaseProps>;
    inputWrapper?: Partial<FormControlProps['inputWrapperProps']>;
    inputRoot?: Partial<
      DetailedHTMLProps<HTMLProps<HTMLInputElement>, HTMLInputElement>
    >;
    label?: Partial<FormControlProps['labelProps']>;
    formControl?: Partial<FormControlProps>;
    helperText?: Partial<FormControlProps['helperTextProps']>;
  };
}

const StyledInputBase = styled(MaterialInputBase)(({ theme }) => ({
  border: `1px solid ${theme.palette.grey[400]}`,
  borderRadius: theme.shape.borderRadius,
  transition: theme.transitions.create(['border-color', 'box-shadow']),
  [`& .${inputBaseClasses.input}`]: {
    fontSize: '0.9375rem',
    lineHeight: '1.375rem',
    padding: theme.spacing(1, 1.25),
    color: theme.palette.text.primary,
    outline: 'none',
    backgroundColor: 'transparent',
  },
  [`&.${inputBaseClasses.multiline}`]: {
    padding: 0,
  },
  [`&.${inputBaseClasses.focused}`]: {
    outline: 'none',
  },
  [`&.${inputBaseClasses.disabled}`]: {
    color: theme.palette.grey[600],
    borderColor: darken(theme.palette.grey[300], 0.1),
    backgroundColor: lighten(theme.palette.action.disabled, 0.75),
  },
  [`&:not(.${inputBaseClasses.disabled}):hover`]: {
    borderColor: theme.palette.grey[600],
  },
  [`&.${inputBaseClasses.focused}`]: {
    borderColor: theme.palette.grey[700],
    outline: 'none',
    boxShadow: 'none',
  },
  [`&.${inputBaseClasses.focused} .${inputBaseClasses.input}`]: {
    outline: 'none',
    boxShadow: 'none',
  },
  [`&.${inputBaseClasses.error}`]: {
    borderColor: theme.palette.error.main,
  },
  [`&.${inputBaseClasses.error}:focus`]: {
    borderColor: theme.palette.error.dark,
  },
}));

function Input(
  {
    label,
    helperText,
    hideEmptyHelperText,
    inlineInputProportion,
    variant = 'normal',
    formControlProps: {
      sx: deprecatedFormControlSx,
      ...deprecatedFormControlProps
    } = {},
    componentsProps,
    className,
    'aria-label': ariaLabel,
    ...props
  }: InputProps,
  ref: ForwardedRef<HTMLInputElement>,
) {
  const {
    inputWrapper: inputWrapperSlotProps,
    input: inputSlotProps,
    inputRoot: inputRootSlotProps,
    formControl: { sx: formControlSx, ...formControlSlotProps },
    label: labelSlotProps,
    helperText: helperTextSlotProps,
  } = {
    inputWrapper: componentsProps?.inputWrapper || {},
    input: componentsProps?.input || {},
    inputRoot: componentsProps?.inputRoot || {},
    formControl: componentsProps?.formControl || {},
    label: componentsProps?.label || {},
    helperText: componentsProps?.helperText || {},
  };

  return (
    <FormControl
      sx={[
        { alignItems: props.multiline ? 'start' : 'center' },
        ...(Array.isArray(deprecatedFormControlSx)
          ? deprecatedFormControlSx
          : [deprecatedFormControlSx]),
        ...(Array.isArray(formControlSx) ? formControlSx : [formControlSx]),
      ]}
      className={className}
      label={label}
      helperText={helperText}
      hideEmptyHelperText={hideEmptyHelperText}
      labelProps={{
        htmlFor: props.id,
        ...formControlSlotProps.labelProps,
        ...labelSlotProps,
      }}
      inputWrapperProps={inputWrapperSlotProps}
      helperTextProps={helperTextSlotProps}
      variant={variant}
      fullWidth={props.fullWidth}
      error={props.error}
      inlineInputProportion={inlineInputProportion}
      {...deprecatedFormControlProps}
      {...formControlSlotProps}
    >
      <StyledInputBase
        {...inputSlotProps}
        {...props}
        inputProps={{
          'aria-label': ariaLabel,
          ...props?.inputProps,
          ...inputRootSlotProps,
        }}
        inputRef={mergeRefs([ref, props.inputRef])}
        disabled={props.disabled}
      />
    </FormControl>
  );
}

Input.displayName = 'NhostInput';

export default forwardRef(Input);
