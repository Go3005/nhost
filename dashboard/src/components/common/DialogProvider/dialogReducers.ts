import type { CommonDialogProps } from '@/ui/v2/Dialog';
import type { ReactNode } from 'react';
import type { DialogConfig, DialogType } from './DialogContext';

export interface DialogState {
  /**
   * Title of the dialog.
   */
  title?: ReactNode;
  /**
   * Tracks if a dialog is open.
   */
  open?: boolean;
  /**
   * Type of the currently active dialog.
   */
  activeDialogType?: DialogType;
  /**
   * Props passed to the currently active dialog.
   */
  dialogProps?: Partial<CommonDialogProps>;
  /**
   * Custom payload to be passed to the currently active dialog. This is the
   * data needed by the active dialog.
   */
  payload?: any;
}

export type DialogAction =
  | {
      type: 'OPEN_DIALOG';
      payload: { type: DialogType; config?: DialogConfig };
    }
  | { type: 'HIDE_DIALOG' }
  | { type: 'CLEAR_DIALOG_CONTENT' };

/**
 * Reducer for the main dialog.
 *
 * @param state - Current state of the main dialog.
 * @param action - Action to be performed on the main dialog.
 * @returns New state of the main dialog.
 */
export function dialogReducer(
  state: DialogState,
  action: DialogAction,
): DialogState {
  switch (action.type) {
    case 'OPEN_DIALOG':
      return {
        ...state,
        open: true,
        activeDialogType: action.payload?.type,
        dialogProps: action.payload.config?.props,
        title: action.payload.config?.title,
        payload: action.payload.config?.payload,
      };
    case 'HIDE_DIALOG':
      return {
        ...state,
        open: false,
      };
    case 'CLEAR_DIALOG_CONTENT':
      return {
        ...state,
        title: undefined,
        payload: undefined,
        activeDialogType: undefined,
        dialogProps: undefined,
      };
    default:
      return { ...state };
  }
}

export type DrawerAction =
  | {
      type: 'OPEN_DRAWER';
      payload: { type: DialogType; config?: DialogConfig };
    }
  | { type: 'HIDE_DRAWER' }
  | { type: 'CLEAR_DRAWER_CONTENT' };

/**
 * Reducer for the main drawer.
 *
 * @param state - Current state of the drawer.
 * @param action - Action to be performed on the drawer.
 * @returns New state of the drawer.
 */
export function drawerReducer(
  state: DialogState,
  action: DrawerAction,
): DialogState {
  switch (action.type) {
    case 'OPEN_DRAWER':
      return {
        ...state,
        open: true,
        activeDialogType: action.payload?.type,
        dialogProps: action.payload.config?.props,
        title: action.payload.config?.title,
        payload: action.payload.config?.payload,
      };
    case 'HIDE_DRAWER':
      return {
        ...state,
        open: false,
      };
    case 'CLEAR_DRAWER_CONTENT':
      return {
        ...state,
        title: undefined,
        payload: undefined,
        activeDialogType: undefined,
        dialogProps: undefined,
      };
    default:
      return { ...state };
  }
}

export type AlertDialogAction =
  | { type: 'OPEN_ALERT'; payload?: DialogConfig }
  | { type: 'HIDE_ALERT' }
  | { type: 'CLEAR_ALERT_CONTENT' };

/**
 * Reducer for the alert dialog.
 *
 * @param state - Current state of the alert dialog.
 * @param action - Action to be performed on the alert dialog.
 * @returns New state of the alert dialog.
 */
export function alertDialogReducer(
  state: Pick<DialogState, 'open' | 'title' | 'payload' | 'dialogProps'>,
  action: AlertDialogAction,
): DialogState {
  switch (action.type) {
    case 'OPEN_ALERT':
      return {
        ...state,
        open: true,
        title: action.payload.title,
        payload: action.payload.payload,
        dialogProps: action.payload.props,
      };
    case 'HIDE_ALERT':
      return { ...state, open: false };
    case 'CLEAR_ALERT_CONTENT':
      return {
        ...state,
        title: undefined,
        payload: undefined,
        dialogProps: undefined,
      };
    default:
      return { ...state };
  }
}
