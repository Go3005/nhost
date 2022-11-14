import type { IconButtonProps } from '@/ui/v2/IconButton';
import IconButton from '@/ui/v2/IconButton';
import ChevronLeftIcon from '@/ui/v2/icons/ChevronLeftIcon';
import ChevronRightIcon from '@/ui/v2/icons/ChevronRightIcon';
import clsx from 'clsx';
import type { DetailedHTMLProps, HTMLProps } from 'react';

export type DataGridPaginationProps = DetailedHTMLProps<
  HTMLProps<HTMLDivElement>,
  HTMLDivElement
> & {
  /**
   * Number of pages.
   */
  totalPages: number;
  /**
   * Current page.
   */
  currentPage: number;
  /**
   * Function to be called when navigating to the previous page.
   */
  onOpenPrevPage: VoidFunction;
  /**
   * Function to be called when navigating to the next page.
   */
  onOpenNextPage: VoidFunction;
  /**
   * Props to be passed to the next button component.
   */
  nextButtonProps?: IconButtonProps;
  /**
   * Props to be passed to the previous button component.
   */
  prevButtonProps?: IconButtonProps;
};

export default function DataGridPagination({
  className,
  totalPages,
  currentPage,
  onOpenPrevPage,
  onOpenNextPage,
  nextButtonProps,
  prevButtonProps,
  ...props
}: DataGridPaginationProps) {
  return (
    <div
      className={clsx(
        'grid grid-flow-col items-center justify-around rounded-md border-1 border-transGrey',
        className,
      )}
      {...props}
    >
      <IconButton
        variant="borderless"
        color="secondary"
        disabled={currentPage === 1}
        onClick={onOpenPrevPage}
        aria-label="Previous page"
        {...prevButtonProps}
      >
        <ChevronLeftIcon className="h-4 w-4" />
      </IconButton>

      <span
        className={clsx(
          'mx-1 inline-block font-display font-medium',
          currentPage > 99 ? 'text-xs' : 'text-sm+',
        )}
      >
        {currentPage}
        <span className="mx-1 inline-block text-greyscaleGrey">/</span>
        {totalPages}
      </span>

      <IconButton
        variant="borderless"
        color="secondary"
        disabled={currentPage === totalPages}
        onClick={onOpenNextPage}
        aria-label="Next page"
        {...nextButtonProps}
      >
        <ChevronRightIcon className="h-4 w-4" />
      </IconButton>
    </div>
  );
}
