import LogsDatePicker from '@/components/logs/LogsDatePicker';
import { useCurrentWorkspaceAndApplication } from '@/hooks/useCurrentWorkspaceAndApplication';
import type { AvailableLogsServices, LogsCustomInterval } from '@/types/logs';
import type { HTMLDivProps } from '@/types/react';
import Button from '@/ui/v2/Button';
import ClockIcon from '@/ui/v2/icons/ClockIcon';
import Option from '@/ui/v2/Option';
import Select from '@/ui/v2/Select';
import { availableServices, logsCustomIntervals } from '@/utils/logs';
import { subMinutes } from 'date-fns';
import { twMerge } from 'tailwind-merge';

export interface LogsHeaderProps extends Omit<HTMLDivProps, 'children'> {
  /**
   * The date to be displayed in the date picker for the from date.
   */
  fromDate: Date;
  /**
   * The date to be displayed in the date picker for the to date.
   */
  toDate: Date | null;
  /**
   * Service to where to fetch logs from.
   */
  service: AvailableLogsServices;
  /**
   * Function to be called when the user changes the from date.
   */
  onFromDateChange: (value: Date) => void;
  /**
   * Function to be called when the user changes the `to` date.
   */
  onToDateChange: (value: Date) => void;
  /**
   * Function to be called when the user changes service to which to query logs from.
   */
  onServiceChange: (value: AvailableLogsServices) => void;
}

export default function LogsHeader({
  fromDate,
  toDate,
  service,
  onFromDateChange,
  onToDateChange,
  onServiceChange,
  ...props
}: LogsHeaderProps) {
  const { currentApplication } = useCurrentWorkspaceAndApplication();
  const applicationCreationDate = new Date(currentApplication.createdAt);
  const isLive = !toDate;

  /**
   * Will subtract the `customInterval` time in minutes from the current date.
   */
  function handleIntervalChange({
    minutesToDecreaseFromCurrentDate,
  }: LogsCustomInterval) {
    onFromDateChange(subMinutes(new Date(), minutesToDecreaseFromCurrentDate));
    onToDateChange(new Date());
  }

  /**
   * Determines how to run the interaction when the user clicks on the `Live`
   * button.
   * If the user is already in live mode, we don't want do do anything.
   * If the user is not in live mode, we want to set the `toDate` to null
   * and subscribe to new logs.
   */
  function handleLiveButtonClick() {
    if (isLive) {
      return;
    }

    onToDateChange(null);
  }

  return (
    <div
      className="sticky top-0 z-10 grid w-full grid-flow-row gap-x-6 gap-y-2 border-b border-gray-200 bg-white py-2.5 px-4 lg:grid-flow-col lg:justify-between"
      {...props}
    >
      <div className="grid w-full grid-flow-row items-center justify-center gap-2 md:w-[initial] md:grid-flow-col md:gap-3 lg:justify-start">
        <div className="grid grid-flow-col items-center gap-3 md:justify-start">
          <LogsDatePicker
            label="From"
            value={fromDate}
            onChange={onFromDateChange}
            minDate={applicationCreationDate}
            maxDate={toDate || new Date()}
          />

          <div className="grid grid-flow-col text-greyscaleMedium">
            <LogsDatePicker
              label="To"
              value={toDate}
              disabled={isLive}
              onChange={onToDateChange}
              minDate={fromDate}
              maxDate={toDate || new Date()}
              componentsProps={{
                button: {
                  className: twMerge(
                    'rounded-r-none pr-3',
                    isLive ? 'border-r-0 hover:border-r-0 z-0' : 'z-10',
                  ),
                  color: toDate ? 'inherit' : 'secondary',
                },
              }}
            />

            <Button
              variant="outlined"
              color={isLive ? 'primary' : 'secondary'}
              className={twMerge(
                'min-w-[77px] rounded-l-none',
                !isLive
                  ? 'z-0 border-l-0 bg-gray-100 text-greyscaleMedium hover:border-l-0'
                  : 'z-10',
              )}
              startIcon={
                <ClockIcon className="h-4 w-4 self-center align-middle" />
              }
              onClick={handleLiveButtonClick}
            >
              Live
            </Button>
          </div>
        </div>

        <div className="-my-2.5 border-gray-200 px-0 py-2.5 lg:border-l lg:px-3">
          <Select
            className="w-full text-sm font-normal text-greyscaleDark"
            placeholder="All Services"
            onChange={(_e, value) => {
              if (typeof value !== 'string') {
                return;
              }
              onServiceChange(value as AvailableLogsServices);
            }}
            value={service}
            aria-label="Select service"
            hideEmptyHelperText
            slotProps={{
              root: { className: 'min-h-[initial] h-9 leading-[initial]' },
            }}
          >
            {availableServices.map(({ value, label }) => (
              <Option
                key={value}
                value={value}
                className="text-sm+ font-medium text-greyscaleGreyDark"
              >
                {label}
              </Option>
            ))}
          </Select>
        </div>
      </div>

      <div className="hidden grid-flow-col items-center justify-center gap-3 md:grid lg:justify-end">
        {logsCustomIntervals.map((logInterval) => (
          <Button
            key={logInterval.label}
            variant="outlined"
            color="secondary"
            className="self-center text-greyscaleGreyDark"
            onClick={() => handleIntervalChange(logInterval)}
          >
            {logInterval.label}
          </Button>
        ))}
      </div>
    </div>
  );
}
