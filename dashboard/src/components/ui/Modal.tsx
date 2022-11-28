import { Dialog, Transition } from '@headlessui/react';
import clsx from 'clsx';
import type { CSSProperties, ReactChild } from 'react';
import { Fragment } from 'react';
import { twMerge } from 'tailwind-merge';
import ClientOnlyPortal from './ClientOnlyPortal';

interface ModalProps {
  showModal: any;
  close: any;
  afterLeave?: VoidFunction;
  children?: ReactChild;
  Component?: any;
  handler?: any;
  data?: any;
  className?: string;
  wrapperClassName?: string;
  dialogClassName?: string;
  dialogStyle?: CSSProperties;
}

export function Modal({
  children,
  Component,
  showModal = false,
  close,
  afterLeave,
  handler,
  data,
  className,
  wrapperClassName,
  dialogClassName,
  dialogStyle,
}: ModalProps) {
  return (
    <ClientOnlyPortal selector="#modal">
      <Transition.Root show={showModal} as="div">
        <Dialog
          as="div"
          static
          className={twMerge(
            'fixed inset-0 z-50 overflow-x-auto overflow-y-auto',
            dialogClassName,
          )}
          open={showModal}
          onClose={close}
          style={dialogStyle}
        >
          <div
            className={clsx(
              'flex min-h-screen items-center justify-center px-4 pt-4 pb-20 text-center sm:block sm:p-0',
              wrapperClassName,
            )}
          >
            <Transition.Child
              as={Fragment}
              afterLeave={afterLeave}
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Dialog.Overlay className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
            </Transition.Child>
            <span className="hidden" aria-hidden="true">
              &#8203;
            </span>
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <div
                className={clsx(
                  className ||
                    'mt-14 inline-block transform rounded-md bg-white shadow-xl transition-all',
                )}
              >
                {!children ? (
                  <Component close={close} handler={handler} data={data} />
                ) : (
                  children
                )}
              </div>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition.Root>
    </ClientOnlyPortal>
  );
}

export default Modal;
